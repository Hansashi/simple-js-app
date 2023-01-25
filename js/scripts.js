let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasur',
            type: ['grass', 'poison'],
            height: 0.7
        },
        {
            name: 'Wartortle',
            type: ['water'],
            height: 1
        },
        {
            name: 'Charmander',
            type: ['fire'],
            height: 0.6
        }
    ]
    function getAll() {
        return pokemonList;
    }

    function add(item) {
        return pokemonList.push({ name: item });
    }

    return {
        getAll: getAll,
        add: add
    }
})();

pokemonList.forEach(pokemon => {
    if (pokemon.height >= 1) {
        document.write(`${pokemon.name} (height ${pokemon.height}) - Wow, that's big!<br>`);
    } else {
        document.write(`${pokemon.name} (height ${pokemon.height})<br>`);
    }
});