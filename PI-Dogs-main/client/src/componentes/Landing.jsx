
import React from "react";
import { Link } from "react-router-dom";
import  s from '../estilos/Landing.module.css'

export default function Landing(){

    return (<div className={s.fondo} >
                <div className={s.fondodelantero}>
                   <div className={s.titulo}> <p>DOG's</p></div>


                   <Link to= '/home' ><button  className={s.button}>ingresar</button> </Link>

                </div>
            
          </div>)

}