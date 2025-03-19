// se declara una constante "URL" que contiene la URL base de la API 
// que se utiliza como base para las solicitudes HTTP y que se exporta
// para usar en otros archivos
export const URL = "https://jsonplaceholder.typicode.com";
// se exportan las funciones de los diferentes modulos en este archivo de barril
export { getUsuarios } from "./usuarios.js"; // exporta la funcion para obtener los usuarios
export { getPost } from "./posts.js"; // exporta la funcion para obtener los posts
export { getCommets } from "./commets.js"; // exporta la funcion para obtener los comentarios
export { getAlbumes } from "./albums.js"; // exporta la funcion para obtener los albums
export { getFotos } from "./fotos.js"; // exporta la funcion para obtener las fotos
export { getTareas } from "./tareas.js"; // exporta la funcion para obtenera la lista de tareas