export function fnMostrarTarjetas(listaDeEventos) {
  const contenedorTarjetas = document.getElementById('cards-contenedor');
  /*
    Esta función recibe la lista de eventos del archivo "dataAmazingEvents.js"
    Crea UNA tarjeta por CADA evento
    Y agrega las tarjetas con los datos de los eventos al contenedor padre
  */
  let card = "";
  for (const evento of listaDeEventos) {
    card += `<div id="tarjeta-event" class="card" style="width: 18rem">
      <img
        src="${evento.image}"
        class="card-img-top"
        alt=".."
      />
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${evento.name}</h5>
        <p crlass="card-text">${evento.description}</p>
        <div class="d-flex justify-content-between">
          <p>$${evento.price}</p>
          <a href="./details.html?nombre=${evento.name}" class="btn btn-primary">details</a>
        </div>
      </div>
    </div>`
  }
  contenedorTarjetas.innerHTML = card;
}