const contenedorMayorPorcentaje = document.getElementById("td-mayor-porcentaje-de-asisencia")
const contenedorMenorPorcentaje = document.getElementById("td-menor-porcentaje-de-asisencia")
const contenedorMayorCapacidad = document.getElementById("td-mayor-capacidad")
const contenedorTablaUpcoming = document.getElementById("tbody-tabla-upcomming")
const contenedorTablaPast = document.getElementById("tbody-tabla-past")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        // aca se almacena  la lista de array con los eventos//
        const listaDeEventos = respuesta.events

        // guardo los eventos que tengan la propiedad "assistance" porque esos eventos ya ocurrieron en el pasado
        const listaDeEventosPasados = listaDeEventos.filter(evento => evento.assistance)

        // copia de eventos pasados, y le agrego una propiedad extra que se llame:"porcentajeDeAsistencia"
        const listaDeEventosConNuevoAtributoPorcentajeDeAsistencia = listaDeEventosPasados.map(evento => ({
            evento,
            porcentajeDeAsistencia: calcularPorcentajeDeAssistence(evento)
        }))
        // Aca guardo el evento que tiene mayor porcentaje de asistencia  en una Variable :eventoConMayorPorcentaje
        const eventoConMayorPorcentaje = encontrarMayorPorcentajeDeAsistencia(listaDeEventosConNuevoAtributoPorcentajeDeAsistencia)
        rellenarCampoPorcentajeTabla(contenedorMayorPorcentaje, eventoConMayorPorcentaje)

        // Aca guardo el evento que tiene menor porcentaje de asistencia  en una Variable :eventoMenorPorcentaje
        const eventoMenorPorcentaje = encontrarMenorPorcentajeDeAsistencia(listaDeEventosConNuevoAtributoPorcentajeDeAsistencia)
        rellenarCampoPorcentajeTabla(contenedorMenorPorcentaje, eventoMenorPorcentaje)

        const eventoMayorCapacidad = encontrarEventoConMayorCapacidad(listaDeEventos)
        rellenarCampoCapacidadTabla(contenedorMayorCapacidad, eventoMayorCapacidad)


        // SECCION DE LA TABLA DE EVENTOS PASADOS //
        //const categoriasPast = listaDeEventosPasados.map(evento => evento.category)
        const arrayCategoriasPast = Array.from(new Set(listaDeEventosPasados.map(evento => evento.category)))
        calcularRevenueYAsistenciaPast(arrayCategoriasPast, listaDeEventosPasados)


        // SECCION DE LA TABLA DE EVENTOS FUTUROS //

        // guardo los eventos que tengan la propiedad "estimate" porque estos son los eventos que todavia no ocurrieron
        const listaDeEventosFuturos = listaDeEventos.filter(evento => evento.estimate)

        /// tengo que obtener las categorias de listaDeEventosFuturos -> crear un array con las categorias
        // SET  crea un SET  con CATEGORIAS, pero sin CATEGORIAS repetidas.//
        // ARRAY.From  crea un array del SET//
        const arrayCategoriasUpcoming = Array.from(new Set(listaDeEventosFuturos.map(evento => evento.category)))
        calcularRevenueYAsistenciaUpcoming(arrayCategoriasUpcoming, listaDeEventosFuturos)
    })

// function que me calcula : "porcentaje  de asistencia" -> "(assistance*100)/capacity"
function calcularPorcentajeDeAssistence(evento) {
    return (evento.assistance * 100) / evento.capacity
}

//funcion que encuntreElmayorPorcentajeDeAsistencia//
function encontrarMayorPorcentajeDeAsistencia(eventos) {
    let mayorAsistencia = {
        nombre: "",
        porcentaje: 0
    }
    //utilizo un condicinal para comparar cada evento con su porcentaje y sacar el mayor porcentaje de Eventos//
    for (const evento of eventos) {

        if (evento.porcentajeDeAsistencia > mayorAsistencia.porcentaje) {
            mayorAsistencia.porcentaje = evento.porcentajeDeAsistencia
            mayorAsistencia.nombre = evento.evento.name
        }
    }
    // retorna un numero y ese numero es el MAYOR porcentaje de ASISTENCIA//
    return mayorAsistencia
}

