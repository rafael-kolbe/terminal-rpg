const monster = {
    name: 'Amazon',
    drop: [
        { item: 'Sword', dropRate: 25, qty: 1 },
        { item: 'Apple', dropRate: 60, qty: 3 },
    ],
};

const monster2 = {
    name: 'Orc',
    drop: [
        { item: 'Axe', dropRate: 35, qty: 1 },
        { item: 'Cheese', dropRate: 45, qty: 2 },
    ],
};

const arrMonster = [monster, monster2];

console.log(arrMonster);

function droppedItems() {
    let drop = [];
    let deleteId = [];
    for (let monster of arrMonster) {
        monster.drop.forEach(item => drop.push(item));
    }

    drop.forEach(item => {
        let random = Math.floor(Math.random() * 100 + 1);
        random > item.dropRate ? deleteId.unshift(drop.indexOf(item)) : null;
    });

    deleteId.forEach(id => drop.splice(id, 1));

    return drop;
}

console.log(droppedItems());
