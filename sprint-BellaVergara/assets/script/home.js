// INPORT importa las funciones desde el archivo functions.js//
import {
  fnMostrarTarjetas,
  fnCrearCkeckbox,
  fnEliminarTarjetas,
  eliminarMensajeError,
  filtraTodaLaPagina
} from "../../module/functions.js"  // nombre de RUTA//

const contenedorCheck = document.getElementById("ckeckbox");
const botonBuscar = document.getElementById("boton-buscar");
const mensajeError = document.getElementById("contenedor-mensaje-error")

// inicio del FETCH//
// http de API(informacion de eventos)
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  //recibe como respuesta en caso de ser exitosa la promise//
  .then(respuesta => respuesta.json())
  .then(respuesta => {
    const listaDeEventos = respuesta.events
    // .MAP creo una copia con todas las categorias que existen en los eventos.//
    const arrayCategoria = listaDeEventos.map(evento => evento.category)
    // SET  crea un SET  con CATEGORIAS, pero sin CATEGORIAS repetidas.//
    let set = new Set(arrayCategoria)
    // ARRAY.From  crea un array del SET//
    let arrayCategoriaSinRepetir = Array.from(set)

    //llamo a las funciones// 
    fnMostrarTarjetas(listaDeEventos)
    fnCrearCkeckbox(arrayCategoriaSinRepetir, contenedorCheck)

    contenedorCheck.addEventListener("change", () => {
      eliminarMensajeError(mensajeError)
      fnEliminarTarjetas()
      filtraTodaLaPagina(listaDeEventos, mensajeError)
    })

    botonBuscar.addEventListener("click", () => {
      eliminarMensajeError(mensajeError)
      fnEliminarTarjetas()
      filtraTodaLaPagina(listaDeEventos, mensajeError)
    })
  })
  .catch(error => console.log(error))
  // recibe  un REJECT en caso de  fallo en la promise//