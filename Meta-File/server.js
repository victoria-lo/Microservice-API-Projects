'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

var upload = multer({ dest: 'uploads/' });

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'),function(req, res){
  let filename = req.file.originalname;
  let size = req.file.size;
  let type = req.file.mimetype;
  return res.json({"name": filename, "type": type, "size": size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
