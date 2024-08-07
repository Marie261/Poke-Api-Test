import { PokemonHandler } from "./Pokemon.Handler.js";
const pokeHandler = new PokemonHandler();
const catchButton = document.querySelector('.button__catch');
const poke1ID = pokeHandler.getRandomNumber(1, 900);
const poke2ID = pokeHandler.getRandomNumber(1, 900);
pokeHandler.createPokemons(poke1ID, poke2ID);
catchButton.addEventListener('click', () => {
    window.location.reload();
});
// Botón para iniciar la batalla
const fightButton = document.querySelector('.button__fight');
fightButton.addEventListener('click', () => {
    pokeHandler.fightPokemons();
    const x = document.querySelector('.modal__text');
    x.style.display = 'block';
});
// Botón para cerrar el modal después de la batalla
const modalCloseButton = document.querySelector('.button__modal');
modalCloseButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    if (modal instanceof HTMLElement) {
        modal.style.display = 'none';
    }
});
