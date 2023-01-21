import mysql from 'mysql'
import { config } from 'dotenv'

config()


const con = mysql.createPool({
  connectionLimit: 10,   
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

//Confugura o con para resportar erros de conexão do banco via console do terminal
con.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      // console.error('Database connection was refused.')
      console.error('\x1b[31m','[ERROR] Conexão com a base de dados foi recusada.')
    }
  }
  if (connection) {
    connection.release()
  }
  return
})
  
export default con