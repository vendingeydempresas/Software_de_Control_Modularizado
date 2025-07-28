import React, { useState } from "react";
import PagoForm from "../components/PagoForm";
import InventarioForm from "../components/InventarioForm";
import ProveedorForm from "../components/ProveedorForm";
import BodegaForm from "../components/BodegaForm";
import MaquinaForm from "../components/MaquinaForm";
import UbicacionForm from "../components/UbicacionForm";
import AjusteInventarioForm from "../components/AjusteInventarioForm";
import WebhookSimulador from "../components/WebhookSimulador";
import ProductoForm from "../components/ProductoForm";


const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("inicio");

  const renderContent = () => {
    switch (activeTab) {
      case "inicio":
        return <p>Bienvenido al panel de gestión de ventas vending.</p>;
      case "reposicion":
        return <PagoForm />;
      case "compras":
        return <InventarioForm />;
      case "proveedores":
        return <ProveedorForm />;
      case "bodegas":
        return <BodegaForm />;
      case "maquinas":
        return <MaquinaForm />;
      case "ubicacion":
        return <UbicacionForm />;
      case "ajustes":
        return <AjusteInventarioForm />;
      case "webhook":
        return <WebhookSimulador />;
      default:
        return <p>Sección en desarrollo.</p>;
      case "productos":
      return <ProductoForm />;

    }
  };

  const navItem = (key, label) => (
    <li
      style={{
        padding: "10px",
        background: activeTab === key ? "#555" : "transparent",
        color: "#fff",
        cursor: "pointer",
        borderBottom: "1px solid #444",
      }}
      onClick={() => setActiveTab(key)}
    >
      {label}
    </li>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Segoe UI" }}>
      {/* Sidebar */}
      <nav style={{ width: "250px", background: "#333", color: "#fff", padding: "20px 0" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>Gestión Vending</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {navItem("inicio", "Inicio")}
          {navItem("reposicion", "Carga de Productos")}
          {navItem("compras", "Compras")}
          {navItem("proveedores", "Proveedores")}
          {navItem("bodegas", "Bodegas")}
          {navItem("maquinas", "Máquinas")}
          {navItem("ubicacion", "Ubicación Máquina")}
          {navItem("ajustes", "Ajuste de Inventario")}
          {navItem("webhook", "Simular Webhook de Venta")}
          {navItem("productos", "Crear Producto")}
          <li style={{ padding: "10px", borderTop: "1px solid #444", marginTop: "10px", cursor: "pointer", color: "#bbb" }}>
            Cerrar sesión
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, padding: "30px", background: "#f4f4f4" }}>
        <h2 style={{ marginBottom: "20px", textTransform: "capitalize" }}>{activeTab.replace("_", " ")}</h2>
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardHome;
