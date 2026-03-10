import React, { useState } from "react";
import s from "./Registro.module.css"; 

export default function Registro() {
    // El estado para capturar lo que el barbero ingrese
    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        servicio: "Corte",
        precio: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando a la base de datos:", formData);
        // Aquí es donde usaremos Prisma más adelante
    };

    return (
        <div className={s.contenedor}> 
            <h2 className={s.titulo}>Registro de Cliente</h2>
            
            <form className={s.formulario} onSubmit={handleSubmit}>
                <div className={s.campo}>
                    <label>Nombre del Cliente</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre completo"
                    />
                </div>

                <div className={s.campo}>
                    <label>Teléfono</label>
                    <input 
                        type="text" 
                        name="telefono" 
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Ej: 0991234567"
                    />
                </div>

                <div className={s.campo}>
                    <label>Servicio</label>
                    <select name="servicio" value={formData.servicio} onChange={handleChange}>
                        <option value="Corte">Solo Corte</option>
                        <option value="Barba">Barba</option>
                        <option value="Combo">Corte + Barba</option>
                    </select>
                </div>

                <div className={s.campo}>
                    <label>Precio ($)</label>
                    <input 
                        type="number" 
                        name="precio" 
                        value={formData.precio}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </div>

                <button type="submit" className={s.botonGuardar}>
                    Registrar Servicio
                </button>
            </form>
        </div>
    );
}