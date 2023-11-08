const express = require('express');
const exphbs = require('express-handlebars');
const mongoose=require('mongoose')
const Restaurant=require('./models/restaurant.js');
const bodyParser = require('body-parser');
const restaurant = require('./models/restaurant.js');
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

app.get('/',(req,res)=>{
    Restaurant.find()
        .lean()
        .then(restaurants=>res.render('index',{restaurants:restaurants}))
        .catch(error=>console.error(error))
})

app.get('/restaurants/create',(req,res)=>{
    return res.render('create')
})

app.get('/restaurants/:id',(req,res)=>{
    const id=req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant)=>res.render('show',{restaurant}))
        .catch(error=>console.error(error))
})



app.get('/search',(req,res)=>{
    const keyword=req.query.keyword
    Restaurant.find({'name':{ $regex: keyword}})
        .lean()
        .then(restaurants=>res.render('index',{restaurants}))
        .catch(error=>console.error(error))
})




app.get('/restaurants/:id/edit', (req,res)=>{
    const id=req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant=>res.render('edit',{restaurant}))
    .catch(error=>console.error(error))
})

app.post('/restaurants',(req,res)=>{
    const name=req.body.name
    const name_en=req.body.name_en
    const category=req.body.category
    const image=req.body.image
    const location=req.body.location
    const phone=req.body.phone
    const google_map=req.body.google_map
    const rating=req.body.rating
    const description=req.body.description
    return Restaurant.create({
        name:name,
        name_en:name_en,
        category:category,
        image:image,
        location:location,
        phone:phone,
        google_map:google_map,
        rating:rating,
        description:description
    })
        .then(()=>res.redirect('/'))
        .catch(error=>console.error(error))

})

app.post('/restaurants/:id/edit',(req,res)=>{
    const id=req.params.id
    const name=req.body.name
    return Restaurant.findById(id)
        .then(restaurant=>{
            restaurant.name=name
            return restaurant.save()
        })
        .then(()=>res.redirect(`/restaurants/${id}`))
        .catch(error=>console.error(error))
})



app.post('/restaurants/:id/delete',(req,res)=>{
    const id=req.params.id
    return Restaurant.findById(id)
        .then(restaurant=>restaurant.deleteOne())
        .then(()=>res.redirect('/'))
        .catch(error=>console.error(error))
})



app.listen(port,()=>{
    console.log(`its listened on ${port}`)
})