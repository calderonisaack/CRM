import React, { useState } from "react";
import s from "./Reservas.module.css";

export default function Reservas() {
    const [reserva, setReserva] = useState({
        clienteId: "",
        barbero: "Cualquiera",
        fecha: "",
        hora: "",
        servicio: "Corte"
    });

    const handleChange = (e) => {
        setReserva({
            ...reserva,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nueva Reserva capturada:", reserva);
        // Aquí irá la lógica de validación después
    };

    return (
        <div className={s.contenedor}>
            <h2 className={s.titulo}>Nueva Reserva</h2>
            
            <form className={s.formulario} onSubmit={handleSubmit}>
                <div className={s.campo}>
                    <label>Fecha</label>
                    <input 
                        type="date" 
                        name="fecha" 
                        value={reserva.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={s.campo}>
                    <label>Hora</label>
                    <input 
                        type="time" 
                        name="hora" 
                        value={reserva.hora}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={s.campo}>
                    <label>Seleccionar Barbero</label>
                    <select name="barbero" value={reserva.barbero} onChange={handleChange}>
                        <option value="David">David Barbero</option>
                        <option value="Adonis">Adonis</option>
                        <option value="Barbero3">Barbero3</option>
                    </select>
                </div>

                <div className={s.campo}>
                    <label>Servicio Sugerido</label>
                    <select name="servicio" value={reserva.servicio} onChange={handleChange}>
                        <option value="Corte">Corte</option>
                        <option value="Barba">Barba</option>
                        <option value="Corte y Barba">Corte y Barba</option>
                    </select>
                </div>

                <button type="submit" className={s.botonReserva}>
                    Confirmar Reserva
                </button>
            </form>
        </div>
    );
}