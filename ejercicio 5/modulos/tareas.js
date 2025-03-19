// se importa la funcion "solicitud" se encarga de hacer la solicitud HTTP a la API
import solicitud from "./solicitud.js";
// se exporta una funcion asincrona "getTareas", que se encarga de obtener la lista de tareas para un usuario
// toma dos parametros la "URL" y "usuario" que es un objeto que tiene la informacion del usuario entre esos el id
export const getTareas = async (URL, usuario) => {
  // se realiza una solicitud HTTP a la API para obtener las tareas asociadas a cada usuario
  return await solicitud(`${URL}/todos?userId=${usuario.id}`);
}