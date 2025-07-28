import React, { useState, useRef } from "react";
import PagoForm from "../components/PagoForm";
import InventarioForm from "../components/InventarioForm";
import useMQTT from "../hooks/useMQTT";
import { fetchProductDataTotal, fetchLoteData, updateInventoryQuantity } from "../utils/api";

function PaymentLinkGenerator() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [external_ref, setExternalRef] = useState("");
  const [NumeroMotor, setNumeroMotor] = useState("");
  const [NumeroVending, setNumeroVending] = useState("");
  const [CantidadCargada, setCantidadCargada] = useState("");
  const [Lotecargado, setLotecargado] = useState("");
  const [Precio_Compra_IV, setPrecio_Compra_IV] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  const [Idproductoinventario, setIdproductoinventario] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidadinventario, setCantidadinventario] = useState("");
  const [Preciocomprainventario, setPreciocomprainventario] = useState("");
  const [Precioventainventario, setPrecioventainventario] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcionInventario, setDescripcionInventario] = useState("");
  const [loteId, setLoteId] = useState("0001");
  const [qrInventario, setQrInventario] = useState("");

  const qrRef = useRef(null);
  const clientRef = useMQTT();

  const handleGenerateLink = async () => {
    const payload = {
      title,
      quantity,
      price,
      description,
      external_reference: external_ref,
    };
    const link = `https://landing-pago-sin-app.onrender.com/?data=${encodeURIComponent(JSON.stringify(payload))}`;
    setPaymentLink(link);

    const jsonData = {
      action: "Registra Stock",
      referencia: external_ref,
      Stock: CantidadCargada,
      Iddeproducto: `${external_ref}M${NumeroMotor}E${NumeroVending}`,
    };
    const topic = `esp32/control_${NumeroVending}`;
    clientRef.current?.publish(topic, JSON.stringify(jsonData));

    await fetch("https://central-api-backend.onrender.com/api/detallecompra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ID_Producto_IV: external_ref,
        Nombre_Producto_IV: title,
        Cantidad_Link_Pago_IV: quantity,
        Precio_Venta_IV: price,
        Descripcion_IV: description,
        Cantidad_Cargada_IV: CantidadCargada,
        Numero_Vending_IV: NumeroVending,
        Numero_Motor_IV: NumeroMotor,
        Link_Pago: link,
        QR_Link_Pago: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`,
        timestamp: new Date().toISOString(),
        Lote_Cargado_IV: Lotecargado,
        Precio_Compra_IV,
      }),
    });

    const nuevaCantidad = Math.max(Number(cantidadinventario) - Number(CantidadCargada), 0);
    await updateInventoryQuantity(Lotecargado, nuevaCantidad);
  };

  const handleAddInventory = async () => {
    const nextLote = (parseInt(loteId || "0") + 1).toString().padStart(4, "0");
    const data = {
      Lote: `Lote: ${loteId} - ID: ${Idproductoinventario}`,
      Id_Producto: Idproductoinventario,
      Nombre_Producto: nombreProducto,
      Cantidad: cantidadinventario,
      Precio_Compra: Preciocomprainventario,
      Precio_Venta: Precioventainventario,
      Fecha_Compra: fechaCompra,
      Ubicacion: ubicacion,
      Descripcion: descripcionInventario,
      timestamp: new Date().toISOString()
    };
    await fetch("https://central-api-backend.onrender.com/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setQrInventario(data.Lote);
    setLoteId(nextLote);
  };

  const handlePrintQR = () => setTimeout(() => window.print(), 500);
  const handlePrintQRinventario = () => setTimeout(() => window.print(), 500);

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <PagoForm {...{
          title, setTitle, quantity, setQuantity, price, setPrice, description, setDescription,
          external_ref, setExternalRef, NumeroMotor, setNumeroMotor, NumeroVending, setNumeroVending,
          CantidadCargada, setCantidadCargada, Lotecargado, setLotecargado, Precio_Compra_IV, setPrecio_Compra_IV,
          handleGenerateLink, paymentLink, qrRef, handlePrintQR
        }} />

        <InventarioForm {...{
          Idproductoinventario, setIdproductoinventario, nombreProducto, setNombreProducto,
          cantidadinventario, setCantidadinventario, Preciocomprainventario, setPreciocomprainventario,
          Precioventainventario, setPrecioventainventario, fechaCompra, setFechaCompra,
          ubicacion, setUbicacion, descripcionInventario, setDescripcionInventario,
          loteId, handleAddInventory, handlePrintQRinventario, qrInventario
        }} />
      </div>
    </div>
  );
}

export default PaymentLinkGenerator;
