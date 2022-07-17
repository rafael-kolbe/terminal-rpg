const { player, expTable } = require('./player');
const { item } = require('./items');

const vocation = {
    knight: {
        name: 'Knight',
        startingEquipment() {
            player.equipment.weapon = item.weapons.swords.woodenSword;
            player.equipment.shield = item.shields.woodenShield;
            player.equipment.armor = item.armors.leatherArmor;
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
            player.equipment.weapon = item.weapons.rods.apprenticeRod;
            player.equipment.armor = item.armors.coat;
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
            player.equipment.weapon = item.weapons.bows.shortBow;
            player.equipment.armor = item.armors.leatherArmor;
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
