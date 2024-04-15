const ReservationFormComponent = () => {
    return(
        <form className="reservation-form-container-max">
            <div className="reservation-form-divs-separator-inputs">
                <label>
                Nombre:
                <input type="text" name="nombre"  required />
                </label>
        
                <label>
                Teléfono:
                <input type="tel" name="telefono"  required />
                </label>

                <label>
                Hora de Reserva:
                <input type="time" name="hora"  required />
                </label>
            </div>

            <div className="reservation-form-divs-separator-inputs">
                <label>
                Correo Electrónico:
                <input type="email" name="correo" required />
                </label>
        
                <label>
                Fecha de Reserva:
                <input type="date" name="fecha"  required />
                </label>

                <label>
                Tipo de Servicio:
                <input type="text" name="tipoServicio" />
                </label>
        
            </div>

            <div className="reservation-form-divs-separator-inputs">

        
                <label>
                Número de Personas:
                <input type="number" name="numeroPersonas"  />
                </label>
        
                <label>
                Preferencias Adicionales:
                <textarea name="preferencias" ></textarea>
                </label>
            </div>
    
        <div className="reservation-form-container-button-submit">
            <button type="submit">Confirmar reserva</button>
        </div>
      </form>
    );
};

export default ReservationFormComponent;