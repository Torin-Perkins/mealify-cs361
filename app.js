var path = require('path');
var express = require('express');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var exphbs = require('express-handlebars');

var postData = require("./postData.json");
console.log("== postData:", postData);

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({
    defaultLayout: "home"
  }));
app.set('view engine', 'handlebars');
  
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.status(200).render('layouts/home', {scrollers: postData});
});

app.post('/jsondata', jsonParser, function(req, res){
  console.log("recieved new monster request " + req.body.name);
    
    
    var filepath = "./postData.json"
    postData.push(req.body)
    fs.writeFile(filepath, JSON.stringify(postData, null, 2), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    res.status(200).render('home', {
        monster:postData
    })
    
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

