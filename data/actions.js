const { player } = require('./player');
const { location } = require('./locations');
const { monster } = require('./monsters');
const { vocation } = require('./vocations');

const action = {
    status() {
        console.log(`\n[${player.name}, ${player.vocation.name}, Level: ${player.level}]`);
        console.log(`[Exp: ${player.currentExp + ' / ' + player.nextLevel}]`);
        console.log(`[Hp: ${player.hp[0] + ' / ' + player.hp[1]}]`);
        console.log(`[Mana: ${player.mana[0] + ' / ' + player.mana[1]}]`);
        console.log(`[Atk: ${player.atk}, Magic Atk: ${player.magicAtk}]`);
        console.log(`[Armor: ${player.armor}, Defense: ${player.def}]`);
        console.log(`[Status: ${player.status}]\n`);
    },
    equipment() {
        player.equipment.weapon
            ? console.log(`\n[Weapon: ${player.equipment.weapon.name}, ${player.equipment.weapon.description}]`)
            : console.log('[Weapon: Not Equipped]');

        player.equipment.shield
            ? console.log(`[Shield: ${player.equipment.shield.name}, ${player.equipment.shield.description}]`)
            : console.log('[Shield: Not Equipped]');

        player.equipment.armor
            ? console.log(`[Armor: ${player.equipment.armor.name}, ${player.equipment.armor.description}]`)
            : console.log('[Armor: Not Equipped]');

        player.equipment.necklace
            ? console.log(`[Necklace: ${player.equipment.necklace.name}, Charges: ${player.equipment.necklace.charges}]`)
            : console.log('[Necklace: Not Equipped]');

        player.equipment.ring ? console.log(`[Ring: ${player.equipment.ring.name}]`) : console.log('[Ring: Not Equipped]');

        console.log(`[Backpack: ${player.equipment.backpack.name}, ${player.equipment.backpack.description}]\n`);
    },
    inventory() {
        console.log(`[Inventory: ${player.items.length} / ${player.equipment.backpack.size}]`);
        console.log(this.showInventory(player.items), `\n`);
        //Add commands to check, equip, use or discard items.
    },
    showInventory(arrItems) {
        let inventory = [];
        for (let obj of arrItems) {
            inventory.push(`${obj.item.name} (${obj.qty})`);
        }
        return inventory;
    },
    lookItem(itemChosen) {
        const objChosen = player.items.find(obj => obj.item.name === itemChosen);
        console.log(`\n${objChosen.item.description}\n`);
    },
    equipItem() {},
    useItem() {},
    discardItem(itemChosen, numToDiscard) {
        const objChosen = player.items.find(obj => obj.item.name === itemChosen);
        const objIndex = player.items.findIndex(obj => obj.item.name === itemChosen);
        if (numToDiscard === 'all') {
            player.items.splice(objIndex, 1);
            console.log(`\n${itemChosen} was discarded from the inventory.\n`);
        } else if (numToDiscard < objChosen.qty) {
            objChosen.qty -= numToDiscard;
            console.log(`\nYou discarded ${numToDiscard} ${itemChosen}(s).\n`);
        } else {
            console.log('\nAction Invalid.\n');
        }
    },
    travel(newLocation) {
        let validation = location[player.location].direction.includes(newLocation);
        if (validation) {
            player.location = newLocation;
            console.log(`\nTraveling to ${player.location}...\n`);
        } else {
            console.log('\nLocation invalid.\n');
        }
    },
    restore() {
        player.hp[0] = player.hp[1];
        player.mana[0] = player.mana[1];
        console.log('\nYou have been restored to full hp/mana.\n');
    },
    hunt(numOfPossibleEncounters) {
        const numOfMonstersFound = Math.ceil(Math.random() * 3);
        const monsterList = [];
        for (let i = 0; i < numOfMonstersFound; i++) {
            const monsterPick = location[player.location].mob[Math.floor(Math.random() * numOfPossibleEncounters)];
            const objMonster = new monster[monsterPick]();
            monsterList.push(objMonster);
        }
        return monsterList;
    },
    levelUp() {
        if (player.vocation.name === 'Knight') {
            vocation.knight.levelUp();
        } else if (player.vocation.name === 'Mage') {
            vocation.mage.levelUp();
        } else if (player.vocation.name === 'Archer') {
            vocation.archer.levelUp();
        }
        console.log(`You advanced from level ${player.level - 1} to level ${player.level}!`);
    },
    levelDown() {
        if (player.vocation.name === 'Knight') {
            vocation.knight.levelDown();
        } else if (player.vocation.name === 'Mage') {
            vocation.mage.levelDown();
        } else if (player.vocation.name === 'Archer') {
            vocation.archer.levelDown();
        }
        console.log(`You returned from level ${player.level + 1} to level ${player.level}.`);
    },
};

module.exports = {
    action,
};
