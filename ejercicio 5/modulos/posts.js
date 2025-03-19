// se importa la funcion "solicitud" se encargas de hacer las solicitudes HTTP a la API
import solicitud from "./solicitud.js";
// se exporta una funcion asincrona "getPost" que obtiene los posts de cada usuario desde la API
// toma dos parametros, la URL de la API donde se encuentra el recurso de posts y
// un objeto que contiene informacion del usuario
export const getPost = async (URL, usuario) => {
    // se realiza la solicitud HTTP a la API para obtener los posts de un usuario 
    return await solicitud(`${URL}/posts?userId=${usuario.id}`);
}