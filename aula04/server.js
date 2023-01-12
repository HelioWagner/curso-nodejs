import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/clientes', (req, res) => {
  res.send('Clientes')
})

app.get('/clientes:idCkiente', (req, res) => {
  const {idCkiente } = req.params
  res.send(`<h1> Clientes - id:${idCkiente} </h1>`)
})

app.get('/produtos', (req, res) => {
  res.send({ id: 40,
    nome: 'Banana'      
            
  })
})

app.get('/pessoa', (req, res) => {
  res.json({ id: 40,
    nome: 'Helio'      
              
  })
})

app.get('/contatos', (req, res) => {
  res.sendFile('contato.html', {
    root: path.join(__dirname, 'public')
  })
})


app.listen(3033,() => {
  console.log('servidor executando')
})