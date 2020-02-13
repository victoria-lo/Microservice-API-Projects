// dns is node.js core module (no need to have it as a dependency in package.json)
const dns = require("dns");    
const shortUrl = require("./shortUrl.js"); 

// To know which number to assign as a value to the next short_url key added to our database, we'll write a little function to see what number we're up to.
// Our function will find all entries, sort by the short_url key in descending order, and then limit the results to the first in the array (i.e. the max):
// We'll keep track of the current largest short_url value in a variable:
let maxShortUrl = 0;

const shortUrlUpdater = function() {
  shortUrl.find().lean().sort( {short_url: -1} ).limit(1).exec(function(err, data) {
      // We'll handle any connection-related errors first:
      if (err) return console.log("Error:", err);
      // If there are no errors, we'll check to see if we received any data:
      if (data.length > 0) {
        // It Looks like we have some Documents/Instances in our database already. Let's save the max value to our variable:
        maxShortUrl = data[0].short_url;
      }
      // If we receive an empty array back, then we can conclude that the database is currently empty...
      else {
        // Looks like we still don't have any Documents/instance in our database, so we'll leave maxShortUrl as it is (should be zero);
      }
  });  
};


// It'll get called whenever there is a POST event at /api/shorturl/new

exports.postLongUrl = function(req, res) {
  shortUrlUpdater();
  
  // Next we'll break the requested URL into useful pieces:
  let reqUrl = req.body.url;
  let protocol = reqUrl.substring(0, reqUrl.indexOf("://") + 3);
  let urlWithSubdir = reqUrl.substring(protocol.length);
  let hostName = "";    // dns.lookup() needs to be passed only the hostname (e.g. www.wikipedia.org), otherwise it'll throw "Error: getaddrinfo ENOTFOUND".
  
  // The reqUrl may have trailing subdirectories and files. Because dns.lookup() can't handle these, we'll save only the hostname (e.g. www.wikipedia.org) as its own variable:
  if (urlWithSubdir.indexOf("/") >= 0) {
    // If the URL has subdirectories, remove them and save the result as hostname:
    hostName = urlWithSubdir.substring(0, urlWithSubdir.indexOf("/"));
  }
  else {
    // If the URL doesn't have subdirectories, then hostname should be set equal to urlWithSubdir:
    hostName = urlWithSubdir;
  };
  
  
  // With our reqUrl now chopped up into pieces that we can more easily use, let's carry on:
  // The project requires that POSTed URLs be in the format of: http(s)://www.example.com(/more/routes). Let's check to see if our URL has the correct protocol:
  if (protocol != "http://" && protocol != "https://") {
    // Looks like the POSTed URL doesn't pass the format test, so as per the user stories we'll return a JSON object error message:
    return res.json( {"error": "invalid URL"} );
  };
  
  // Next, to check if reqUrl points to a valid website, we'll use Node.js's core module dns.lookup() to see if the hostname (e.g. www.wikipedia.org ) returns
  // an IP address (and therefore exists/is valid):
  // Because dns.lookup() is asynchronous and could take a bit of time (especially when using it for false hostnames), we'll set it up as a promise, and therefore
  // only run the code that follows it once we have finished our lookup:
  
  dns.lookup(hostName, function(err, address) {
    if (err) {
      return res.json( {"error": "invalid hostname"} )
    }
    else {
      // Next, let's check to see if we already have it in our database:
      shortUrl.findOne( {"original_url": reqUrl}, function(err, data) {
        // In our callback, we'll make sure to handle any errors that might arrise when connecting to the DB:
        if (err) return console.log("Error querying the database for reqUrl:", err);

        if (data) {
          //reqUrl is already in our database, so return its data:
          return res.json({
            "original_url": reqUrl,
            "short_url": data.short_url
          });
        }

        else {
          //create a new entry and save it to the DB:      
          let newEntry = new shortUrl({
            "original_url": reqUrl,
            "short_url": maxShortUrl + 1
          });      
          // save it to the DB:
          newEntry.save(function(err, data) {
            if (err) return console.log("Error:", err);
            return res.json({"original_url": reqUrl,"short_url": maxShortUrl + 1});
          });

        };  // END of else statement for saving and creating a new DB entry   
      })  // END of logic related to UrlEntry.findOne()
    }  // END of big ELSE statement within our dns.lookup() effort
  });  // END of logic related to our dns.lookup() effort

};  // END of .postLongUrl() 

exports.getShortUrl = function(req, res) {  
  let shortenUrl = req.params.short_url;
  if ( isNaN( +shortenUrl ) ) {
    return res.json({"error": "invalid URL"});
  }
  else {
    // check if saved in our DB using .findOne():
    shortUrl.findOne( {"short_url": shortenUrl}, function(err, data) {
        if (err) return console.log("Error:", err);      
        // If there are no errors, then we might have received some data from our query:
        if (data) {
          // If we have a matching entry in our database, redirect the user to the associated long-form URL:
          res.redirect(data.original_url);
        }
        else {
          // If we don't have matching data in our database, then we must conclude that the user has tried to navigate to non-existing short_url page on the site:
          return res.json({"error": "No data in file"});
        }
    });
    
  }  // END of else statement (i.e. when requested short URL is valid)  
};  // END of exports.getShortUrl()