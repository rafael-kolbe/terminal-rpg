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
        let isTwoHanded = player.equipment.weapon.twoHanded ? 'Two-Handed Weapon' : 'One-Handed Weapon';
        player.equipment.weapon
            ? console.log(
                  `\n[Weapon: ${player.equipment.weapon.name}, Atk: ${player.equipment.weapon.atk}, M.Atk: ${player.equipment.weapon.magicAtk}, Def: ${player.equipment.weapon.def}, ${isTwoHanded}]`,
              )
            : console.log('[Weapon: Not Equipped]');
        player.equipment.shield
            ? console.log(`[Shield: ${player.equipment.shield.name}, Def: ${player.equipment.shield.def}]`)
            : console.log('[Shield: Not Equipped]');

        player.equipment.armor
            ? console.log(`[Armor: ${player.equipment.armor.name}, Armor: ${player.equipment.armor.arm}]`)
            : console.log('[Armor: Not Equipped]');

        player.equipment.necklace
            ? console.log(
                  `[Necklace: ${player.equipment.necklace.name}, Charges: ${player.equipment.necklace.charges}]`,
              )
            : console.log('[Necklace: Not Equipped]');

        player.equipment.ring
            ? console.log(`[Ring: ${player.equipment.ring.name}]`)
            : console.log('[Ring: Not Equipped]');

        console.log(`[Backpack: ${player.equipment.backpack.name}, Size: ${player.equipment.backpack.size}]\n`);
    },
    inventory() {
        console.log(`\n[Inventory max size: ${player.equipment.backpack.size}]`);
        console.log(player.items, `\n`);
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
