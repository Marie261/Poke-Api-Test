import { Pokemon } from './pokemon.interface';

export class PokemonHandler {
    poke1: Pokemon = {
        img: "",
        hp: 0,
        name: "",
        attack: 0,
        defense: 0,
        type: "",
    };
    poke2: Pokemon = {
        img: "",
        hp: 0,
        name: "",
        attack: 0,
        defense: 0,
        type: "",
    };


    poke1ImgElement = document.querySelector<HTMLImageElement>("pokemon-1__img");
    poke1NameElement = document.querySelector<HTMLImageElement>("pokemon-1__name");
    poke1HpElement = document.querySelector<HTMLImageElement>("pokemon-1__hp");
    poke1AttackElement = document.querySelector<HTMLImageElement>("pokemon-1__attack");
    poke1DefenseElement = document.querySelector<HTMLImageElement>("pokemon-1__defense");
    poke1TypeElement = document.querySelector<HTMLImageElement>("pokemon-1__type");

    poke2ImgElement = document.querySelector<HTMLImageElement>("pokemon-2__img");
    poke2NameElement = document.querySelector<HTMLImageElement>("pokemon-2__name");
    poke2HpElement = document.querySelector<HTMLImageElement>("pokemon-2__hp");
    poke2AttackElement = document.querySelector<HTMLImageElement>("pokemon-2_attack");
    poke2DefenseElement = document.querySelector<HTMLImageElement>("pokemon-2__defense");
    poke2TypeElement = document.querySelector<HTMLImageElement>("pokemon-2__type");

    modalText = document.querySelector<HTMLElement>("modal__text");
    catchButton = document.querySelector<HTMLButtonElement>("button__catch");
    fightButton = document.querySelector<HTMLButtonElement>("button__fight");
    modalButton = document.querySelector<HTMLButtonElement>("button__modal");

    getrandomnumber(numMin: number, numMax: number): number {
        return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
    }
    async getPokemon(pokeID: number): Promise<Pokemon> {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
        const data = await response.json();
        let pokemon: Pokemon = {
            img: data.sprites.other["official-artwork"]["front_default"],
            hp: data.stats[0]["base_stat"],
            name: data.name,
            attack: data.stats[1]["base_stat"],
            defense: data.stats[2]["base_stat"],
            type: data.types[0].type.name
        };

        return pokemon;
    }

    async createPokemons(poke1ID: number, poke2ID: number) :Promise<void> {
        const pokemon1 = await getPokemon(poke1ID);
        console.log('pokemon',pokemon1);
      
        this.poke1ImgElement= pokemon1.img;
        this.poke1NameElement= pokemon1.name;
        poke1HpElement= pokemon1.hp;
        poke1AttackElement= pokemon1.attack;
        poke1DefenseElement= pokemon1.defense;
        poke1TypeElement= pokemon1.type;

        const pokemon2 = await getPokemon(poke2ID);
        this.poke1ImgElement= pokemon2.img;
        poke2NameElement= pokemon2.name;
        poke2HpElement= pokemon2.hp;
        poke2AttackElement= pokemon2.attack;
        poke2DefenseElement= pokemon2.defense;
        poke2TypeElement= pokemon2.type;
      }

};
