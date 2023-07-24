const express = require('express');
const exphbs = require('express-handlebars');
const restaurantList=require('./restaurant.json');

const app = express();
const port = 3000;

// 设置模板引擎
app.engine('.handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', '.handlebars');
// setting static files
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index',{restaurants:restaurantList.results});

})

app.get('/restaurants/:restaurant_id',(req,res)=>{
    const restaurant=restaurantList.results.find(res=>{
        return res.id.toString()===req.params.restaurant_id
    })
    res.render('show',{res:restaurant})
})

app.get('/search',(req,res)=>{
    console.log(req)
    const keyword=req.query.keyword
    const restaurant=restaurantList.results.filter(r=>{
        return r.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    })
    res.render('index',{restaurants:restaurant, keywords:keyword})
})

app.listen(port,()=>{
    console.log(`its listened on ${port}`)
})