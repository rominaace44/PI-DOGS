import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createDog, getTemperamentos} from '../actions'
import Temperamentos from "./Temperamentos";   
import { Link } from "react-router-dom";
import c from '../estilos/Crear.module.css'



export default function CrearDog(){
    const dispatch= useDispatch()
    const temperamentos = useSelector((state)=> state.temperamentos)
    



     useEffect(()=>{

         if(!temperamentos.length){
            dispatch(getTemperamentos());
         }
        
           //console.log(tempera)
        }, [dispatch, temperamentos.length])


    //const [tempera, setTempera]= useState([]) ///estado para los temperamentos
    const [values, setValues]=useState({
        temperamento:[],
        name:"",
        años:"",
        imagen:"",
        peso:"",
        altura:""
    })
    
const [error, setError]= useState({})

 function validar(values){
let err={}

     if(!values.name){
        err.name="debe ingresar un nombre..."
      
     }
     if(Number(values.name)){
        err.name="debe ingresar texto..."
      


     }
     if(Number(values.años) > 40){
         err.años="el valor debe ser menor a 40..."
      

     }
     if(!values.altura.includes('-')){
         err.altura="el valor ingresado debe ser: numero-numero"
 
     }
     if(!values.peso.includes('-')){
        err.peso="el valor ingresado debe ser: numero-numero"
     

    }
    
     return err


}

    const handleOnchange=({target:{name, value}})=> { ///setea el estado segun que input se escibe
         
    
        setValues({
            ...values,
            [name]:value,
        })
       setError( validar(values))
        //console.log(values)
    }

    const handleOnchangeTemp = (e) => { ///setea el estado segun que input se escibe
        setValues({
            ...values, 
            temperamento: [ ...values.temperamento, e.target.value ]
        }) 
   
    }
    
   
    const borrar = (data) => {
        setValues({
            ...values,
            temperamento: [ ...values.temperamento.filter((t) => t !== data)]
        }) 
    }
    
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        if(!values.name || !values.años ||!values.altura|| !values.peso||!values.temperamento.length){
            alert("debe llenar todos los campos")

        }else{

            dispatch(createDog(values));
            setValues({
                temperamento:[],
                name:"",
                años:"",
                imagen:"",
                peso:"",
                altura:""
            })
            alert("Dog creado con exito! :)")
        }

       
        console.log(values)

    }

    return (
        <div className={c.contenedor}>
            <div className={c.contrafondo}>

                
                <div>
                    <h2>Completa los campos solicitados...</h2>
                </div>

                <form   className={c.formulario}>
                    <label>Nombre:</label>
                    <input onChange={handleOnchange} name="name" type="text" placeholder="escribe el nombre de la raza..." value={values.name} />
                    {error.name? <span> {error.name}</span> : null}

                    <label>Años de vida:</label>
                    <input onChange={handleOnchange} name="años" type="text" placeholder="años de vida..." value={values.años}/>
                    {error.años? <span> {error.años}</span> : null}
                    
                    <label>Altura en Cm:</label>
                    <input onChange={handleOnchange}  name="altura" type="text" placeholder="minima-maxima"value={values.altura} />
                    {error.altura? <span> {error.altura}</span> : null}
                    
                    <label>Peso en Kg:</label>
                    <input onChange={handleOnchange} name="peso" type="text" placeholder="minimo-maximo" value={values.peso}/>
                    {error.peso? <span> {error.peso}</span> : null}

                    <label>Imagen:</label>
                    <input onChange={handleOnchange} name="imagen" type="text" placeholder=" ingrese imagen url..."value={values.imagen} />

                
                    <select  name="temperamento" onChange={handleOnchangeTemp}>
                        <option>Temperamentos</option>
                        {
                            temperamentos.map((t) => {
                                return <option name={t.name} key={t.id} value={t.name}>{t.name}</option>
                            })
                        }

                    </select>

                </form>
                <div className={c.tempe}>
                    {
                        values.temperamento && values.temperamento.map(t=>{
                            return <Temperamentos value={t} key={t.id} borrar={borrar}/>
                        })
                    }
                </div>
                    <button onClick={handleOnSubmit}  >CREAR RAZA!!</button>

                <div><Link to={'/home'}><button  className={c.ultimoboton}>volver a la pagina pricipal</button></Link></div>
            </div>
        </div>
    )
}