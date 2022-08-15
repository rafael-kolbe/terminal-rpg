const { database } = require('./items');

const expTable = [];
for (let i = 1; i <= 100; i++) {
    expTable.push((100 / 2) * (i + 2) * (i - 1) + 100);
}

let player = {
    name: '',
    level: 1,
    vocation: '',
    currentExp: 0,
    nextLevel: expTable[0],
    hp: [150, 150],
    mana: [40, 40],
    atk: 5,
    magicAtk: 0,
    armor: 0,
    def: 0,
    status: [],
    gold: 0,
    equipment: {
        weapon: '',
        shield: '',
        armor: '',
        necklace: '',
        ring: '',
        backpack: database.backpacks.bag,
    },
    items: [],
    spells: [],
    location: 'city',
    mode: 'idle',
    equipWeapon(obj) {
        this.equipment.weapon = obj;
        this.atk += this.equipment.weapon.atk;
        this.magicAtk += this.equipment.weapon.magicAtk;
        this.def += this.equipment.weapon.def;
    },
    unequipWeapon() {
        this.atk -= this.equipment.weapon.atk;
        this.magicAtk -= this.equipment.weapon.magicAtk;
        this.def -= this.equipment.weapon.def;
        this.equipment.weapon = '';
    },
    equipShield(obj) {
        this.equipment.shield = obj;
        this.def += this.equipment.shield.def;
    },
    unequipShield() {
        this.def -= this.equipment.shield.def;
        this.equipment.shield = '';
    },
    equipArmor(obj) {
        this.equipment.armor = obj;
        this.armor += this.equipment.armor.arm;
    },
    unequipArmor() {
        this.armor -= this.equipment.armor.arm;
        this.equipment.armor = '';
    },
    attack() {
        if (this.vocation.name === 'Knight') {
            return Math.floor(Math.random() * (this.atk * 1.2 - this.atk * 0.8) + this.atk * 0.8);
        } else if (this.vocation.name === 'Mage') {
            if (this.equipment.weapon) {
                this.mana[0] -= this.equipment.weapon.manaCost;
                return Math.floor(
                    Math.random() * (this.equipment.weapon.magicAtk + 7 - this.equipment.weapon.magicAtk) +
                        this.equipment.weapon.magicAtk,
                );
            }
            return Math.floor(Math.random() * (this.atk * 1 - this.atk * 0.5) + this.atk * 0.5);
        } else if (this.vocation.name === 'Archer') {
            return Math.floor(Math.random() * (this.atk * 2.5 - this.atk * 0) + this.atk * 0);
        }
    },
};

module.exports = {
    player,
    expTable,
};
