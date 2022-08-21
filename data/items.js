/*
    *** ITEM ID ***

    1xxx : Equipment
        11xx : Swords
        12xx : Axes
        13xx : Rods
        14xx : Bows
        15xx : Armors
        16xx : Shields
        17xx : Necklaces
        18xx : Rings
        19xx : Backpacks
    2xxx : Usable
        21xx : Potions
        22xx : Foods
    3xxx : Miscellanious
        31xx~32xx : Creature
        33xx : Quest
        34xx : Keys (to be added)
        35xx : Ammo (maybe to be added)
*/

const database = {
    weapons: {
        swords: {
            knife: {
                id: '1101',
                name: 'Knife',
                description: 'Atk: 3, Matk: 0, Def: 0, One-handed weapon',
                atk: 3,
                magicAtk: 0,
                def: 0,
                twoHanded: false,
                path: ['weapons', 'swords', 'knife'],
            },
            woodenSword: {
                id: '1102',
                name: 'Wooden Sword',
                description: 'Atk: 5, Matk: 0, Def: 3, One-handed weapon',
                atk: 5,
                magicAtk: 0,
                def: 3,
                twoHanded: false,
                path: ['weapons', 'swords', 'woodenSword'],
            },
            rapier: {
                id: '1103',
                name: 'Rapier',
                description: 'Atk: 7, Matk: 0, Def: 5, One-handed weapon',
                atk: 7,
                magicAtk: 0,
                def: 5,
                twoHanded: false,
                path: ['weapons', 'swords', 'rapier'],
            },
            sword: {
                id: '1104',
                name: 'Sword',
                description: 'Atk: 9, Matk: 0, Def: 7, One-handed weapon',
                atk: 9,
                magicAtk: 0,
                def: 7,
                twoHanded: false,
                path: ['weapons', 'swords', 'sword'],
            },
            brandedSword: {
                id: '1105',
                name: 'Branded Sword',
                description: 'Atk: 13, Matk: 0, Def: 6, Two-handed weapon',
                atk: 13,
                magicAtk: 0,
                def: 6,
                twoHanded: true,
                path: ['weapons', 'swords', 'brandedSword'],
            },
        },
        axes: {
            hatchet: {
                id: '1201',
                name: 'Hatchet',
                description: 'Atk: 6, Matk: 0, Def: 2, One-handed weapon',
                atk: 6,
                magicAtk: 0,
                def: 2,
                twoHanded: false,
                path: ['weapons', 'axes', 'hatchet'],
            },
            axe: {
                id: '1202',
                name: 'Axe',
                description: 'Atk: 10, Matk: 0, Def: 3, Two-handed weapon',
                atk: 10,
                magicAtk: 0,
                def: 3,
                twoHanded: true,
                path: ['weapons', 'axes', 'axe'],
            },
            lumberjackAxe: {
                id: '1203',
                name: 'Lumberjack Axe',
                description: 'Atk: 16, Matk: 0, Def: 3, Two-handed weapon',
                atk: 16,
                magicAtk: 0,
                def: 3,
                twoHanded: true,
                path: ['weapons', 'axes', 'lumberjackAxe'],
            },
        },
        rods: {
            apprenticeRod: {
                id: '1301',
                name: 'Apprentice Rod',
                description: 'Atk: 0, Matk: 7, Def: 0, One-handed weapon',
                atk: 0,
                magicAtk: 7,
                def: 0,
                manaCost: 2,
                twoHanded: false,
                path: ['weapons', 'rods', 'apprenticeRod'],
            },
            natureRod: {
                id: '1302',
                name: 'Nature Rod',
                description: 'Atk: 0, Matk: 13, Def: 0, One-handed weapon',
                atk: 0,
                magicAtk: 13,
                def: 0,
                manaCost: 3,
                twoHanded: false,
                path: ['weapons', 'rods', 'natureRod'],
            },
            tempestRod: {
                id: '1303',
                name: 'Tempest Rod',
                description: 'Atk: 0, Matk: 19, Def: 0, One-handed weapon',
                atk: 0,
                magicAtk: 19,
                def: 0,
                manaCost: 5,
                twoHanded: false,
                path: ['weapons', 'rods', 'tempestRod'],
            },
        },
        bows: {
            shortBow: {
                id: '1401',
                name: 'Short Bow',
                description: 'Atk: 7, Matk: 0, Def: 0, Two-handed weapon',
                atk: 7,
                magicAtk: 0,
                def: 0,
                twoHanded: true,
                path: ['weapons', 'bows', 'shortBow'],
            },
            bow: {
                id: '1402',
                name: 'Bow',
                description: 'Atk: 12, Matk: 0, Def: 0, Two-handed weapon',
                atk: 12,
                magicAtk: 0,
                def: 0,
                twoHanded: true,
                path: ['weapons', 'bows', 'bow'],
            },
            longbow: {
                id: '1403',
                name: 'Long Bow',
                description: 'Atk: 16, Matk: 0, Def: 0, Two-handed weapon',
                atk: 16,
                magicAtk: 0,
                def: 0,
                twoHanded: true,
                path: ['weapons', 'bows', 'longbow'],
            },
        },
    },
    armors: {
        coat: {
            id: '1501',
            name: 'Coat',
            description: 'Arm: 3',
            arm: 3,
            path: ['armors', 'coat'],
        },
        leatherArmor: {
            id: '1502',
            name: 'Leather Armor',
            description: 'Arm: 5',
            arm: 5,
            path: ['armors', 'leatherArmor'],
        },
        chainArmor: {
            id: '1503',
            name: 'Chain Armor',
            description: 'Arm: 7',
            arm: 7,
            path: ['armors', 'chainArmor'],
        },
        brassArmor: {
            id: '1504',
            name: 'Brass Armor',
            description: 'Arm: 10',
            arm: 10,
            path: ['armors', 'brassArmor'],
        },
        ironArmor: {
            id: '1505',
            name: 'Iron Armor',
            description: 'Arm: 13',
            arm: 13,
            path: ['armors', 'ironArmor'],
        },
        nobleArmor: {
            id: '1506',
            name: 'Noble Armor',
            description: 'Arm: 16',
            arm: 16,
            path: ['armors', 'nobleArmor'],
        },
        steelArmor: {
            id: '1507',
            name: 'Steel Armor',
            description: 'Arm: 20',
            arm: 20,
            path: ['armors', 'steelArmor'],
        },
        plateArmor: {
            id: '1508',
            name: 'Plate Armor',
            description: 'Arm: 25',
            arm: 25,
            path: ['armors', 'plateArmor'],
        },
    },
    shields: {
        woodenShield: {
            id: '1601',
            name: 'Wooden Shield',
            description: 'Def: 6',
            def: 6,
            path: ['shields', 'woodenShield'],
        },
        orcShield: {
            id: '1602',
            name: 'Orc Shield',
            description: 'Def: 9',
            def: 9,
            path: ['shields', 'orcShield'],
        },
        ironShield: {
            id: '1603',
            name: 'Iron Shield',
            description: 'Def: 10',
            def: 10,
            path: ['shields', 'ironShield'],
        },
        steelShield: {
            id: '1604',
            name: 'Steel Shield',
            description: 'Def: 14',
            def: 14,
            path: ['shields', 'steelShield'],
        },
        plateShield: {
            id: '1605',
            name: 'Plate Shield',
            description: 'Def: 18',
            def: 18,
            path: ['shields', 'plateShield'],
        },
        dragonShield: {
            id: '1606',
            name: 'Dragon Shield',
            description: 'Def: 21',
            def: 21,
            path: ['shields', 'dragonShield'],
        },
    },
    necklaces: {
        protectionAmulet: {
            id: '1701',
            name: 'Protection Amulet',
            charges: 200,
            bonus() {
                //to do
            },
            path: ['necklaces', 'protectionAmulet'],
        },
        silverAmulet: {
            id: '1702',
            name: 'Silver Amulet',
            charges: 200,
            bonus() {
                //to do
            },
            path: ['necklaces', 'silverAmulet'],
        },
    },
    rings: {
        lifeRing: {
            id: '1801',
            name: 'Life Ring',
            bonus() {
                //to do
            },
            path: ['rings', 'lifeRing'],
        },
    },
    backpacks: {
        bag: {
            id: '1901',
            name: 'Bag',
            description: 'Size: 6',
            size: 6,
            path: ['backpacks', 'bag'],
        },
        backpack: {
            id: '1902',
            name: 'Backpack',
            description: 'Size: 10',
            size: 10,
            path: ['backpacks', 'backpack'],
        },
        huntingBackpack: {
            id: '1903',
            name: 'Hunting Backpack',
            description: 'Size: 16',
            size: 16,
            path: ['backpacks', 'huntingBackpack'],
        },
        crimsonBackpack: {
            id: '1904',
            name: 'Crimson Backpack',
            description: 'Size: 20',
            size: 20,
            path: ['backpacks', 'crimsonBackpack'],
        },
    },
    usable: {
        potions: {
            lifePotion: {
                id: '2101',
                name: 'Life Potion',
                description: 'Heals for a small amount, tastes like strawberries.',
                price: 50,
                use() {
                    const recover = Math.floor(Math.random() * (150 - 110) + 110);
                    return ['life', recover];
                },
                path: ['usable', 'potions', 'lifePotion'],
            },
            manaPotion: {
                id: '2102',
                name: 'Mana Potion',
                description: 'Recovers a small amount of mana.',
                price: 60,
                use() {
                    const recover = Math.floor(Math.random() * (95 - 70) + 70);
                    return ['mana', recover];
                },
                path: ['usable', 'potions', 'manaPotion'],
            },
            antidote: {
                id: '2103',
                name: 'Antidote',
                description: 'Cures [Poison] status.',
                price: 100,
                use() {
                    return ['status', 'Poison'];
                },
                path: ['usable', 'potions', 'antidote'],
            },
        },
        foods: {
            cheese: {
                id: '2201',
                name: 'Cheese',
                description: 'A slice of cheese. Heals Hp/Mana for a very small amount',
                price: 15,
                use() {
                    player.hp[0] += Math.floor(Math.random() * (20 - 10) + 10);
                    player.mana[0] += Math.floor(Math.random() * (15 - 5) + 5);
                    if (player.hp[0] > player.hp[1]) {
                        player.hp[0] = player.hp[1];
                    }
                    if (player.mana[0] > player.mana[1]) {
                        player.mana[0] = player.mana[1];
                    }
                },
                path: ['usable', 'foods', 'cheese'],
            },
        },
    },
    miscellaneous: {
        creatures: {
            ratFlesh: {
                id: '3101',
                name: 'Rat Flesh',
                description: 'Just a piece of flesh, maybe someone on the market wants this.',
                price: 5,
                path: ['miscellaneous', 'creatures', 'ratFlesh'],
            },
            spiderFangs: {
                id: '3102',
                name: 'Spider Fangs',
                description: 'Fangs of a spider, maybe someone on the market wants this.',
                price: 7,
                path: ['miscellaneous', 'creatures', 'spiderFangs'],
            },
        },
        quests: {
            purpleRock: {
                id: '3301',
                name: 'Purple Rock',
                description: 'A piece of a purple pigmented rock. You can feel a weak aura coming out of it.',
                path: ['miscellaneous', 'quests', 'purpleRock'],
            },
        },
    },
};

module.exports = {
    database,
};
