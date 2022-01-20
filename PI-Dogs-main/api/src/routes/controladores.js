
const axios= require('axios');
const {
    api_key
  } = process.env;
const {Dog, Temperamento} =require('../db')


module.exports={

 getDogs:async()=>{
    //tre los de la api
    const dogs= await axios.get('https://api.thedogapi.com/v1/breeds?api_key={api_key}');

     let  dogDetalle= await dogs.data.map( (d)=>{
       


        return {
            name: d.name,
            id: d.id,
            temperamento:d.temperament,
            peso: d.weight.metric,
            imagen: d.image.url,
            altura:d.height.metric,
            años: d.life_span
        }
       
    })

//console.log(dogDetalle)
   // return  dogDetalle;

   //tre los de la base de datos
    let  dogBd= await Dog.findAll({        //TRAE DE LA BASE DE DATOS LOS POKES CREADOS 
        include:{
            model: Temperamento, 
            attributes: ['name'],
            through:{
                attributes:[]
            }
            
        }

    })
//mapeo los que estan creados y transformo el temperamento de array a string para mostrarlos
// const nuevodogbd= dogBd.map(p=>{
    

//     const temp= p.Temperamentos.map(t=> t.name)
//     const temp2= temp.join(', ')
//     return {
//         ...p,
//         temperamento:temp2
//     }
    
// })


    //une todos y los devuelve
    const todoDogs= dogDetalle.concat(dogBd)
    return todoDogs
 },

 createDog: async(values)=>{

    try{

       const{name, peso, altura, años, imagen,temperamento} = values;


      let  nuevoDog= await Dog.create({
           name,
           peso, 
           altura,
           años, 
           imagen,
           createdInbs:true

       })

       const tempeDog= await Temperamento.findAll({
           where:{
               name: temperamento
           }
       })
       nuevoDog.addTemperamento(tempeDog);


       return "exitoso"


    }catch(err){
        console.error(err)
    }

 },

 getTemperament: async(data)=>{

     let tem= data.map(d=> d.temperamento)
   
     let temper= tem.join().trim().split(",")
     temper=temper.map(t=> t.trim())
     const set=new Set(temper)

     set.forEach(element => {//los guarda en la bd uno por
          Temperamento.findOrCreate({
            where:{
                name: element

            }
            
        })
    });      
    
   }, 

 
    deletedog: async (id)=>{

        let eliminados={}
        eliminados.cantidad= await Dog.destroy({
            where:{
                id:id
            }
        });
        eliminados.res= await Dog.findAll({        //TRAE DE LA BASE DE DATOS LOS POKES CREADOS 
            include:{
                model: Temperamento, 
                attributes: ['name'],
                through:{
                    attributes:[]
                }
                
            }
    
        })
        return eliminados;
    }
}

// 