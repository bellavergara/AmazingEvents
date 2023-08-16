import {
  fnMostrarTarjetas,
  fnCrearCkeckbox,
  fnEliminarTarjetas,
  eliminarMensajeError,
  filtraTodaLaPagina
} from "../../module/functions.js"
const contenedorCheck = document.getElementById("ckeckbox");
const botonBuscar = document.getElementById("boton-buscar");
const mensajeError = document.getElementById("contenedor-mensaje-error")
// fetch//

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(respuesta => respuesta.json())
  .then(respuesta => {
    const listaDeEventos = respuesta.events

    const arrayCategoria = listaDeEventos.map(evento => evento.category)
    let set = new Set(arrayCategoria)
    let arrayCategoriaSinRepetir = Array.from(set)

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

