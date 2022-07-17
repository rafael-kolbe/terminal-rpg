const { player } = require('./player');
const { location } = require('./locations');
const { monster } = require('./monsters');

const action = {
    status() {
        console.log(
            `[${player.name}, ${player.vocation.name}, Level: ${player.level}]`,
        );
        console.log(`[Exp: ${player.currentExp + ' / ' + player.nextLevel}]`);
        console.log(`[Hp: ${player.hp[0] + ' / ' + player.hp[1]}]`);
        console.log(`[Mana: ${player.mana[0] + ' / ' + player.mana[1]}]`);
        console.log(`[Atk: ${player.atk}, Magic Atk: ${player.magicAtk}]`);
        console.log(`[Armor: ${player.armor}, Defense: ${player.def}]`);
        console.log(`[Status: ${player.status}]`);
    },
    equipment() {
        let isTwoHanded = player.equipment.weapon.twoHanded
            ? 'Two-Handed Weapon'
            : 'One-Handed Weapon';
        player.equipment.weapon
            ? console.log(
                  `[Weapon: ${player.equipment.weapon.name}, Atk: ${player.equipment.weapon.atk}, Def: ${player.equipment.weapon.def}, ${isTwoHanded}]`,
              )
            : console.log('[Weapon: Not Equipped]');
        player.equipment.shield
            ? console.log(
                  `[Shield: ${player.equipment.shield.name}, Def: ${player.equipment.shield.def}]`,
              )
            : console.log('[Shield: Not Equipped]');

        player.equipment.armor
            ? console.log(
                  `[Armor: ${player.equipment.armor.name}, Armor: ${player.equipment.armor.arm}]`,
              )
            : console.log('[Armor: Not Equipped]');

        player.equipment.necklace
            ? console.log(
                  `[Necklace: ${player.equipment.necklace.name}, Charges: ${player.equipment.necklace.charges}]`,
              )
            : console.log('[Necklace: Not Equipped]');

        player.equipment.ring
            ? console.log(`[Ring: ${player.equipment.ring.name}]`)
            : console.log('[Ring: Not Equipped]');

        console.log(
            `[Backpack: ${player.equipment.backpack.name}, Size: ${player.equipment.backpack.size}]`,
        );
    },
    inventory() {
        console.log(`[Inventory max size: ${player.equipment.backpack.size}]`);
        console.log(player.items);
    },
    travel(newLocation) {
        let validation =
            location[player.location].direction.includes(newLocation);
        if (validation) {
            player.location = newLocation;
            console.log(`Traveling to ${player.location}...`);
        } else {
            console.log('Sorry, I did not understand, please type it again.');
        }
    },
    restore() {
        player.hp[0] = player.hp[1];
        player.mana[0] = player.mana[1];
        console.log('You have been restored to full hp/mana.');
    },
    hunt(enemyChosen) {
        let enemy = enemyChosen.toLowerCase();
        let validation = location[player.location].mob.includes(monster[enemy]);
        if (validation) {
            console.log(
                `Hunting a ${
                    enemy.charAt(0).toUpperCase() + enemy.slice(1)
                }...`,
            );
            let objMonster = {};
            Object.assign(objMonster, monster[enemy]);
            player.mode = 'battle';
            return objMonster;
        } else {
            console.log(`${enemyChosen} is not a valid target.`);
        }
    },
};

module.exports = {
    action,
};
