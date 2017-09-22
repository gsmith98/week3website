var express = require('express');
var app = express();

var path = require('path');

// Require and setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs  = require('express-handlebars');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/', express.static('public'));

var Message = require('./models.js').Message;

// Require mongoose
var mongoose = require('mongoose');
// Establish mongoose connection to the mongoDB on mlab
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

app.get('/new', function(req, res) {
  res.sendFile(path.join(__dirname, 'public' ,'post.html'));
});

app.post('/new', function(req, res) {
  var myMessage = new Message({
    Name: req.body.person,
    Message:req.body.message
  });

  myMessage.save(function(error) {
    if (error) {
      res.send(error)
    } else {
      res.redirect('/wall');
    }
  });
});

app.get('/wall', function(req, res) {
  Message.find(function(error, foundMessages) {
    if (error) {
      res.send(error);
    } else {
      //res.send(foundMessages)
      //console.log();
      res.render('wall', {posts: foundMessages});
    }
  });

});

app.get('/wall/:messageid', function(req, res) {
  Message.findById(req.params.messageid, function(error, foundMessage) {
    if (error) {
      res.send(error);
    } else {
      res.render('message', {msg: foundMessage.Message});
    }
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
