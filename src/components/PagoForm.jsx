import React from 'react';
import { QRCodeCanvas } from "qrcode.react";

const PagoForm = ({
  title, setTitle,
  quantity, setQuantity,
  price, setPrice,
  description, setDescription,
  external_ref, setExternalRef,
  NumeroMotor, setNumeroMotor,
  NumeroVending, setNumeroVending,
  CantidadCargada, setCantidadCargada,
  Lotecargado, setLotecargado,
  Precio_Compra_IV, setPrecio_Compra_IV,
  handleGenerateLink,
  handleStartScanLote,
  handleStartScanMotor,
  handleStartScanVending,
  paymentLink,
  qrRef,
  handlePrintQR
}) => (
  <>
    <h2 className="text-center mb-3">Generador de Link de Pago</h2>
    <input type="text" className="form-control mb-2" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
    <input type="number" className="form-control mb-2" placeholder="Cantidad" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled />
    <input type="text" className="form-control mb-2" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />
    <input type="text" className="form-control mb-2" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
    <input type="text" className="form-control mb-2" placeholder="Id del Producto" value={external_ref} onChange={(e) => setExternalRef(e.target.value)} />
    <input type="text" className="form-control mb-2" placeholder="Número Motor" value={NumeroMotor} onChange={(e) => setNumeroMotor(e.target.value)} />
    <input type="text" className="form-control mb-2" placeholder="Número Vending" value={NumeroVending} onChange={(e) => setNumeroVending(e.target.value)} />
    <input type="text" className="form-control mb-2" placeholder="Cantidad Cargada" value={CantidadCargada} onChange={(e) => setCantidadCargada(e.target.value)} />
    <input type="text" className="form-control mb-2" placeholder="Lote Cargado" value={Lotecargado} onChange={(e) => setLotecargado(e.target.value)} />
    <input type="text" className="form-control mb-2" placeholder="Precio Compra" value={Precio_Compra_IV} onChange={(e) => setPrecio_Compra_IV(e.target.value)} />

    <button onClick={handleGenerateLink} className="btn btn-success mt-3">Generar Link de Pago</button>
    <button onClick={handleStartScanLote} className="btn btn-primary mt-3">Escanear Lote-Producto</button>
    <div id="readerLote" className="mt-3" />

    <button onClick={handleStartScanMotor} className="btn btn-primary mt-3">Escanear Motor</button>
    <div id="readerMotor" className="mt-3" />

    <button onClick={handleStartScanVending} className="btn btn-primary mt-3">Escanear Vending</button>
    <div id="readerVending" className="mt-3" />

    {paymentLink && (
      <div className="mt-4 text-center">
        <p>Link de pago generado:</p>
        <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a>
        <div id="qr-container" ref={qrRef} className="mt-3">
          <QRCodeCanvas value={paymentLink} size={256} />
          <button onClick={handlePrintQR} className="btn btn-secondary mt-2">Imprimir QR</button>
        </div>
      </div>
    )}
  </>
);

export default PagoForm;
