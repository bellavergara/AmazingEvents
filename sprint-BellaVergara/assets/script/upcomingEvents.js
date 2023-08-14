const eventos = data.events;
const contenedorCheck = document.getElementById("ckeckbox");
const inputBuscador = document.getElementById("input-buscar");
const botonBuscar = document.getElementById("boton-buscar");
const mensajeError = document.getElementById("contenedor-mensaje-error");

function filtradoDato(listaTarjeta) {
  let datosFiltrados = [];
  for (const datos of listaTarjeta) {
    if (datos.date > data.currentDate) {
      datosFiltrados.push(datos)
    }
  }
  return datosFiltrados
}
// aca estoy bajando la funcion y guardando el contenido en una variable
// para luego  llamarla en la funcion (mostrar tarjeta)//

const datosFiltrados = filtradoDato(eventos)

function fnMostrarTarjetas(listaDeEventos) {
  const contenedorTarjetas = document.getElementById('contenedor-upcomingEvents');
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
fnMostrarTarjetas(datosFiltrados);


const arrayCategoria = eventos.map(evento => evento.category)
let set = new Set(arrayCategoria)
let arrayCategoriaSinRepetir = Array.from(set)


function fnCrearCkeckbox(listaCategoria, contenedorCkeckbox) {
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

fnCrearCkeckbox(arrayCategoriaSinRepetir, contenedorCheck)


contenedorCheck.addEventListener("change", () => {
  eliminarMensajeError()
  //Paso2: ahora filtramos por check//
  let tarjetasFiltradas = fnFiltrarEventos(datosFiltrados, inputBuscador.value)
  tarjetasFiltradas = filtroPorCheck(tarjetasFiltradas);

  //Paso 3: Limpiar el home, eliminar todas las tarjetas para luego mostrar solo las filtradas //
  fnEliminarTarjetas()

  //Paso 4: muestro los eventos ya filtrados //
  if (tarjetasFiltradas.length === 0) {
    crearMensajeError()
  }
  else {
    fnMostrarTarjetas(tarjetasFiltradas)
  }
})


function filtroPorCheck(arrayFiltradoEvent) {
  //filtrado array de checkbox//
  const checkboxesCheckeados = document.querySelectorAll("input[type=checkbox]:checked")
  const arrayCategoriasCheckeadas = Array.from(checkboxesCheckeados)
    .map(categoriaDelCheckbox => categoriaDelCheckbox.value.toLowerCase())
  if (arrayCategoriasCheckeadas.length === 0) {
    return arrayFiltradoEvent
  }
  return arrayFiltradoEvent.filter(evento => arrayCategoriasCheckeadas.includes(evento.category.toLowerCase()))
}


/// Declaro mis Funciones

function fnFiltrarEventos(arrEventos, valorInputUsuario) {

  const filtro = arrEventos
    .filter(evento => evento.name.trim().toLowerCase().includes(valorInputUsuario.trim().toLowerCase()))
  //filter devuelve un array, con lo que cumplan la condicion. 
  if (valorInputUsuario.value === 0) {
    return datosFiltrados
  }
  return filtro
}

// funcion eliminar tarjetas//

function fnEliminarTarjetas() {
  const tarjetasDeEventos = document.querySelectorAll('#tarjeta-event')
  for (const tarjeta of tarjetasDeEventos) {
    tarjeta.remove()
  }
}
// boton buscador//

botonBuscar.addEventListener("click", () => {

  eliminarMensajeError()
  // limio el home, elimino todas las tarjetas //
  fnEliminarTarjetas()

  // filtro por el texto del input buscador //
  let tarjetasFiltradas = fnFiltrarEventos(datosFiltrados, inputBuscador.value)
  tarjetasFiltradas = filtroPorCheck(tarjetasFiltradas);
  if (tarjetasFiltradas.length === 0) {
    crearMensajeError()
  }
  else {
    fnMostrarTarjetas(tarjetasFiltradas)
  }
})
//mostramos mensaje si no coincide la busqueda//



function crearMensajeError() {
  mensajeError.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="./assets/script/mensajeError/img-error.avif" class="card-img-top" alt="...">
  <div class="card-body">
  <h1> Error!</h1>
    <p class="card-text">"We're sorry, there are no results for your search parameters."</p>
    <p class = "card-text">Please try again later.</p>
  </div>
</div>`
}

function eliminarMensajeError() {
  mensajeError.innerHTML = ""
}