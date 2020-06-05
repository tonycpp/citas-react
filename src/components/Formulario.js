import React, { Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    //crear state de citas LECCION 52 - PROYECTO ADMINISTRADOR DE PACIENTES
    //Explica como usar los hooks (useState), como copia el objeto para no perder las demas propiedades
    //tambien como tomar el valor de un input 'e.target.value'
    const [cita, actualizarCita] = useState({
        paciente: '',
        fecha: '',
        hora: '',
        sintomas: '',    
    });

    const [error, actualizarError] = useState(false)

    //function que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extrar los valores
    const { paciente, fecha, hora, sintomas } = cita;

    //Cuando el usuario de click en guardar cita
    const submitCita = e => {
        e.preventDefault();
        
        // Validar
            if(paciente.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
                actualizarError(true)
                return;
            }

        //eliminar mensaje previo de error
        actualizarError(false);

        // Asignar Id

        cita.id = uuidv4();
        console.log(cita);

        // Crear cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            paciente: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return (  
        <Fragment>
            
            <h2>test 1</h2>

            { error ? <p className='alerta-error'>Todos los campos son obligatorios</p>
            : null}

                <form className = 'form'
                    onSubmit= {submitCita}
                >
                    <label>Nombre paciente</label>
                    <input
                        type='text'
                        name= 'paciente'
                        className= 'u-full-width'
                        onChange= {actualizarState}
                        value= {paciente}
                    
                    />
                    <label>Fecha</label>
                    <input
                        type='date'
                        name= 'fecha'
                        className= 'u-full-width'
                        onChange= {actualizarState}
                        value= {fecha}
                    />
                    <label>Hora</label>
                    <input
                        type='time'
                        name= 'hora'
                        className= 'u-full-width'
                        onChange= {actualizarState}
                        value= {hora}
                    />
                    <label>Síntomas</label>
                    <textarea
                        name= 'sintomas'
                        className= 'u-full-width'
                        onChange= {actualizarState}
                        value= {sintomas}
                    ></textarea>
                    <button
                        type='submit'
                        className= 'button-guardar'
                    >Guardar cita</button>
                </form>              
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;