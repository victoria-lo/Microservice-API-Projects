// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/timestamp/:dateValue', function(req,res){
    let dateValue = req.params.dateValue; //gets request date, can be unix or ISO-8601 format
    
    //if more than 5 digits, it must be a unix string
    if (/\d{5,}/.test(dateValue)) {
        let dateInt = parseInt(dateValue);
        res.json({ unix: dateValue, utc: new Date(dateInt).toUTCString()});
    }

    //if req is not a unix
    let dateObject = new Date(dateValue);

    if (dateObject.toString() === "Invalid Date") { //checks if it is ISO-8601 format
        res.json({"unix": null, "utc" : "Invalid Date"});
    } else {
        res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
});

app.get("/api/timestamp", (req, res) => {
    res.json({ unix: Date.now(), utc: Date()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});