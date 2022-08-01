const { monsterScript } = require('./scripts');

function monsterFactory(name, level, expGain, hp, atk, script) {
    return {
        name,
        level,
        expGain,
        hp,
        atk,
        script,
    };
}

const monster = {
    rat: ['rat', 1, 100, [20, 20], 20, monsterScript.rat],
    spider: ['spider', 2, 3000, [26, 26], 30, monsterScript.spider],
};

const listOfMonstersAndTheirAbilities = {
    rat: ['attack'],
    spider: ['attack', 'bite'],
};

module.exports = {
    monster,
    monsterFactory,
    listOfMonstersAndTheirAbilities,
};
