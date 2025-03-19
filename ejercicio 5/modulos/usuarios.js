// se importa la funcion "solicitud" se encarga de hacer las solicitudes HTTP a la API
import solicitud from "./solicitud.js";
// se exporta una funcion asincrona "getUsuarios" que obtiene los usuarios desde la API
// toma dos parametros la URL para realizar las solicitudes y el "id" parametro opcional 
// que si se proporciona filtra los usuarios por el "id"
export const getUsuarios = async (URL, id) => {
    // se declara una variable "ruta" que almacenara la URL para hacer la solicitud a la API
    let ruta = "";
    // si se proporciona un "id" la URL se construye para buscar un usuario
    // mediante el filtro "id" en la consulta de la URL
    if (id) {
        // si el "id" esta presente, se construye la URL con el parametro "id" para obtener ese usuario
        ruta = `${URL}/users?id=${id}`;
    } else {
        // si no se proporciona un "id", se construye la URL para obtener todos los usuarios
        ruta = `${URL}/users`;
    }
    // se realiza la solicitud HTTP a la API usando la función "solicitud" y se pasa la URL construida
    // devuelve una promesa que sera resuelta con los datos de cada usuario
    const usuarios = await solicitud(ruta);
    // la funcion retorna los datos de los usuarios de la API
    return usuarios;
};