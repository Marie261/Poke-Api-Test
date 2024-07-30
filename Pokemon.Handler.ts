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


    poke1ImgElement = document.querySelector<HTMLImageElement>("pokemon-1__img")!;
    poke1NameElement = document.querySelector<HTMLElement>("pokemon-1__name")!; 
    poke1HpElement = document.querySelector<HTMLElement>("pokemon-1__hp")!;
    poke1AttackElement = document.querySelector<HTMLElement>("pokemon-1__attack")!;
    poke1DefenseElement = document.querySelector<HTMLElement>("pokemon-1__defense")!;
    poke1TypeElement = document.querySelector<HTMLElement>("pokemon-1__type")!;

    poke2ImgElement = document.querySelector<HTMLImageElement>("pokemon-2__img")!;
    poke2NameElement = document.querySelector<HTMLElement>("pokemon-2__name")!;
    poke2HpElement = document.querySelector<HTMLElement>("pokemon-2__hp")!;
    poke2AttackElement = document.querySelector<HTMLElement>("pokemon-2_attack")!;
    poke2DefenseElement = document.querySelector<HTMLElement>("pokemon-2__defense")!;
    poke2TypeElement = document.querySelector<HTMLElement>("pokemon-2__type")!;

    modalText = document.querySelector<HTMLElement>("modal__text")!;
    catchButton = document.querySelector<HTMLButtonElement>("button__catch")!;
    fightButton = document.querySelector<HTMLButtonElement>("button__fight")!;
    modalButton = document.querySelector<HTMLButtonElement>("button__modal")!;

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

    async createPokemons(poke1ID: number, poke2ID: number): Promise<void> {
        this.poke1 = await getPokemon(poke1ID);
        this.getPokemon(poke1ID)
        this.poke1ImgElement.src = this.poke1.img;
        this.poke1NameElement.textContent = this.poke1.name;
        this.poke1HpElement.textContent = this.poke1.hp.toString();
        this.poke1AttackElement.textContent = this.poke1.attack.toString();
        this.poke1DefenseElement.textContent = this.poke1.defense.toString();
        this.poke1TypeElement.textContent = this.poke1.type;

        this.poke2 = await getPokemon(poke2ID);
        this.getPokemon(poke2ID);
        this.poke2ImgElement.src = this.poke2.img;
        this.poke2NameElement.textContent = this.poke2.name;
        this.poke2HpElement.textContent = this.poke2.hp.toString();
        this.poke2AttackElement.textContent = this.poke2.attack.toString();
        this.poke2DefenseElement.textContent = this.poke2.defense.toString();
        this.poke2TypeElement.textContent = this.poke2.type;
    };

    fightPokemons = () : void =>  {

        this.poke1: Pokemon = {
            name: poke1NameElement.innerHTML,
            hp: parseInt(poke1HpElement.innerHTML),
            attack: parseInt(poke1AttackElement.innerHTML),
            defense: parseInt(poke1DefenseElement.innerHTML),
        };
        const poke2: Pokemon = {
            name: poke2NameElement.innerHTML,
            hp: parseInt(this.poke2HpElement.innerHTML),
            attack: parseInt(poke2AttackElement.innerHTML),
            defense: parseInt(poke2DefenseElement.innerHTML),
        };
    };

    calculateDamage = (attacker: number, defender:number, hp:number): [number, number] => {
        const damage: number = defender - attacker;
        const newHP = damage < 0 ? hp + damage : hp;
        return  [newHP, damage];
    };

    let battleText = "";
    const result1 = calculateDamage(pokemon1, pokemon2);
    battleText += `${pokemon1.name} ataca a ${pokemon2.name}. `;
    if (result1.damage > 0) {
      battleText += `¡Logra perforar su defensa! ${pokemon2.name} recibe ${result1.damage} de daño y le quedan ${result1.newHP} puntos de vida.\n`;
    } else {
      battleText += `No logra superar la defensa de ${pokemon2.name}.\n`;
    }
    const result2 = calculateDamage(pokemon2, pokemon1);
    battleText += `${pokemon2.name} ataca a ${pokemon1.name}. `;
    if (result2.damage > 0) {
      battleText += `¡Logra perforar su defensa! ${pokemon1.name} recibe ${result2.damage} de daño y le quedan ${result2.newHP} puntos de vida.\n`;
    } else {
      battleText += `No logra superar la defensa de ${pokemon1.name}.\n`;
    }

};
