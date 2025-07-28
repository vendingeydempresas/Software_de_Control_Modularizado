import React, { useState } from "react";

const WebhookSimulador = () => {
  const [numeroVending, setNumeroVending] = useState("");
  const [numeroMotor, setNumeroMotor] = useState("");
  const [idProducto, setIdProducto] = useState("");

  const handleSimularVenta = (e) => {
    e.preventDefault();
    console.log({ numeroVending, numeroMotor, idProducto });
  };

  return (
    <div>
      <h2>Simular Webhook de Venta</h2>
      <form onSubmit={handleSimularVenta}>
        <input className="form-control mb-2" type="text" placeholder="Número de Vending" value={numeroVending} onChange={(e) => setNumeroVending(e.target.value)} />
        <input className="form-control mb-2" type="text" placeholder="Número de Motor" value={numeroMotor} onChange={(e) => setNumeroMotor(e.target.value)} />
        <input className="form-control mb-2" type="text" placeholder="ID Producto" value={idProducto} onChange={(e) => setIdProducto(e.target.value)} />
        <button type="submit" className="btn btn-warning">Enviar Webhook Simulado</button>
      </form>
    </div>
  );
};

export default WebhookSimulador;
