import React, { useState } from "react";

const MaquinaForm = () => {
  const [numeroMaquina, setNumeroMaquina] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ numeroMaquina, ubicacion });
  };

  return (
    <div>
      <h2>Registrar Máquina</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Número de Máquina" value={numeroMaquina} onChange={(e) => setNumeroMaquina(e.target.value)} />
        <input className="form-control mb-2" type="text" placeholder="Ubicación inicial" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
        <button type="submit" className="btn btn-success">Registrar Máquina</button>
      </form>
    </div>
  );
};

export default MaquinaForm;
