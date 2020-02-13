const mongoose = require("mongoose");
const shortId = require('shortid');

// We'll create a schema for our database entries to follow
const userSchema = new mongoose.Schema({
  shortId: {type: String, unique: true, default: shortId.generate},
  username: String,
  exercise: [{
    desc : String,
    duration: Number,
    date : {}
  }]
});

var Person = mongoose.model("newUser", userSchema);

//check date validility
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

//adds new exercise
exports.addExercise = function(req,res){
  let id = req.body.userId;
  let descr = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date;
  
  if(date != ''){
    date = new Date(req.body.date); //save as Date object
  }
  
  if(descr == ''|| duration == '' || id == ''){
    return res.json({error: 'missing values'});
  }
  
  //check if id exists in database
  Person.findOne({shortId:id}, (err,data)=>{
    if (data == null){
      return res.json({error: 'id not found'});
    }else{
      data.exercise = data.exercise.concat({desc : descr, duration: duration, date: date});
      //save
      data.save((err, data) => {
        if (err) return res.json({error: err});
      });
      return res.json({"username": data.username, "description": descr, "duration": duration,"id": id, "date": date});
    }
  });
}

//adds new user to database
exports.addUser= function(req, res) {
  let username = req.body.username;
  Person.findOne({username:username}, (err,findData)=>{
    if (findData == null){
      //no user currently, make new
      const person = new Person({username : username, exercise : []});
      person.save((err,data)=>{
        if(err){
          return res.json({error: err});
        }
        return res.json({"username":findData.username,"id":findData.shortId});
      });
    }else{
      //username taken, show their id
      return res.json({error:"This username is taken","id":findData.shortId});
    }
  });
}

//displays exercise log
exports.displayLog= function(req, res) {
  Person.findOne({shortId:req.params.userId}, (err,data) =>{
    if (data == null){
      return res.json({error: "not found"});
    }else{
      let results = data.exercise;
      let fromDate = new Date(req.query.from);
      let toDate = new Date(req.query.to);
      let limit = Number(req.query.limit);
      //check if to is defined
      if (isValidDate(toDate)){
        results = results.filter((item) => (item.date >= fromDate && item.date <= toDate));
      //check if just from defined
      }else if(isValidDate(fromDate)){
        results = results.filter((item)=>(item.date >= fromDate))
      }
      //apply limit if defined and applicable
      if (!isNaN(limit) && results.length > limit){
        results = results.slice(0,limit);
      }
      return res.json({"exercise": results}); //return log
    }
  });
  
}

//displays all Users
exports.displayUsers= function(req, res) {
  var query = Person.find({}).select({ "username": 1, "_id": 0, "shortId":1});
  
  query.exec(function (err, data) {
        if (err) return res.json({error: err});
        return res.json(data);
  });
}
 
