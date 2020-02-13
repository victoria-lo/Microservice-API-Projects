# Table of Contents
- [Timestamp Microservice](#timestamp)
- [Request Header Microservice](#request-header)
- [URL Shortener Mircroservice](#url-shortener)
- [Exercise Tracker API](#exercise)

<a name="timestamp"></a>
# Timestamp ⌛
**Timestamp Microservice Project inspired from FreeCodeCamp**
> 100DaysOfCode: Day 9

📝 [DEVLOG](https://medium.com/@victoria2666/100-days-of-code-day-9-of-100-5dc2f6086b3)

👀 [VIEW PROJECT](https://100daysofcode-day9.glitch.me)

### The Project
1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

#### Example usage:
`[base_url]/api/timestamp/timestamp/2015-12-15`
#### Example output:
`{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`

<a name="request-header"></a>
# Request Header ℹ️
**Request Header Parser Microservice Project inspired from FreeCodeCamp**
> 100 Days of Code: Day 10

📝 [DEVLOG](https://medium.com/@victoria2666/100-days-of-code-day-10-of-100-ad5f25d7faef)

👀 [VIEW PROJECT](https://100daysofcode-day10.glitch.me)

### The Project
- Gets the IP address, preferred languages (from header `Accept-Language`) and system infos (from header `User-Agent`) for client's device.

#### Example usage:
`[base_url]/api/whoami`
#### Example output:
`{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5","software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}`
#### Solution
```
  var ipAddress = req.ip;
  var language = req.headers['accept-language'];
  var software= req.headers['user-agent'];
```

<a name="url-shortener"></a>
# URL Shortener 🍃
**URL Shortener Microservice Project inspired from FreeCodeCamp**
> 100 Days of Code: Day 10

📝 [DEVLOG](https://medium.com/@victoria2666/100-days-of-code-day-10-of-100-ad5f25d7faef)

👀 [VIEW PROJECT](https://day10-urlshortener.glitch.me/)

### The Project
1. POST a URL to `[project_url]/api/shorturl/new` and receive a shortened URL in the JSON response. 
Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL (i.e. `[project_url]/api/shorturl/1`, it will redirect me to my original link.

#### Creation Example:

POST [project_url]/api/shorturl/new :  url=https://www.google.com to MongoDB Atlas
> Receive JSON `{"original_url":"www.google.com","short_url":1}`

#### Usage Example:

GET [project_url]/api/shorturl/1
> Will redirect to: https://www.google.com

<a name="exercise"></a>
# Exercise Tracker 🏃
**Exercise Tracker REST API Project inspired from FreeCodeCamp**
> 100 Days of Code: Day 11

📝 [DEVLOG](https://medium.com/@victoria2666/100-days-of-code-day-10-of-100-ad5f25d7faef)

👀 [VIEW PROJECT](https://day11-exercise-tracker.glitch.me/)

### The Project
1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and short_id.
2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will be the user object with also with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

#### Creation Example:
POST [project_url]/api/exercise/new-user :username to MongoDB Atlas
> Receive JSON `{"username":"Gym Addict","short_id":"XXXXX"}`

#### Add Exercise Example:
POST [project_url]/api/exercise/add
> Receive JSON `{"username": data.username, "description": descr, "duration": duration,"id": id, "date": date}`
