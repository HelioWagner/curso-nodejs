import http from 'http'
import currentDate from './curretDate.js'
import myName from './myName.js'

http.createServer((req, res) => {
  
  console.log(req.url)

  switch(req.url) {
  case '/departamentos':
    res.write('<h2>Página de Departamentos</h2>') 
    break
  case '/contato':
    res.write('<h2>Página de Contato</h2>')
    break
  default:
    res.write(`<h1>Bem vindo ${myName()}</h1>`)
    res.write('<h2>Curso de NodeJS</h2>')
    break
  }

  // let nome = myName() 
  // let dataHora = currentDate() 
  

  // res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8'})
  // res.end('<h1>Bem Vindo</h1><b>'+nome)
  

}).listen(3030)