import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

const QRScanner = ({ scannerId, onSuccess, onError, active }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!active || scannerRef.current) return;

    const element = document.getElementById(scannerId);
    if (!element) {
      console.error(`Elemento con id '${scannerId}' no encontrado`);
      return;
    }

    scannerRef.current = new Html5Qrcode(scannerId);

    scannerRef.current.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        onSuccess(decodedText);
        scannerRef.current.stop().then(() => {
          scannerRef.current = null;
        });
      },
      (errorMessage) => {
        if (onError) onError(errorMessage);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.warn);
        scannerRef.current = null;
      }
    };
  }, [active, scannerId, onSuccess, onError]);

  return <div id={scannerId}></div>;
};

export default QRScanner;
