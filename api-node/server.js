import express from 'express'
import bodyParser from 'body-parser'
import con from './connect-db.js'
import listarDepartamentos from './mock/ListarDepartamentos.json' assert{type: 'json'}
import listarDepartamento from './mock/ListarDepartamento.json' assert{type: 'json'}
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

//para node 16 deve passar assert
//import ListarDepartamentos from './mock/ListarDepartamentos.json' assert{ type: 'json'}
//import path from 'path'
const app = express()
app.use(bodyParser.json())
const useMock = false
//O extende Habilita JSON para suportar caracteres UTF-8
app.use(bodyParser.urlencoded({ extended: true }))

//swagger - documentação
const options = {
  definition: {
    info: {
      title: 'API NODE JS',
      version: '1.0.0'
    }
  },
  apis: ['server.js']
}
const swaggerSpec = swaggerJSDoc(options)

app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

/**
 * @swagger
 * 
 * /departamentos:
 *  get:
 *    description: Lista todos os departamentos ordenados pelo nome
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Exibe todos os departamentos em um vetor
 */

//////////////////////////////////////////////////

app.use(express.static('public'))

app.get('/departamentos', (req, res) => {
  //executa mock
  //res.send(listarDepartamentos)
  // console.log('departamentos')
   if (useMock) {
      res.send(listarDepartamentos)
      return
   }
  //Executa a query para o banco de dados
  con.query('SELECT * FROM DEPARTAMENTOS ORDER BY NOME', (err,result) =>{
   // console.log(result)
    if (err) {
      res.status(500)
      res.send(err) 
      console.log(err)
    }
    res.send(result)
  })



})

app.get('/departamentos/:idDepartamentos', (req, res) => {
    const {idDepartamentos } = req.params
  // res.send(`<h1> Get Departamento - id:${idDepartamentos} </h1>`)
  // console.log(`Get Departamento - id:${idDepartamentos}`)

  if (useMock) {
    res.send(listarDepartamento)
    return
  }

  con.query(`SELECT * FROM DEPARTAMENTOS WHERE id_departamento = ${idDepartamentos}`, (err,result) =>{
    // console.log(result)
    if (err) {
      res.status(500)
      res.send(err) 
      console.log(err)
    }
    res.send(result)
  })
})

/**
 * @swagger
 * 
 * /departamentos:
 *  post:
 *    description: Insere um departamento na base
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: formData
 *        name: nome
 *        description: nome do departamento (unique)
 *        required: true
 *        type: string
 *      - in: formData
 *        name: sigla
 *        description: sigla do departamento (unique)
 *        type: string 
 *    responses:
 *      200:
 *        description: registro inserido com sucesso
 *      500:
 *        description: erro do banco de dados
 */
app.post('/departamentos', (req, res) => {
  const method = req.method
  console.log(`${method} /departamentos`)
  let { nome = '', sigla = '' } = req.body

  nome = nome.trim()
  sigla = sigla.trim()

  if (nome === '' || sigla === '') {
    res.send({
      message: 'Wrong or insufficient parameters',
      parameters_received: req.body
    })
    return 
  }

  con.query(`INSERT INTO DEPARTAMENTOS (nome, sigla) VALUES ('${nome}', '${sigla}')`, (err, result) => {
    if (err) {
      res.status(500)
      res.send(err)
      return
    }

    //Em caso de sucesso:
    if (result.insertId) {
      res.send({
        message: 'Register inserted with success',
        insertId: result.insertId
      })  
      return
    }
    res.send(result)
  })
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

//exemplos utilizando diversos parametros
// Exemplo utilizando diversos formatos de parametros
app.get('/funcionarios/:busca', (req, res) => {
  const { busca } = req.params
  const { exact, searchField } = req.body
  const strLike = exact ? `= '${busca}'` : `LIKE '%${busca}%'`
  const query = `SELECT * FROM FUNCIONARIOS WHERE ${searchField} ${strLike}`

  console.log(query)

  con.query(query, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})

app.listen(3033,() => {
  console.log('servidor executando')
})