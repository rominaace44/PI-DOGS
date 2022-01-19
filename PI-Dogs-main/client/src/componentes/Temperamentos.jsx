import t from '../estilos/Temperamento.module.css'

function Temperamentos({value, borrar}){
    return (
        <div className={t.boton}>
                <p> {value}</p>
                <button onClick={()=> borrar(value)}> X </button>
        </div>
      );
}

export default Temperamentos;
