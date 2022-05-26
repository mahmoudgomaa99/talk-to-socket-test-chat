import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const HOST_URL = "http://localhost:5000/";
const socket = io(HOST_URL);
const current_user_id = "620e1eda60eb08879078733f";

const AnotherChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(async () => {
    socket.emit("signin", current_user_id);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      message,
      userId: "620e1eda60eb08879078733f",
      receiver_userId: "620e1efd60eb088790787342",
    });
    setChat([
      ...chat,
      {
        message,
        userId: "620e1eda60eb08879078733f",
        receiver_userId: "620e1efd60eb088790787342",
      },
    ]);

    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  return (
    <div
      style={{
        width: "100%",
        height: "60rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {chat.map((item, index) => {
        return (
          <p
            key={index}
            style={{
              position: "absolute",
              right: current_user_id === item.userId ? 250 : 600,
              bottom: 800 - (index + 1) * 30,
            }}
          >
            {item.message}
          </p>
        );
      })}
      <div style={{ position: "absolute", bottom: 0, marginBottom: "5rem" }}>
        <form
          onSubmit={sendMessage}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type={"text"}
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default AnotherChatScreen;
