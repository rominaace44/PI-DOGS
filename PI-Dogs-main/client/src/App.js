import { Route, Routes } from 'react-router-dom';
import  {BrowserRouter } from 'react-router-dom'
import Landing from './componentes/Landing';
import Home from './componentes/Home';
import DetalleDog from './componentes/Detalle'
import CrearDog from './componentes/Crear'
import Nav from './componentes/Nav';
import Footer from './componentes/Footer';
function App() {
  return (
    <BrowserRouter >
    <Nav/>
   <Routes>
   <Route exact path='/' element={<Landing/>}/>
   <Route path ='/home' element={<Home/>} /> 
   <Route path ='/dog/crear' element={<CrearDog/>} /> 
   <Route path ='/dog/:id' element={<DetalleDog/>} /> 
  </Routes>
  <Footer/>
  </BrowserRouter>

  );
}

export default App;
