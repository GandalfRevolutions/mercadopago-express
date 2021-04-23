const express = require('express')
const app = express()
const port = 443

app.get('/checkout', (req, res) => {
  res.send('Hello Worldfunciona!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})