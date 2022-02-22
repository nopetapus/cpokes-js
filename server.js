const express = require('express');
const cors = require('cors');
const Game = require('./cpokes.js')
const Player = require('./player.js')
const fs = require("fs");
const lodash = require('lodash');
const app = express()
const port = 3001

var gameDict = {}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendStatus(404);
})

app.post('/join', (req, res) => {
    const playerid = lodash.uniqueId('player-')
    const playername = req.body;
    const gameid = req.params.gameid;

    if (!gameDict.hasOwnProperty(gameid)) {
        res.send('GameNotFound')
    } else {
        gameDict[gameid][playerid] = new Player(playername);
    }

    res.send(gameDict[gameid]);
})

app.post('./create/:playername', (req, res) => {
    const gameid = lodash.uniqueId('game-');
    const playerid = lodash.uniqueId('player-');
    
    gameDict[gameid] = {gamestate: new Game(gameid), players: {playerid: new Player(req.params.playername)}};
    res.status(200).json({game: gameDict[gameid], id: playerid});
})

app.get('./game/:gameid/player/:playerid', (req, res) => {
    //get game status
    res.send(gameDict[req.params.gameid])
})

app.post('./game/play/:gameid-:playtype-:playerid-:cards', (req, res) => {
    load_game = gameDict[req.params.gameid];
    playerid = req.params.playerid
    if (load_game.players.hasOwnProperty(playerid)) {
        load_game.game.play()
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})