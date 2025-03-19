// se importa la funcion "solicitud" se encarga de hacer las solicitudes HTTP a la API
import solicitud from "./solicitud.js";
// se exporta una funcion asincrona "getFotos" que obtiene las fotos del album desde la API
// toma dos parametros, la URL base de la API donde se encuentran las fotos y el
// objeto que contiene la informacion del album
export const getFotos = async (URL, album) => {
    // Se realiza la solicitud HTTP a la API para obtener las fotos de un album
    return await solicitud(`${URL}/photos?albumId=${album.id}`);
}