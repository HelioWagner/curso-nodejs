import http from 'http'
http.createServer((req, res) => {
  //res.writeHead(200, {'Content-Type': 'text/plain'})
  const total = 50
  if (total % 2 === 1) {
    res.end('é impar!')
  } else {
    res.end('é par!')
  }
  
}).listen('3033')