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
    '/api/articles/readall': constrollers.readall,
    '/api/articles/read': constrollers.read,
    '/api/articles/create': constrollers.create,
    '/api/articles/update': constrollers.update,
    '/api/articles/delete': constrollers.delete_article,
    '/api/comments/create': constrollers.create_comment,
    '/api/comments/delete': constrollers.delete_comment

};

function handler(req, res) {
    const { url, params } = helper.parseUrl(req.url);
    const handler = handlers[url];

    if (handler) {
        handler('log.txt', req, res, params);
    } else {
        constrollers.send400(req, res);
    }
    constrollers.log(req, 'log.txt')
}

