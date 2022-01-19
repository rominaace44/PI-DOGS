import React from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import r from '../estilos/Paginado.module.css'


export default function Paginado({ cantidad}){


    const total= useSelector((state)=> state.dogs)
    const paginas=Math.ceil(total.length/cantidad)
    const paginas1= []

    for(let i=1; i<=paginas;i++){
        paginas1.push(i)
    }

    return (
        <div>
            <ul>
            { 
                paginas1&& paginas1.map(p=>{
                    return <Link to={`?page=${p}`} >
                        <button className={r.botones} key={p}> {p} </button>
                    </Link>
                    
                })
            }
            </ul>
        </div>
    )
}