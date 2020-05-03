import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  // state del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [errorConsulta, guardarErrorConsulta] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    //console.log(ciudad + " " + pais);
    const consultarAPI = async () => {

      if (consultar) {
        const appId = 'be79dc5611a342ac7c778d17bab6f23f';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        //console.log(resultado);
        guardarResultado(resultado);
        guardarConsultar(false);

        // Detecta si hubo resultados o la consulta fue correcta
        if(resultado.cod === "404"){
          guardarErrorConsulta(true); 
        }else{
          guardarErrorConsulta(false);
        }
      }
    }
    consultarAPI();

    // la siguiente linea es para deshabilitar el warning de las dependencias ciudad y pais en useEffect
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultar]);

  let componente;
  if(errorConsulta){
    componente = <Error mensaje="No hay resultados" />;
  }else{
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header
        titulo="Clima React App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="col m6 s12">
            <Formulario busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar} />
          </div>
          <div className="col m6 s12">
            {componente}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
