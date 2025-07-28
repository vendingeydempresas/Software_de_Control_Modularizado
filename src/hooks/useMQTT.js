import { useEffect, useRef } from "react";
import mqtt from "mqtt";

export default function useMQTT(onMessage) {
  const clientRef = useRef(null);

  useEffect(() => {
    const client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt", {
      clientId: `web_${Math.random().toString(16).substr(2, 8)}`,
      reconnectPeriod: 1000,
    });

    clientRef.current = client;

    client.on("connect", () => console.log("MQTT conectado"));
    client.on("error", (err) => console.error("Error MQTT:", err));
    
    if (onMessage) {
      client.on("message", (topic, message) => {
        onMessage(topic, message.toString());
      });
    }

    return () => {
      client.end();
    };
  }, [onMessage]);

  return clientRef;
}
