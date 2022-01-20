

import a from '../estilos/Card.module.css'
import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch}  from 'react-redux';
import {deletedog} from '../actions'



export default function Card({name, temperamento, imagen, id, peso, creado}){

  const dispatch= useDispatch()

  function borrar({target:{value}}){
    dispatch(deletedog(value))
    alert("perro aliminado")

  
  }

    return(
        <div className={a.contenedor}>

          <div className={a.interno}>
              <NavLink to={`/dog/${id}`} className={a.active}>
                <h1>{name}</h1>
            

                <h2>Temperamento: {(function (temperamento) {
                if (typeof temperamento === "string") {
                  return temperamento;
                }
                if (Array.isArray(temperamento)) {
                  let temps = temperamento.map((e) => e.name);
                  return temps.join(", ");
                }
              })(temperamento)}</h2>
              
                <h2> Peso: {peso} kg</h2>

            </NavLink>
            <div className={a.borrar} >{creado? <button onClick={borrar} value={id} >borrar</button>: null}</div>
          </div>
           
            <img className={a.imagen} src={imagen} alt="imagen "></img>



        </div>
    )
}