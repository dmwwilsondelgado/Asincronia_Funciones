// se importan las funciones que realizan las solicitudes a la API para obtener los
// usuarios "getUsuarios",los posts de los usuarios "getPost", los comentarios de los posts "getCommets"
// los albumes de los usuarios "getAlbumes", las fotos dentro de los albumes "getFotos" y la
// URL de la API desde el archivo "index.js"
import { getUsuarios, getPost, getCommets, getAlbumes, getFotos, URL } from "./modulos/index.js";
// se declara una funcion asincrona "obtenerUsuariosConTodo"
export const obtenerUsuariosConTodo = async () => {
  // se maneja el flujo de errores con try-catch si alguna de las solicitudes falla, 
  // el error se captura y se maneja
  try {
    // se declara la variable "usuarios", donde se almacenara el arreglo de usuarios 
    // obtenidos en la solicitud a la API
    const usuarios = await getUsuarios(URL);
    // se usa "Promise.all" para ejecutar varias promesas y con ".map", se recorre cada usuario 
    // y se realiza una solicitud para obtener sus posts, albumes, fotos y comentarios
    return await Promise.all(usuarios.map(async (usuario) => {
      // se realiza la solicitud para obtener los posts del usuario
      const posts = await getPost(URL, usuario);
      // se declara una variable "albums" que almacenara el arreglo de albumes del usuario
      // haciendo una solicitud a la API para obtener los albumes que corresponden al ID del usuario actual
      const albums = await getAlbumes(URL, usuario.id);
      // para cada album, se realiza otra solicitud para obtener las fotos asociadas,
      // "Promise.all" se usa para manejar todas las solicitudes para obtener las fotos de cada album
      const albumFotos = await Promise.all(albums.map(async (album) => {
        // se obtiene la lista de fotos para cada album
        const fotos = await getFotos(URL, album);
        // se devuelve un objeto que combina el album con sus fotos, usando el operador de propagación ...,
        // que crea una copia del objeto "album" y le agrega la propiedad "fotos"
        return { ...album, fotos }
      }))
      // se obtiene la lista de comentarios para cada post del usuario "Promise.all" se usa para manejar 
      // todas las solicitudes para obtener los comentarios de los posts
      const comentPost = await Promise.all(posts.map(async (post) => {
        // para cada post se realiza una solicitud para obtener sus comentarios
        const coments = await getCommets(URL, post);
        // se devuelve un objeto que combina el post con sus comentarios se utiliza el operador de propagacion para 
        // crear una copia del post y agregarle la propiedad  "coments" con los comentarios correspondientes
        return { ...post, coments };
      }));
        // se retorna un objeto que combina la información del usuario con sus posts, comentarios y albumes con fotos
        // y se le agregan los, "comentPost" lista de los posts con sus comentarios y el
        // "albumFotos" lista de los albumes con sus fotos
      return { ...usuario, comentPost, albumFotos };
    }));
    // si se presenta cualquier tipo de error durante el proceso se lanza un error personalizado
  } catch (error) {
    // si ocurre un error durante la ejecucion de las promesas se captura y 
    // lanza un error con un mensaje explicativo
    throw new Error("Ups ocurrio una falla : " + error);
  }
};
// se llama a la funcion "obtenerUsuariosConTodo" y se maneja el resultado con ".then"
// la funcion devuelve un arreglo de usuarios donde cada usuario tiene :
// sus posts con los comentarios correspondientes y
// sus albumes con las fotos de cada album
obtenerUsuariosConTodo().then((data) => {
  // una vez que se resuelven todas las promesas, se imprime en la consola el arreglo "data"
  console.log(data); // imprime el resultado de los usuarios con la informacion 
  // completa de los usuarios, posts, comentarios, albumes y fotos
});