//funcion que encuntra el MENOR porcentajeDeAsistencia//
function encontrarMenorPorcentajeDeAsistencia(eventos) {
    let menorAsistencia = {
        nombre: "",
        porcentaje: 100
    }

    //utilizo un condicinal para comparar cada evento con su porcentaje y sacar el MENOR porcentaje de Eventos//
    for (const evento of eventos) {
        if (evento.porcentajeDeAsistencia < menorAsistencia.porcentaje) {

            menorAsistencia.nombre = evento.evento.name
            menorAsistencia.porcentaje = evento.porcentajeDeAsistencia
        }
    }
    // retorna un numero y ese numero es el MENOR  porcentaje de ASISTENCIA//
    return menorAsistencia
}

//esta funcion rellana la tabla con la nueva informacion//
function rellenarCampoPorcentajeTabla(contenedor, evento) {
    contenedor.textContent = `${evento.nombre} (${evento.porcentaje}%)`
}

function encontrarEventoConMayorCapacidad(eventos) {
    //funcion que encuntra el evento con mayor capacidad//
    let mayorCapacidad = {
        nombre: "",
        capacity: 0
    }
    //recorro  con un for of cada evento y saco el de Mayor capacidad//
    for (let evento of eventos) {
        if (evento.capacity > mayorCapacidad.capacity) {
            mayorCapacidad.capacity = evento.capacity
            mayorCapacidad.nombre = evento.name

        }
    }
    return mayorCapacidad
}

function rellenarCampoCapacidadTabla(contenedor, evento) {
    contenedor.textContent = `${evento.nombre} (${evento.capacity})`
}
// Upcoming Events Statistics by category//

// crear una funcion que crea fillas con los datos de cada celda,
function estructuraTbodyTabla(contenedor, categoria, revenue, asistencia) {
    let estructura = contenedor.innerHTML

    estructura += `<tr>
    <td>${categoria}</td>
    <td>$${revenue}</td>
    <td>${asistencia}%</td>
    </tr>`

    contenedor.innerHTML = estructura
}

// crear funcion que recibe el array con categorias y el array con eventos
// 1. filtra los eventos por x categoria
// 2. de ese filtro calcula revenue y asitencia

function calcularRevenueYAsistenciaUpcoming(categorias, eventos) {
    for (const categoria of categorias) {
        const arrayDeEventosPorCategoria = eventos.filter(evento => evento.category === categoria)

        // por cada una de las categorias, obtener la sumatoria de los revenue
        let revenueTotal = 0

        // por cada una de las categorias, obtener la asistencia estimada
        let capacidadTotal = 0
        let estimadoTotal = 0

        for (const evento of arrayDeEventosPorCategoria) {
            revenueTotal += evento.price
            estimadoTotal += evento.estimate
            capacidadTotal += evento.capacity
        }

        let asistenciaTotal = (estimadoTotal * 100) / capacidadTotal
        estructuraTbodyTabla(contenedorTablaUpcoming, categoria, revenueTotal, asistenciaTotal)
    }
}


function calcularRevenueYAsistenciaPast(categorias, eventos) {
    for (const categoria of categorias) {
        const arrayDeEventosPorCategoria = eventos.filter(evento => evento.category === categoria)

        // por cada una de las categorias, obtener la sumatoria de los revenue
        let revenueTotal = 0

        // por cada una de las categorias, obtener la asistencia estimada
        let capacidadTotal = 0
        let asistenciaTotal = 0

        for (const evento of arrayDeEventosPorCategoria) {
            revenueTotal += evento.price
            asistenciaTotal += evento.assistance
            capacidadTotal += evento.capacity
        }

        let porcentajeDeAsistenciaTotal = (asistenciaTotal * 100) / capacidadTotal
        estructuraTbodyTabla(contenedorTablaPast, categoria, revenueTotal, porcentajeDeAsistenciaTotal)
    }
}