const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

var script = require('./script')

const app = express()
const port = 4000

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')));

// Envia para o html REACT
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

app.post('/count-hours', (req, res) => {
    script.contador_periodo(req, res) 
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
