import { Pokemon } from "./pokemon.interface";// Esto va dentro de la funcion general?

export class PokemonHandler {

    poke1: Pokemon = { // Es necesario poner dos????? //Debo exportar alguna clase?
        img: "",
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        type: "",
    };

    poke2: Pokemon = {
        img: "",
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        type: "",
    };

    imgpokemon1 = document.querySelector<HTMLImageElement>('.pokemon-1__img')!;
    hp_pokemon1 = document.querySelector<HTMLElement>('.pokemon-1__hp')!;
    name_pokemon1 = document.querySelector<HTMLElement>('.pokemon-1__name')!;
    attack_pokemon1 = document.querySelector<HTMLElement>('.pokemon-1__attack')!;
    defense_pokemon1 = document.querySelector<HTMLElement>('.pokemon-1__defense')!;
    type_pokemon1 = document.querySelector<HTMLElement>('.pokemon-1__type')!;

    imgpokemon2 = document.querySelector<HTMLImageElement>('.pokemon-2__img')!;
    hp_pokemon2 = document.querySelector<HTMLElement>('.pokemon-2__hp')!;
    name_pokemon2 = document.querySelector<HTMLElement>('.pokemon-2__name')!;
    attack_pokemon2 = document.querySelector<HTMLElement>('.pokemon-2__attack')!;
    defense_pokemon2 = document.querySelector<HTMLElement>('.pokemon-2__defense')!;
    type_pokemon2 = document.querySelector<HTMLElement>('.pokemon-2__type')!;

    async getpokemon(pokeID: number): Promise<Pokemon> {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
        const data = await response.json();
        const poke: Pokemon = {
            img: data.sprites.other["official-artwork"]["front_default"],
            hp: data.stats[0].base_stat,
            name: data.name,
            defense: data.stats[2].base_stat,
            attack: data.stats[1].base_stat,
            type: data.types[0].type.name
        };
        return poke;
    }

    async createPokemons(poke1ID: number, poke2ID: number): Promise<void> {
        this.poke1 = await this.getpokemon(poke1ID);
        console.log('poke1', this.poke1);
        this.poke2 = await this.getpokemon(poke2ID);

        this.imgpokemon1.src = this.poke1.img//no da call API
        this.name_pokemon1.textContent = this.poke1.name;
        this.hp_pokemon1.textContent = this.poke1.hp.toString();
        this.attack_pokemon1.textContent = this.poke1.attack.toString();
        this.defense_pokemon1.textContent = this.poke1.defense.toString();
        this.type_pokemon1.textContent = this.poke1.type;

        this.imgpokemon2.src = this.poke2.img;
        this.name_pokemon2.textContent = this.poke2.name;
        this.hp_pokemon2.textContent = this.poke2.hp.toString();
        this.attack_pokemon2.textContent = this.poke2.attack.toString();
        this.defense_pokemon2.textContent = this.poke2.defense.toString();
        this.type_pokemon2.textContent = this.poke2.type;

    }

    getRandomNumber(numMin: number, numMax: number): number {
        return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
    }

    calculateDamage(attack: number, defense: number, hp: number): [newHP: number, damage: number] {
        let damage = attack - defense;
        let newHP = hp - (damage > 0 ? damage : 0);
        newHP = newHP > 0 ? newHP : 0;
        damage = damage > 0 ? damage : 0;
        return [newHP, damage]
    };

    fightPokemons(): void {

        let battleText = "";
        const [newhp1, damage1] = this.calculateDamage(this.poke1.attack, this.poke2.defense, this.poke1.hp);
        battleText += `${this.poke1.name} ataca a ${this.poke2.name}. `;
        if (damage1 > 0) {
            battleText += `¡Logra perforar su defensa! ${this.poke2.name} recibe ${damage1}
            de daño y le quedan ${newhp1} puntos de vida.\n`;

        } else {
            battleText += `No logra superar la defensa de ${this.poke2.name}.\n`;
        }
        const [newhp2, damage2] = this.calculateDamage(this.poke2.attack, this.poke1.defense, this.poke2.hp);
        battleText += `${this.poke2.name} ataca a ${this.poke1.name}. `;
        if (damage2 > 0) {
            battleText += `¡Logra perforar su defensa! ${this.poke1.name} recibe ${damage2}
            de daño y le quedan ${newhp2} puntos de vida.\n`;
        } else {
            battleText += `No logra superar la defensa de ${this.poke1.name}.\n`;
        }


        if (damage1 > damage2) {
            battleText += `¡${this.poke1.name} es el ganador!`;
        } else if (damage2 > damage2) {
            battleText += `¡${this.poke2.name} es el ganador!`;
        } else {
            battleText += `¡Es un empate!`;
        }

        const x= document.querySelector<HTMLElement>('.modal__text')!;
        x.innerHTML= battleText;
    }
};