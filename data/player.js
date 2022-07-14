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
    atk: 8,
    location: 'city',
    mode: 'idle',
};

module.exports = {
    player,
    expTable,
};
