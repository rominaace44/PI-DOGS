
import {GET_DOGS, GET_DOG,LOADING,CLEAN, GET_TEMPERAMENTOS,
       CREATE_DOG, SEARCH_DOG, FILTRAR_POR_TEMPERAMENTO, FILTRAR_POR_CREADOS,
       ORDENAR, ORDENAR_PESO} from '../actions/index'


const initialStore={
dogs:[],
todoslosDogs:[],
temperamentos:[],
detalleDog: [], 
loading:false,
creado:""
}



function rootReducer(state=initialStore, action){

    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                todoslosDogs:action.payload,
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
              dogs: action.payload
            
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
                const Dogs=state.todoslosDogs;
                const Creados= action.payload === 'creados'? Dogs.filter((p)=> p.createdInbs) : Dogs.filter((p)=> !p.createdInbs) 
    
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
    
    default: return state;

}}

export default rootReducer;