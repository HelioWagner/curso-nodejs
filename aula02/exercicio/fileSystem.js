import { readFile} from 'fs'

async function leituraarquivo(nomearquivo) {
    
  return await readFile(nomearquivo,'utf-8', (err,data) =>{
    return 123
    //console.log(data)
  })
  //return 123
}

// async function f() {
//   const fsPromises = require('fs').promises;
//   const data = await fsPromises.readFile('/tmp/data.json')
//                      .catch((err) => console.error('Failed to read file', err));

//   return JSON.parse(data.toString());



// async function f() {
//   const fsPromises = require('fs').promises
//   const data = await fsPromises.readFile('clientes.html')
//     .catch((err) => console.error('Failed to read file', err))
// }

// console.log(f())

//console.log(leituraarquivo('clientes.html'))

export default leituraarquivo



