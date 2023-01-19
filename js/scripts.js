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
];

for (let i = 0; i < pokemonList.length; i++) {
    let name = pokemonList[i].name;
    let height = pokemonList[i].height;

    if (pokemonList[i].height >= 1) {
        document.write(`${name} (height ${height}) - Wow, that's big!<br>`);
    } else {
        document.write(`${name} (height ${height})<br>`);
    }
}