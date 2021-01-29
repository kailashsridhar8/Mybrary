if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')   //import express
const app= express()  //app portion by calling express function 
const expressLayouts = require('express-ejs-layouts')  //import explayouts package

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs' )//set view engine
app.set('views',__dirname+'/views') //sert where views are going to come 
app.set('layout','layouts/layout') //headers and footers of html 
app.use(expressLayouts) 
app.use(express.static('public')) //all css and static files

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error',error =>console.error(error))
db.once('open', ()=> console.log('Connected to Mongoose'))

app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)