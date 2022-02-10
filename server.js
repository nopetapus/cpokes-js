const express = require('express');
const fs = require("fs");
const app = express()
const port = 3001

app.route('/api') {

};

app.post('/players/create/:', (req, res) => {
    console.log(``)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})