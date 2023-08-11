const eventos = data.events;
const contenedorCheck = document.getElementById("ckeckbox");
const inputBuscador = document.getElementById("input-buscar");
const botonBuscar = document.getElementById("boton-buscar");


function filtradoDato(listaTarjeta) {
  let datosFiltrados = [];
  for (const datos of listaTarjeta) {
    if (datos.date < data.currentDate) {
      datosFiltrados.push(datos)
    }
  }
  return datosFiltrados
}
// aca estoy bajando la funcion y guardando el contenido en una variable
// para luego  llamarla en la funcion (mostrar tarjeta)//

const datosFiltrados = filtradoDato(eventos)

function fnMostrarTarjetas(listaDeEventos) {
  const contenedorTarjetas = document.getElementById('contenedor-pasEvents');

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
  //Paso 1: mirar cual checkbox de categoria cliclearon
  const checkboxesCheckeados = document.querySelectorAll("input[type=checkbox]:checked")

  // este array se crea desde 0 cada vez que el usuario hace click
  const arrayCategoriasCheckeadas = Array.from(checkboxesCheckeados)
    .map(categoriaDelCheckbox => categoriaDelCheckbox.value)

  //Paso2: ahora filtramos por check//
  let tarjetasFiltradas = fnFiltrarEventos(eventos, arrayCategoriasCheckeadas)

  //Paso 3: Limpiar el home, eliminar todas las tarjetas para luego mostrar solo las filtradas //
  fnEliminarTarjetas()

  //Paso 4: muestro los eventos ya filtrados //
  fnMostrarTarjetas(tarjetasFiltradas)
})



/// Declaro mis Funciones

function fnFiltrarEventos(arrEventos, arrCategoriasLimpio) {
  let filltroFinal = []

  for (const categoria of arrCategoriasLimpio) {
    const filtro = arrEventos
      .filter(evento => evento.category.trim().toLowerCase() === categoria.trim().toLowerCase())

    filltroFinal = filltroFinal.concat(filtro)
  }

  return filltroFinal
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
  // obtengo el input buscador //
  const inputBuscador = document.getElementById("input-buscar")

  // guardo el texto del input buscador en un array //
  arrayBusqueda = [inputBuscador.value]

  // limio el home, elimino todas las tarjetas //
  fnEliminarTarjetas()

  // filtro por el texto del input buscador //
  let tarjetasFiltradas = fnFiltrarEventos(eventos, arrayBusqueda)

  // muestro las tarjetas filtradas //
  fnMostrarTarjetas(tarjetasFiltradas)
})

