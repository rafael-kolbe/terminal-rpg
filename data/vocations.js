const { player, expTable } = require('./player');
const { database } = require('./items');

const vocation = {
    knight: {
        name: 'Knight',
        startingEquipment() {
            player.equipment.weapon = database.weapons.swords.woodenSword;
            player.equipment.shield = database.shields.woodenShield;
            player.equipment.armor = database.armors.leatherArmor;
            player.equipWeapon();
            player.equipShield();
            player.equipArmor();
        },
        levelUp() {
            player.level++;
            player.nextLevel = expTable[player.level - 1];
            player.hp[1] += 15;
            player.mana[1] += 5;
            player.atk += 1;
            player.magicAtk += 0.5;
        },
        levelDown() {
            player.level--;
            player.nextLevel = expTable[player.level - 1];
            player.hp[1] -= 15;
            player.mana[1] -= 5;
            player.atk -= 1;
            player.magicAtk -= 0.5;
        },
    },
    mage: {
        name: 'Mage',
        startingEquipment() {
            player.equipment.weapon = database.weapons.rods.apprenticeRod;
            player.equipment.armor = database.armors.coat;
            player.equipWeapon();
            player.equipArmor();
        },
        levelUp() {
            player.level++;
            player.nextLevel = expTable[player.level - 1];
            player.hp[1] += 5;
            player.mana[1] += 30;
            player.atk += 0.5;
            player.magicAtk += 1.5;
        },
        levelDown() {
            player.level--;
            player.nextLevel = expTable[player.level - 1];
            player.hp[1] -= 5;
            player.mana[1] -= 30;
            player.atk -= 0.5;
            player.magicAtk -= 1.5;
        },
    },
    archer: {
        name: 'Archer',
        startingEquipment() {
            player.equipment.weapon = database.weapons.bows.shortBow;
            player.equipment.armor = database.armors.leatherArmor;
            player.equipWeapon();
            player.equipArmor();
        },
        levelUp() {
            player.level++;
            player.nextLevel = expTable[player.level - 1];
            player.hp[1] += 10;
            player.mana[1] += 15;
            player.atk += 1.5;
            player.magicAtk += 1;
        },
        levelDown() {
            player.level--;
            player.nextLevel = expTable[player.level - 1];
            player.hp[1] -= 10;
            player.mana[1] -= 15;
            player.atk -= 1.5;
            player.magicAtk -= 1;
        },
    },
};

module.exports = {
    vocation,
};
