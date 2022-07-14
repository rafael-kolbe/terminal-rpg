//imports here
const { player, expTable } = require('./data/player');
const { location } = require('./data/locations');
const { action } = require('./data/actions');

//input enable
const prompt = require('prompt-sync')({ sigint: true });

//code here
let gameState = true;
let objMonster;

console.log(expTable);

const nameChosen = prompt('Choose a name: ');
player.name = nameChosen.charAt(0).toUpperCase() + nameChosen.slice(1);
console.log(`Hello adventure ${player.name}!`);

while (gameState) {
    while (player.location === 'city' && player.mode === 'idle' && gameState) {
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

    while (player.location === 'cave' && player.mode === 'idle' && gameState) {
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

    while (
        player.location === 'outskirts' &&
        player.mode === 'idle' &&
        gameState
    ) {
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
            objMonster = action.hunt(
                prompt(
                    `Choose a target to hunt in this area => [${
                        location[player.location].mob[0].name
                    }]: `,
                ),
            );
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }

    while (player.mode === 'battle' && gameState) {
        console.log(
            `[${player.name}, Level: ${player.level}, Hp: ${player.hp[0]} / ${player.hp[1]}]`,
        );
        console.log(
            `[${objMonster.name}, Level: ${objMonster.level}, Hp: ${objMonster.hp[0]} / ${objMonster.hp[1]}]`,
        );
        let playerAction = prompt(`Choose an action => [attack][run]: `);
        if (playerAction === 'attack') {
            attack();
        } else if (playerAction === 'run') {
            run();
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }
}

function attack() {
    objMonster.hp[0] -= player.atk;
    console.log(`You dealt ${player.atk} damage to ${objMonster.name}.`);
    if (objMonster.hp[0] > 0) {
        player.hp[0] -= objMonster.atk;
        console.log(
            `You received ${objMonster.atk} damage from ${objMonster.name}.`,
        );
        if (player.hp[0] <= 0) {
            console.log(`You have been killed by ${objMonster.name}.`);
            console.log(`Game Over.`);
            gameState = false;
        }
    } else {
        console.log(`You killed a ${objMonster.name}.`);
        console.log(`You gained ${objMonster.expGain} experience.`);
        player.currentExp += objMonster.expGain;
        while (player.currentExp >= player.nextLevel) {
            levelUp();
        }
        objMonster.reset();
        player.mode = 'idle';
    }
}

function run() {
    console.log('You ran from the battle.');
    objMonster.reset();
    player.mode = 'idle';
}

function levelUp() {
    player.level += 1;
    player.nextLevel = expTable[player.level - 1];
    player.hp[1] += 5;
    player.hp[0] += 5;
    player.atk += 3;
    console.log(
        `You advanced from level ${player.level - 1} to level ${player.level}!`,
    );
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
    } else {
        console.log('Sorry, I did not understand, please type it again.');
    }
}
