// se importan las funciones que realizan las solicitudes a la API para obtener los
// usuarios "getUsuarios", los posts de los usuarios "getPost", los comentarios de los posts "getCommets",
// los albumes de los usuarios "getAlbumes", las fotos dentro de los albumes "getFotos" y la
// URL de la API desde el archivo "index.js"
import { getUsuarios, getPost, getCommets, URL } from "../ejercicio 5/modulos/index.js";
// se solicita al usuario que ingrese texto para buscar dentro de los titulos de los posts
// mediante un cuadro de entrada (prompt)
const tituloBuscado = prompt("Ingrese titulo del post:");
// se declara funcion asincrona "buscarPostsComentarios"
export const buscarPostsComentarios = async () => {
    try {
        // se obtiene la lista de usuarios mediante una llamada a la API usando la funcion "getUsuarios"
        const usuarios = await getUsuarios(URL);
        // se hace un filtrado de los usuarios, donde se revisa si cada usuario tiene posts con el titulo buscado
        // se usa "Promise.all" para manejar las solicitudes asincronas
        const usuariosFiltrados = await Promise.all(usuarios.map(async (usuario) => {
            // para cada usuario se obtiene sus posts con "getPost" y luego obtenemos los comentarios de esos posts
            // con Promise.all se asegura de que todas las llamadas asincronas se resuelvan antes de continuar
            const posts = await Promise.all((await getPost(URL, usuario)).map(async (post) => {
                // se obtiene la lista de comentarios para cada post
                const comentarios = await getCommets(URL, post);
                // se devuelve el post combinado con su lista de comentarios
                return { ...post, comentarios };
            }));
            // se filtran los posts para quedarse solo con aquellos que contienen la palabra ingresada en el titulo
            const postsFiltrados = posts.filter(post => post.title.includes(tituloBuscado));
            // si hay posts que coinciden con el titulo buscado, se retorna un objeto con el ID del usuario
            // y los posts filtrados
            if (postsFiltrados.length > 0) {
                return { userId: usuario.id, posts: postsFiltrados };
            }
            // si no hay posts que coincidan con el titulo, se retorna null para este usuario
            return null;
        }));
        // se filtran los resultados eliminando los valores nulos que se generaron para usuarios
        // sin posts relevantes, nos deja solo con los usuarios que tienen posts que coinciden con el titulo buscado
        const resultadoFinal = usuariosFiltrados.filter(usuario => usuario !== null);
        // si no se encontraron usuarios con posts relevantes, se muestra un mensaje en consola indicando que no se encontro nada
        if (resultadoFinal.length === 0) {
            console.log("No se encontraron posts con ese titulo");
        } else {
            // si se encontraron coincidencias, se muestra el resultado final con los usuarios y sus posts relevantes
            console.log(resultadoFinal);
        }

    } catch (error) {
        // si algo falla se captura el error y se lanza un nuevo error con un mensaje
        throw new Error("Ups ocurrio una falla: " + error);
    }
};

// se ejecuta la funcion "buscarPostsComentarios", lo que inicia todo el proceso de obtención de datos y filtrado
buscarPostsComentarios();
export default buscarPostsComentarios;