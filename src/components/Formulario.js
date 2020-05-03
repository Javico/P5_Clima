import React, { useState } from 'react'
import Error from './Error';
import PropTypes from 'prop-types'


const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {

    // por si hay un error
    const [error, guardarError] = useState(false);

    // destructuring
    const { ciudad, pais } = busqueda;

    // funcion que coloca los elementos en el state
    const handleChange = (e) => {
        // actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    // cuando el usuario da submit
    const hanldeSubmit = (e) => {
        e.preventDefault();

        // validar
        if (ciudad === '' || pais === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        // pasarlo al componente principal
        guardarConsultar(true);
    }

    return (
        <form
            onSubmit={hanldeSubmit}
        >
            {error ? <Error mensaje="Todos los campos sonobligatorios" /> : null}
            <div className="input-field col s12">
                <input type="text" name="ciudad" id="ciudad" value={ciudad} onChange={handleChange} />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select name="pais" id="pais" value={pais} onChange={handleChange}>
                    <option value="" >-- Seleccione un pais --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">Pais: </label>
            </div>
            {/* <div className="input-field col s12" >
                <input type="submit" value="Buscar Clima" className="waves-effect waves-light btn-large btn-lock yellow accent-4" />
            </div> */}
            <div className="input-field col s12" >
            <button type="submit" className="waves-effect waves-light btn-large" >Buscar Clima</button>
            </div>

        </form>
    );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;