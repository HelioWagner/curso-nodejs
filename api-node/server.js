import express from 'express'
import bodyParser from 'body-parser'
//import path from 'path'
const app = express()
app.use(bodyParser.json())
//O extende Habilita JSON para suportar caracteres UTF-8
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/departamentos', (req, res) => {
  res.send('departamentos')
  console.log('departamentos')
})

app.get('/departamentos/:idDepartamentos', (req, res) => {
  const {idDepartamentos } = req.params
  res.send(`<h1> Get Departamento - id:${idDepartamentos} </h1>`)
  console.log(`Get Departamento - id:${idDepartamentos}`)
})


app.post('/departamentos', (req, res) => {
  res.send('post departamentos')
  console.log(req.params)
  console.log('post departamentos')
})
  
app.put('/departamento/:idDepartamentos', (req, res) => {
  const {idDepartamentos } = req.params
  res.send(`<h1> Put Departamento - id:${idDepartamentos} </h1>`)
  console.log(`Put Departamento - id:${idDepartamentos}`)
})

app.delete('/departamento/:idDepartamentos', (req, res) => {
  const {idDepartamentos } = req.params
  res.send(`<h1> Delete Departamento - id:${idDepartamentos} </h1>`)
  console.log(`Delete Departamento - id:${idDepartamentos}`)
})

app.listen(3033,() => {
  console.log('servidor executando')
})