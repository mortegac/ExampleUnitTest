var spawn = require('child_process').spawn;
var fs = require('fs');

var child = spawn('node', ['./index.js'], {
  detached: true,
  stdio: 'ignore'
});

fs.writeFileSync('./test/app.pid', child.pid);
child.unref();




