const { item } = require('./items');

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
        backpack: item.backpacks.bag,
    },
    items: [],
    location: 'city',
    mode: 'idle',
    equipWeapon() {
        this.atk += this.equipment.weapon.atk;
        this.magicAtk += this.equipment.weapon.magicAtk;
        this.def += this.equipment.weapon.def;
    },
    unequipWeapon() {
        this.atk -= this.equipment.weapon.atk;
        this.magicAtk -= this.equipment.weapon.magicAtk;
        this.def -= this.equipment.weapon.def;
    },
    equipShield() {
        this.def += this.equipment.shield.def;
    },
    unequipShield() {
        this.def -= this.equipment.shield.def;
    },
    equipArmor() {
        this.armor += this.equipment.armor.arm;
    },
    unequipArmor() {
        this.armor -= this.equipment.armor.arm;
    },
};

module.exports = {
    player,
    expTable,
};
