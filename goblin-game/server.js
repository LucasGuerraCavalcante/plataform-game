const express = require('express')
const app = express();
const server = require('http').Server(app);

app.use(express.static(__dirname + '/public'))

app.get('/', function (req,res){
    resizeBy.senfile(__dirname + 'index.html');
});

server.listen(1338, function(){
    console.log(`Server on ${server.address().port}`)
});