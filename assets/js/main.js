document.addEventListener("DOMContentLoaded", function () {
    const pokemonList = document.getElementById('pokemonList')
    const loadMoreButton = document.getElementById('loadMore')
    const maxRecords = 151;
    const limit = 12;
    let offset = 0;
    
    function openModal(pokemonNumber) {
        const modal = document.getElementById("openModal");

        const modalContent = `
        <div  class="modal">
            <div class="modalContent ${pokemonNumber.type}" >
            <button id="close" type="button" onclick="closeModal()">X</button>
                <div class="modalHeader">
                <h3>${pokemonNumber.name}</h3>
                <span class="number">#${pokemonNumber.number}</span>
            </div>
            <ol class="modalTypes">
                ${pokemonNumber.types.map((type) => `<span class="modalType ${type}">${type}</span>`).join(' ')}
            </ol>   
            <img src="${pokemonNumber.photo}"
                alt="${pokemonNumber.name}">
            <div class="contentBody">
                <div class="details">
                    <button type="button" class="btDetails">Details</button>
                    <ul>
                        <li>Height: ${pokemonNumber.height}</li>
                        <li>Weight: ${pokemonNumber.weight}</li>
                        <li>Abilities: </li>
                        <li>${pokemonNumber.ability ? pokemonNumber.ability.join(', ') : 'N/A'}</li>
                    </ul>
                </div>
                <div class="stats">
                    <button type="button" class="btStats">Stats</button>
                    <ul>
                        <li>HP: ${pokemonNumber.hp}</li>
                        <li>Attack: ${pokemonNumber.attack}</li>
                        <li>Defense: ${pokemonNumber.defense}</li>
                        <li>Special Attack: ${pokemonNumber.specialAttack}</li>
                        <li>Special Defense: ${pokemonNumber.specialDefense}</li>
                        <li>Speed: ${pokemonNumber.speed}</li>
                    </ul>
                </div>    
            </div>
        </div>`;
        pokemonList.innerHTML += modalContent;
        modal.style.display = 'block';
        
        window.closeModal = function () {
            const modal = document.querySelector(".modal")
            modal.style.display = 'none';
        }
    }
    
    function loadPokemonItems(offset, limit) {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon, index) => `
       <div  id="pokemon-${index + offset}"  )"> 
        <li " id="openModal" class="pokemon ${pokemon.type} onclick="openModal(${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
        </div>    
        `).join('')
            pokemonList.innerHTML += newHtml

            pokemons.forEach((pokemon, index) => {
                const pokemonDiv = document.getElementById(`pokemon-${index + offset}`);
                pokemonDiv.addEventListener('click', () => openModal(pokemon));
            });
        });
    }

    loadPokemonItems(offset, limit)

    loadMoreButton.addEventListener('click', () => {
        offset += limit;

        const qtdRecord = offset + limit;

        if (qtdRecord >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItems(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
            return
        } else {
            loadPokemonItems(offset, limit)
        }
    })
})