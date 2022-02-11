const express = require('express');
const cors = require('cors')
const Game = require('./cpokes.js')
const Player = require('./player.js')
const fs = require("fs");
const lodash = require('lodash');
const { json } = require('body-parser');
const app = express()
const port = 3001

var gameDict = {}

app.use(express.json())

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

app.post('./create', (req, res) => {
    const gameid = lodash.uniqueId('game-');
    const playerid = lodash.uniqueId('player-');
    
    gameDict[gameid] = {gamestate: new Game(gameid), players: {playerid: new Player(req.params.playername)}};
    res.send(gameDict[gameid])
})

app.get('./game/', (req, res) => {
    //get game status
    res.send(gameDict[req.params.gameid])
})

app.post('./game/', (req, res))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})