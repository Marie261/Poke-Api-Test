var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PokemonHandler {
    constructor() {
        this.poke1 = {
            img: "",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            type: "",
        };
        this.poke2 = {
            img: "",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            type: "",
        };
        this.imgpokemon1 = document.querySelector('.pokemon-1__img');
        this.hp_pokemon1 = document.querySelector('.pokemon-1__hp');
        this.name_pokemon1 = document.querySelector('.pokemon-1__name');
        this.attack_pokemon1 = document.querySelector('.pokemon-1__attack');
        this.defense_pokemon1 = document.querySelector('.pokemon-1__defense');
        this.type_pokemon1 = document.querySelector('.pokemon-1__type');
        this.imgpokemon2 = document.querySelector('.pokemon-2__img');
        this.hp_pokemon2 = document.querySelector('.pokemon-2__hp');
        this.name_pokemon2 = document.querySelector('.pokemon-2__name');
        this.attack_pokemon2 = document.querySelector('.pokemon-2__attack');
        this.defense_pokemon2 = document.querySelector('.pokemon-2__defense');
        this.type_pokemon2 = document.querySelector('.pokemon-2__type');
    }
    getpokemon(pokeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
            const data = yield response.json();
            const poke = {
                img: data.sprites.other["official-artwork"]["front_default"],
                hp: data.stats[0].base_stat,
                name: data.name,
                defense: data.stats[2].base_stat,
                attack: data.stats[1].base_stat,
                type: data.types[0].type.name
            };
            return poke;
        });
    }
    createPokemons(poke1ID, poke2ID) {
        return __awaiter(this, void 0, void 0, function* () {
            this.poke1 = yield this.getpokemon(poke1ID);
            console.log('poke1', this.poke1);
            this.poke2 = yield this.getpokemon(poke2ID);
            this.imgpokemon1.src = this.poke1.img; //no da call API
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
        });
    }
    getRandomNumber(numMin, numMax) {
        return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
    }
    calculateDamage(attack, defense, hp) {
        let damage = attack - defense;
        let newHP = hp - (damage > 0 ? damage : 0);
        newHP = newHP > 0 ? newHP : 0;
        damage = damage > 0 ? damage : 0;
        return [newHP, damage];
    }
    ;
    fightPokemons() {
        let battleText = "";
        const [newhp1, damage1] = this.calculateDamage(this.poke1.attack, this.poke2.defense, this.poke1.hp);
        battleText += `${this.poke1.name} ataca a ${this.poke2.name}. `;
        if (damage1 > 0) {
            battleText += `¡Logra perforar su defensa! ${this.poke2.name} recibe ${damage1}
            de daño y le quedan ${newhp1} puntos de vida.\n`;
        }
        else {
            battleText += `No logra superar la defensa de ${this.poke2.name}.\n`;
        }
        const [newhp2, damage2] = this.calculateDamage(this.poke2.attack, this.poke1.defense, this.poke2.hp);
        battleText += `${this.poke2.name} ataca a ${this.poke1.name}. `;
        if (damage2 > 0) {
            battleText += `¡Logra perforar su defensa! ${this.poke1.name} recibe ${damage2}
            de daño y le quedan ${newhp2} puntos de vida.\n`;
        }
        else {
            battleText += `No logra superar la defensa de ${this.poke1.name}.\n`;
        }
        if (damage1 > damage2) {
            battleText += `¡${this.poke1.name} es el ganador!`;
        }
        else if (damage2 > damage2) {
            battleText += `¡${this.poke2.name} es el ganador!`;
        }
        else {
            battleText += `¡Es un empate!`;
        }
        const x = document.querySelector('.modal__text');
        x.innerHTML = battleText;
    }
}
;
