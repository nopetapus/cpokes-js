const express = require('express');
const Game = require('./cpokes.js')
const Player = require('./player.js')
const fs = require("fs");
const lodash = require('lodash')
const app = express()
const port = 3001

var gameDict = {}

app.get('/', (req, res) => {
    res.send('No defined method here.')
})

app.post('/join/:playername-:gameid', (req, res) => {
    const playerid = lodash.uniqueId('player-')
    const playername = req.params.playername;
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
    res.send(gameDict[gameid])
})

app.get('./game/:gameid/', (req, res) => {
    //get game status
    res.send(gameDict[req.params.gameid])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})