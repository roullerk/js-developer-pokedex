const pokeApi = {
}

function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon()
  
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name
   

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const abilities = pokemonDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    
    const [ability] = abilities

    pokemon.ability = abilities

    pokemon.types = types
    pokemon.type = type
   
    pokemon.height = pokemonDetail.height / 10
    pokemon.weight = pokemonDetail.weight
  
    pokemon.hp = pokemonDetail.stats[0].base_stat
    pokemon.attack = pokemonDetail.stats[1].base_stat
    pokemon.defense = pokemonDetail.stats[2].base_stat
    pokemon.specialAttack = pokemonDetail.stats[3].base_stat
    pokemon.specialDefense = pokemonDetail.stats[4].base_stat
    pokemon.speed = pokemonDetail.stats[5].base_stat
    
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}
pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `http://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => (jsonBody.results))
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}
