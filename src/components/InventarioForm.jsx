import React from 'react';
import { QRCodeCanvas } from "qrcode.react";

const InventarioForm = ({
  Idproductoinventario, setIdproductoinventario,
  nombreProducto, setNombreProducto,
  cantidadinventario, setCantidadinventario,
  Preciocomprainventario, setPreciocomprainventario,
  Precioventainventario, setPrecioventainventario,
  fechaCompra, setFechaCompra,
  ubicacion, setUbicacion,
  descripcionInventario, setDescripcionInventario,
  loteId,
  handleStartScanInventory,
  handleAddInventory,
  qrInventario,
  handlePrintQRinventario
}) => (
  <>
    <h2 className="text-center mt-4 mb-3">Formulario de Inventario</h2>
    <input type="text" className="form-control mt-2" value={Idproductoinventario} placeholder="ID Producto" onChange={(e) => setIdproductoinventario(e.target.value)} />
    <input type="text" className="form-control mt-2" value={nombreProducto} placeholder="Nombre Producto" onChange={(e) => setNombreProducto(e.target.value)} />
    <input type="number" className="form-control mt-2" value={cantidadinventario} placeholder="Cantidad" onChange={(e) => setCantidadinventario(e.target.value)} />
    <input type="number" className="form-control mt-2" value={Preciocomprainventario} placeholder="Precio de Compra" onChange={(e) => setPreciocomprainventario(e.target.value)} />
    <input type="number" className="form-control mt-2" value={Precioventainventario} placeholder="Precio de Venta" onChange={(e) => setPrecioventainventario(e.target.value)} />
    <input type="text" className="form-control mt-2" value={fechaCompra} placeholder="Fecha de Compra" onChange={(e) => setFechaCompra(e.target.value)} />
    <input type="text" className="form-control mt-2" value={ubicacion} placeholder="Ubicación" onChange={(e) => setUbicacion(e.target.value)} />
    <textarea className="form-control mt-2" value={descripcionInventario} placeholder="Descripción" onChange={(e) => setDescripcionInventario(e.target.value)} />
    <input type="text" className="form-control mt-2" value={loteId} placeholder="LoteId" disabled />

    <button onClick={handleStartScanInventory} className="btn btn-primary mt-3">Escanear QR del Producto</button>
    <div id="readerInventory" className="mt-3" />

    <button onClick={handleAddInventory} className="btn btn-success mt-3">Agregar al Inventario</button>

    {qrInventario && (
      <div className="text-center mt-3" id="qr-container-inventario">
        <p>Código QR del Inventario</p>
        <QRCodeCanvas value={qrInventario} size={256} />
        <p>{qrInventario}</p>
        <button onClick={handlePrintQRinventario} className="btn btn-secondary mt-2">Imprimir QR</button>
      </div>
    )}
  </>
);

export default InventarioForm;
