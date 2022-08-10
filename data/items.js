const item = {
    weapons: {
        swords: {
            knife: {
                name: 'Knife',
                atk: 3,
                magicAtk: 0,
                def: 0,
                twoHanded: false,
            },
            woodenSword: {
                name: 'Wooden Sword',
                atk: 5,
                magicAtk: 0,
                def: 3,
                twoHanded: false,
            },
            rapier: {
                name: 'Rapier',
                atk: 7,
                magicAtk: 0,
                def: 5,
                twoHanded: false,
            },
            sword: {
                name: 'Sword',
                atk: 9,
                magicAtk: 0,
                def: 7,
                twoHanded: false,
            },
            brandedSword: {
                name: 'Branded Sword',
                atk: 13,
                magicAtk: 0,
                def: 6,
                twoHanded: true,
            },
        },
        axes: {
            hatchet: {
                name: 'Hatchet',
                atk: 6,
                magicAtk: 0,
                def: 2,
                twoHanded: false,
            },
            axe: {
                name: 'Axe',
                atk: 10,
                magicAtk: 0,
                def: 3,
                twoHanded: true,
            },
            lumberjackAxe: {
                name: 'Lumberjack Axe',
                atk: 16,
                magicAtk: 0,
                def: 3,
                twoHanded: true,
            },
        },
        rods: {
            apprenticeRod: {
                name: 'Apprentice Rod',
                atk: 0,
                magicAtk: 7,
                def: 0,
                manaCost: 2,
                twoHanded: false,
            },
            natureRod: {
                name: 'Nature Rod',
                atk: 0,
                magicAtk: 13,
                def: 0,
                manaCost: 3,
                twoHanded: false,
            },
            tempestRod: {
                name: 'Tempest Rod',
                atk: 0,
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
                magicAtk: 0,
                def: 0,
                twoHanded: true,
            },
            bow: {
                name: 'Bow',
                atk: 12,
                magicAtk: 0,
                def: 0,
                twoHanded: true,
            },
            longbow: {
                name: 'Long Bow',
                atk: 16,
                magicAtk: 0,
                def: 0,
                twoHanded: true,
            },
        },
    },
    armors: {
        coat: {
            name: 'Coat',
            arm: 3,
        },
        leatherArmor: {
            name: 'Leather Armor',
            arm: 5,
        },
        chainArmor: {
            name: 'Chain Armor',
            arm: 7,
        },
        brassArmor: {
            name: 'Brass Armor',
            arm: 10,
        },
        ironArmor: {
            name: 'Iron Armor',
            arm: 13,
        },
        nobleArmor: {
            name: 'Noble Armor',
            arm: 16,
        },
        steelArmor: {
            name: 'Steel Armor',
            arm: 20,
        },
        plateArmor: {
            name: 'Plate Armor',
            arm: 25,
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
                //to do
            },
        },
        silverAmulet: {
            name: 'Silver Amulet',
            charges: 200,
            bonus() {
                //to do
            },
        },
    },
    rings: {
        lifeRing: {
            name: 'Life Ring',
            bonus() {
                //to do
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
    usable: {
        potions: {
            lifePotion: {
                name: 'Life Potion',
                description: 'Heals for a small amount, tastes like strawberries.',
                stackable: true,
                price: 50,
                use() {
                    player.hp[0] += Math.floor(Math.random() * (70 - 40) + 40);
                    if (player.hp[0] > player.hp[1]) {
                        player.hp[0] = player.hp[1];
                    }
                },
            },
            manaPotion: {
                name: 'Mana Potion',
                description: 'Recovers a small amount of mana.',
                stackable: true,
                price: 60,
                use() {
                    player.mana[0] += Math.floor(Math.random() * (85 - 50) + 50);
                    if (player.mana[0] > player.mana[1]) {
                        player.mana[0] = player.mana[1];
                    }
                },
            },
            antidote: {
                name: 'Antidote',
                description: 'Cures [Poison] status.',
                stackable: true,
                price: 100,
                use() {
                    if (player.status.some(element => element.name === 'Poison')) {
                        for (let i = 0; i < player.status.length; i++) {
                            if (player.status[i].name === 'Poison') {
                                player.status.splice(i, 1);
                            }
                        }
                    }
                },
            },
        },
        foods: {
            cheese: {
                name: 'Cheese',
                description: 'A slice of cheese. Heals for a very small amount',
                stackable: true,
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
            },
        },
    },
    miscellaneous: {
        creatures: {
            ratFlesh: {
                name: 'Rat Flesh',
                description: 'Just a piece of flesh, maybe someone on the market wants this.',
                stackable: true,
                price: 5,
            },
            spiderFangs: {
                name: 'Spider Fangs',
                description: 'Fangs of a spider, maybe someone on the market wants this.',
                stackable: true,
                price: 7,
            },
        },
        quests: {
            purpleRock: {
                name: 'Purple Rock',
                description:
                    'A piece of a purple pigmented rock. You can feel a weak aura coming out of it, like a curse.',
                stackable: false,
            },
        },
    },
};

module.exports = {
    item,
};
