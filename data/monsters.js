const { monsterScript } = require('./scripts');
const { monsterAbility } = require('./skills');

const monster = {
    Rat: class {
        constructor() {
            this.name = 'Rat';
            this.level = 1;
            this.expGain = 100;
            this.hp = [20, 20];
            this.atk = 10;
            this.script = monsterScript.rat;
        }
        attack = monsterAbility.attack;
        minimalDamage = monsterAbility.minimalDamage;
    },
    Spider: class {
        constructor() {
            this.name = 'Spider';
            this.level = 2;
            this.expGain = 300;
            this.hp = [30, 30];
            this.atk = 15;
            this.script = monsterScript.spider;
        }
        attack = monsterAbility.attack;
        bite = monsterAbility.bite;
        minimalDamage = monsterAbility.minimalDamage;
    },
};

module.exports = {
    monster,
};
