'use strict';

const express = require("express");
const mongo = require("mongodb");    // We'll need a database to keep track of all the shortened links we've created and where they should lead to
const mongoose = require("mongoose");    // We'll use mongoose to make it easier to work with our mongoDB database (mongoose serves as a front-end for MongoDB)
const bodyParser = require("body-parser");    // Because the user will be able to submit (i.e. POST) content to the server, we'll need this dependency. It'll read any POST requests and store the user input as a javascript object that we can readily access via req.body
const urlHandler = require("./urlHandler.js");
var app = express();

const port= process.env.PORT || 3000;
app.use( bodyParser.urlencoded( { "extended": false } ) );

// Next, for freeCodeCamp to be able to remotely test the project/API/app, we need to enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing):
const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {useMongoClient: true}, function(err) {
  if (err) return console.log("Error:", err);
  console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
});


//Allows node to find static content (i.e. css)
app.use('/public', express.static(process.cwd() + '/public'));

//Gets homepage
app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

//when the user clicks POST URL button
app.post("/api/shorturl/new", urlHandler.postLongUrl);

//when we have to redirect
app.get("/api/shorturl/:short_url", urlHandler.getShortUrl);


app.listen(port, function () {
  console.log('Node.js listening ...');
});