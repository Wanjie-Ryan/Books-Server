const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql2')
require('dotenv').config();




const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.get('/',(req,res)=>{
    res.send('hey')
})

app.get('/allbooks', (req,res)=>{
    const q = 'SELECT * FROM books'
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})