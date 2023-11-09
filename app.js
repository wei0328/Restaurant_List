const express = require('express');
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const hbshelpers = require('handlebars-helpers')
const helpers = hbshelpers()
const methodOverride=require('method-override')
const routes=require('./routes')

const app = express();
const port = 3000;

require('./config/mondoose')


// 设置模板引擎
app.engine('.handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', '.handlebars');
// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)



app.listen(port,()=>{
    console.log(`its listened on ${port}`)
})