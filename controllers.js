const fs = require('fs');
const helper = require('./helper');
let artData;



function readall(req, res) {
    let array;

    fs.readFile('articles.json', (err, data) => {
        array = data.toString();
        console.log(typeof array)

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        // news.forEach(item => res.write(`[${item.date}]: ${item.text}</br>`));
        res.end(array);
    })
}

function read (req, res, params) {
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

// function getFile(req, res) {
//     fs.readFile('example.txt', 'utf-8', (err, data) => {
//         res.setHeader('Content-Type', 'text/plain');
//         res.end(data);
//     })

//     fs.writeFile('example.txt', 'any text', {}, () => console.log('file written'))
// }

module.exports = {
    readall,
    read
}