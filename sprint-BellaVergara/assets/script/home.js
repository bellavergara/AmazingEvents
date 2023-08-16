import { fnMostrarTarjetas, } from "../../module/functions.js"
const contenedorCheck = document.getElementById("ckeckbox");
const inputBuscador = document.getElementById("input-buscar");
const botonBuscar = document.getElementById("boton-buscar");
const mensajeError = document.getElementById("contenedor-mensaje-error");

// fetch//

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(respuesta => respuesta.json())
  .then(respuesta => {
    const arrayEventos = respuesta;
    const listaDeEventos = arrayEventos.events
    const arrayCategoria = listaDeEventos.map(evento => evento.category)
    let set = new Set(arrayCategoria)
    let arrayCategoriaSinRepetir = Array.from(set)
    console.log(arrayCategoriaSinRepetir)


    console.log(listaDeEventos);
    console.log(arrayEventos);

    fnMostrarTarjetas(listaDeEventos)
    fnCrearCkeckbox(arrayCategoriaSinRepetir, contenedorCheck)
    fnFiltrarEventos(arrayCategoriaSinRepetir, inputBuscador.value)


    contenedorCheck.addEventListener("change", () => {
      eliminarMensajeError()
      //Paso2: ahora filtramos por check//
      let tarjetasFiltradas = fnFiltrarEventos(arrayCategoriaSinRepetir, inputBuscador.value)
      tarjetasFiltradas = filtroPorCheck(arrayCategoriaSinRepetir);

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
    botonBuscar.addEventListener("click", () => {

      eliminarMensajeError()
      // limio el home, elimino todas las tarjetas //
      fnEliminarTarjetas()

      // filtro por el texto del input buscador //
      let tarjetasFiltradas = fnFiltrarEventos(arrayCategoriaSinRepetir, inputBuscador.value)
      tarjetasFiltradas = filtroPorCheck(tarjetasFiltradas);
      if (tarjetasFiltradas.length === 0) {
        crearMensajeError()
      }
      else {
        fnMostrarTarjetas(tarjetasFiltradas)
      }
    })


  })
  .catch(error => console.log(error))


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

function filtroPorCheck(arrayFiltradoEvent) {
  //filtrado array de checkbox//
  const checkboxesCheckeados = document.querySelectorAll("input[type=checkbox]:checked")
  console.log(checkboxesCheckeados)
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
    return arrayDeEventos
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