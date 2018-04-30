// Required Packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

// Pass everything through the logger first
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    exrtended: false
}));
// create a publ;ic folder and land there
app.use(express.static('public'));

// Datsbase config
mongoose.connect('mongodb://localhost/mongoosescraper');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function () {
    console.log('Mongoose connection succesful.');
});

// Require Schemas
var Note = require('./models/Notes.js');
var Article = require('./models/Articles.js');

// Routes
app.get('/', function(req, res) {
    // send the html file instesad of rendering the handlebsars file
    res.send(index.html);
});

app.get('/scfape', function(req, res) {
    request('http://www.echojs.com/', function(error, responce, html) {
        $('article h2').each(function(i, element) {

            var result ={};

            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');

            var entry = new Article (result);

            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });
        });
    });
    res.send("Scrspe Complete");
});

app.get('/articles', function(req, res) {
    Article.find({}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

app.get('/articles/:id', function(req, res) {
    Article.findOne({'_id': req.params.id})
    .populates('note')
    .exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

app.post('/articles/:id', function(req, res) {
    var newNote = Note(req.body);

    newNote.save(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            Article.findzOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(doc);
                }
            });
        }
    });
});

app.listen(3008, function() {
    console.log('App running on port 3008!');
});