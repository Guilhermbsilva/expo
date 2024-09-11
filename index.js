const url = "https://potterapi-fedeperin.vercel.app/pt/characters";

const loadingElement = document.querySelector("#loading");
const personagensContainer = document.querySelector("#personagens-container");
const nextButton = document.querySelector("#next");
const slaButton = document.getElementById('sla');

let personagens = [];
let currentIndex = -1;

async function getAllpersonagens() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        personagens = shuffleArray(data);
        displayPersonagem(currentIndex);
    } catch (error) {
        console.error('Erro ao obter personagens:', error);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayPersonagem(index) {
    if (index < 0 || index >= personagens.length) {
        return;
    }

    personagensContainer.innerHTML = "";

    const personagem = personagens[index];
    
    const div = document.createElement("div");
    const fullname = document.createElement("h1");
    const nickname = document.createElement("h2");
    const birthdate = document.createElement("h3");
    const hogwartsHouse = document.createElement("h4");
    const interpretedBy = document.createElement("h5");
    const children = document.createElement("h6");
    const image = document.createElement("img");

    fullname.innerText = personagem.fullName;
    nickname.innerText = personagem.nickname;
    birthdate.innerText = personagem.birthdate;
    hogwartsHouse.innerText = personagem.hogwartsHouse;
    interpretedBy.innerText = personagem.interpretedBy;
    children.innerText = personagem.children;
    
    image.src = personagem.image;
    image.alt = personagem.fullName;

    div.appendChild(fullname);
    div.appendChild(nickname);
    div.appendChild(birthdate);
    div.appendChild(hogwartsHouse);
    div.appendChild(interpretedBy);
    div.appendChild(children);
    div.appendChild(image);

    personagensContainer.appendChild(div);
}

function showNextPersonagem() {
    if (currentIndex < personagens.length - 1) {
        currentIndex++;
        displayPersonagem(currentIndex);
        personagensContainer.style.display = 'block';
    } else {
        currentIndex = -1;
        personagens = shuffleArray(personagens);
        showNextPersonagem();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    slaButton.classList.add('hidden');
});

nextButton.addEventListener("click", function() {
    showNextPersonagem();
    nextButton.classList.add('hidden'); 
    slaButton.classList.remove('hidden'); 
});

slaButton.addEventListener("click", function() {
    personagensContainer.style.display = 'none'; 
    slaButton.classList.add('hidden'); 
    nextButton.classList.remove('hidden'); 
});

getAllpersonagens();

const btn = document.getElementById('chk');

btn.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});
