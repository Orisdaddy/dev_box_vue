const fs = require('fs');
const host = require('process').argv[2];

let hscontent = fs.readFileSync('./src/network/request.js', 'utf8');
let wscontent = fs.readFileSync('./src/network/ws.js', 'utf8');

hscontent = hscontent.replace('${host}', host);
wscontent = wscontent.replace('${host}', host);

fs.writeFileSync('./src/network/request.js', hscontent);
fs.writeFileSync('./src/network/ws.js', wscontent);
