const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
    '/sum': sum
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        
        handler(req, res, payload, (err, result) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

function getHandler(url) {
    return handlers[url] || NOTFOUND;
}

function sum (req, res, payload, cb) {
    const result = { c: payload.a + payload.b };
    cb (null, result);
}

function NOTFOUND (req, res, payload, cb) {
cb({ code: 404, message: 'Not found'})
}

function parseBodyJson(req, cb) {
    let body = [];

    req.on('data', function (chunk) {
        body.push(chunk);
        // console.log(body);
    }).on('end', function () {
        // console.log(body);
        // console.log(Buffer.concat(body));
        body = Buffer.concat(body).toString();
        // console.log(body);
        let params = JSON.parse(body);
        // console.log(params);
        cb(null, params)
    })
}