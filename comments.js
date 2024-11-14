// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var comments = require('./comments.json');

app.use(cors());
app.use(bodyParser.json());

// Get comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Post comments
app.post('/comments', function(req, res) {
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            res.json(comments);
        }
    });
});

app.listen(3001);
console.log('Server is running on port 3001');