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

// function getFile(req, res) {
//     fs.readFile('example.txt', 'utf-8', (err, data) => {
//         res.setHeader('Content-Type', 'text/plain');
//         res.end(data);
//     })

//     fs.writeFile('example.txt', 'any text', {}, () => console.log('file written'))
// }

module.exports = {
    readall
}