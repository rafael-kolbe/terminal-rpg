const location = {
    city: {
        name: 'city',
        direction: ['outskirts', 'cave'],
    },
    outskirts: {
        name: 'outskirts',
        direction: ['city'],
        mob: ['rat'],
    },
    cave: {
        name: 'cave',
        direction: ['city'],
        mob: ['rat', 'spider'],
    },
};

module.exports = {
    location,
};
