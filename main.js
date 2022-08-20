//imports here
const { player, expTable } = require('./data/player');
const { vocation } = require('./data/vocations');
const { location } = require('./data/locations');
const { action } = require('./data/actions');
const { spell } = require('./data/spells');
const { database } = require('./data/items');

//input enable
const prompt = require('prompt-sync')({ sigint: true });

//fs enable
const fs = require('fs');

//code here
let gameState = true;
let login = false;
let vocationSet = false;
let arrMonster = [];
let turn = 'standby';

gameplay();
async function gameplay() {
    while (!login) {
        const playerChoice = prompt('Do you want to load a saved file? => [yes][no]: ');
        if (playerChoice === 'yes') {
            //load files
            //checkDir(possibleFiles);
        } else if (playerChoice === 'no') {
            const nameChosen = prompt('Choose a name: ');
            player.name = nameChosen.charAt(0).toUpperCase() + nameChosen.slice(1);
            console.log(`\nHello adventure ${player.name}!\n`);
            await delay();

            while (!vocationSet) {
                const vocationChosen = prompt(`Please, choose a vocation => [knight][mage][archer]: `);
                if (vocationChosen === 'knight') {
                    player.vocation = vocation.knight;
                    vocation.knight.startingEquipment();
                    console.log('\nYou became a Knight!\n');
                    player.spells.push('Brutal Strike');
                    await delay();
                    vocationSet = true;
                } else if (vocationChosen === 'mage') {
                    player.vocation = vocation.mage;
                    vocation.mage.startingEquipment();
                    console.log('\nYou became a Mage!\n');
                    player.spells.push('Energy Strike');
                    await delay();
                    vocationSet = true;
                } else if (vocationChosen === 'archer') {
                    player.vocation = vocation.archer;
                    vocation.archer.startingEquipment();
                    console.log('\nYou became an Archer!\n');
                    player.spells.push('Double Shot');
                    await delay();
                    vocationSet = true;
                } else {
                    console.log('Vocation invalid.\n');
                }
            }

            action.addItem(database.usable.potions.lifePotion, 1);
            action.addItem(database.usable.potions.lifePotion, 3);
            action.addItem(database.usable.potions.manaPotion, 2);
            action.addItem(database.armors.brassArmor, 1);
            action.addItem(database.shields.dragonShield, 2);
            action.addItem(database.weapons.axes.lumberjackAxe, 1);
            action.addItem(database.weapons.rods.tempestRod, 1);

            login = true;
        } else {
            console.log('\nAction invalid.\n');
        }
    }

    while (gameState) {
        while (player.location === 'city' && player.mode === 'idle' && gameState) {
            console.log(`You are currently at [${player.location}]`);
            let playerAction = prompt('Choose an action => [view][travel][restore][exit]: ');
            if (playerAction === 'view') {
                playerAction = prompt('Choose to view => [status][equipment][inventory]: ');
                if (playerAction === 'status') {
                    action.status();
                    await delay();
                } else if (playerAction === 'equipment') {
                    action.equipment();
                    await delay();
                } else if (playerAction === 'inventory') {
                    console.log('');
                    let atInventory = true;
                    while (atInventory) {
                        action.inventory();
                        playerAction = prompt('Choose an action + item name => [look][equip][use][discard] or [back]: ');
                        if (playerAction === 'back') {
                            action.isInventoryFull();
                            atInventory = false;
                            console.log('');
                        } else {
                            let actionChosen = playerAction.split(' ')[0];
                            let itemChosen = '';
                            for (let i = 0; i < playerAction.length; i++) {
                                if (playerAction[i] === ' ') {
                                    itemChosen = playerAction.slice(i + 1);
                                    break;
                                }
                            }
                            if (actionChosen === 'look' && player.items.some(obj => obj.item.name === itemChosen)) {
                                action.lookItem(itemChosen);
                                await delay();
                            } else if (actionChosen === 'equip' && player.items.some(obj => obj.item.name === itemChosen)) {
                                let objChosen = player.items.find(obj => obj.item.name === itemChosen);
                                if (objChosen.item.id[0] === '1') {
                                    action.equipItem(itemChosen);
                                    await delay();
                                    action.equipment();
                                    await delay();
                                } else {
                                    console.log('\nAction invalid.\n');
                                }
                            } else if (actionChosen === 'use' && player.items.some(obj => obj.item.name === itemChosen)) {
                                let objChosen = player.items.find(obj => obj.item.name === itemChosen);
                                if (objChosen.item.id[0] === '2') {
                                    action.useItem(itemChosen);
                                    await delay();
                                    console.log(
                                        `[Hp: ${player.hp[0]} / ${player.hp[1]}, Mana: ${player.mana[0]} / ${player.mana[1]}]`,
                                    );
                                    console.log(`[Status: ${action.showStatus(player.status)}]\n`);
                                    await delay();
                                } else {
                                    console.log('\nAction invalid.\n');
                                }
                            } else if (actionChosen === 'discard' && player.items.some(obj => obj.item.name === itemChosen)) {
                                playerAction = prompt('Choose a number to discard or [all]: ');
                                if (playerAction !== 'all') {
                                    playerAction = Number(playerAction);
                                }
                                action.discardItem(itemChosen, playerAction);
                                console.log(`\nYou discarded ${playerAction} ${itemChosen}(s).\n`);
                                await delay();
                            } else {
                                console.log('\nAction invalid.\n');
                            }
                        }
                    }
                } else {
                    console.log('\nAction invalid.\n');
                }
            } else if (playerAction === 'travel') {
                action.travel(prompt(`Choose a location to travel to => ${possibleDirections()}: `));
            } else if (playerAction === 'restore') {
                action.restore();
                await delay();
            } else if (playerAction === 'exit') {
                exit();
            } else {
                console.log('\nAction invalid.\n');
            }
        }

        while ((player.location === 'cave' || player.location === 'outskirts') && player.mode === 'idle') {
            console.log(`You are currently at [${player.location}]`);
            let playerAction = prompt('Choose an action => [view][travel][hunt]: ');
            if (playerAction === 'view') {
                playerAction = prompt('Choose to view => [status][equipment][inventory]: ');
                if (playerAction === 'status') {
                    action.status();
                    await delay();
                } else if (playerAction === 'equipment') {
                    action.equipment();
                    await delay();
                } else if (playerAction === 'inventory') {
                    console.log('');
                    let atInventory = true;
                    while (atInventory) {
                        action.inventory();
                        playerAction = prompt('Choose an action + item name => [look][equip][use][discard] or [back]: ');
                        if (playerAction === 'back') {
                            action.isInventoryFull();
                            atInventory = false;
                            console.log('');
                        } else {
                            let actionChosen = playerAction.split(' ')[0];
                            let itemChosen = '';
                            for (let i = 0; i < playerAction.length; i++) {
                                if (playerAction[i] === ' ') {
                                    itemChosen = playerAction.slice(i + 1);
                                    break;
                                }
                            }
                            if (actionChosen === 'look' && player.items.some(obj => obj.item.name === itemChosen)) {
                                action.lookItem(itemChosen);
                                await delay();
                            } else if (actionChosen === 'equip' && player.items.some(obj => obj.item.name === itemChosen)) {
                                let objChosen = player.items.find(obj => obj.item.name === itemChosen);
                                if (objChosen.item.id[0] === '1') {
                                    action.equipItem(itemChosen);
                                    await delay();
                                    action.equipment();
                                    await delay();
                                } else {
                                    console.log('\nAction invalid.\n');
                                }
                            } else if (actionChosen === 'use' && player.items.some(obj => obj.item.name === itemChosen)) {
                                let objChosen = player.items.find(obj => obj.item.name === itemChosen);
                                if (objChosen.item.id[0] === '2') {
                                    action.useItem(itemChosen);
                                    await delay();
                                    console.log(
                                        `[Hp: ${player.hp[0]} / ${player.hp[1]}, Mana: ${player.mana[0]} / ${player.mana[1]}]`,
                                    );
                                    console.log(`[Status: ${action.showStatus(player.status)}]\n`);
                                    await delay();
                                } else {
                                    console.log('\nAction invalid.\n');
                                }
                            } else if (actionChosen === 'discard' && player.items.some(obj => obj.item.name === itemChosen)) {
                                playerAction = prompt('Choose a number to discard or [all]: ');
                                if (playerAction !== 'all') {
                                    playerAction = Number(playerAction);
                                }
                                action.discardItem(itemChosen, playerAction);
                                console.log(`\nYou discarded ${playerAction} ${itemChosen}(s).\n`);
                                await delay();
                            } else {
                                console.log('\nAction invalid.\n');
                            }
                        }
                    }
                } else {
                    console.log('\nAction invalid.\n');
                }
            } else if (playerAction === 'travel') {
                action.travel(prompt(`Choose a location to travel to => ${possibleDirections()}: `));
            } else if (playerAction === 'hunt') {
                console.log(`\nHunting at ${player.location}...`);
                arrMonster = action.hunt(location[player.location].mob.length);
                await delay();
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
                        `\n[${player.name}, Level: ${player.level}, Hp: ${player.hp[0]} / ${player.hp[1]}, Mana: ${player.mana[0]} / ${player.mana[1]}]`,
                    );
                    if (player.status.length > 0) {
                        console.log(action.showStatus(player.status));
                    }
                    console.log(`\n            vs\n`);
                    for (let i = 0; i < arrMonster.length; i++) {
                        console.log(
                            `[${i + 1}. ${arrMonster[i].name}, Level: ${arrMonster[i].level}, Hp: ${arrMonster[i].hp[0]} / ${
                                arrMonster[i].hp[1]
                            }]`,
                        );
                        if (arrMonster[i].status.length > 0) {
                            console.log(action.showStatus(arrMonster[i].status));
                        }
                    }
                    await delay();
                    console.log('');
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
                            const damageDealt = player.attack();
                            arrMonster[target - 1].hp[0] -= damageDealt;
                            console.log(`\n${player.name} used a basic attack!`);
                            console.log(`You dealt ${damageDealt} damage to ${arrMonster[target - 1].name}.\n`);
                            await delay();
                            if (arrMonster[target - 1].hp[0] <= 0) {
                                arrMonster[target - 1].hp[0] = 0;
                                console.log(`You killed a ${arrMonster[target - 1].name}.`);
                                player.currentExp += arrMonster[target - 1].expGain;
                                console.log(`You gained ${arrMonster[target - 1].expGain} experience.\n`);
                                await delay();
                                arrMonster.splice(arrMonster.indexOf(arrMonster[target - 1]), 1);
                                while (player.currentExp >= player.nextLevel) {
                                    action.levelUp();
                                    action.restore();
                                    await delay();
                                }
                            }
                            turn = 'monster';
                        }
                    } else {
                        console.log('\nTarget invalid.\n');
                    }
                } else if (playerAction === 'spell') {
                    let spellChosen = prompt(`Choose a spell => ${possibleSpells()}: `);
                    if (player.spells[spellChosen - 1]) {
                        if (player.mana[0] >= spell[player.spells[spellChosen - 1]].manaCost) {
                            let target = prompt(`Choose a target => ${possibleTargets()}: `);
                            if (arrMonster[target - 1]) {
                                const damageDealt = spell[player.spells[spellChosen - 1]].effect();
                                arrMonster[target - 1].hp[0] -= damageDealt;
                                console.log(`\n${player.name} used ${player.spells[spellChosen - 1]}!`);
                                console.log(`You dealt ${damageDealt} damage to ${arrMonster[target - 1].name}.\n`);
                                await delay();
                                if (arrMonster[target - 1].hp[0] <= 0) {
                                    arrMonster[target - 1].hp[0] = 0;
                                    console.log(`You killed a ${arrMonster[target - 1].name}.`);
                                    player.currentExp += arrMonster[target - 1].expGain;
                                    console.log(`You gained ${arrMonster[target - 1].expGain} experience.\n`);
                                    await delay();
                                    arrMonster.splice(arrMonster.indexOf(arrMonster[target - 1]), 1);
                                    while (player.currentExp >= player.nextLevel) {
                                        action.levelUp();
                                        action.restore();
                                        await delay();
                                    }
                                }
                                turn = 'monster';
                            } else {
                                console.log('\nTarget invalid.\n');
                            }
                        } else {
                            console.log('\nNot enough mana.\n');
                        }
                    } else {
                        console.log('\nSpell invalid.\n');
                    }
                } else if (playerAction === 'item') {
                    // to do
                    let inventory = [];
                    for (let obj of player.items) {
                        if (obj.item.id[0] === '2') {
                            inventory.push(`[${obj.item.name}]`);
                        }
                    }
                    const itemChosen = prompt(`Choose an item to use => ${inventory.join('')}: `);
                    if (player.items.some(obj => obj.item.name === itemChosen)) {
                        action.useItem(itemChosen);
                        await delay();
                        turn = 'monster';
                    } else {
                        console.log('\nItem invalid.\n');
                    }
                } else {
                    console.log('\nAction invalid.\n');
                }
            }

            while (turn === 'monster' && player.mode === 'battle') {
                if (arrMonster.length > 0) {
                    for (let monster of arrMonster) {
                        if (monster.hp[0] > 0) {
                            player.hp[0] -= monster.script();
                            await delay();
                            if (player.hp[0] <= 0) {
                                console.log(`\nYou have been killed by ${monster.name}.`);
                                await delay();
                                const expLost = Math.floor(player.currentExp * 0.08);
                                player.currentExp -= expLost;
                                console.log(`You lost ${expLost} experience.\n`);
                                await delay();
                                while (player.currentExp < expTable[player.level - 2]) {
                                    action.levelDown();
                                    await delay();
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
}

function possibleFiles() {
    let savedFiles = '';
    fs.readdir('./data/save', (err, files) => {
        if (err) throw err;
        for (let file of files) {
            savedFiles += '[' + file.split('.')[0] + ']';
        }
    });
    return savedFiles;
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

function possibleSpells() {
    let spells = '';
    for (let i = 0; i < player.spells.length; i++) {
        spells += `[${i + 1}. ${player.spells[i]}]`;
    }
    return spells;
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
        // const fileName = prompt('Choose a name for your save file: ');
        // const objectJson = JSON.stringify(player, null, '\t');
        // save(fileName, objectJson);
        console.log('\nThanks for playing!');
        gameState = false;
    } else if (exitResponse === 'no') {
        console.log('\nAction canceled. The game was not closed.\n');
    } else {
        console.log('\nAction invalid.\n');
    }
}

function delay(ms = 2000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function save(fileName, objectJson) {
    fs.writeFile(`./data/save/${fileName}.json`, objectJson, err => {
        if (err) throw err;
        console.log('\nYour progress was saved!\n');
    });
}

function load(fileChosen) {
    fs.readFile(`./data/save/${fileChosen}.json`, 'utf8', (err, data) => {
        if (err) {
            console.log('\nFileName invalid.\n');
        }
        player = JSON.parse(data);
        login = true;
    });
}

function checkDir(callback) {
    fs.readdir('./data/save', (err, files) => {
        if (err) throw err;
        if (!files.length) {
            console.log('\nYou have no saved files yet.\n');
        } else {
            const fileChosen = prompt(`Choose a file to load => ${callback()}: `);
            load(fileChosen);
        }
    });
}
