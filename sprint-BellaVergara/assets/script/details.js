
const parametros = location.search

new URLSearchParams(parametros)
const objetoURL = (new URLSearchParams(parametros))
const nombreEvento = objetoURL.get("nombre");
const contenedorCard = document.getElementById("contenedorCard");

//uso de fetch //

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        const arrayEventos = respuesta;       //  contiene el array con los eventos //
        const listaDeEventos = arrayEventos.events
        const objetoEvento = listaDeEventos.find(objetoEvento => objetoEvento.name === nombreEvento);
        console.log(listaDeEventos);
        console.log(arrayEventos);
        const cuerpoString = creadCard(objetoEvento);
        reutilizarCard(contenedorCard, cuerpoString)
    })
    .catch(error => console.log(error))



function creadCard(evento) {
    return `
    <div class="card mb-3 shadow-lg" style="max-width: 80vw;">
    <div class="row g-0">
        <div class="col-md-6 d-flex justify-content-center">
            <img src= "${evento.image}" class="img-fluid object-fit-cover rounded-start w-100" alt="Avengers premiere photo">
        </div>
        <div class="col-md-6 d-md-flex ">
            <div id="detailCard" class="card-body d-flex flex-column justify-content-center gap-4">
                <h2 class="card-title fw-bold display-5">${evento.name}</h2>
                <ul class="d-flex flex-column gap-3">
                    <li>
                    <p>Date:${evento.date}  </p>
                    </li>
                    <li class="card-text">
                     <p> description: ${evento.description} </p> 
                     </li>
                     <p> Category: ${evento.category} </p>
                    <li>
                     <p>Place: ${evento.place}</p>
                    </li>
                    <li>
                     <p> Capacity:  ${evento.capacity}</p>
                    </li>
                    <li>
                    <p>Estimate: ${evento.estimate} </p>
                    </li>
                    <li>
                    <p>Price: ${evento.price} </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
`
}

function reutilizarCard(contenedorCard, string) {
    contenedorCard.innerHTML = string
}
