const eventos = data.events;
const parametros = location.search

new URLSearchParams(parametros)
const objetoURL = (new URLSearchParams(parametros))
const nombreEventos = objetoURL.get("nombre");


const objetoEvento = eventos.find(objetoEvento => objetoEvento.name === nombreEventos);

const contenedorCard = document.getElementById("contenedorCard");

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
                    <li>${evento.date}</li>
                    <li class="card-text">${evento.description}
                    </li>
                    </li>
                    ${evento.category}
                    <li>
                        ${evento.place}
                    </li>
                    <li>
                        ${evento.capacity}
                    </li>
                    <li>
                    ${evento.estimate}
                    </li>
                    <li>
                        ${evento.price}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
`
}

const cuerpoString = creadCard(objetoEvento);

function reutilizarCard(contenedorCard, string) {
    contenedorCard.innerHTML = string
}
reutilizarCard(contenedorCard, cuerpoString)
