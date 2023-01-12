import { readFile} from 'fs'
readFile('teste.txt','utf-8', (err,data) =>{
  console.log(data)
})