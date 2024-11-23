const http = require('http');
const helper = require('./helper');
const constrollers = require('./controllers');

const hostname = '127.0.0.1';
const port = 2000;

const server = http.createServer(handler);
server.listen(port, hostname, () => {
    console.log('Running');
});


const handlers = {
    '/api/articles/readall': constrollers.readall
};

function handler(req, res) {
    const { url, params } = helper.parseUrl(req.url);
    console.log(url)
    const handler = handlers[url];

    if (handler) {
        handler(req, res, params);
    } else {
        send404(req, res);
    }
}

function send404(req, res) {
    res.statusCode = 404;
    res.end('404 Page Not Found');
}