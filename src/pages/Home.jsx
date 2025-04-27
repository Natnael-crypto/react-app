import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";

const Home = () => {
  const [peer, setPeer] = useState(null);
  const [connectionId, setConnectionId] = useState("");
  const [remoteConnectionId, setRemoteConnectionId] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [message, setMessage] = useState("");
  const connectionRef = useRef(null);

  useEffect(() => {
    const newPeer = new Peer({ initiator: false, trickle: false });

    newPeer.on("signal", (data) => {
      setConnectionId(JSON.stringify(data)); // Store connection ID
    });

    newPeer.on("connect", () => {
      console.log("Connected to peer!");
    });

    newPeer.on("data", (data) => {
      console.log("Received message:", data.toString());
      setReceivedMessage(data.toString());
    });

    setPeer(newPeer);
  }, []);

  // Create Connection ID (Offer)
  const createConnection = () => {
    const newPeer = new Peer({ initiator: true, trickle: false });

    newPeer.on("signal", (data) => {
      setConnectionId(JSON.stringify(data)); // Set the connection ID (Offer signal)
    });

    newPeer.on("connect", () => {
      console.log("Connected!");
    });

    newPeer.on("data", (data) => {
      console.log("Received message:", data.toString());
      setReceivedMessage(data.toString());
    });

    setPeer(newPeer);
  };

  // Connect to a peer using its Connection ID
  const connectToPeer = () => {
    if (peer && remoteConnectionId) {
      peer.signal(JSON.parse(remoteConnectionId));
    }
  };

  // Send Text Message
  const sendMessage = () => {
    if (peer && message) {
      peer.send(message);
      setMessage(""); // Clear input field after sending
    }
  };

  return (
    <div>
      <h2>WebRTC Peer-to-Peer Connection</h2>

      {/* Generate Connection ID */}
      <button onClick={createConnection}>Create Connection</button>
      <div>
        <h3>Your Connection ID:</h3>
        <input type="text" value={connectionId} readOnly />
      </div>

      {/* Connect to a Peer */}
      <div>
        <h3>Enter Remote Connection ID:</h3>
        <input
          type="text"
          value={remoteConnectionId}
          onChange={(e) => setRemoteConnectionId(e.target.value)}
        />
        <button onClick={connectToPeer}>Connect</button>
      </div>

      {/* Send Message */}
      <div>
        <h3>Send a Message:</h3>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Received Message */}
      {receivedMessage && (
        <div>
          <h3>Received Message:</h3>
          <p>{receivedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
