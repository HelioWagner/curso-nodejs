import express from 'express'
//import path from 'path'
const app = express()

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
  console.log('post departamentos')
})
  
app.put('/departamentos/:idDepartamentos', (req, res) => {
  const {idDepartamentos } = req.params
  res.send(`<h1> Put Departamento - id:${idDepartamentos} </h1>`)
  console.log(`Put Departamento - id:${idDepartamentos}`)
})

app.delete('/departamentos/:idDepartamentos', (req, res) => {
  const {idDepartamentos } = req.params
  res.send(`<h1> Delete Departamento - id:${idDepartamentos} </h1>`)
  console.log(`Delete Departamento - id:${idDepartamentos}`)
})


app.listen(3033,() => {
  console.log('servidor executando')
})