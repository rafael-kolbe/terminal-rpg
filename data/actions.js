const { player } = require('./player');
const { location } = require('./locations');
const { monster } = require('./monsters');
const { vocation } = require('./vocations');

const prompt = require('prompt-sync')({ sigint: true });

const action = {
    status() {
        console.log(`\n[${player.name}, ${player.vocation.name}, Level: ${player.level}]`);
        console.log(`[Exp: ${player.currentExp + ' / ' + player.nextLevel}]`);
        console.log(`[Hp: ${player.hp[0] + ' / ' + player.hp[1]}]`);
        console.log(`[Mana: ${player.mana[0] + ' / ' + player.mana[1]}]`);
        console.log(`[Atk: ${player.atk}, Magic Atk: ${player.magicAtk}]`);
        console.log(`[Armor: ${player.armor}, Defense: ${player.def}]`);
        console.log(`[Status: ${this.showStatus(player.status)}]\n`);
    },
    showStatus(arrStatus) {
        let status = [];
        for (let obj of arrStatus) {
            status.push(`${obj.name} (${obj.duration})`);
        }
        return status;
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
    addItem(objItem, qty) {
        if (player.items.some(obj => obj.item.id === objItem.id)) {
            for (let obj of player.items) {
                if (obj.item.id === objItem.id) {
                    obj.qty += qty;
                }
            }
        } else {
            player.items.push({
                item: objItem,
                qty: qty,
            });
        }
    },
    isInventoryFull() {
        while (player.items.length > player.equipment.backpack.size) {
            console.log('\nYou have more items than you can carry, please discard items until your backpack is full.');
            this.inventory();
            const discardThis = prompt(`Choose an item to discard: `);
            if (player.items.some(obj => obj.item.name === discardThis)) {
                console.log(`\nYou discarded your stack of ${discardThis}.`);
                this.discardItem(discardThis, 'all');
            } else {
                console.log(`\nItem Invalid.\n`);
            }
        }
    },
    lookItem(itemChosen) {
        const objChosen = player.items.find(obj => obj.item.name === itemChosen);
        console.log(`\n${objChosen.item.description}\n`);
    },
    equipItem(itemChosen) {
        const objChosen = player.items.find(obj => obj.item.name === itemChosen);
        if (Number(objChosen.item.id) < 1500) {
            switch (player.vocation.name) {
                case 'Knight':
                    if (objChosen.item.id[1] === '1' || objChosen.item.id[1] === '2') {
                        if (player.equipment.weapon) {
                            this.addItem(player.equipment.weapon, 1);
                            player.unequipWeapon();
                        }
                        player.equipWeapon(objChosen.item);
                        this.discardItem(objChosen.item.name, 1);
                        console.log(`\n${objChosen.item.name} was equipped.`);
                    } else {
                        console.log('\nKnights can only equip a Sword or an Axe as weapons.');
                    }
                    break;
                case 'Mage':
                    if (objChosen.item.id[1] === '3') {
                        if (player.equipment.weapon) {
                            this.addItem(player.equipment.weapon, 1);
                            player.unequipWeapon();
                        }
                        player.equipWeapon(objChosen.item);
                        this.discardItem(objChosen.item.name, 1);
                        console.log(`\n${objChosen.item.name} was equipped.`);
                    } else {
                        console.log('\nMages can only equip a Rod as weapons.');
                    }
                    break;
                case 'Archer':
                    if (objChosen.item.id[1] === '4') {
                        if (player.equipment.weapon) {
                            this.addItem(player.equipment.weapon, 1);
                            player.unequipWeapon();
                        }
                        player.equipWeapon(objChosen.item);
                        this.discardItem(objChosen.item.name, 1);
                        console.log(`\n${objChosen.item.name} was equipped.`);
                    } else {
                        console.log('\nArchers can only equip a Bow as weapons.');
                    }
                    break;
                default:
                    console.log('\nVocation Invalid.');
            }
        } else if (Number(objChosen.item.id > 1500 && Number(objChosen.item.id < 1600))) {
            if (player.equipment.armor) {
                this.addItem(player.equipment.armor, 1);
                player.unequipArmor();
            }
            player.equipArmor(objChosen.item);
            this.discardItem(objChosen.item.name, 1);
            console.log(`\n${objChosen.item.name} was equipped.`);
        } else if (Number(objChosen.item.id > 1600 && Number(objChosen.item.id < 1700))) {
            if (player.equipment.shield) {
                this.addItem(player.equipment.shield, 1);
                player.unequipShield();
            }
            player.equipShield(objChosen.item);
            this.discardItem(objChosen.item.name, 1);
            console.log(`\n${objChosen.item.name} was equipped.`);
        }
        if (player.equipment.weapon.twoHanded && player.equipment.shield) {
            console.log(`\n${player.equipment.shield.name} was unequipped due to the weapon being a Two-handed type.`);
            this.addItem(player.equipment.shield, 1);
            player.unequipShield();
        }
    },
    useItem(itemChosen) {
        const objChosen = player.items.find(obj => obj.item.name === itemChosen);
        console.log(`\nYou used a ${itemChosen}.`);
        const itemEffect = objChosen.item.use();
        if (itemEffect[0] === 'life') {
            player.hp[0] += itemEffect[1];
            if (player.hp[0] > player.hp[1]) {
                player.hp[0] = player.hp[1];
            }
            console.log(`You recovered ${itemEffect[1]} hp.\n`);
        } else if (itemEffect[0] === 'mana') {
            player.mana[0] += itemEffect[1];
            if (player.mana[0] > player.mana[1]) {
                player.mana[0] = player.mana[1];
            }
            console.log(`You recovered ${itemEffect[1]} mana.\n`);
        } else if (itemEffect[0] === 'status') {
            if (itemEffect[1] === 'Poison') {
                if (player.status.some(obj => obj.name === 'Poison')) {
                    const objIndex = player.status.findIndex(obj => obj.name === 'Poison');
                    player.status.splice(objIndex, 1);
                    console.log(`You are no longer poisoned.\n`);
                } else {
                    console.log(`You were not poisoned.\n`);
                }
            }
        }

        objChosen.qty--;
        if (objChosen.qty === 0) {
            const objIndex = player.items.findIndex(obj => obj.item.name === itemChosen);
            player.items.splice(objIndex, 1);
        }
    },
    discardItem(itemChosen, numToDiscard) {
        const objChosen = player.items.find(obj => obj.item.name === itemChosen);
        const objIndex = player.items.findIndex(obj => obj.item.name === itemChosen);
        if (numToDiscard === 'all') {
            player.items.splice(objIndex, 1);
        } else if (numToDiscard <= objChosen.qty) {
            objChosen.qty -= numToDiscard;
            if (objChosen.qty === 0) {
                player.items.splice(objIndex, 1);
            }
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
