import React, { useState } from "react";

const BodegaForm = () => {
  const [nombreBodega, setNombreBodega] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombreBodega, direccion });
  };

  return (
    <div>
      <h2>Registrar Nueva Bodega</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Nombre Bodega" value={nombreBodega} onChange={(e) => setNombreBodega(e.target.value)} />
        <input className="form-control mb-2" type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <button type="submit" className="btn btn-success">Guardar Bodega</button>
      </form>
    </div>
  );
};

export default BodegaForm;
