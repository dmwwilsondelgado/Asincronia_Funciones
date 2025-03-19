// se importa la funcion "getUsuarios", se encarga de hacer la solicitud a la API para obtener los usuarios
// se importa la funcion "getAlbumes", se encarga de hacer la solicitud para obtener los albumes de cada usuario
// se importa la funcion "getFotos", se encarga de hacer la solicitud para obtener las fotos de cada álbum de usuario
// se importa la constante "URL", que contiene la URL de la API para realizar las solicitudes
import { getUsuarios ,getAlbumes, getFotos, URL } from "../ejercicio 5/modulos/index.js";
// se declara una funcion asincrona que va a devolver los datos de usuarios, sus albumes y las fotos de los albumes
 export const buscarUsuarioMostrarAlbums = async () => {
  // se utiliza un bloque try-catch para manejar posibles errores que puedan surgir durante la ejecucion de la funcion
  // evitando que se interrumpa la ejecucion del programa
  try {
    // se hace una solicitud a la API usando la funcion "getUsuarios" y se espera a que la promesa se resuelva
    // devolviendo un arreglo de usuarios que se guardara en la variable "usuarios"
    const usuarios = await getUsuarios(URL);    
    // se utiliza "Promise.all" para ejecutar multiples promesas al mismo tiempo y esperar que todas se resuelvan
    // en este caso para obtener los álbumes y las fotos de cada usuario con el .map se recorre el arreglo 
    // de usuarios y, para cada usuario, se hace una solicitud para obtener sus albumes. "usuarios.map" 
    // devuelve un arreglo de promesas que luego se resuelven con "Promise.all"
    return await Promise.all(usuarios.map(async (usuario) => {
      // se hace una solicitud a la función "getAlbumes" para obtener los albumes del usuario
      // y se pasa el objeto "usuario" como parametro para obtener los albumes especificos de ese usuario
      const albums = await getAlbumes(URL, usuario.id);
      // se usa "Promise.all" para manejar las solicitudes de fotos de cada album de forma asincrónica
      // se recorre el arreglo de álbumes y, para cada álbum, se realiza una solicitud para obtener sus fotos
      const albumYfotos = await Promise.all(albums.map(async (album) => {
        // se realiza la solicitud de fotos para cada album
        const fotos = await getFotos(URL, album);
        // se retorna el album con sus fotos como una nueva propiedad "fotos"
        return { ...album, fotos};
      }));
      // se devuelve un nuevo objeto que combina la informacion del usuario con su lista de albumes y fotos
      // el objeto "usuario" ya contiene la informacion del usuario y ahora agregamos "albumYfotos" 
      // como una propiedad adicional al objeto del usuario
      return { ...usuario, albumYfotos };
    }));
    // si ocurre algun error en una solicitud HTTP o hay problemas con los datos este error se captura en el bloque "catch"
    //  y se lanza mensaje de error
  } catch (error) {
    // en caso de error se arroja un mensaje que incluye la descripcion del error original
    throw new Error("Ocurrio una falla : " + error);
  }
};

// funcion para buscar un usuario por su nombre de usuario (username)
const buscarUserName = (usuarios, UserName) => {
    // Este ciclo va a comparar cada nombre de usuario con el "UserName" proporcionado
    for (let i = 0; i < usuarios.length; i++) {
        // si se encuentra un usuario cuyo "username" coincide con el "UserName" ingresado, se retorna ese usuario
        if (usuarios[i].username.toLowerCase() === UserName.toLowerCase()) {
            return usuarios[i];
        }
    }
    // si no se encuentra el usuario, se retorna null
    return null;
};

// se llama a la función buscarUsuarioMostrarAlbums() para obtener los datos de los usuarios y sus albumes
buscarUsuarioMostrarAlbums().then((usuarios) => {
    // se solicita al usuario que ingrese el nombre de usuario a buscar
    let UserName = prompt("Ingrese el nombre de usuario:");

    // se llama a la función buscarUserName para buscar al usuario que coincide con el nombre ingresado
    const usuario = buscarUserName(usuarios, UserName);

    // si el usuario se encuentra, se imprime su información en la consola
    if (usuario) {
        console.log(usuario);
    } else {
        // si el usuario no se encuentra, se muestra un mensaje indicando que no se encontro
        console.log("Usuario no encontrado.");
    }
});