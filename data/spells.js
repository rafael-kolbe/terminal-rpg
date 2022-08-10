const { player } = require('./player');
const { status } = require('./status');

const spell = {
    'Brutal Strike': {
        vocation: 'Knight',
        manaCost: 15,
        effect() {
            player.mana[0] -= this.manaCost;
            return Math.floor(Math.random() * (player.atk * 1.6 - player.atk * 1.2) + player.atk * 1.2) + 15;
        },
    },
    'Energy Strike': {
        vocation: 'Mage',
        manaCost: 20,
        effect() {
            player.mana[0] -= this.manaCost;
            return (
                Math.floor(Math.random() * (player.magicAtk * 2 - player.magicAtk * 1.5) + player.magicAtk * 1.5) + 20
            );
        },
    },
    'Double Shot': {
        vocation: 'Archer',
        manaCost: 20,
        effect() {
            player.mana[0] -= this.manaCost;
            return player.attack() + player.attack() + 10;
        },
    },
};

const monsterAbility = {
    minimalDamage(dmg) {
        if (dmg < this.atk / 2) {
            return Math.floor(this.atk / 2);
        } else {
            return dmg;
        }
    },
    attack() {
        const monsterAtk = Math.floor(Math.random() * (this.atk * 1.2 - this.atk * 0.8) + this.atk * 0.8);
        const playerDef = player.def;
        const playerArmor = player.armor;
        let damage = Math.floor((monsterAtk - playerDef) * (1 - playerArmor / 100));
        damage = this.minimalDamage(damage);
        console.log(`You received ${damage} damage from it.`);
        return damage;
    },
    bite() {
        const monsterAtk = Math.floor(Math.random() * (this.atk * 1.8 - this.atk * 1.4) + this.atk * 1.4);
        const playerDef = player.def;
        const playerArmor = player.armor;
        let damage = Math.floor((monsterAtk - playerDef) * (1 - playerArmor / 100));
        damage = this.minimalDamage(damage);
        console.log(`You received ${damage} damage from it.`);
        return damage;
    },
    poisonousStrike() {
        const monsterAtk = Math.floor(Math.random() * (this.atk * 1.5 - this.atk * 1.2) + this.atk * 1.2);
        const playerDef = player.def;
        let damage = Math.floor(monsterAtk - playerDef);
        damage = this.minimalDamage(damage);
        console.log(`You received ${damage} damage from it.`);
        if (!player.status.some(element => element.name === 'Poison')) {
            player.status.push(status.poison);
        } else {
            for (let element of player.status) {
                if (element.name === 'Poison') {
                    element.duration = status.poison.duration;
                }
            }
        }
        return damage;
    },
};

module.exports = {
    spell,
    monsterAbility,
};
