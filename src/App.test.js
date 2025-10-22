import React, { useEffect } from "react";
import Peer from "peerjs";

const PeerComponent = () => {
  useEffect(() => {
    const peer = new Peer({
      host: "0.peerjs.com",
      port: 443,
      path: "/",
      secure: true,
    });

    peer.on("open", (id) => {
      console.log("✅ My peer ID is:", id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log("📩 Received:", data);
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

  return <div>🌱 Peer.js Connected</div>;
};

export default PeerComponent;
