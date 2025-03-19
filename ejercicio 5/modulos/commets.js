// se importa la funcion "solicitud" se encarga de hacer las solicitudes HTTP a la API
import solicitud from "./solicitud.js";
// se exporta una funcion asincrona "getCommets" que obtiene los comentarios de un post desde la API
// toma dos parametros, la URL de la API donde se encuentran los comentarios y el
// objeto que contiene la informacion del post
export const getCommets = async (URL, post) => {
    // se realiza la solicitud HTTP a la API para obtener los comentarios de los post
    return await solicitud(`${URL}/comments?postId=${post.id}`);
}