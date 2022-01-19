import React from "react";
import { Link } from 'react-router-dom';
import Search from './Search'
import { getDogs } from "../actions";
import { useDispatch } from "react-redux";
import s from '../estilos/Nav.module.css'
import { useLocation } from 'react-router-dom';
//import Filtros from "./Filtros";



export default function Nav(){
    const dispatch=useDispatch();

    function mostrarDogs(){
       dispatch( getDogs())

    }

    const location = useLocation();
    console.log(location.pathname);


    return (
        <>
            {
                ( location.pathname === '/') ? <></> : <div className={s.fondo}>

                    <h1>DOG's :)</h1>

                    <div className={s.link}>
                        
                        <div>
                            <Link to="/dog/crear"  ><button>Crea tu propia raza!!</button></Link>

                        </div>
                        <div>

                            <Link to='/home'> <button onClick={mostrarDogs}>Inicio</button></Link>
                        </div>

                    
                    
                    </div>

                </div>
            }
        </>
    )
}