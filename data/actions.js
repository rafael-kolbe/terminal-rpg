const { player, expTable } = require('./player');
const { location } = require('./locations');
const { monster } = require('./monsters');
const { vocation } = require('./vocations');

let objMonster = {};

const action = {
    status() {
        console.log(`[${player.name}, ${player.vocation.name}, Level: ${player.level}]`);
        console.log(`[Exp: ${player.currentExp + ' / ' + player.nextLevel}]`);
        console.log(`[Hp: ${player.hp[0] + ' / ' + player.hp[1]}]`);
        console.log(`[Mana: ${player.mana[0] + ' / ' + player.mana[1]}]`);
        console.log(`[Atk: ${player.atk}, Magic Atk: ${player.magicAtk}]`);
        console.log(`[Armor: ${player.armor}, Defense: ${player.def}]`);
        console.log(`[Status: ${player.status}]`);
    },
    equipment() {
        let isTwoHanded = player.equipment.weapon.twoHanded ? 'Two-Handed Weapon' : 'One-Handed Weapon';
        player.equipment.weapon
            ? console.log(
                  `[Weapon: ${player.equipment.weapon.name}, Atk: ${player.equipment.weapon.atk}, Def: ${player.equipment.weapon.def}, ${isTwoHanded}]`,
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

        console.log(`[Backpack: ${player.equipment.backpack.name}, Size: ${player.equipment.backpack.size}]`);
    },
    inventory() {
        console.log(`[Inventory max size: ${player.equipment.backpack.size}]`);
        console.log(player.items);
    },
    travel(newLocation) {
        let validation = location[player.location].direction.includes(newLocation);
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
            console.log(`Hunting a ${enemy.charAt(0).toUpperCase() + enemy.slice(1)}...`);
            Object.assign(objMonster, monster[enemy]);
            player.mode = 'battle';
            return objMonster;
        } else {
            console.log(`${enemyChosen} is not a valid target.`);
        }
    },
    attack() {
        objMonster.hp[0] -= player.atk;
        console.log(`You dealt ${player.atk} damage to ${objMonster.name}.`);
        if (objMonster.hp[0] > 0) {
            player.hp[0] -= objMonster.atk;
            console.log(`You received ${objMonster.atk} damage from ${objMonster.name}.`);
            if (player.hp[0] <= 0) {
                console.log(`You have been killed by a ${objMonster.name}.`);
                let expLost = Math.floor(player.currentExp * 0.1);
                player.currentExp -= expLost;
                console.log(`You have lost ${expLost} experience.`);
                while (player.currentExp < expTable[player.level - 2]) {
                    this.levelDown();
                }
                objMonster.reset();
                this.restore();
                player.mode = 'idle';
                player.location = 'city';
            }
        } else {
            console.log(`You killed a ${objMonster.name}.`);
            console.log(`You gained ${objMonster.expGain} experience.`);
            player.currentExp += objMonster.expGain;
            while (player.currentExp >= player.nextLevel) {
                this.levelUp();
            }
            objMonster.reset();
            player.mode = 'idle';
        }
    },
    run() {
        console.log('You ran from the battle.');
        objMonster.reset();
        player.mode = 'idle';
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
