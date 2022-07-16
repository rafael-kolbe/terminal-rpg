const { player } = require('./player');
const { location } = require('./locations');
const { monster } = require('./monsters');

const action = {
    status() {
        console.log(`[${player.name}, Level: ${player.level}]`);
        console.log(`[Exp: ${player.currentExp + ' / ' + player.nextLevel}]`);
        console.log(`[Hp: ${player.hp[0] + ' / ' + player.hp[1]}]`);
        console.log(`[Atk: ${player.atk}, Magic Atk: ${player.magicAtk}]`);
        console.log(`[Armor: ${player.armor}, Defense: ${player.def}]`);
        console.log(`[Status: ${player.status}]`);
    },
    equipment() {
        function isTwoHanded() {
            if (player.equipment.weapon.twoHanded) {
                console.log('Two-Handed Weapon');
            } else {
                console.log('One-Handed Weapon');
            }
        }
        console.log(
            `[Weapon: ${player.equipment.weapon.name}, Atk: ${
                player.equipment.weapon.atk
            }, Def: ${player.equipment.weapon.def}, ${isTwoHanded()}]`,
        );
    },
    travel(newLocation) {
        let validation =
            location[player.location].direction.includes(newLocation);
        if (validation) {
            player.location = newLocation;
            console.log(`Traveling to ${player.location}...`);
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    },
    restore() {
        player.hp[0] = player.hp[1];
        console.log('You have been restored to full hp.');
    },
    hunt(enemyChosen) {
        let enemy = enemyChosen.toLowerCase();
        let validation = location[player.location].mob.includes(monster[enemy]);
        if (validation) {
            console.log(
                `Hunting ${enemy.charAt(0).toUpperCase() + enemy.slice(1)}...`,
            );
            let objMonster = {};
            Object.assign(objMonster, monster[enemy]);
            player.mode = 'battle';
            return objMonster;
        } else {
            console.log(`${enemyChosen} is not a valid target.`);
        }
    },
};

module.exports = {
    action,
};
