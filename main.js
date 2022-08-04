//imports here
const { player, expTable } = require('./data/player');
const { vocation } = require('./data/vocations');
const { location } = require('./data/locations');
const { action } = require('./data/actions');
const { playerAbility } = require('./data/skills');

//input enable
const prompt = require('prompt-sync')({ sigint: true });

//code here
let gameState = true;
let vocationSet = false;
let arrMonster = [];
let turn = 'standby';

const nameChosen = prompt('Choose a name: ');
player.name = nameChosen.charAt(0).toUpperCase() + nameChosen.slice(1);
console.log(`\nHello adventure ${player.name}!\n`);

while (!vocationSet) {
    const vocationChosen = prompt(`Please, choose a vocation => [knight][mage][archer]: `);
    if (vocationChosen === 'knight') {
        player.vocation = vocation.knight;
        vocation.knight.startingEquipment();
        console.log('\nYou became a Knight!\n');
        player['attack'] = playerAbility.attack;
        player['brutal strike'] = playerAbility.brutalStrike;
        vocationSet = true;
    } else if (vocationChosen === 'mage') {
        player.vocation = vocation.mage;
        vocation.mage.startingEquipment();
        console.log('\nYou became a Mage!\n');
        player['attack'] = playerAbility.attack;
        player['energy strike'] = playerAbility.energyStrike;
        vocationSet = true;
    } else if (vocationChosen === 'archer') {
        player.vocation = vocation.archer;
        vocation.archer.startingEquipment();
        console.log('\nYou became an Archer!\n');
        player['attack'] = playerAbility.attack;
        player['double shot'] = playerAbility.doubleShot;
        vocationSet = true;
    } else {
        console.log('Vocation invalid.\n');
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
            console.log('\nAction invalid.\n');
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
            console.log(`\nHunting at ${player.location}...`);
            arrMonster = action.hunt(location[player.location].mob.length);
            player.mode = 'battle';
        } else {
            console.log('\nAction invalid.\n');
        }
    }

    while (player.mode === 'battle') {
        while (turn === 'standby' && player.mode === 'battle') {
            if (arrMonster.length === 0) {
                finishBattle();
            } else {
                console.log(
                    `\n[${player.name}, Level: ${player.level}, Hp: ${player.hp[0]} / ${player.hp[1]}], Mana: ${player.mana[0]} / ${player.mana[1]}]`,
                );
                console.log(`\n          vs\n`);

                for (let i = 0; i < arrMonster.length; i++) {
                    console.log(
                        `[${i + 1}. ${arrMonster[i].name}, Level: ${arrMonster[i].level}, Hp: ${
                            arrMonster[i].hp[0]
                        } / ${arrMonster[i].hp[1]}]`,
                    );
                }
                console.log(``);
                turn = 'player';
            }
        }

        while (turn === 'player' && player.mode === 'battle') {
            let playerAction = prompt('Choose an action => [attack][spell][item]: ');
            if (playerAction === 'attack') {
                let target = prompt(`Choose a target => ${possibleTargets()}: `);
                if (arrMonster[target - 1]) {
                    if (player.vocation.name === 'Mage' && player.mana[0] < player.equipment.weapon.manaCost) {
                        console.log('\nNot enough mana.\n');
                        turn = 'monster';
                    } else {
                        const damageDealt = player['attack']();
                        arrMonster[target - 1].hp[0] -= damageDealt;
                        console.log(`\n${player.name} used a basic attack!`);
                        console.log(`You dealt ${damageDealt} damage to ${arrMonster[target - 1].name}.\n`);

                        if (arrMonster[target - 1].hp[0] <= 0) {
                            arrMonster[target - 1].hp[0] = 0;
                            console.log(`You killed a ${arrMonster[target - 1].name}.`);
                            player.currentExp += arrMonster[target - 1].expGain;
                            console.log(`You gained ${arrMonster[target - 1].expGain} experience.\n`);
                            arrMonster.splice(arrMonster.indexOf(arrMonster[target - 1]), 1);
                            while (player.currentExp >= player.nextLevel) {
                                action.levelUp();
                                action.restore();
                            }
                        }
                        turn = 'monster';
                    }
                } else {
                    console.log('\nTarget invalid.\n');
                }
            } else if (playerAction === 'spell') {
                // to do
            } else if (playerAction === 'item') {
                // to do
            } else {
                console.log('\nAction invalid.\n');
            }
        }

        while (turn === 'monster' && player.mode === 'battle') {
            if (arrMonster.length > 0) {
                for (let monster of arrMonster) {
                    if (monster.hp[0] > 0) {
                        player.hp[0] -= monster.script();

                        if (player.hp[0] <= 0) {
                            console.log(`\nYou have been killed by ${monster.name}.`);
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
                    }
                }
            }
            turn = 'standby';
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

function possibleTargets() {
    let targets = '';
    for (let i = 0; i < arrMonster.length; i++) {
        if (arrMonster[i].hp[0] > 0) {
            targets += `[${i + 1}. ${arrMonster[i].name}]`;
        }
    }
    return targets;
}

function finishBattle() {
    while (arrMonster.length > 0) {
        arrMonster.pop();
    }
    player.mode = 'idle';
    turn = 'standby';
}

function exit() {
    let exitResponse = prompt('Are you sure you want to leave the game? => [yes][no]: ');
    if (exitResponse === 'yes') {
        console.log('\nThanks for playing!');
        gameState = false;
    } else if (exitResponse === 'no') {
        console.log('\nAction canceled. The game was not closed.\n');
    } else {
        console.log('\nAction invalid.\n');
    }
}
