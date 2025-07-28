import React, { useState } from "react";

const UbicacionForm = () => {
  const [numeroMaquina, setNumeroMaquina] = useState("");
  const [nuevaUbicacion, setNuevaUbicacion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ numeroMaquina, nuevaUbicacion });
  };

  return (
    <div>
      <h2>Registrar Cambio de Ubicación</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Número de Máquina" value={numeroMaquina} onChange={(e) => setNumeroMaquina(e.target.value)} />
        <input className="form-control mb-2" type="text" placeholder="Nueva Ubicación" value={nuevaUbicacion} onChange={(e) => setNuevaUbicacion(e.target.value)} />
        <button type="submit" className="btn btn-success">Actualizar Ubicación</button>
      </form>
    </div>
  );
};

export default UbicacionForm;
