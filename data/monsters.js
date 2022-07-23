const monsterFactory = (name, level, expGain, hp, atk) => {
    return {
        name,
        level,
        expGain,
        hp,
        atk,
        reset() {
            this.hp[0] = this.hp[1];
        },
    };
};

const rat = monsterFactory('Rat', 1, 100, [20, 20], 3);
const spider = monsterFactory('Spider', 2, 3000, [26, 26], 5);

const monster = {
    rat,
    spider,
};

module.exports = {
    monster,
};
