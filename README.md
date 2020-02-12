# Table of Contents
- [Timestamp Microservice](#timestamp)
- [Request Header](#request-header)

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

# Request Header
**Request Header Parser Microservice Project inspired from FreeCodeCamp**
> 100 Days of Code: Day 10

📝 [DEVLOG](https://medium.com/@victoria2666/100-days-of-code-day-9-of-100-5dc2f6086b3)

👀 [VIEW PROJECT](https://100daysofcode-day10.glitch.me)

### The Project
- Gets the IP address, preferred languages (from header `Accept-Language`) and system infos (from header `User-Agent`) for client's device.

#### Example usage:
`[base_url]/api/whoami`
#### Example output:
`{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5","software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}`
