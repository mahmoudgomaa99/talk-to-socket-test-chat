import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";

const HOST_URL = "https://culumbus-socket.herokuapp.com/";
const socket = io.connect(HOST_URL);
const current_user_id = "620e1efd60eb088790787342";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [checked, setChecked] = useState("text");

  useEffect(() => {
    socket.emit("signin", current_user_id);
  }, []);

  const textMessage = {
    message_txt: message,
    chat_id: "628e68a1ea1cd1c7ecbd48fe",
    userId: "620e1efd60eb088790787342",
    receiver_userId: "628d76c340d1b6fb47ec8b0b",
    is_image_exist: false,
    is_audio_exist: false,
    user_role: "admin",
    created_at: new Date().toString(),
  };

  const imageMsg = {
    message_txt: message,
    chat_id: "628e68a1ea1cd1c7ecbd48fe",
    userId: "620e1efd60eb088790787342",
    receiver_userId: "628d76c340d1b6fb47ec8b0b",
    is_image_exist: true,
    is_audio_exist: false,
    user_role: "admin",
    created_at: new Date().toString(),
    image_url:
      "https://cdn.unenvironment.org/2022-03/field-ge4d2466da_1920.jpg",
  };

  const audioMsg = {
    // message_txt: message,
    chat_id: "628e68a1ea1cd1c7ecbd48fe",
    userId: "620e1efd60eb088790787342",
    receiver_userId: "628d76c340d1b6fb47ec8b0b",
    is_image_exist: false,
    is_audio_exist: true,
    user_role: "admin",
    created_at: new Date().toString(),
    audio_url:
      "https://firebasestorage.googleapis.com/v0/b/serr-seccret.appspot.com/o/Abyusif%20-%20Mortal%20Kombat%20(abyusif%20verse)(MP3_128K).mp3?alt=media&token=1481f12f-fad4-4ab0-ae36-3673f8d4736d",
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit(
      "chat",
      checked === "text"
        ? textMessage
        : checked === "audio"
        ? audioMsg
        : imageMsg
    );

    setChat([
      ...chat,
      {
        message,
        userId: "620e1efd60eb088790787342",
        receiver_userId: "628d76c340d1b6fb47ec8b0b",
      },
    ]);
    axios
      .put("https://culumbus-chat-server.herokuapp.com/v1/chats/", {
        chatId: "628e68a1ea1cd1c7ecbd48fe",
        message:
          checked === "text"
            ? textMessage
            : checked === "audio"
            ? audioMsg
            : imageMsg,
      })
      .then((res) => console.log(res));
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
      console.log(payload);
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
              // right: current_user_id === item.userId ? 250 : 400,
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
            disabled={checked === "audio"}
          />
          <button>Send Message</button>
          <label>
            <input
              type="checkbox"
              onChange={() => setChecked("text")}
              checked={checked === "text"}
            />
            Text Message
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setChecked("audio")}
              checked={checked === "audio"}
            />
            Audio Message
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setChecked("image")}
              checked={checked === "image"}
            />
            Image Message
          </label>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
