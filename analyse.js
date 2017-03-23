var express = require('express');
var path = require('path');
var app = express();

var PORT = 9001;

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, function(err){
  console.log(`analyse server listen on ${PORT}`);
})
