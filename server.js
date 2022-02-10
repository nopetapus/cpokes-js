const express = require('express');
const Game = require('./cpokes.js')
const Player = require('./player.js')
const fs = require("fs");
const app = express()
const port = 3001

app.post('/join/:playername-:gameid', (req, res) => {
    var player = new Player(req.params.playername);
    res.send('player joined game.');
})

app.post('./create/:playername', (req, res) => {
    console.log(req.params.playername);
})

app.get('./game/:gameid/', (req, res) => {
    //get game status
    res.sendJson()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})