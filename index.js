const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())

app.get('/files',(req,res) => {
    fs.readdir(path.join(__dirname, './files/'),(err,files) => {
        if(err) return res.status(500).json({error: 'failed to load files'})
        res.json(files)
    })
})

app.get('/files/:filename',(req,res) => {
    const filepath = path.join(__dirname,'./files/',req.params.filename);
    fs.readFile(filepath,'utf-8',(err,data) => {
        if(err) {
            console.log(err)
            return res.status(500).json({error: 'unable to read file'})
        }
        res.send(data)
    })
})

app.listen(3000, () => console.log(`server running >--<`))