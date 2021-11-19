const express = require('express')
const path = require('path')
const app = express()
const PORT = 5000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'frontend')))

if (app.listen(PORT)) {
    console.log(`Server is running on ${PORT}`)
}