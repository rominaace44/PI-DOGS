
import {GET_DOGS, GET_DOG,LOADING,CLEAN, GET_TEMPERAMENTOS,
       CREATE_DOG, SEARCH_DOG, FILTRAR_POR_TEMPERAMENTO, FILTRAR_POR_CREADOS,
       ORDENAR, ORDENAR_PESO, DELETE_DOG} from '../actions/index'


const initialStore={
dogs:[],
todoslosDogs:[],
dogcreados:[],
temperamentos:[],
detalleDog: [], 
loading:false,
creado:"",
eliminado:"", 
encontrado:true
}



function rootReducer(state=initialStore, action){

    switch(action.type){
        case GET_DOGS:

            let creadoss= action.payload.filter(d=> d.createdInbs)



            return{
                ...state,
                dogs: action.payload,
                todoslosDogs:action.payload,
                dogcreados:creadoss,
                loading:false
            }
        case GET_DOG:
                return{
                    ...state,
                    detalleDog:action.payload
                }
        case CLEAN:
            return{
             ...state,
            detalle:action.payload
            }
       case LOADING:
               return{
             ...state, 
              loading: action.payload
             }
        case GET_TEMPERAMENTOS:
                return{
            ...state, 
          temperamentos: action.payload//concatena el creado con los existentes
                }
        case CREATE_DOG:
                return{
                ...state, 
             creado: action.payload}

         case SEARCH_DOG:
            
               return{
              ...state, 
               dogs: action.payload.length? action.payload : state.todoslosDogs,
              encontrado: action.payload.length <= 0 ? false : true
            
            }

        case FILTRAR_POR_TEMPERAMENTO:
        //     const allDogs=state.todoslosDogs;
        //     console.log(allDogs)
        //    const dogsFiltrados= allDogs.filter((p) => p.temperamento?.includes(action.payload))

                return{
                    ...state,
                    //dogs:dogsFiltrados
                    dogs:action.payload

                
                   
                }
        case FILTRAR_POR_CREADOS:
                const Dogs=state.dogcreados;
               const Creados= action.payload === 'creados'? Dogs: state.todoslosDogs.filter((p)=> !p.createdInbs) 
    
                 return{
                ...state, 
                 dogs: Creados
                }

        case ORDENAR_PESO:

                     let a=state.todoslosDogs;                
                     let final;
                     let ordenados=  a.map(a=>{              
                        let pesomin=0
                        let pesomax=0
                        if(a.peso.includes('-')){
                            pesomin= Number.isNaN(Number(a.peso.split('-')[0])) ? 0 : Number(a.peso.split('-')[0])
                            pesomax= Number.isNaN(Number(a.peso.split('-')[1])) ? 0 : Number(a.peso.split('-')[1])        
                        }else{
                            pesomin =Number(a.peso) 
                            pesomax =Number(a.peso) 
                        }
                        return{
                            ...a,
                            peso_min:pesomin,
                            peso_max:pesomax
                        }
                    }) 

         if(action.payload ==="asc"){
                       
        
         final= ordenados.sort((a,b)=>{
            if(a.peso_min > b.peso_min){
                     return 1
            }
            if(b.peso_min > a.peso_min){
                     return -1
            }
            return 0
        })}else{final=  ordenados.sort((a,b)=>{
            if(a.peso_min > b.peso_min){
                    return -1
            }
             if(b.peso_min>a.peso_min){
                     return 1
            }
            return 0
            })

        }
                    
            return {
                ...state,
                dogs:final
            }
           


        case ORDENAR:
            
            return{
                ...state,
                dogs:action.payload

            }
        case DELETE_DOG:
           
            return{
                ...state,
                dogs:action.payload.res,
                dogcreados:action.payload.res,
                eliminado:action.payload.cantidad
                
            }
    
    default: return state;

}}

export default rootReducer;