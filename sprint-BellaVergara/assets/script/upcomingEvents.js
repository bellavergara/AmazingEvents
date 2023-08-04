const contenedorTarjetas = document.getElementById('contenedor-upcomingEvents');
console.log(data.events);
const eventos = data.events;
console.log(eventos);


function filtradoDato(listaTarjeta){
    let datosFiltrados =[];
    for (const datos of listaTarjeta) {
    if(datos.date > data.currentDate ){
        datosFiltrados.push(datos)
      }
    }
    return datosFiltrados
}
// aca estoy bajando la funcion y guardando el contenido en una variable
// para luego  llamarla en la funcion (mostrar tarjeta)//

const datosFiltrados = filtradoDato(eventos)

function mostrarTarjetas(listaDeEventos, contenedorDeEventos){
  /*
    Esta función recibe la lista de eventos del archivo "dataAmazingEvents.js"
    Crea UNA tarjeta por CADA evento
    Y agrega las tarjetas con los datos de los eventos al contenedor padre
  */
  let card = "";
  for (const evento of listaDeEventos) {
    card +=`<div class="card" style="width: 18rem">
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
        <a href="./details.html" class="btn btn-primary">details</a>
      </div>
    </div>
  </div>`
}
  contenedorDeEventos.innerHTML = card;
  
}
mostrarTarjetas(datosFiltrados,contenedorTarjetas);




