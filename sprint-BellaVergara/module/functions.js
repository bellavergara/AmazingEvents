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

export function fnCrearCkeckbox(listaCategoria, contenedorCkeckbox) {
  let estructurasCkeckbox = "";

  for (const categoria of listaCategoria) {
    estructurasCkeckbox += `
  <div class="checkbox-individual">
            <label for="${categoria}">${categoria}</label>
            <input type="checkbox" name="" id="${categoria}" value="${categoria}"/>
          </div>`
    contenedorCkeckbox.innerHTML = estructurasCkeckbox;
  }
}

export function filtroPorCheck(arrayFiltradoEvent) {
  //filtrado array de checkbox//
  const checkboxesCheckeados = document.querySelectorAll("input[type=checkbox]:checked")
  const arrayCategoriasCheckeadas = Array.from(checkboxesCheckeados)
    .map(categoriaDelCheckbox => categoriaDelCheckbox.value.toLowerCase())

  if (arrayCategoriasCheckeadas.length === 0) {
    return arrayFiltradoEvent
  }
  return arrayFiltradoEvent.filter(evento => arrayCategoriasCheckeadas.includes(evento.category.toLowerCase()))
}

export function fnFiltrarEventos(arrEventos) {
  const inputBuscador = document.getElementById("input-buscar")
  const valorInputUsuario = inputBuscador.value

  if (valorInputUsuario.length === 0) {
    return arrEventos
  }
  else {
    const filtro = arrEventos
      .filter(evento => evento.name.trim().toLowerCase().includes(valorInputUsuario.trim().toLowerCase()))

    return filtro
  }
}

export function fnEliminarTarjetas() {
  const tarjetasDeEventos = document.querySelectorAll('#tarjeta-event')
  for (const tarjeta of tarjetasDeEventos) {
    tarjeta.remove()
  }
}

export function crearMensajeError(contenedorMensajeError) {
  contenedorMensajeError.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="./assets/script/mensajeError/img-error.avif" class="card-img-top" alt="...">
  <div class="card-body">
  <h1> Error!</h1>
    <p class="card-text">"We're sorry, there are no results for your search parameters."</p>
    <p class = "card-text">Please try again later.</p>
  </div>
</div>`
}

export function eliminarMensajeError(contenedorMensajeError) {
  contenedorMensajeError.innerHTML = ""
}

export function filtraTodaLaPagina(listaDeEventos, mensajeError) {
  let tarjetasFiltradas = fnFiltrarEventos(listaDeEventos)
  tarjetasFiltradas = filtroPorCheck(tarjetasFiltradas)

  if (tarjetasFiltradas.length === 0) {
    crearMensajeError(mensajeError)
  }
  else {
    fnMostrarTarjetas(tarjetasFiltradas)
  }
}
// funciones de upcoming Events//

export function filtradoEventosUpcoming(listaTarjetas, fecha) {
  let datosFiltrados = [];
  for (const tarjeta of listaTarjetas) {
    if (tarjeta.date > fecha) {
      datosFiltrados.push(tarjeta)
    }
  }
  return datosFiltrados
}