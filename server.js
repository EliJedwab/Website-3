const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    
    const extname = String(path.extname(filePath)).toLowerCase();

    
    let contentType = 'text/html';
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    };
    if (mimeTypes[extname]) {
        contentType = mimeTypes[extname];
    }

    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end(`404 Not Found: ${filePath}`);
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
