var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.post('/extractor', function(req, res) {
    // Creating a nightmare Instance
    // Listening to post body object "selector" and "url"
    var target = {
      url: req.body.url,
      selector: req.body.selector
    }

    var Nightmare = require('nightmare');
    var nightmare = Nightmare({
        show: true
    });
    nightmare
        .goto(target.url)
        .wait()
        
        .evaluate(function(target) {
            return document.querySelector(target.selector).textContent;
        }, target)

        .end()
        .then(function(result) {
            res.send(result)
        })
        .catch(function(error) {
            res.send(error);
        });
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
