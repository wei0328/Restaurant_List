const mongoose=require('mongoose')
const Restaurant=require('../restaurant')

mongoose.connect('mongodb://127.0.0.1:27017/restaurant')

const db=mongoose.connection

db.on('error',()=>{
    console.log('mongodb error!')
})

db.once('open',()=>{
    console.log('mongodb connected!')
    for(let i=0;i<10;i++){
        Restaurant.create({name:'name-'+i})
    }
    console.log('done')
})