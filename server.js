const http = require('http');
const router = require('./lib/router');
const fs = require('fs');

var count = 0;
function counter () {
  count++;
  var time = new Date().toString().slice(16,24);
  return time;
};
var routes = new router();
routes.post('/notes', function(req, res) {
  req.on('data', (data) => {
    var fileNameTime = counter();
    console.log('saving JSON data to /notes');
    fs.writeFile('./notes/' + fileNameTime + '.json',data, (err) => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    console.log('JSON data input saved to location /notes/' + fileNameTime + '.json\n');
    res.write('{"message":"saving JSON data to /notes/'+ fileNameTime + '"}');
    res.end();
    });
  });
})
.get('/notes', function (req, res) {
  fs.readdir('./notes', (err, files) => {
    if(files.length < 1) {
      err = 'ERROR: no files at location /notes\n';
      console.log(err);
    } else {
      console.log('Getting file list from location /notes');
      res.writeHead(200);
      for(var i = 0; i < files.length; i++) {
        res.write('filepath: ' + req.url + '/' + files[i].toString() + '\n');
        console.log(files[i]);
      }; // takes the array of fileNames and writes them each on a seperate line.
    }
    res.end();
  });
})
.delete('/notes', function (req, res) {
  fs.readdir('./notes', (err, files) => {
    if(files.length < 1) {
      err = 'ERROR: no files at location /notes\n';
      console.log(err);
    } else {
      console.log('\nDeleting all files from location /notes');
      for(var i = 0; i < files.length; i++) {
        fs.unlink(__dirname + req.url + '/' + files[i]);
      }
      res.write('All files deleted from location /notes');
      console.log('All files deleted from location /notes\n');
    }
    res.end();
  })
})
module.exports = http.createServer(routes.route()).listen(3000, () => console.log('server is now running on port 3000\n'));
