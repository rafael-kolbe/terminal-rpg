//imports here
const { player, expTable } = require('./data/player');
const { vocation } = require('./data/vocations');
const { location } = require('./data/locations');
const { action } = require('./data/actions');

//input enable
const prompt = require('prompt-sync')({ sigint: true });

//code here
let gameState = true;
let vocationSet = false;

console.log(expTable);

const nameChosen = prompt('Choose a name: ');
player.name = nameChosen.charAt(0).toUpperCase() + nameChosen.slice(1);
console.log(`Hello adventure ${player.name}!`);

while (!vocationSet) {
    const vocationChosen = prompt(`Please, choose a vocation => [knight][mage][archer]: `);
    if (vocationChosen === 'knight') {
        player.vocation = vocation.knight;
        vocation.knight.startingEquipment();
        console.log('You became a Knight!');
        vocationSet = true;
    } else if (vocationChosen === 'mage') {
        player.vocation = vocation.mage;
        vocation.mage.startingEquipment();
        console.log('You became a Mage!');
        vocationSet = true;
    } else if (vocationChosen === 'archer') {
        player.vocation = vocation.archer;
        vocation.archer.startingEquipment();
        console.log('You became an Archer!');
        vocationSet = true;
    } else {
        console.log('Vocation invalid');
    }
}

while (gameState) {
    while (player.location === 'city' && player.mode === 'idle' && gameState) {
        console.log(`You are currently at [${player.location}]`);
        let playerAction = prompt('Choose an action => [status][equipment][inventory][travel][restore][exit]: ');
        if (playerAction === 'status') {
            action.status();
        } else if (playerAction === 'equipment') {
            action.equipment();
        } else if (playerAction === 'inventory') {
            action.inventory();
        } else if (playerAction === 'travel') {
            action.travel(prompt(`Choose a location to travel to => ${possibleDirections()}: `));
        } else if (playerAction === 'restore') {
            action.restore();
        } else if (playerAction === 'exit') {
            exit();
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }

    while ((player.location === 'cave' || player.location === 'outskirts') && player.mode === 'idle') {
        console.log(`You are currently at [${player.location}]`);
        let playerAction = prompt('Choose an action => [status][equipment][inventory][travel][hunt]: ');
        if (playerAction === 'status') {
            action.status();
        } else if (playerAction === 'equipment') {
            action.equipment();
        } else if (playerAction === 'inventory') {
            action.inventory();
        } else if (playerAction === 'travel') {
            action.travel(prompt(`Choose a location to travel to => ${possibleDirections()}: `));
        } else if (playerAction === 'hunt') {
            objMonster = action.hunt(prompt(`Choose a target to hunt in this area => ${possibleEncounters()}: `));
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }

    while (player.mode === 'battle') {
        console.log(`[${player.name}, Level: ${player.level}, Hp: ${player.hp[0]} / ${player.hp[1]}]`);
        console.log(`[${objMonster.name}, Level: ${objMonster.level}, Hp: ${objMonster.hp[0]} / ${objMonster.hp[1]}]`);
        let playerAction = prompt(`Choose an action => [attack][run]: `);
        if (playerAction === 'attack') {
            action.attack();
        } else if (playerAction === 'run') {
            action.run();
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    }
}

function possibleDirections() {
    let directions = '';
    for (let direction of location[player.location].direction) {
        directions += '[' + direction + ']';
    }
    return directions;
}

function possibleEncounters() {
    let encounters = '';
    for (let encounter of location[player.location].mob) {
        encounters += '[' + encounter.name + ']';
    }
    return encounters;
}

function exit() {
    let exitResponse = prompt('Are you sure you want to leave the game? => [yes][no]: ');
    if (exitResponse === 'yes') {
        console.log('Thanks for playing!');
        gameState = false;
    } else if (exitResponse === 'no') {
        console.log('Action canceled. The game was not closed.');
    } else {
        console.log('Sorry, I did not understand, please type it again.');
    }
}
