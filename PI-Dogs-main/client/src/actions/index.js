 import axios from 'axios'

export const GET_DOGS='GET_DOGS'
export const  GET_DOG='GET_DOG'
export const LOADING='LOADING'
export const CLEAN='CLEAN'
export const GET_TEMPERAMENTOS='GET_TEMPERAMENTOS'
export const CREATE_DOG='CREATE_DOG'
export const ADD_TEMPERAMENTO='ADD_TEMPERAMENTO'
export const SEARCH_DOG='SEARCH_DOG'
export const FILTRAR_POR_TEMPERAMENTO='FILTRAR_POR_TEMPERAMENTO'
export const FILTRAR_POR_CREADOS='FILTRAR_POR_CREADOS'
export const ORDENAR='ORDENAR'
export const ORDENAR_PESO='ORDENAR_PESO'
export const DELETE_DOG='DELETE_DOG'


export  function getDogs(){
   
    return async (dispatch)=>{
        try{
        dispatch(loading(true))

        let dog= await axios.get('http://localhost:3001/dog')
       
        return dispatch({
            type: GET_DOGS,
            payload: dog.data,
        })



    
    }catch(err){
        console.log(err) }}
  
}
export function getDog(id){
    return async (dispatch)=>{
        try{
        dispatch(loading(true))
    
         const dog= await axios.get(`http://localhost:3001/dog/${id}`)
         //console.log(dog)

         dispatch({
             type:GET_DOG, 
             payload:dog.data[0]
            } )
        dispatch(loading(false))

      }catch(error){console.log(error)}
    }
   
}
export function loading(payload){
 
    return {
        type: LOADING,
        payload}  
}

export function clean(){
    return {
        type:CLEAN, 
        payload:{}
    }
}
export  function getTemperamentos(){
   
    return async (dispatch)=>{
        try{
        let resp= await axios.get('http://localhost:3001/temperament')

        return dispatch({
            type: GET_TEMPERAMENTOS,
            payload: resp.data
        })
    }catch(err){
        console.log(err)}

    }
  
}

export function createDog(values){
    return (dispatch)=>{
        try{
        axios.post('http://localhost:3001/dog', values) //hace un post al back con la data
        .then(res=>dispatch({
            type:CREATE_DOG,
            payload:res.data
        }))
        }catch(error){
            console.log(error)

        }
    }

}
export function search(name){

    return async (dispatch)=>{

        try{
       
            let dog = await axios.get(`http://localhost:3001/dog?name=${name}`)  
            console.log(dog.data)

            return dispatch({
                type: SEARCH_DOG,
                payload: dog.data
            })    
            

        }catch(err){
            console.log(err)

        }

    }
}
export function filtrado(temperamento){
    return async (dispatch)=>{
        try{
       
        let dogs= await axios.get(`http://localhost:3001/dog?temperamento=${temperamento}`)

        return dispatch( {
            type: FILTRAR_POR_TEMPERAMENTO,
            payload: dogs.data
        })}catch(err){
            console.log(err)

        }

    }
}
export function filtradoPorCreados(payload){
    return{
        type: FILTRAR_POR_CREADOS,
        payload
    }

}
export function orderBy(name, value){
    
     return async (dispatch)=>{
        try{
       
        let dogs= await axios.get(`http://localhost:3001/dog?orden=${name}&tipo=${value}`)
         //console.log(dogs)

        return dispatch( {
            type: ORDENAR,
            payload:dogs.data
        })}catch(err){
            console.log(err)

        }

    }
}
//}
export function orderByPeso(value){
    
     return{
        type: ORDENAR_PESO,
        payload:value
    }
}

export function deletedog(value){
    return async (dispatch)=>{
        try{
          let eliminado= await axios.delete(`http://localhost:3001/dog?id=${value}`)
          //console.log(eliminado.data.cantidad)

          return dispatch({
              type: DELETE_DOG,
              payload:eliminado.data,
              
          })

        }catch(err){
            console.error(err)
        }

    }
  
}