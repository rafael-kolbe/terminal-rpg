const { player } = require('./player');

const status = {
    poison: {
        name: 'Poison',
        duration: 20,
        effect() {
            player.hp[0] -= player.hp[1] * 0.05;
            if (player.hp[0] <= 0) {
                console.log(`\nYou have been killed by Poison.`);
                const expLost = Math.floor(player.currentExp * 0.8);
                player.currentExp -= expLost;
                console.log(`You lost ${expLost} experience.\n`);
                while (player.currentExp < expTable[player.level - 2]) {
                    action.levelDown();
                }
                finishBattle();
                player.location = 'city';
                action.restore();
            }
        },
    },
};

module.exports = {
    status,
};
