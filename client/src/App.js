import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    const data = {
      message,
      sender: "Mbali",
      time: new Date().toLocaleTimeString()
    };
    socket.emit("send_message", data);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {chat.map((msg, i) => (
          <p key={i}><strong>{msg.sender}</strong> [{msg.time}]: {msg.message}</p>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
