const selectTypes = document.querySelector('#typeOptions')
const div = document.querySelector('#container')

const cargarPokemones = (selectValue) => {
    const pokemones = fetch('https://pokeapi.co/api/v2/pokemon')
    let contador = 0
    let html = ''
    let pokes = []
    pokemones
        .then((response) => response.json())
        .then((data) => {
            pokes = data.results
            pokes.forEach(pokemon => {
                let habilidades = fetch(pokemon.url)
                habilidades.then((respuesta) => respuesta.json())
                    .then((miniData) => {
                        let abilities = miniData.abilities
                        let habilidadesTexto = ''
                        abilities.forEach(item => {
                            habilidadesTexto += item.ability.name + ', '
                        });
                        contador++
                        habilidadesTexto = habilidadesTexto.slice(0, habilidadesTexto.length - 2)
                        if (miniData.types.find((item) => item.type.name == selectValue) || selectValue == undefined) {
                            html = `
                        <div class="card m-2 carta">
                            <div id="carouselExample${contador}" class="carousel slide">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="${miniData.sprites.other.dream_world.front_default}" class="d-block w-100 cardPokemon" alt="..." >
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${miniData.sprites.other.home.front_default}" class="d-block w-100 cardPokemon" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${miniData.sprites.other.showdown.front_default}" class="d-block w-100 cardPokemon" alt="...">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${contador}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                                </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${contador}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title text-success">Nombre del pokémon:</h4>
                                <h6 class="card-title text-info">${pokemon.name}</h6>
                                <h4 class="card-title text-success">Habilidades:</h4>
                                <h6 class="card-text text-info">${habilidadesTexto}</h6>
                                <a href="${pokemon.url}" class="btn btn-outline-danger">Detalles</a>
                            </div>
                        </div>`

                        div.insertAdjacentHTML('beforeend', html)
                        }

                        if (contador == pokes.length) {
                            if (div.textContent == '') {
                                div.insertAdjacentHTML('afterbegin', `
                                <div class="card mb-3 mt-5 cardError">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="./assets/img/pikachutriste.jpg" class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8 p-1">
                                            <h4 class="card-title">No hay datos sobre las especies que desea filtrar</h4>
                                        </div>
                                    </div>
                                </div>`)
                            }
                        }

                    })

            });

        })
        .catch((error) => console.log(error))
}


//logica para extraer las especies de pokemon
const types = fetch('https://pokeapi.co/api/v2/type/')
types.then((response) => response.json())
    .then((data) => {
        let tipos = data.results
        tipos.forEach(item => {
            selectTypes.insertAdjacentHTML('beforeend', `<option value:"${item.name}">${item.name}</option>`)
        })
    })


//logica para obtener el value

selectTypes.addEventListener('change', (e) => {
    if (e.target.value == 'filtrar') {
        div.replaceChildren("")
        cargarPokemones()
    } else {
        div.replaceChildren("")
        cargarPokemones(e.target.value)
    }
})


cargarPokemones()
