var pokeCard          = document.querySelector('[data-poke-card]');
var pokeNombre        = document.querySelector('[data-poke-nombre]');
var pokeImg           = document.querySelector('[data-poke-img]');
var pokeImgContenedor = document.querySelector('[data-poke-img-contenedor]');
var pokeID            = document.querySelector('[data-poke-id]');
var pokeAltura        = document.querySelector('[data-poke-altura]');
var pokePeso          = document.querySelector('[data-poke-peso]');
var pokeBaseExp       = document.querySelector('[data-poke-exp]');
var pokeTipos         = document.querySelector('[data-poke-tipos]');
var pokeStats         = document.querySelector('[data-poke-stats]');
var pokeMoves         = document.querySelector('[data-poke-movs]');
var tablaTest         = document.querySelector('[tabla-test]');

const tipoColores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

 const buscarPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokeData(response))
    .catch(err => renderNoEncontrado())
}  

const renderPokeData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;
    const moves = data.moves;
    console.log(data);

    pokeNombre.textContent = data.name;
    pokeImg.setAttribute('src',sprite);
    pokeID.textContent = "Nº " + data.id;
    pokeAltura.textContent = "Peso: " + data.weight/10 + " kg";
    pokePeso.textContent = "Altura: " + data.height/10 + " m";
    pokeBaseExp.textContent = "Experiencia base: " + data.base_experience;
    renderPokeTipos(types);
    renderPokeStats(stats);
    renderPokeMovs(moves);
}

const renderPokeTipos = types => {
    pokeTipos.innerHTML = '';

    types.forEach(type => {
        const tipoElementoTexto = document.createElement("div");
        tipoElementoTexto.style.color = tipoColores[type.type.name];
        tipoElementoTexto.textContent = type.type.name;
        pokeTipos.appendChild(tipoElementoTexto);
    });
}

const renderPokeStats = stats => {
    pokeStats.innerHTML = '';
    tablaTest.innerHTML = '';
    stats.forEach(stat => {
        const statElemento = document.createElement("tr");
        const statNombreElemento = document.createElement("th");
        const statCantElemento = document.createElement("th");

        statNombreElemento.textContent = stat.stat.name;
        statCantElemento.textContent = stat.base_stat;
        /*console.log(stat.base_stat);*/
        statElemento.appendChild(statNombreElemento);
        statElemento.appendChild(statCantElemento);
        tablaTest.appendChild(statElemento);
        pokeStats.appendChild(tablaTest);
    });
}

const renderPokeMovs  = moves => {
    pokeMoves.innerHTML = "";
   /*  var tam = moves.length;
    var key = Object.keys(moves); */
    const tituloMov    = document.createElement("h1");
    const tituloCenter = document.createElement("center");
    tituloMov.textContent = "Movimientos del pokemon";
    tituloCenter.appendChild(tituloMov);
    pokeMoves.appendChild(tituloCenter);

    moves.forEach(move => {
        const movElementoTexto = document.createElement("div");
        movElementoTexto.textContent =  move.move.name ;  
        pokeMoves.appendChild(movElementoTexto);
    });
}

const renderNoEncontrado = () => {
    pokeNombre.textContent = 'No encontrado | missingNo.';
    pokeImg.setAttribute('src', './css/img/misingno.png');
    //pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}