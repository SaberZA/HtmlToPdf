/**
 * Created by Steven on 2014/03/13.
 */
var http = require('http'),
    fileSystem = require('fs'),
    url = require('url'),
    wkhtmltopdf = require('wkhtmltopdf');

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true); // true to get query as object
    var queryAsObject = parsedUrl.query;
    var filePath = 'output.pdf';
    wkhtmltopdf.command = 'c:/wkhtmltopdf/bin/wkhtmltopdf.exe';
    wkhtmltopdf(queryAsObject["link"], {output: filePath}, function(){
        var stat = fileSystem.statSync(filePath);

        response.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': stat.size
        });

        var readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(response);
    });

});
server.listen(8080);

