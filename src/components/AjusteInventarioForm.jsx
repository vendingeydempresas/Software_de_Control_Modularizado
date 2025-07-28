import React, { useState } from "react";

const AjusteInventarioForm = () => {
  const [productoId, setProductoId] = useState("");
  const [tipoAjuste, setTipoAjuste] = useState("positivo");
  const [cantidad, setCantidad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ productoId, tipoAjuste, cantidad });
  };

  return (
    <div>
      <h2>Registrar Ajuste de Inventario</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="ID del Producto" value={productoId} onChange={(e) => setProductoId(e.target.value)} />
        <select className="form-control mb-2" value={tipoAjuste} onChange={(e) => setTipoAjuste(e.target.value)}>
          <option value="positivo">Aumento</option>
          <option value="negativo">Disminución</option>
        </select>
        <input className="form-control mb-2" type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        <button type="submit" className="btn btn-success">Guardar Ajuste</button>
      </form>
    </div>
  );
};

export default AjusteInventarioForm;
