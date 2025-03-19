import { listarTareasPendientes } from "./1_lista_Tareas/listarTareas.js";
import { buscarUsuarioMostrarAlbums } from "./2_buscarUsuarioConAlbums/buscarUsuarioYalbums.js";
import { buscarPostsComentarios } from "./3_buscarPostsConComentarios/buscarPostsYComentarios.js";
import { filtrarUsuarioPorNombreYTelefono } from "./4_filtarUsuarioNombreYTelefono/filtrarUsuarioPorNombreYTelefono.js";
import { obtenerUsuariosConTodo } from "./ejercicio 5/app.js";

async function mostrarMenu() {
    let opcion = prompt(`Seleccione una opción:
    0. Salir
    1. Listar tareas pendientes
    2. Buscar usuario y mostrar álbumes
    3. Buscar posts y comentarios
    4. Filtrar usuario por nombre y teléfono
    5. Obtener usuarios con todo`);
    
    console.log(`Ejecutando opción: ${opcion}`);
    
    switch (opcion) {
        case "0":
            alert("Saliendo del programa...");
            return;
        case "1":
            console.log("Listando tareas pendientes...");
            console.log(await listarTareasPendientes());
            break;
        case "2":
            console.log("Buscando usuario y mostrando álbumes...");
            console.log(await buscarUsuarioMostrarAlbums());
            break;
        case "3":
            console.log("Buscando posts y comentarios...");
            console.log(await buscarPostsComentarios());
            break;
        case "4":
            console.log("Filtrando usuario por nombre y teléfono...");
            console.log(await filtrarUsuarioPorNombreYTelefono());
            break;
        case "5":
            console.log("Obteniendo usuarios con toda su información...");
            console.log(await obtenerUsuariosConTodo());
            break;
        default:
            console.log("Opción inválida, intente de nuevo.");
    }
}

mostrarMenu();