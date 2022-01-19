import React from "react";
import { useState } from "react";
import { search } from "../actions";
import { useDispatch } from "react-redux";
import s from '../estilos/Search.module.css'


export default function Search(){
    const dispatch= useDispatch()
    const [name, setName]= useState("")

    function buscar(name){
        if(!name){
            alert("ingrese un nombre...")
        }
        dispatch(search(name.trim().toLowerCase()));
        setName("")

    }

    return (
        <div className={s.input}>
            <input type="text" onChange={({target:{value}})=>setName(value) } value={name} placeholder="escribe aqui..." ></input>
           <button onClick={()=>buscar(name)} >Buscar</button>
        </div>
    )

}