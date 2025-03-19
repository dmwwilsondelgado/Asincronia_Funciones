// se importa la funcion "getUsuarios", se encarga de hacer la solicitud a la API para obtener los usuarios
// se importa la funcion "getTareas", se encarga de hacer la solicitud para obtener las tareas de cada usuario
// se importa la constante "URL", que contiene la URL de la API para realizar las solicitudes
import { getUsuarios ,getTareas, URL } from "../ejercicio 5/modulos/index.js";
// se declara una función asincrona que va a devolver los datos de usuarios y tareas
export const listarTareasPendientes = async () => {
  // se utiliza un bloque try-catch para manejar posibles errores que puedan surgir durante la ejecucion de la funcion
  // evitando que se interrumpa la ejecucion del programa
  try {
    // se hace una solicitud a la API usando la funcion "getUsuarios" y se espera a que la promesa se resuelva
    // devolviendo un arreglo de usuarios que se guardara en la variable "usuarios"
    const usuarios = await getUsuarios(URL);
    // se utiliza "Promise.all" para ejecutar múltiples promesas al mismo tiempo y esperar que todas se resuelvan
    // en este caso para obtener las tareas de cada usuario y utilizo "map" para recorrer el arreglo de usuarios y para cada usuario
    // se hace una solicitud para obtener sus tareas y "usuarios.map" devuelve un arreglo de promesas 
    // una por cada usuario que luego se resuelven con "Promise.all"
    return await Promise.all(usuarios.map(async (usuario) => {
      // se hace una solicitud a la funcion "getTareas" para obtener las tareas del usuario y se pasa el objeto "usuario" 
      // como parametro a "getTareas" que devuelve una lista de tareas asociadas a ese usuario y 
      // la lista de tareas se guarda en la variable "tareas"
      const tareas = await getTareas(URL, usuario);
      // se usa "Promise.all" para manejar las tareas de manera asincrona para cada tarea en el arreglo "tareas"
      // se crea un nuevo arreglo de objetos tarea
      const listaTareas = await Promise.all(tareas.map(async (tarea) => {
        // se esta devolviendo una copia de cada tarea sin modificar la original
        return { ...tarea };
      }));
      // se devuelve un nuevo objeto que combina la informacion del usuario con su lista de tareas
      // el objeto "usuario" ya contiene la informacion del usuario y ahora agregamos "listaTareas" 
      // como una propiedad adicional al objeto
      return { ...usuario, listaTareas };
    }));
    // si ocurre algun error en una solicitud HTTP o hay problemas con los datos este error se captura en el bloque "catch"
    //  y se lanza mensaje de error
  } catch (error) {
    // en caso de error se arroja un mensaje que incluye la descripcion del error original
    throw new Error("Ocurrio una falla : " + error);
  }
};
// se invoca la funcion "listarTareasPendientes" y se maneja el resultado con ".then" 
// el resultado es un arreglo de usuarios cada uno con su lista de tareas que se imprime en la consola
listarTareasPendientes().then((data) => {
  // Una vez que se resuelven todas las promesas, se imprime el arreglo "data" en la consola
  // este arreglo contiene todos los usuarios con sus respectivas tareas
  console.log(data);
});