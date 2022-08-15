const { monsterScript } = require('./scripts');
const { monsterAbility } = require('./spells');
const { database } = require('./items');

const monster = {
    Rat: class {
        constructor() {
            this.name = 'Rat';
            this.level = 1;
            this.expGain = 10;
            this.hp = [20, 20];
            this.atk = 10;
            this.gold = Math.floor(Math.random() * (5 - 2) + 2);
            this.drop = [
                {
                    item: database.miscellaneous.creatures.ratFlesh,
                    dropRate: 50,
                    qty: 1,
                },
                {
                    item: database.usable.foods.cheese,
                    dropRate: 20,
                    qty: 1,
                },
            ];
            this.script = monsterScript.rat;
        }
        attack = monsterAbility.attack;
        minimalDamage = monsterAbility.minimalDamage;
    },
    Spider: class {
        constructor() {
            this.name = 'Spider';
            this.level = 2;
            this.expGain = 15;
            this.hp = [30, 30];
            this.atk = 15;
            this.gold = Math.floor(Math.random() * (8 - 3) + 3);
            this.drop = [
                {
                    item: database.miscellaneous.creatures.spiderFangs,
                    dropRate: 70,
                    qty: 1,
                },
            ];
            this.script = monsterScript.spider;
        }
        attack = monsterAbility.attack;
        bite = monsterAbility.bite;
        minimalDamage = monsterAbility.minimalDamage;
    },
    MutatedRat: class {
        constructor() {
            this.name = 'Mutated Rat';
            this.level = 5;
            this.expGain = 1000;
            this.hp = [200, 200];
            this.atk = 25;
            this.gold = Math.floor(Math.random() * (25 - 15) + 15);
            this.drop = [
                {
                    item: database.miscellaneous.creatures.ratFlesh,
                    dropRate: 90,
                    qty: 1,
                },
                {
                    item: database.miscellaneous.quests.purpleRock,
                    dropRate: 10,
                    qty: 1,
                },
            ];
            this.script = monsterScript.mutatedRat;
        }
        attack = monsterAbility.attack;
        poisonousStrike = monsterAbility.poisonousStrike;
        minimalDamage = monsterAbility.minimalDamage;
    },
};

module.exports = {
    monster,
};
