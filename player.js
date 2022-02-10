const _ = require('lodash')

class Player {
    constructor(name) {
        this.id = _.uniqueId("player-");
        this.name = name;
        this.order = null;
    };
    lead() {

    }
    pass() {

    }
    play(value, number) {
        try {
            
        } catch {

        } finally {

        }
    }
}

module.exports = Player