let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        return pokemonList.push(pokemon);
    }

    function addv(item) {
        if (typeof (item) !== 'object')
            return "Item is not an object!";
        else {
            function checkKeys(array) {
                if (array.includes("name") &&
                    array.includes("type") &&
                    array.includes("height")) {
                    return true;
                }
                else {
                    return false;
                }
            }

            if (checkKeys(Object.keys(item))) {
                return pokemonList.push(item);
            } else {
                return "Keys are not correct! name, type, height are required.";
            }
        }
    }

    function get(name) {
        return pokemonList.find((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());
        // or with filter() - but returns array
        // return pokemonList.filter(pokemon => pokemon.name.toLowerCase()=== name.toLowerCase());
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function loadList() {
        showLoadingMessage("Pokemons are on the way. Please wait...");
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            // make message readable for one second
            setTimeout(hideLoadingMessage, 1000);
        }).catch(function (e) {
            console.error(e);
            // make message readable for one second
            setTimeout(hideLoadingMessage, 1000);
        })
    }

    function loadDetails(item) {
        showLoadingMessage("Analizing Pokemon-Details. Please wait...");
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            // make message readable for one second
            setTimeout(hideLoadingMessage, 1000);
        }).catch(function (e) {
            console.error(e);
            // make message readable for one second
            setTimeout(hideLoadingMessage, 1000);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addv: addv,
        get: get,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();

function showLoadingMessage(text) {
    let message = document.querySelector(".loadingMessage");
    message.innerText = text;
    message.style.visibility = "visible";
}

function hideLoadingMessage() {
    let message = document.querySelector(".loadingMessage");
    message.style.visibility = "hidden";
}

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});