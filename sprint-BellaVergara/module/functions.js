export function fnMostrarTarjetas(listaDeEventos) {
  const contenedorTarjetas = document.getElementById('cards-contenedor');
  /*
    Esta función recibe la lista de eventos del API
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
  //fnCrearCkeckbox CREA CHECKBOX //
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
  //FILTRA tarjetas por checkbox//
  const checkboxesCheckeados = document.querySelectorAll("input[type=checkbox]:checked")
  const arrayCategoriasCheckeadas = Array.from(checkboxesCheckeados)
    .map(categoriaDelCheckbox => categoriaDelCheckbox.value.toLowerCase())

  // condicional SI ningun check fue seleccionado, entonces NO filtra //
  if (arrayCategoriasCheckeadas.length === 0) {
    return arrayFiltradoEvent
  } else {
    // si  al menos hay un check seleccionado, entonces SI filtra//
    return arrayFiltradoEvent.filter(evento => arrayCategoriasCheckeadas.includes(evento.category.toLowerCase()))
  }
}

export function fnFiltrarEventosPorInput(arrEventos) {
  // guardo el valor que esta escrito en el INPUT de busqueda
  const inputBuscador = document.getElementById("input-buscar")
  const valorInputUsuario = inputBuscador.value

  // SI  el INPUT esta vacio, entonces NO  filtra//
  if (valorInputUsuario.length === 0) {
    return arrEventos
  }
  else {
    // si no esta vacio el INPUT,entonces SI filtro//
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
  //guardo  el resultado de filtrar LOS EVENTOS por INPUT//
  let tarjetasFiltradas = fnFiltrarEventosPorInput(listaDeEventos)
  // gaurdo el resultado de filtrar eventos por CHECK//
  tarjetasFiltradas = filtroPorCheck(tarjetasFiltradas)
  // SI no coincide la busqueda, crea un MENSAJE DE ERROR//
  if (tarjetasFiltradas.length === 0) {
    crearMensajeError(mensajeError)
  }
  else {
    // muestro las tarjetas QUE si coincidieron con la busqueda//
    fnMostrarTarjetas(tarjetasFiltradas)
  }
}
// funciones de upcoming Events//

export function filtradoEventosUpcoming(listaTarjetas, fecha) {
  // filtra los eventos por fecha FUTURAS  A LA ACTUAL//
  let datosFiltrados = [];
  for (const tarjeta of listaTarjetas) {
    if (tarjeta.date > fecha) {
      datosFiltrados.push(tarjeta)
    }
  }
  return datosFiltrados
}

//past Events//
export function filtradoEventosPast(listaTarjeta, fecha) {
  //filtra eventos por FECHAS PASADAS//
  let datosFiltrados = [];
  for (const tarjeta of listaTarjeta) {
    if (tarjeta.date < fecha) {
      datosFiltrados.push(tarjeta)
    }
  }
  return datosFiltrados
}