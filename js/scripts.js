let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        return pokemonList.push(pokemon);
    }

    function addv(item) {
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
        
        if (typeof (item) !== "object")
            return "Item is not an object!";
        else {

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
        listItem.classList.add("group-list-item");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        button.classList.add("btn-success");
        button.setAttribute("data-target", "#pokemon-modal");
        button.setAttribute("data-toggle", "modal");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener("click", () => {
            loadDetails(pokemon).then(function () {
                showDetails(pokemon);
            })
        });
    }

    function showDetails(pokemon) {
        let title = document.getElementById("pokemon-modal-label");
        title.innerText = pokemon.name;
        let pokemonModal = document.querySelector(".modal-body");
        pokemonModal.innerHTML = "";
        let height = document.createElement("h3");
        height.innerText = `Height: ${pokemon.height}`;
        let image = document.createElement("img");
        image.src = pokemon.imageUrl;
        pokemonModal.appendChild(height);
        pokemonModal.appendChild(image);
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
        }).catch(function () {
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
            item.spriteUrl = details.sprites.front_default;
            // make message readable for one second
            setTimeout(hideLoadingMessage, 1000);
        }).catch(function () {
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

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// loading message
function showLoadingMessage(text) {
    let message = document.querySelector(".loadingMessage");
    message.innerText = text;
    message.style.visibility = "visible";
}

function hideLoadingMessage() {
    let message = document.querySelector(".loadingMessage");
    message.style.visibility = "hidden";
}