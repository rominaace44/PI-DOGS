const router= require('express').Router();
const{ getDogs, createDog, getTemperament , deletedog}=require('./controladores')

// //import * as util from 'util'
// import {inspect} from 'util'
// var util=require('util')

router.get('/',async (req, res)=>{

    try{
       const name= req.query.name;
       const temperamento=req.query.temperamento
       const orden=req.query.orden
       const tipo=req.query.tipo


       let  dogsApi= await getDogs();
       getTemperament(dogsApi);
      

        if(name){
            const dogName=await dogsApi.filter(t=> t.name.toLowerCase().includes(name))
           
            if(dogName.length<0){
                res.status(404).json({mensaje: "no se encontro la raza que buscas"});
            }else{
                res.status(200).json(dogName)

            }
        }
        if(temperamento){
           
            const asdasd=await dogsApi.filter(t=> t.temperamento?.includes(temperamento))
           


            if(asdasd.length){
                res.status(200).json(asdasd)
            }else{
                res.status(404).json("no se encontro Dog's con  el tempereramento que buscas");
            
            }
        }
        if(orden){    
            // let nuevoDog= await dogsApi.map(d=>{
               

            //     let pesomin=0
            //     let pesomax=0

               
            //        if(d.peso.includes('-')){
            //           pesomin= Number.isNaN(Number(d.peso.split('-')[0])) ? 0 : Number(d.peso.split('-')[0])
            //           pesomax= Number.isNaN(Number(d.peso.split('-')[1])) ? 0 : Number(d.peso.split('-')[1])

            //        }else{
            //            if(d.peso ==='NaN'){
            //            pesomin=0
            //            pesomax=0

            //            }else{
            //             pesomin =Number(d.peso) 
            //             pesomax =Number(d.peso) }
                       
            //        }

            //     return{
            //          ...d,
            //         peso_min:pesomin,
            //         peso_max:pesomax
            //     }
            // })
           

            //console.log(nuevoDog)

            if(orden==="nombre"){
                
                    let final= tipo==="asc"?
                    dogsApi.sort((a,b)=>{
                        if(a.name>b.name){
                            return 1
                        }
                        if(b.name>a.name){
                            return -1
                        }
                        return 0
                    }):
                    dogsApi.sort((a,b)=>{
                        if(a.name> b.name){
                            return -1
                        }
                        if(b.name>a.name){
                            return 1
                        }
                        return 0
                    })

                    res.status(200).json(final)      
            }
            // if(orden ==="peso"){

            //      const  ordenadito= tipo==="asc"?

            //      nuevoDog.sort((a,b)=>{
            //             if(a.peso_min > b.peso_min){
            //                 return 1
            //             }
            //             if(b.peso_min > a.peso_min){
            //                 return -1
            //             }
            //             return 0
            //         }) :
            //     nuevoDog.sort((a,b)=>{
            //             if(a.peso_min > b.peso_min){
            //                 return -1
            //             }
            //             if(b.peso_min>a.peso_min){
            //                 return 1
            //             }
            //             return 0
            //         })
            //        //console.log(ordenadito)

            //     res.status(200).json(ordenadito)


            // }
            
        }else{
            res.status(200).json(dogsApi)};

    }catch(err){
            console.error(err)}
        
    

})

router.get('/:id', async (req, res)=>{
    const {id}= req.params;
    
    let  dogsApi= await getDogs();
   // console.log(pokes)
     let  dogfinal= dogsApi.filter(p =>p.id === Number(id)||p.id === id);
    //console.log(pokefinal)

    if(dogfinal.length) res.status(200).json(dogfinal);
   else{
       res.status(404).send("no se encontro la raza que buscas")
     }

})

router.post('/', (req, res)=>{
    let {
        name,
        peso,
        altura,
        años, 
        imagen,
        temperamento
    }=req.body

    //temperamento= temperamento.join()
    try{

       const nuevo= createDog({name,
           peso, 
           altura,
           años, 
           imagen,
           temperamento})
    
        if(nuevo){
            res.status(201).json("dog creado con exito")
        }

    }catch(err){
        console.error(err)
    }



});
router.delete('/', async (req, res)=>{
    const {id} = req.query

    try{

       let respuest= await deletedog(id)

       res.json(respuest)

    }catch(err){
        console.log(err)
    }
})
module.exports =router