var express = require('express')
var app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/test', function (req, res) {
  res.render('test')
})

app.get('/test2', function (req, res) {
  res.render('testing')
})

app.listen(5000, function () {
    console.log('Example app listening on port 7000')
})
