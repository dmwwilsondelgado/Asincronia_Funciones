// se importa la funcion "getUsuarios" es la funcion que hace la solicitud HTTP 
// para traer los usuarios desde la API y "URL" es la constante que contiene la URL base de la API 
// a la cual se realizarán las solicitudes, se importan desde el archivo "index.js"
import { getUsuarios,URL } from "../ejercicio 5/modulos/index.js";
// se declara la funcion asincrona "filtrarUsuarioPorNombreYTelefono" se encargara de obtener los usuarios y sus datos
// para extraer solo el nombre y el telefono de cada usuario
export const filtrarUsuarioPorNombreYTelefono = async () => {
  // se utiliza un bloque "try-catch" para manejar errores de forma adecuada
  // si algo sale mal en la solicitud HTTP el error será capturado en el bloque "catch"
  try {
    // se realiza una solicitud a la API para obtener los usuarios "getUsuarios(URL)" hace la solicitud HTTP 
    // utilizando la URL , el resultado sera un arreglo de usuarios se almacena en la variable "usuarios"
    const usuarios = await getUsuarios(URL);
    // se usa "Promise.all" para ejecutar varias promesas, cada promesa es el resultado de la funcion asincrona
    // que se ejecuta para cada usuario del arreglo "usuarios", ".map" recorre cada usuario y por cada uno 
    // devuelve una promesa que resuelve el objeto con los datos nombre y telefono
    return await Promise.all(usuarios.map(async (usuario) => {
      // dentro de "map", para cada "usuario", devuelve un objeto que contiene solo el "name" y "phone" de cada usuario
      return {
        "nombre" : usuario.name, // se extrae el nombre del usuario
        "telefono": usuario.phone // se extrae el telefono del usuario
      };
    }));
    // si ocurre un error en el bloque "try", un nuevo error se mostrara con el mensaje que explica que ocurrio un fallo
    // junto con la descripcion del error
  } catch (error) {
    // imprime un nuevo error con un mensaje para indicar que algo salio mal
    throw new Error("Ocurrio una falla : " + error);
  }
};
// se invoca la funcion "filtrarUsuarioPorNombreYTelefono" que devuelve una promesa con los datos de los usuarios y con
// ".then" se maneja el resultado de esa promesa
filtrarUsuarioPorNombreYTelefono().then((data) => {
  // cuando las promesas esten resueltas, se muestra un arreglo de objetos que tiene
  // el nombre y telefono de cada usuario
  console.log(data); // imprime el arreglo con los nombres y telefonos de los usuarios
});