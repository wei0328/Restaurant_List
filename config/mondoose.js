const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/restaurant')

const db=mongoose.connection

db.on('error',()=>{
    console.log('mongodb error!')
})

db.once('open',()=>{
    console.log('mongodb connected!')
})

module.exports=db