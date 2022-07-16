const { item } = require('./items');

const expTable = [];
for (let i = 1; i < 100; i++) {
    expTable.push((100 / 2) * (i + 2) * (i - 1) + 100);
}

let player = {
    name: '',
    level: 1,
    currentExp: 0,
    nextLevel: expTable[0],
    hp: [30, 30],
    mana: [0, 0],
    atk: 8,
    magicAtk: 0,
    armor: 0,
    def: 0,
    status: [],
    gold: 0,
    equipment: {
        weapon: item.weapons.swords.knife,
        armor: '',
        shield: '',
        necklace: '',
        ring: '',
        backpack: item.backpacks.bag,
    },
    location: 'city',
    mode: 'idle',
};

module.exports = {
    player,
    expTable,
};
