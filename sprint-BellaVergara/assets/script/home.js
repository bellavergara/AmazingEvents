const contenedorTarjetas = document.getElementById('cards-contenedor');
const eventos = data.events;
const contenedorCheck = document.getElementById("ckeckbox");

function mostrarTarjetas(listaDeEventos, contenedorDeEventos) {
  /*
    Esta función recibe la lista de eventos del archivo "dataAmazingEvents.js"
    Crea UNA tarjeta por CADA evento
    Y agrega las tarjetas con los datos de los eventos al contenedor padre
  */
  let card = "";
  for (const evento of listaDeEventos) {
    card += `<div class="card" style="width: 18rem">
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
  contenedorDeEventos.innerHTML = card;
}
mostrarTarjetas(eventos, contenedorTarjetas);

const arrayCategoria = eventos.map(evento => evento.category)
let set = new Set(arrayCategoria)
let arrayCategoriaSinRepetir = Array.from(set)


function crearCkeckbox(listaCategoria, contenedorCkeckbox) {
  let estructurasCkeckbox = "";

  for (const categoria of listaCategoria) {
    estructurasCkeckbox += `
  <div class="checkbox-individual">
            <label for="${categoria}">${categoria}</label>
            <input type="checkbox" name="" id="${categoria}" value="${categoria} "/>
          </div>`
    contenedorCkeckbox.innerHTML = estructurasCkeckbox;
  }
}

crearCkeckbox(arrayCategoriaSinRepetir, contenedorCheck)


contenedorCheck.addEventListener("change", () => {
  //Paso 1:  mirar cual checkbox de categoria cliclearon
  const checked = document.querySelectorAll("input[type=checkbox]:checked")

  // este array se crea desde 0 cada vez que el usuario hace click
  const arrayDeChecked = Array.from(checked)
    .map(checkbox => checkbox.value)

  //Paso2: ahora filtramos por check//
  eventos.filter()



})
