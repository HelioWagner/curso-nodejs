import express from 'express'
import bodyParser from 'body-parser'
import con from './connect-db.js'
import listarDepartamentos from './mock/ListarDepartamentos.json' assert{type: 'json'}
import listarDepartamento from './mock/ListarDepartamento.json' assert{type: 'json'}
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import axios from 'axios'
import cors from 'cors'
//import handler from './header.js'

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
app.use(cors())

app.get('/departamentos', (req, res) => {
  //executa mock
  //res.send(listarDepartamentos)
  // console.log('departamentos')
  if (useMock) {
    res.send(listarDepartamentos)
    return
  }
  //Executa a query para o banco de dados
  con.query('SELECT * FROM DEPARTAMENTOS ORDER BY NOME', (err, result) => {
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
  const { idDepartamentos } = req.params
  // res.send(`<h1> Get Departamento - id:${idDepartamentos} </h1>`)
  // console.log(`Get Departamento - id:${idDepartamentos}`)

  if (useMock) {
    res.send(listarDepartamento)
    return
  }

  con.query(`SELECT * FROM DEPARTAMENTOS WHERE id_departamento = ${idDepartamentos}`, (err, result) => {
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

/**
 * @swagger
 * 
 * /departamento/{idDepartamentos}:
 *  put:
 *    description: Altera um departamento na base
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: formData
 *        name: nome
 *        description: nome do departamento 
 *        required: true
 *        type: string
 *      - in: path
 *        name: idDepartamentos
 *        required: true
 *        type: integer 
 *        description: idDepartamentos do departamento  
 *    responses:
 *      200:
 *        description: registro inserido com sucesso
 *      500:
 *        description: erro do banco de dados
 */
app.put('/departamento/:idDepartamentos', (req, res) => {
  const { idDepartamentos } = req.params
  const { nome = '' } = req.body
  con.query(`UPDATE DEPARTAMENTOS SET NOME = '${nome}' WHERE id_departamento = ${idDepartamentos}`, (err, result) => {
    if (err) {
      res.status(500)
      res.send(err)
      return
    }

    //Em caso de sucesso:
    if (result.affectedRows) {
      res.send({
        message: 'Alterado com success',
        affectedRows: result.affectedRows
      })
      return
    }
    res.send(result)
  })


})

/**
 * @swagger
 * 
 * /departamento/{idDepartamentos}:
 *  delete:
 *    description: deleta um departamento na base
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: idDepartamentos
 *        required: true
 *        type: integer 
 *        description: idDepartamentos do departamento  
 *    responses:
 *      200:
 *        description: registro excluído com sucesso
 *      500:
 *        description: erro do banco de dados
 */
app.delete('/departamento/:idDepartamentos', (req, res) => {
  //const {idDepartamentos } = req.params
  //res.send(`<h1> Delete Departamento - id:${idDepartamentos} </h1>`)
  //nome da variavel deve ser igual do parametroa da url
  const { idDepartamentos } = req.params
  //verifico se foi informado departamento

  //const method = req.method
  //console.log(`${req.body} /departamento`)
  //const { idDepartamentos = '' } = req.body
  //console.log(idDepartamentos)
  if (idDepartamentos === '') {
    res.send({
      message: 'Wrong or insufficient parameters',
      parameters_received: req.body
    })
    return
  }

  console.log(idDepartamentos)

  con.query(`DELETE FROM DEPARTAMENTOS WHERE id_departamento = ${idDepartamentos}`, (err, result) => {
    if (err) {
      res.status(500)
      res.send(err)
      return
    }

    //Em caso de sucesso:
    if (result.affectedRows) {
      res.send({
        message: 'DELETE with success',
        affectedRows: result.affectedRows
      })
      return
    }
    res.send(result)
  })
}
)

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

//rota para BFF: executa a chamada de outra API
// axios.get(`${baseUrl}/feriados/v1/${ano}`)
//     .then(response => {
//       res.send(response.data)
//     })
//     .catch(erro => {
//       console.log(erro)
//       res.send()
//     })
// })

app.listen(3033, () => {
  console.log('servidor executando')
})