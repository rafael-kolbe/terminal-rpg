const location = {
    city: {
        name: 'city',
        direction: ['outskirts', 'cave'],
    },
    outskirts: {
        name: 'outskirts',
        direction: ['city'],
        mob: ['Rat', 'MutatedRat'],
    },
    cave: {
        name: 'cave',
        direction: ['city'],
        mob: ['Rat', 'Spider'],
    },
};

module.exports = {
    location,
};
