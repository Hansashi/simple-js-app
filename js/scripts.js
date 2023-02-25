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
        $("li").addClass("group-list-item");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        $("#pokemon-button").addClass("btn-success");
        $("#pokemon-button").prop("data-target, #exampleModal");
        $("#pokemon-button").prop("data-toggle, modal");
        // button.addEventListener('click', function () {
        //     showDetails(pokemon);
        // });

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            // showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.spriteUrl);
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
            item.spriteUrl = details.sprites.front_default;
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

// modal
let modalContainer = document.querySelector('#modal-container');

function showModal(title, text, spriteUrl) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close-button');
    closeButtonElement.innerText = 'x';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let sprite = document.createElement('img');
    sprite.classList.add('pokemon-sprite');
    sprite.src = spriteUrl;
    sprite.alt = `Picture of ${title}`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(sprite);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

// function hideModal() {
//     let modalContainer = document.querySelector('#modal-container');
//     modalContainer.classList.remove('is-visible');
// }

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

// modalContainer.addEventListener('click', (e) => {
//     // Since this is also triggered when clicking INSIDE the modal container,
//     // We only want to close if the user clicks directly on the overlay
//     let target = e.target;
//     if (target === modalContainer) {
//         hideModal();
//     }
// });