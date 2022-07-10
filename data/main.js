//imports here
const { player } = require('./player');
const { monster } = require('./monsters');
const { location } = require('./locations');
const { action } = require('./actions');

//input enable
const prompt = require('prompt-sync')({ sigint: true });

//code here
let gameState = true;
const nameChosen = prompt('Choose a name: ');
player.name = nameChosen;
console.log(`Hello adventure ${player.name}!`);

while (gameState) {
    while (player.location === 'city' && gameState) {
        console.log(`You are currently at [${player.location}]`);
        let playerAction = prompt(
            'Choose an action => [status][travel][restore][exit]: ',
        );
        if (playerAction === 'status') {
            action.status();
        } else if (playerAction === 'travel') {
            action.travel(
                prompt(
                    `Choose a location to travel to => [${
                        location[player.location].direction[0]
                    }][${location[player.location].direction[1]}]: `,
                ),
            );
        } else if (playerAction === 'restore') {
            action.restore();
        } else if (playerAction === 'exit') {
            exit();
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }

    while (player.location === 'cave' && gameState) {
        console.log(`You are currently at [${player.location}]`);
        let playerAction = prompt(
            'Choose an action => [status][travel][hunt]: ',
        );
        if (playerAction === 'status') {
            action.status();
        } else if (playerAction === 'travel') {
            action.travel(
                prompt(
                    `Choose a location to travel to => [${
                        location[player.location].direction[0]
                    }]: `,
                ),
            );
        } else if (playerAction === 'hunt') {
            //to be added
            console.log('to be added.');
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }

    while (player.location === 'outskirts' && gameState) {
        console.log(`You are currently at [${player.location}]`);
        let playerAction = prompt(
            'Choose an action => [status][travel][hunt]: ',
        );
        if (playerAction === 'status') {
            action.status();
        } else if (playerAction === 'travel') {
            action.travel(
                prompt(
                    `Choose a location to travel to => [${
                        location[player.location].direction[0]
                    }]: `,
                ),
            );
        } else if (playerAction === 'hunt') {
            //to be added
            console.log('to be added.');
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }
}

function exit() {
    let exitResponse = prompt(
        'Are you sure you want to leave the game? => [yes][no]: ',
    );
    if (exitResponse === 'yes') {
        console.log('Thanks for playing!');
        gameState = false;
    } else if (exitResponse === 'no') {
        console.log('The game was not closed.');
    }
}
