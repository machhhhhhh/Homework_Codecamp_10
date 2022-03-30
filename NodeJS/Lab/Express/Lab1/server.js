const express = require('express')
const app = express()
const port = 5555 || process.env.PORT


app.get('/', (req,res) => {
    res.send('Hello World')
})

app.get('/bye', (req,res) => {
    res.send("Good Bye")
})

app.listen(port, ()=> console.log('listening at ' + port))