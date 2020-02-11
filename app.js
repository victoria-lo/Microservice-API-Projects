//Initialize imports
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Instance of express
var app = module.exports = express();

//Instantiate bodyParser and cors
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//GET to return JSON that formats dateValue parameter using these 2 methods:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString

app.get('/timestamp/:dateValue', function(req,res){
    let dateValue = req.params.dateValue; //gets request date, can be unix or ISO-8601 format
    
    //if more than 5 digits, it must be a unix string
    if (/\d{5,}/.test(dateValue)) {
        let dateInt = parseInt(dateValue);
        res.json({ unix: dateValue, utc: new Date(dateInt).toUTCString()});
    }

    //if req is not a unix
    let dateObject = new Date(dateValue);

    if (dateObject.toString() === "Invalid Date") { //checks if it is ISO-8601 format
        res.json({ error: "Invaid Date" });
    } else {
        res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
});

//In case user did not give a date param, return the current date
app.get("/timestamp/", (req, res) => {
    res.json({ unix: Date.now(), utc: Date()});
});


//Listen for requests
var listener = app.listen(5500, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
