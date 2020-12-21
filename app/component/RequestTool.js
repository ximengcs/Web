var http = require("http");
var querystring = require('querystring');

class RequestTool{

    static async post(path, parameters) {
        var content = querystring.stringify(parameters);
        var options = {
            hostname: '114.215.208.130',
            port: 8080,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        let data = {};
        let resultJSON = "";
        var promise = new Promise((resolve) => {
            var req = http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    resultJSON += chunk;
                });
                res.on('end', function() {
                    let response = JSON.parse(resultJSON);
                    data = response.data;
                    resolve(data);
                });
            });
            req.on('error', function(e) {
                console.log('problem with request: ' + e.message);
            });
            // write data to request body  
            req.write(content);
            req.end();
        });
        await promise;
        return data;
    }
}

module.exports = RequestTool;