const express = require('express');
//require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("zaza");
const MongoClient = require('mongodb').MongoClient;
//const url = process.env.MONGODB_URI;
const url = 'mongodb+srv://AlphaOne:cop4331!@cluster0.bqiyan9.mongodb.net/COP4331';
const mongoose = require('mongoose');

mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connected successfully!");

    // --- Import and use API routes *after* successful DB connection ---
    const api = require('./api')
    api.setApp(app, mongoose);

    console.log("Ineza"); 

    // --- Start the server *after* MongoDB connection and API setup ---
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });





/*
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error

  var error = '';

  const { userId, card } = req.body;

  // TEMP FOR LOCAL TESTING.
  cardList.push( card );

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = '';

  const { login, password } = req.body;

  var id = -1;
  var fn = '';
  var ln = '';

  if( login.toLowerCase() == 'rickl' && password == 'COP4331' )
  {
    id = 1;
    fn = 'Rick';
    ln = 'Leinecker';
  }
  else
  {
    error = 'Invalid user name/password';
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:error};
  res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;
  var _search = search.toLowerCase().trim();
  var _ret = [];

  for( var i=0; i<cardList.length; i++ )
  {
    var lowerFromList = cardList[i].toLocaleLowerCase();
    if( lowerFromList.indexOf( _search ) >= 0 )
    {
      _ret.push( cardList[i] );
    }
  }

  var ret = {results:_ret, error:''};
  res.status(200).json(ret);
});

app.get('/', async (req, res, next) => {
  res.status(200).json({"test": "hello"});
});
*/

 // start Node + Express server on port 5000