const { player } = require('./player');

const playerAbility = {
    attack() {
        if (this.vocation.name === 'Knight') {
            const playerAtk = Math.floor(Math.random() * (this.atk * 1.2 - this.atk * 0.8) + this.atk * 0.8);
            return playerAtk;
        } else if (this.vocation.name === 'Mage') {
            const playerAtk = Math.floor(Math.random() * (this.magicAtk * 1.8 - this.magicAtk * 1) + this.magicAtk * 1);
            if (player.equipment.weapon) {
                player.mana[0] -= player.equipment.weapon.manaCost;
            }
            return playerAtk;
        } else if (this.vocation.name === 'Archer') {
            const playerAtk = Math.floor(Math.random() * (this.atk * 2.5 - this.atk * 0) + this.atk * 0);
            return playerAtk;
        }
    },
    brutalStrike() {
        //knight
        const playerAtk = Math.floor(Math.random() * (this.atk * 1.6 - this.atk * 1.2) + this.atk * 1.2);
        player.mana[0] -= 15;
        return playerAtk;
    },
    energyStrike() {
        //mage
        const playerAtk = Math.floor(Math.random() * (this.magicAtk * 2 - this.magicAtk * 1.5) + this.magicAtk * 1.5);
        player.mana[0] -= 20;
        return playerAtk;
    },
    doubleShot() {
        //archer
        const playerAtk = this.attack() + this.attack();
        player.mana[0] -= 20;
        return playerAtk;
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
};

module.exports = {
    playerAbility,
    monsterAbility,
};
