const express = require('express');
const exphbs = require('express-handlebars');
const mongoose=require('mongoose')
const Restaurant=require('./models/restaurant.js');
const bodyParser = require('body-parser');
const restaurant = require('./models/restaurant.js')
const hbshelpers = require('handlebars-helpers')
const helpers = hbshelpers()
const methodOverride=require('method-override')
const routes=require('./routes')

const app = express();
const port = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/restaurant')

const db=mongoose.connection

db.on('error',()=>{
    console.log('mongodb error!')
})

db.once('open',()=>{
    console.log('mongodb connected!')
})

// 设置模板引擎
app.engine('.handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', '.handlebars');
// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

app.get('/search',(req,res)=>{
    const keyword=req.query.keyword
    Restaurant.find({'name':{ $regex: keyword}})
        .lean()
        .then(restaurants=>res.render('index',{restaurants}))
        .catch(error=>console.error(error))
})

app.listen(port,()=>{
    console.log(`its listened on ${port}`)
})