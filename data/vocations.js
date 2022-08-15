const { player, expTable } = require('./player');
const { database } = require('./items');

const vocation = {
    knight: {
        name: 'Knight',
        startingEquipment() {
            player.equipWeapon(database.weapons.swords.woodenSword);
            player.equipShield(database.shields.woodenShield);
            player.equipArmor(database.armors.leatherArmor);
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
            player.equipWeapon(database.weapons.rods.apprenticeRod);
            player.equipArmor(database.armors.coat);
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
            player.equipWeapon(database.weapons.bows.shortBow);
            player.equipArmor(database.armors.leatherArmor);
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
