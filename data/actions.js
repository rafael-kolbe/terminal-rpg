const { player } = require('./player');
const { location } = require('./locations');
const { monster } = require('./monsters');

const action = {
    status() {
        console.log(
            `[${player.name}, Level: ${player.level}, Exp: ${
                player.currentExp + ' / ' + player.nextLevel
            }, Hp: ${player.hp[0] + ' / ' + player.hp[1]}, Atk: ${player.atk}]`,
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
