const monsterScript = {
    rat() {
        console.log('Rat used a basic attack!');
        return this.attack();
    },
    spider() {
        const action = Math.floor(Math.random() * 2);
        if (action) {
            console.log('Spider used a basic attack!');
            return this.attack();
        } else {
            console.log('Spider used bite!');
            return this.bite();
        }
    },
    mutatedRat() {
        if (this.hp[0] > 120) {
            console.log('Mutated Rat used a basic attack!');
            return this.attack();
        } else {
            const action = Math.floor(Math.random() * 2);
            if (action) {
                console.log('Mutated Rat used a basic attack!');
                return this.attack();
            } else {
                console.log('Mutated Rat used poisonous strike!');
                return this.poisonousStrike();
            }
        }
    },
};

module.exports = {
    monsterScript,
};
