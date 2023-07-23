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
        const data = fs.readFileSync('./users.txt');
        res.write(JSON.stringify(data.toString().split('\n')));
        return res.end();
    }

    if(req.url === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const name = JSON.parse(body).name;
            fs.appendFileSync('./users.txt', `${name}\n`);
            return res.end();
        });
    }

    if(req.url === '/users' && req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const prevData = fs.readFileSync("./users.txt").toString().trim().split('\n');
            if(!prevData.includes("x|"+body.trim())&&!prevData.includes("o|"+body.trim())){
                res.statusCode = 404;
                res.end('not found');
                return;
            }
            fs.writeFileSync("./users.txt", prevData.filter(item => item.split('|')[1] !== body.trim()).join('\n'));
            res.statusCode = 200;
            res.end();
        });
    }
}

const server = http.createServer(whenIncomingRequest);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});