const contenedorTarjetas = document.getElementById('cards-contenedor')

function crearTarjeta(datosDeEvento) {
  /*
    Esta función CREA tarjetas con los datos de cada evento
  */

    return
    `<div class="card" style="width: 18rem">
    <img
      src="./assets/Recursos_Amazing_Events_Task_1/books.jpg"
      class="card-img-top"
      alt=".."
    />
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title"></h5>
      <p crlass="card-text">
      </p>
      <div class="d-flex justify-content-between">
        <p>$</p>
        <a href="./details.html" class="btn btn-primary"></a>
      </div>
    </div>
  </div>`
}

function mostrarTarjetas(listaDeEventos, contenedorDeEventos){
  /*
    Esta función recibe la lista de eventos del archivo "dataAmazingEvents.js"
    Crea UNA tarjeta por CADA evento
    Y agrega las tarjetas con los datos de los eventos al contenedor padre
  */
  for (const evento of listaDeEventos) {
    let nuevaTarjeta = crearTarjeta(evento)
    contenedorDeEventos.innerHTML += nuevaTarjeta
  }
}


/// funciones para filtlrar enventos

function filtrarEventosPorNombre(listaDeEventos, nombreEvento) {
  let eventosFiltrados
  for (const evento of listaDeEventos) {
    if(evento.name == nombreEvento) {
      eventosFiltrados.push(evento)
    }
  }
  return eventosFiltrados
}

function filtrarEventosPorCategoria(listaDeEventos, categoria) {
  let eventosFiltrados
  for (const evento of listaDeEventos) {
    if(evento.category == categoria) {
      eventosFiltrados.push(evento)
    }
  }
  return eventosFiltrados
}

function filtrarEventosPorLugar(listaDeEventos, lugar) {
  let eventosFiltrados
  for (const evento of listaDeEventos) {
    if(evento.place == lugar) {
      eventosFiltrados.push(evento)
    }
  }
  return eventosFiltrados
}