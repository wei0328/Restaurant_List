const express=require('express')
const router=express.Router()
const Restaurant=require('../../models/restaurant');

router.get('/',(req,res)=>{
    const sortBy = req.query.sortBy || '-_id'
    Restaurant.find()
        .lean()
        .sort(sortBy)
        .then(restaurants => res.render('index', { restaurants, sortBy }))
        .catch(error => console.error(error))
    console.log(req.query)
})

router.get('/search',(req,res)=>{
    const keyword=req.query.keyword
    Restaurant.find({'name':{ $regex: keyword}})
        .lean()
        .then(restaurants=>res.render('index',{restaurants}))
        .catch(error=>console.error(error))
})

module.exports=router