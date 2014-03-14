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

    //wkhtmltopdf('<h1>Test</h1><p>Hello world</p>')
    //.pipe(response);

    wkhtmltopdf.command = './wkhtmltopdf/bin/wkhtmltopdf.exe';
    var fs = wkhtmltopdf(queryAsObject["link"]);
    fs.pipe(response);
});
server.listen(8080);

