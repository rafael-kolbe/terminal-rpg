const monsterFactory = (name, level, expGain, hp, atk) => {
    return {
        name,
        level,
        expGain,
        hp,
        atk,
    };
};

const rat = monsterFactory('Rat', 1, 5, 20, 3);
const spider = monsterFactory('Spider', 2, 9, 16, 5);

const monster = {
    rat,
    spider,
};

module.exports = {
    monster,
};
