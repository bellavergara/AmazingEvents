import {
  fnMostrarTarjetas,
  fnCrearCkeckbox,
  fnEliminarTarjetas,
  eliminarMensajeError,
  filtraTodaLaPagina,
  filtradoEventosUpcoming
} from "../../module/functions.js"
const contenedorCheck = document.getElementById("ckeckbox");
const botonBuscar = document.getElementById("boton-buscar");
const mensajeError = document.getElementById("contenedor-mensaje-error");

// fetch//
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(respuesta => respuesta.json())
  .then(respuesta => {
    const listaDeEventos = respuesta.events
    const fecha = respuesta.currentDate
    const datosFiltrados = filtradoEventosUpcoming(listaDeEventos, fecha)

    const arrayCategoria = datosFiltrados.map(evento => evento.category)
    let set = new Set(arrayCategoria)
    let arrayCategoriaSinRepetir = Array.from(set)

    fnMostrarTarjetas(datosFiltrados)
    fnCrearCkeckbox(arrayCategoriaSinRepetir, contenedorCheck)

    contenedorCheck.addEventListener("change", () => {
      eliminarMensajeError(mensajeError)
      fnEliminarTarjetas()
      filtraTodaLaPagina(datosFiltrados, mensajeError)
    })

    botonBuscar.addEventListener("click", () => {
      eliminarMensajeError(mensajeError)
      fnEliminarTarjetas()
      filtraTodaLaPagina(datosFiltrados, mensajeError)
    })
  })
  .catch(error => console.log(error))