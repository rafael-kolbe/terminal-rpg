const { player } = require('./player');

const item = {
    weapons: {
        swords: {
            knife: {
                name: 'Knife',
                atk: 3,
                def: 0,
                twoHanded: true,
            },
            woodenSword: {
                name: 'Wooden Sword',
                atk: 5,
                def: 3,
                twoHanded: false,
            },
            rapier: {
                name: 'Rapier',
                atk: 7,
                def: 5,
                twoHanded: false,
            },
            sword: {
                name: 'Sword',
                atk: 9,
                def: 7,
                twoHanded: false,
            },
            brandedSword: {
                name: 'Branded Sword',
                atk: 13,
                def: 6,
                twoHanded: true,
            },
        },
        axes: {
            hatchet: {
                name: 'Hatchet',
                atk: 6,
                def: 2,
                twoHanded: false,
            },
            axe: {
                name: 'Axe',
                atk: 10,
                def: 3,
                twoHanded: true,
            },
            lumberjackAxe: {
                name: 'Lumberjack Axe',
                atk: 16,
                def: 3,
                twoHanded: true,
            },
        },
        rods: {
            apprenticeRod: {
                name: 'Apprentice Rod',
                magicAtk: 7,
                def: 0,
                manaCost: 2,
                twoHanded: false,
            },
            natureRod: {
                name: 'Nature Rod',
                magicAtk: 13,
                def: 0,
                manaCost: 3,
                twoHanded: false,
            },
            tempestRod: {
                name: 'Tempest Rod',
                magicAtk: 19,
                def: 0,
                manaCost: 5,
                twoHanded: false,
            },
        },
        bows: {
            shortBow: {
                name: 'Short Bow',
                atk: 7,
                def: 0,
                twoHanded: true,
            },
            bow: {
                name: 'Bow',
                atk: 12,
                def: 0,
                twoHanded: true,
            },
            longbow: {
                name: 'Long Bow',
                atk: 16,
                def: 0,
                twoHanded: true,
            },
        },
    },
    armors: {
        coat: {
            name: 'Coat',
            armor: 3,
        },
        leatherArmor: {
            name: 'Leather Armor',
            armor: 5,
        },
        chainArmor: {
            name: 'Chain Armor',
            armor: 7,
        },
        brassArmor: {
            name: 'Brass Armor',
            armor: 10,
        },
        ironArmor: {
            name: 'Iron Armor',
            armor: 13,
        },
        nobleArmor: {
            name: 'Noble Armor',
            armor: 16,
        },
        steelArmor: {
            name: 'Steel Armor',
            armor: 20,
        },
        plateArmor: {
            name: 'Plate Armor',
            armor: 25,
        },
    },
    shields: {
        woodenShield: {
            name: 'Wooden Shield',
            def: 6,
        },
        orcShield: {
            name: 'Orc Shield',
            def: 9,
        },
        ironShield: {
            name: 'Iron Shield',
            def: 10,
        },
        steelShield: {
            name: 'Steel Shield',
            def: 14,
        },
        plateShield: {
            name: 'Plate Shield',
            def: 18,
        },
        dragonShield: {
            name: 'Dragon Shield',
            def: 21,
        },
    },
    necklaces: {
        protectionAmulet: {
            name: 'Protection Amulet',
            charges: 200,
            bonus() {
                if (this.charges > 0) {
                    player.armor += 15;
                }
            },
        },
        silverAmulet: {
            name: 'Silver Amulet',
            bonus() {
                for (let status of player.status) {
                    if (status === 'Poison') {
                        player.status.pop();
                    }
                }
            },
        },
    },
    rings: {
        lifeRing: {
            name: 'Life Ring',
            bonus() {
                if (player.hp[0] < player.hp[1]) {
                    player.hp[0] += 10;
                    if (player.hp[0] > player.hp[1]) {
                        player.hp[0] === player.hp[1];
                    }
                }
            },
        },
    },
    backpacks: {
        bag: {
            name: 'Bag',
            size: 6,
        },
        backpack: {
            name: 'Backpack',
            size: 10,
        },
        huntingBackpack: {
            name: 'Hunting Backpack',
            size: 16,
        },
        crimsonBackpack: {
            name: 'Crimson Backpack',
            size: 20,
        },
    },
};

module.exports = {
    item,
};
