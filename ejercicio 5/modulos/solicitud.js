// funcion asincrona "solicitud" que realiza una solicitud HTTP a una URL y devuelve la respuesta 
// en formato JSON, acepta un unico parametro, la URL a la que se hara la solicitud HTTP
const solicitud = async url => {
    // se realiza la solicitud HTTP usando el metodo "fetch" a la URL devuelve una promesa que se resuelve
    // con la respuesta de la solicitud
    const peticion = await fetch(url);
    // se convierte el objeto "Response" en formato JSON usando el metodo ".json()" del objeto "Response"
    // este metodo devuelve una promesa, por lo que se usa "await" para esperar que 
    // se resuelva y obtener los datos en formato JSON
    const data = await peticion.json();
    // se retorna el resultado de la conversion a JSON, que son los datos obtenidos desde la API
    return data;
}
// se exporta la funcion "solicitud" por defecto para usarla en otros archivos
export default solicitud 