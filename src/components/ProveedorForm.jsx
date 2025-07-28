import React, { useState } from "react";

const ProveedorForm = () => {
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, rut, telefono, correo });
  };

  return (
    <div>
      <h2>Registrar Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Nombre proveedor" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input className="form-control mb-2" type="text" placeholder="RUT" value={rut} onChange={(e) => setRut(e.target.value)} />
        <input className="form-control mb-2" type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input className="form-control mb-2" type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <button type="submit" className="btn btn-success">Guardar proveedor</button>
      </form>
    </div>
  );
};

export default ProveedorForm;
