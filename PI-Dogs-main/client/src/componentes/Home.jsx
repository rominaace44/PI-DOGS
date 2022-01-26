import React, {useEffect, useState} from 'react'
//import { useNavigate } from "react-router-dom";
import{connect} from 'react-redux'
import {getDogs, getTemperamentos} from '../actions/index'//traigo la action que busca los pokes
import h from '../estilos/Home.module.css'
import Card from './Card'
import Filtros from './Filtros'
import Paginado from './Paginado'
import Search from './Search'

function Home({dogs, getDogs, getTemperamentos, cargando, encontrado}) {
    //let history = useNavigate();
    const [pagina, setPagina] = useState(1)
    const [cantidad] = useState(8)
    const ultimodog = pagina* cantidad
    const primerdog = ultimodog-cantidad
    const personajesPaginas = dogs.slice(primerdog, ultimodog)
    //let params = new URLSearchParams(window.location.search) // id=123
    //let page = params.get('page') // 123
    //let temperamento = params.get('temperamento') // 123
    


    useEffect(() => {
        // if(page) {
        //     setPagina(page)
        // } else {
        //     setPagina(1)
        // }
        getDogs()
        getTemperamentos()
    }, [ getDogs, getTemperamentos])

   

    return(
        <div className={h.contenedor}>
            <div className={h.filtros}>
                <Filtros setPagina={setPagina}  />
                <Search/>
            </div>
           
            <Paginado
                cantidad={cantidad}
                setPagina={setPagina}
            />



            <div className={h.cards}>
                {cargando ? 
                <div className={h.cargando}>
                    <div className={h.spinner} ></div>  
                    <h1>Cargando</h1>

                </div>  :
                personajesPaginas && personajesPaginas.map(p =>{

                    return <Card
                        key={p.id}
                        name={p.name}
                        temperamento={p.temperamento? p.temperamento: p.Temperamentos }
                        imagen={p.imagen? p.imagen : 'https://images.vexels.com/media/users/3/144288/isolated/lists/aa292f041ff432bf0368a8f37454e2f2-alerta-perro-silueta-posando.png' }
                        id={p.id}
                        peso={p.peso}
                        creado={p.createdInbs? p.createdInbs : null}
                        setPagina={setPagina}
                    />
                })
            }
            <div>{encontrado? null: alert("no se encontro la raza ingresada")}</div>
            </div>
           
            <Paginado
                cantidad={cantidad}
                setPagina={setPagina}

            />
        </div>
    )
}

export const mapStateToProps=(state)=>{
    return{
        dogs:state.dogs,
        tipos: state.temperamentos,
        cargando: state.loading, 
        eliminado:state.eliminado, 
        encontrado:state.encontrado
    }
}

export default connect(mapStateToProps,{getDogs, getTemperamentos})(Home);
 