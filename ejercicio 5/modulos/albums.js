// se importa la funcion "solicitud" se encarga de hacer las solicitudes HTTP a la API
import solicitud from "./solicitud.js";
// se exporta una funcion asincrona `getAlbumes` que obtiene los albumes de cada usuario desde la API
// toma dos parametros la URL base de la API donde se encuentran los albumes y el
// `id` del usuario para obtener sus albumes
export const getAlbumes = async (URL, usuario) => {
    // se realiza la solicitud HTTP a la API para obtener los albumes de cada usuario
    return await solicitud(`${URL}/albums?userId=${usuario}`);
}