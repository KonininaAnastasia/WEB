const http = require("node:http");

const host = '127.0.0.1';
const port = 8000;
const hosting = `http://${host}:${port}`

const comments = ['my', 'name', 'is']
let users = {}

function badRequest(res){
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.end("bad request")
}

const requestListener = function (req, res) {
    const method = req.method
    const url = req.url
    const name = req.headers['user-agent']

    switch (url){
        case "/":
            if (method === "GET"){
                res.writeHead(200, {'Content-Type': 'text/plain'})
                res.end("hello")
            }else{
                badRequest(res)
            }
            break;
        case "/comments":
            if (method === "POST"){
                res.writeHead(200, {'Content-Type': 'text/plain'})

                let data = ''
                req.on('data', (chunk) => {
                    data += chunk
                })
                req.on('end', () => {
                    comments.push(data)
                    res.end(JSON.stringify(comments))
                })
            }else{
                badRequest(res)
            }
            break;
        case "/stats":
            if (method === "GET"){
                res.writeHead(200, {'Content-Type': 'text/html'})
                let data = ''
                req.on('data', (chunk) => {
                    data += chunk
                })
                req.on('end', () => {
                    if (users[name]){
                        users[name] += 1
                    }else{
                        users[name] = 1
                    }
                    let firstHtml =
                        '<table>'+
                            '<tr>' +
                                '<td>Name</td>' +
                                '<td>Count request</td>' +
                            '</tr>';
                    let secondHtml = ''
                    for (const key in users) {
                        if (key){
                            secondHtml +=   `<tr>
                                                <td>${key}</td>
                                                <td>${users[key]}</td>
                                            </tr>`;
                        }
                    }
                    let myHtml = firstHtml + secondHtml + '</table>'
                    res.end(myHtml)
                })
            }else{
                badRequest(res)
            }
            break;
        default:
            badRequest(res)
            break;
    }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => { console.log(`Server is running on ${hosting}`);
});