const express = require('express')
const powrt = require('./config/port')

const moviesRouter = require('./routers/moviesRouter')
const categoriesRouter = require('./routers/categoriesRouter')
const movcatRouter = require('./routers/movcatRouter')

const app = express()
const port = powrt

app.use(express.json())
app.use(moviesRouter)
app.use(categoriesRouter)
app.use(movcatRouter)

app.get('/', (req, res) => {
    res.send('Ini HomePage!!')
})

app.listen(port, () => {
    console.log('Berhasil Running di ' + port);
    
})

