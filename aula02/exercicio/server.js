//módulo http e dentro do módulo temos as funcões
import http from 'http'
import { readFile} from 'fs'
//import createServer from 'http'

http.createServer((req, res) => {  

  let httpStatus = 200 
  
  //busca nome do arquivo  
  let nomearquivo
  switch(req.url) {
  case '/contato':
    nomearquivo = 'contatos.html'
    break
  case '/clientes':
    nomearquivo = 'clientes.html'
    break
  default:
    nomearquivo = 'index.html'
    break
  }
  //montando cabeçalho
  res.writeHead(httpStatus, { 'Content-type': 'text/html; charset=utf-8'})

  //monta o arquivo
  readFile(nomearquivo,'utf-8', (err,data) =>{
    res.write(data)
    res.end()
  })
  
}).listen(3033)