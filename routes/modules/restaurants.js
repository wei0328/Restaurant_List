const express=require('express')
const router=express.Router()
const Restaurant=require('../../models/restaurant');

router.get('/create',(req,res)=>{
    return res.render('create')
})

router.get('/:id',(req,res)=>{
    console.log(req)
    const id=req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant)=>res.render('show',{restaurant}))
        .catch(error=>console.error(error))
})
router.get('/:id/edit', (req,res)=>{
    const id=req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant=>res.render('edit',{restaurant}))
    .catch(error=>console.error(error))
})

router.post('/',(req,res)=>{
    const {name,name_en,category,image,location,phone,google_map,rating,description}=req.body
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

router.put('/:id',(req,res)=>{
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



router.delete('/:id',(req,res)=>{
    const id=req.params.id
    return Restaurant.findById(id)
        .then(restaurant=>restaurant.deleteOne())
        .then(()=>res.redirect('/'))
        .catch(error=>console.error(error))
})

module.exports=router