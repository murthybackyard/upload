var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/upload', function(req, res){
  console.log('inside upload method');
  // create an incoming form object
  var form = new formidable.IncomingForm();
console.log('inside upload method 1');
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  //form.uploadDir = path.join(__dirname, '/uploads');
  form.uploadDir = __dirname;
  console.log('upload dirname1',__dirname);
  console.log('inside upload method 2');
  

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    console.log('inside upload method 3');
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
  console.log('inside upload method 4');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


