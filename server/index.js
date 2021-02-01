var http = require('http');
const { Connection } = require('./lib/Connection.js')

Connection.connectToMongo();

setTimeout(() => {
  
Connection.db.collection("test").insertOne({ name: "Company Inc", address: "Highway 37" }, function(err, res) {
  if (err) throw err;
  console.log("1 document inserted");
  db.close();
});
}, 5000);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(5000);