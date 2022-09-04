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
let login = false;
let vocationSet = false;
let gameState = true;
let arrMonster = [];
let drop = ['empty'];
let turn = 'standby';

gameplay();
async function gameplay() {
    while (!login) {
        const playerChoice = prompt('Do you want to load a saved file? => [yes][no]: ');
        if (playerChoice === 'yes') {
            let files = await possibleFiles();
            if (files.length) {
                let fileChosen = prompt(`Choose a file to load => ${files}: `);
                if (files.includes(fileChosen)) {
                    let loadedFile = await load(fileChosen);
                    loadPlayer(loadedFile);
                    login = true;
                } else {
                    console.log('\nFilename invalid.\n');
                }
            } else {
                console.log('\nYou have no saved files yet.\n');
            }
        } else if (playerChoice === 'no') {
            const nameChosen = prompt('Choose a name: ');
            player.name = nameChosen.charAt(0).toUpperCase() + nameChosen.slice(1);
            console.log(`\nHello adventure ${player.name}!\n`);
            await delay(1000);

            while (!vocationSet) {
                const vocationChosen = prompt(`Please, choose a vocation => [knight][mage][archer]: `);
                if (vocationChosen === 'knight') {
                    player.vocation = vocation.knight;
                    vocation.knight.startingEquipment();
                    console.log('\nYou became a Knight!\n');
                    player.spells.push('Brutal Strike');
                    await delay(1000);
                    vocationSet = true;
                } else if (vocationChosen === 'mage') {
                    player.vocation = vocation.mage;
                    vocation.mage.startingEquipment();
                    console.log('\nYou became a Mage!\n');
                    player.spells.push('Energy Strike');
                    await delay(1000);
                    vocationSet = true;
                } else if (vocationChosen === 'archer') {
                    player.vocation = vocation.archer;
                    vocation.archer.startingEquipment();
                    console.log('\nYou became an Archer!\n');
                    player.spells.push('Double Shot');
                    await delay(1000);
                    vocationSet = true;
                } else {
                    console.log('Vocation invalid.\n');
                }
            }

            action.addItem(database.usable.potions.lifePotion, 4);
            action.addItem(database.usable.potions.manaPotion, 4);

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
                                    console.log(`[Hp: ${player.hp[0]} / ${player.hp[1]}, Mana: ${player.mana[0]} / ${player.mana[1]}]`);
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
                await action.travel(prompt(`Choose a location to travel to => ${possibleDirections()}: `));
            } else if (playerAction === 'restore') {
                action.restore();
                await delay();
            } else if (playerAction === 'exit') {
                await exit();
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
                                    console.log(`[Hp: ${player.hp[0]} / ${player.hp[1]}, Mana: ${player.mana[0]} / ${player.mana[1]}]`);
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
                await action.travel(prompt(`Choose a location to travel to => ${possibleDirections()}: `));
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
                if (drop[0] === 'empty') {
                    droppedItems();
                    console.log(drop); //delete this later
                }
                if (arrMonster.length === 0) {
                    await finishBattle();
                } else {
                    console.log(`\n[${player.name}, Level: ${player.level}, Hp: ${player.hp[0]} / ${player.hp[1]}, Mana: ${player.mana[0]} / ${player.mana[1]}]`);
                    if (player.status.length > 0) {
                        console.log(action.showStatus(player.status));
                    }
                    console.log(`\n            vs\n`);
                    for (let i = 0; i < arrMonster.length; i++) {
                        console.log(`[${i + 1}. ${arrMonster[i].name}, Level: ${arrMonster[i].level}, Hp: ${arrMonster[i].hp[0]} / ${arrMonster[i].hp[1]}]`);
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
                                    await delay(500);
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
                        if (spell[player.spells[spellChosen - 1]].targets[0] === 1 && spell[player.spells[spellChosen - 1]].targets[1] === 'manual') {
                            await singleTargetManual(spellChosen);
                        } else if (spell[player.spells[spellChosen - 1]].targets[0] === 1 && spell[player.spells[spellChosen - 1]].targets[1] === 'random') {
                            await singleTargetRandom(spellChosen);
                        } else if (spell[player.spells[spellChosen - 1]].targets[0] === 2 && spell[player.spells[spellChosen - 1]].targets[1] === 'manual') {
                            //to do
                            await doubleTargetManual(spellChosen);
                        } else if (spell[player.spells[spellChosen - 1]].targets[0] === 2 && spell[player.spells[spellChosen - 1]].targets[1] === 'random') {
                            //to do
                            await doubleTargetRandom(spellChosen);
                        } else if (spell[player.spells[spellChosen - 1]].targets[0] === 2 && spell[player.spells[spellChosen - 1]].targets[1] === 'chain') {
                            //to do
                            await doubleTargetChain(spellChosen);
                        } else if (spell[player.spells[spellChosen - 1]].targets[0] === 3 && spell[player.spells[spellChosen - 1]].targets[1] === 'aoe') {
                            //to do
                            await tripleTargetAoe(spellChosen);
                        } else if (spell[player.spells[spellChosen - 1]].targets[0] >= 3 && spell[player.spells[spellChosen - 1]].targets[1] === 'chain') {
                            //to do
                            await tripleTargetChain(spellChosen);
                        } else {
                            console.log('\nFATAL ERROR\n'); //for testing, remember to remove it later.
                        }
                    } else {
                        console.log('\nSpell invalid.\n');
                    }
                } else if (playerAction === 'item') {
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

async function possibleFiles() {
    let savedFiles = '';
    fs.readdir('./data/save', (err, files) => {
        if (err) throw err;
        for (let file of files) {
            savedFiles += '[' + file.split('.')[0] + ']';
        }
    });
    await delay(500);
    return savedFiles.replace('[_saveFilesHere]', '');
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

async function singleTargetManual(spellChosen) {
    let target = prompt(`Choose a target => ${possibleTargets()}: `);
    if (arrMonster[target - 1]) {
        if (player.mana[0] >= spell[player.spells[spellChosen - 1]].manaCost) {
            const damageDealt = spell[player.spells[spellChosen - 1]].effect();
            arrMonster[target - 1].hp[0] -= damageDealt;
            console.log(`\n${player.name} used ${player.spells[spellChosen - 1]}!`);
            console.log(`You dealt ${damageDealt} damage to ${arrMonster[target - 1].name}.\n`);
            await delay();
            if (arrMonster[target - 1].hp[0] <= 0) {
                arrMonster[target - 1].hp[0] = 0;
                player.currentExp += arrMonster[target - 1].expGain;
                console.log(`You killed a ${arrMonster[target - 1].name}.`);
                console.log(`You gained ${arrMonster[target - 1].expGain} experience.\n`);
                await delay();
                arrMonster.splice(arrMonster.indexOf(arrMonster[target - 1]), 1);
            }
            while (player.currentExp >= player.nextLevel) {
                action.levelUp();
                await delay(500);
                action.restore();
                await delay();
            }
            turn = 'monster';
        } else {
            console.log('\nNot enough mana.\n');
        }
    } else {
        console.log('\nTarget invalid.\n');
    }
}

async function singleTargetRandom(spellChosen) {
    if (player.mana[0] >= spell[player.spells[spellChosen - 1]].manaCost) {
        const damageDealt = spell[player.spells[spellChosen - 1]].effect();
        let target = Math.floor(Math.random() * arrMonster.length);
        arrMonster[target].hp[0] -= damageDealt;
        console.log(`\n${player.name} used ${player.spells[spellChosen - 1]}!`);
        console.log(`You dealt ${damageDealt} damage to ${arrMonster[target].name}.\n`);
        await delay();
        if (arrMonster[target].hp[0] <= 0) {
            arrMonster[target].hp[0] = 0;
            console.log(`You killed a ${arrMonster[target].name}.`);
            player.currentExp += arrMonster[target].expGain;
            console.log(`You gained ${arrMonster[target].expGain} experience.\n`);
            await delay();
            arrMonster.splice(arrMonster.indexOf(arrMonster[target]), 1);
            while (player.currentExp >= player.nextLevel) {
                action.levelUp();
                await delay(500);
                action.restore();
                await delay();
            }
            turn = 'monster';
        }
    } else {
        console.log('\nNot enough mana.\n');
    }
}

function droppedItems() {
    drop = [];
    let deleteIndex = [];
    for (let monster of arrMonster) {
        monster.drop.forEach(item => drop.push(item));
    }

    console.log(drop); //delete this later

    drop.forEach(item => {
        let random = Math.floor(Math.random() * 100 + 1);
        console.log(random); //delete this later
        random > item.dropRate ? deleteIndex.unshift(drop.indexOf(item)) : null;
    });

    deleteIndex.forEach(index => drop.splice(index, 1));
}

async function finishBattle() {
    while (arrMonster.length > 0) {
        arrMonster.pop();
    }

    drop.forEach(obj => {
        console.log(`You looted ${obj.qty} ${obj.item.name}.`);
        action.addItem(obj.item, obj.qty);
    });
    await delay();
    action.isInventoryFull();
    console.log(''); //Skip a line.

    drop = ['empty'];
    player.mode = 'idle';
    turn = 'standby';
}

async function exit() {
    let exitResponse = prompt('Are you sure you want to leave the game? => [yes][no]: ');
    if (exitResponse === 'yes') {
        const fileName = prompt('Choose a name for your save file: ');
        const objectJson = JSON.stringify(player, null, '\t');
        await save(fileName, objectJson);
        await delay(1000);
        console.log('Thanks for playing!');
        await delay(1000);
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

async function save(fileName, objectJson) {
    fs.writeFile(`./data/save/${fileName}.json`, objectJson, err => {
        if (err) throw err;
        console.log('\nYour progress was saved!\n');
    });
    await delay(500);
}

async function load(fileChosen) {
    const readFile = await new Promise((resolve, reject) => {
        return fs.readFile(`./data/save/${fileChosen}.json`, 'utf8', (err, data) => {
            if (err) return reject(err);
            console.log('\nData loaded successfully.\n');
            return resolve(JSON.parse(data));
        });
    });
    await delay(500);
    return readFile;
}

function loadPlayer(loadedFile) {
    player.name = loadedFile.name;
    player.level = loadedFile.level;
    player.vocation = vocation[loadedFile.vocation.name.toLowerCase()];
    player.currentExp = loadedFile.currentExp;
    player.nextLevel = expTable[loadedFile.level - 1];
    player.hp = loadedFile.hp;
    player.mana = loadedFile.mana;
    player.atk = loadedFile.atk;
    player.magicAtk = loadedFile.magicAtk;
    player.armor = loadedFile.armor;
    player.def = loadedFile.def;
    player.status = loadedFile.status;
    player.gold = loadedFile.gold;
    player.spells = loadedFile.spells;
    player.location = loadedFile.location;
    player.mode = loadedFile.mode;

    //equipments here
    const weaponPath = loadedFile.equipment.weapon.path;
    const shieldPath = loadedFile.equipment.shield.path;
    const armorPath = loadedFile.equipment.armor.path;
    const necklacePath = loadedFile.equipment.necklace.path;
    const ringPath = loadedFile.equipment.ring.path;
    const backpackPath = loadedFile.equipment.backpack.path;
    if (loadedFile.equipment.weapon) {
        player.equipment.weapon = database[weaponPath[0]][weaponPath[1]][weaponPath[2]];
    }
    if (loadedFile.equipment.shield) {
        player.equipment.shield = database[shieldPath[0]][shieldPath[1]];
    }
    if (loadedFile.equipment.armor) {
        player.equipment.armor = database[armorPath[0]][armorPath[1]];
    }
    if (loadedFile.equipment.necklace) {
        player.equipment.necklace = database[necklacePath[0]][necklacePath[1]];
    }
    if (loadedFile.equipment.ring) {
        player.equipment.ring = database[ringPath[0]][ringPath[1]];
    }
    if (loadedFile.equipment.backpack) {
        player.equipment.backpack = database[backpackPath[0]][backpackPath[1]];
    }

    //items here
    for (let obj of loadedFile.items) {
        let item = obj.item;
        let qty = obj.qty;
        if (item.path.length === 3) {
            action.addItem(database[item.path[0]][item.path[1]][item.path[2]], qty);
        } else if (item.path.length === 2) {
            action.addItem(database[item.path[0]][item.path[1]], qty);
        }
    }
}
