import React, { useState } from "react";

const ProductoForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [imagenPrincipalURL, setImagenPrincipalURL] = useState("");

  const [imagenesAdicionales, setImagenesAdicionales] = useState([]);
  const [imagenesAdicionalesURLs, setImagenesAdicionalesURLs] = useState([]);

  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState("");

  const handleDrop = (e, tipo) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (tipo === "imagenPrincipal" && file.type.startsWith("image/")) {
      setImagenPrincipal(file);
      setImagenPrincipalURL(URL.createObjectURL(file));
    }

    if (tipo === "video" && file.type.startsWith("video/")) {
      setVideo(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleImagenPrincipal = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      setImagenPrincipal(file);
      setImagenPrincipalURL(URL.createObjectURL(file));
    }
  };

  const handleImagenesAdicionales = (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
    const total = imagenesAdicionales.length + files.length;
    if (total > 4) {
      alert("Solo puedes subir hasta 4 imágenes adicionales.");
      return;
    }
    const urls = files.map(file => URL.createObjectURL(file));
    setImagenesAdicionales(prev => [...prev, ...files]);
    setImagenesAdicionalesURLs(prev => [...prev, ...urls]);
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("video/")) {
      setVideo(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nombre,
      descripcion,
      precio,
      imagenPrincipal,
      imagenesAdicionales,
      video,
    });
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input className="form-control mb-2" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />

        {/* Imagen principal */}
        <label><strong>Imagen principal</strong></label>
        <div
          onDrop={(e) => handleDrop(e, "imagenPrincipal")}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("imagenPrincipalInput").click()}
          style={{
            border: "2px dashed #aaa",
            padding: "20px",
            marginBottom: "10px",
            textAlign: "center",
            background: "#f8f8f8",
            cursor: "pointer"
          }}
        >
          {imagenPrincipalURL ? <img src={imagenPrincipalURL} alt="preview" style={{ maxWidth: "150px" }} /> : "Haz clic o arrastra una imagen"}
          <input id="imagenPrincipalInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImagenPrincipal} />
        </div>

        {/* Imágenes adicionales */}
        <label><strong>Imágenes adicionales (máx 4)</strong></label>
        <input className="form-control mb-2" type="file" accept="image/*" multiple onChange={handleImagenesAdicionales} />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {imagenesAdicionalesURLs.map((url, idx) => (
            <img key={idx} src={url} alt={`img-${idx}`} style={{ maxWidth: "100px", borderRadius: "6px" }} />
          ))}
        </div>

        {/* Video */}
        <label className="mt-3"><strong>Video del producto</strong></label>
        <div
          onDrop={(e) => handleDrop(e, "video")}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("videoInput").click()}
          style={{
            border: "2px dashed #aaa",
            padding: "20px",
            marginBottom: "10px",
            textAlign: "center",
            background: "#f8f8f8",
            cursor: "pointer"
          }}
        >
          {videoURL ? (
            <video src={videoURL} controls style={{ maxWidth: "300px" }} />
          ) : (
            "Haz clic o arrastra un video"
          )}
          <input id="videoInput" type="file" accept="video/*" style={{ display: "none" }} onChange={handleVideo} />
        </div>

        <button type="submit" className="btn btn-primary">Guardar producto</button>
      </form>
    </div>
  );
};

export default ProductoForm;
