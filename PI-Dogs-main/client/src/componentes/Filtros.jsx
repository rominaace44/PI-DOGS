import React from "react";
import f from '../estilos/Filtros.module.css'

import { useDispatch, useSelector } from "react-redux";
import {filtrado, filtradoPorCreados, orderBy, orderByPeso} from "../actions";



export default function Filtros({setPagina}){
  

    const dispatch= useDispatch();
    const temper= useSelector((state)=> state.temperamentos)

    function handleFiltertipos(e){
         dispatch(filtrado(e.target.value))
        setPagina(1)


    }
    function handleFilterCreados(e){
        dispatch(filtradoPorCreados(e.target.value))
        setPagina(1)
    
    }
    
    function order({target:{name, value}}){
       
        dispatch(orderBy(name, value))
    }
    function orderPeso({target:{ value}}){
       
        dispatch(orderByPeso( value))
    }
    return (
            <div className={f.contenedor}>
                
                <h2>ordenar por:</h2>
               <div>

                    <select name="nombre" onChange={order}>
                        <option value="">NOMBRE</option>
                        <option value="asc">ASCENDENTE</option>
                        <option value="des">DESCENDENTE</option>
                    </select> 
               </div>
                <div>
                    <select name="peso"  onChange={orderPeso}>
                        <option value="">PESO</option>
                        <option value="asc">ASCENDENTE</option>
                        <option value="des">DESCENDENTE</option>
                    </select>

                </div>
                
                <tr></tr>
    
                <h2>filtrar por:</h2>
                <div>
                    <select   onChange={(e)=>handleFiltertipos(e)} >
                        <option>TEMPERAMENTO</option>
                    
                    {
                        temper.map(t=>{
                            return <option  key={t.name} value={t.name} >{t.name}</option>
                        })
                    }
        
                    </select>
           
                </div>
                <div>
                    <select   onChange={(e)=>handleFilterCreados(e)} >
                        <option >C / E</option>
                        <option value= 'creados'>CREADOS</option>
                        <option value= 'existentes'>EXISTENTES</option>
                    </select>
           
                </div>
        
            </div>
    )
}