const { player } = require('./player');
const { location } = require('./locations');

const action = {
    status() {
        console.log(
            `[${player.name}, Level: ${player.level}, Exp: ${player.exp}, Hp: ${
                player.hp[0] + ' / ' + player.hp[1]
            }, Atk: ${player.atk}]`,
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
};

module.exports = {
    action,
};
