const _ = require('lodash')

class Card {
    constructor(rank, suit) {
        this.rank = rank
        this.suit = suit
        if (rank in ['2', 'J']) {
            this.wild = true
        }
    }
}

class Hand {
    constructor(cards) {
        this.cards = cards;
        this.organize();
    }
    organize() {
        const keys = {
            '3': 'threes', '4': 'fours', '5': 'fives', '6': 'sixes', '7': 'sevens', '8': 'eights',
            '9': 'nines', '10': 'tens', 'J': 'jacks', 'Q': 'queens', 'K': 'kings', 'A': 'aces',
            '2': 'twos', 'J': 'jokers'
        }
        for (let card in this.cards) {
            if (this.hasOwnProperty([keys[card.rank]])) {
                this[keys[card.rank]].push(card)
            } else {
                this[keys[card.rank]] = []
            }
        }
        this.cards.sort((a, b) => (a.rank > b.rank) ? 1 : -1)
    }
}

class Deck {
    constructor() {
        let cards = [];
        let ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
        let suits = ['hearts', 'spades', 'clubs', 'diamonds']
        for (let x = 0; x < 4; x++) {
            for (let suit in suits) {
                for (let rank in ranks) {
                    cards.push(new Card(rank, suit));
                };
            };
        };
        for (let x = 0; x < 4; x++) {
            cards.push('black', 'J');
            cards.push('red', 'J');
        };
        this.cards = _.shuffle(cards);
    }
    deal(players) {
        for (let player in players) {
            player.hand = new Hand(this.cards.splice(0, 36))
        }
    }
}

class Player {
    constructor(playerno, name) {
        this.id = playerno;
        this.name = name;
        this.order = null;
    };
    lead() {

    }
    play(value, number) {
        try {
            
        } catch {

        } finally {

        }
    }
}

class Round {
    constructor(cards) {
    }
}

class Game {
    constructor(players) {
        this.id = _.uniqueId('game-');
        this.players = []
        for (let player in players) {
            this.players.push(new Player(player.playerno, player.name));
        }
        this.deck = new Deck();
        this.deck.deal(this.players);
        this.gameComplete = false;
    }
    play() {
        do(
            this.players[0].lead()
        ); while (this.gameComplete == false)
    }
}

exports.game = new Game()