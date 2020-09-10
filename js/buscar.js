let title = document.getElementById('title');
let span = document.getElementById('span');
let results = document.getElementById('results');

let cont = document.getElementById('cont-list');
let input = document.getElementById('search');
let ulItems = document.getElementById('itemSug');
let divInput = document.getElementsByClassName('input')[0];

// autocompletar //

input.addEventListener('keyup', (element) => {
    if (element.keyCode == 13) {
        search(element.target.value);
        return;
    }
    console.log(element.target.value);
    if (element.target.value === '') {
        divInput.classList.remove('active');
        input.classList.remove('active');
        let list = document.getElementsByName('items');
        console.log(list);
        ulItems.innerHTML = '';
    } else {
        input.classList.add('active');
        cont.classList.add('active');
        divInput.classList.add('active');
        giphy.getSuggest(element.target.value).then((suggest) => {
        suggest.data.forEach(e => {
            ulItems.insertAdjacentHTML('beforeend',
            `<li name="contLi" class="items">
                <a href="javascript:search('${e.name}')" class="light"><img class="light" src='./assets/icons/icon-search.svg' alt="Lupa" />${e.name}</a>
            </li>`);
            });
        });
    }
});

let result1 = 12;

// Busqueda de Gif //

let search = (str) => {
    ulItems.classList.remove('again');
    ulItems.classList.add('after');
    input.classList.remove('active');

    title.innerText = str;

    if (str === '') {
        console.log('Empty');
    } else {
        giphy.getGifsSearch(str).then((gifsData) => {
            results.innerHTML = '';
            if (gifsData.length == 0) {
                console.log('Sin Resultados');
                title.style.display = 'block';
                span.style.display = 'block';
                notResults();
            } else {
                gifsData.forEach(gifData => {
                    let contenedor = document.getElementById("results");
                    contenedor.classList.add('results');
                    let gif = new Gif(gifData.title, gifData.username, gifData.images.preview_gif.url, gifData.images.downsized_medium.url, gifData.id);
                    showInit(gif, contenedor);
                    title.style.display = 'block';
                    span.style.display = 'block';
                    see.style.display = 'block';

                    input.addEventListener('keypress', () => {
                        ulItems.classList.add('again');
                    })
                });
            }
        });
    }
}

let notResults = () => {
    document.getElementById('results').innerHTML = '';
    let out = document.getElementById('results');
    out.classList.remove('results');

    out.insertAdjacentHTML('beforeend',
        `<div id="not" class="not">
            <img class="notResults" src="./assets/icons/icon-busqueda-sin-resultado.svg" alt="Not Results">
            <p id="notResults">Intenta con otra palabra</p>
        </div>`);
    see.style.display = 'none';
}

function close () {
    let fullOver = document.getElementById('fOver');
    fullOver.style.display = 'none';
}

let see = document.getElementById('see');

see.addEventListener('click', () => {
    contVmas(title.innerText);
});

function contVmas (text) {
    result1 += 12;
	search(text);
}

function clear () {
    divInput.classList.remove('active');
    input.classList.remove('active');
    let busc = document.getElementById('search');
    busc.value = '';
    busc.focus();
    ulItems.innerHTML = '';
}