const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

function whenIncomingRequest(req, res) {
    if(req.url === '/' && req.method === 'GET'){
        const data = fs.readFileSync('./index.html');
        res.write(data);
        return res.end();
    } 

    if(req.url === '/users' && req.method === 'GET') {
        const data = fs.readFileSync('./users.txt').toString().trim().split('\n');
        if(data == '') return res.end();
        res.write(JSON.stringify(data));
        return res.end();
    }

    if(req.url === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += JSON.parse(chunk).name.toString();
        });
        req.on('end', () => {
            if(body.trim() === ''){
                res.statusCode = 400;
                res.end('empty body');
                return;
            }
            const appendData = body.trim();
            const prevData = fs.readFileSync("./users.txt").toString().split('\n');
            if(prevData.includes(body.trim())){
                res.statusCode = 409;
                res.end('already exists');
                return;
            }
            fs.writeFileSync("./users.txt", prevData.join('\n') + appendData + '\n');
            res.statusCode = 201;
            res.end();
        });
    }

    if(req.url === '/users' && req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += JSON.parse(chunk).name.toString();
        });
        req.on('end', () => {
            const prevData = fs.readFileSync("./users.txt").toString().split('\n');
            if(!prevData.includes(body.trim())){
                res.statusCode = 404;
                res.end('not found');
                return;
            }
            fs.writeFileSync("./users.txt", prevData.filter(item => item !== body.trim()).join('\n'));
            res.statusCode = 200;
            res.end();
        });
    }
}

const server = http.createServer(whenIncomingRequest);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});