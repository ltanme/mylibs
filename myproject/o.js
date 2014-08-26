var http = require('http');
http.createServer(function(req,res) {
    http.get("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js", send(res))
    .on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}).listen(8123,'127.0.0.1');
console.log('Server running at http://127.0.0.1:8123');

function send(res){
    return function(rawRes) {
        var size = 0;
        var chunks = [];
        rawRes.on('data', function (chunk) {
            size += chunk.length;
            chunks.push(chunk);
        });
        rawRes.on('end', function () {
            var data = Buffer.concat(chunks, size);
            console.log(data.toString())
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end(data + '\n');
        });
    }
};