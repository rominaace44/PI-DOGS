const router= require('express').Router();
const {Temperamento} =require('../db')


router.get('/', async(req, res)=>{
    try{

        const temp= await Temperamento.findAll();
        res.status(200).json(temp)

    }catch(err){
        console.error(err)
    }
})

module.exports =router
