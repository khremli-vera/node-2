const fs = require('fs');
const helper = require('./helper');

function readall(req, res) {
    let array;

    fs.readFile('articles.json', (err, data) => {
        array = data.toString();
        console.log(typeof array)

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(array);
    })
}

function read(req, res, params) {
    let arrayStr;
    let array;
    fs.readFile('articles.json', (err, data) => {
        arrayStr = data.toString();
        array = JSON.parse(arrayStr);
        let article = array[params.id];
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(article))
    })
}

function create(req, res) {
    let arrayStr;
    let array;
    fs.readFile('articles.json', (err, data) => {
        arrayStr = data.toString();
        array = JSON.parse(arrayStr);

        helper.parseBody(req, (err, body) => {
            const newArticle = {
                id: array.length + 1,
                title: body.title,
                text: body.text,
                date: body.date,
                author: body.author,
                comments: []
            };
            array.push(newArticle);
            let json = JSON.stringify(array);
            fs.writeFile('articles.json', json, 'utf-8', (err) => {
                if (err) {
                    console.log('Cant write to file');
                } else {
                    console.log('the file was updated')
                }
            })
            res.statusCode = 201;
            res.end(JSON.stringify(newArticle));
        });
    })
}

function update (req, res, params) {
    let arrayStr;
    let array;

    fs.readFile('articles.json', (err, data) => {
        arrayStr = data.toString();
        array = JSON.parse(arrayStr);

        helper.parseBody(req, (err, body) => {
            array = array.map(item => item.id != params.id ? item : {
                id: item.id,
                title: body.title || item.title,
                text: body.text || item.text,
                date: body.date || item.date,
                author: body.author || item.author,
                comments: item.comments
            })
       
            let json = JSON.stringify(array);
            fs.writeFile('articles.json', json, 'utf-8', (err) => {
                if (err) {
                    console.log('Cant write to file');
                } else {
                    console.log('the file was updated')
                }
            })
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end('Updated')
    })
    })
}

function delete_article (req, res, params) {
    let arrayStr;
    let array;

    fs.readFile('articles.json', (err, data) => {
        arrayStr = data.toString();
        array = JSON.parse(arrayStr);
        array.splice(params.id - 1 , 1)
        console.log(array);
        let json = JSON.stringify(array);
            fs.writeFile('articles.json', json, 'utf-8', (err) => {
                if (err) {
                    console.log('Cant write to file');
                } else {
                    console.log('the file was updated')
                }
            })
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end('Deleted')
    })
}


module.exports = {
    readall,
    read,
    create,
    update,
    delete_article
}