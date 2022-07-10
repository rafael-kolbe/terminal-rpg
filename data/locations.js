const { monster } = require('./monsters');

const location = {
    city: {
        name: 'city',
        direction: ['outskirts', 'cave'],
    },
    outskirts: {
        name: 'outskirts',
        direction: ['city'],
        mob: [monster.rat],
    },
    cave: {
        name: 'cave',
        direction: ['city'],
        mob: [monster.rat, monster.spider],
    },
};

module.exports = {
    location,
};
