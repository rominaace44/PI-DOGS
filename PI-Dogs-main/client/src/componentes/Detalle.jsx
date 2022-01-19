import React,{useEffect} from "react";
import d from '../estilos/Detalle.module.css'
import {  useSelector, useDispatch } from 'react-redux';
import { getDog } from "../actions";
import { useParams } from 'react-router';




export default function DetalleDog(){

 const {id}= useParams()

 const dispatch=useDispatch();

 useEffect(()=>{
    
     //dispatch(clean())

     dispatch(getDog(id));
     

    }, [dispatch,id])
const dog= useSelector((state)=> state.detalleDog)


const cargando= useSelector((state)=> state.loading)
let a =dog.temperamento? dog.temperamento :dog.Temperamentos

    return (

        
        <div className={d.general}>
            <div className={d.contrafondo}>
                {cargando? 
                <div className={d.cargando}>
                    <div className={d.spinner} > </div>  
                    <h1>Cargando</h1>

                </div>  :
                <div className={d.contenedor}>
                    <div className={d.imagen}>
                        <img src={dog.imagen} alt="imagen "></img>
                    </div>
                    <div className={d.text} >
                    <h1>NOMBRE: { dog.name}</h1>

                        <h3>TEMPERAMENTO:  </h3> 
                        { (function (a)
                            {
                                if (typeof a === "string") {
                                return a;
                                }
                                if (Array.isArray(a)) {
                                let temps = a.map((e) => e.name);
                                return temps.join(", ");
                                }
                            })(a)
                        }
                            
                        <h3>AÑOS DE VIDA:  { dog.años}</h3>
                        <h3>ALTURA:  {dog.altura}</h3>
                        <h3>PESO:  {dog.peso} kg</h3>
                    </div>
                    
            

                </div>
            
                }

            </div>
            
            
            
            

        </div>
    )


}