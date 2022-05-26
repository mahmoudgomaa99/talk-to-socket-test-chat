import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnotherChatScreen from "./AnotherChatScreen";
import ChatScreen from "./ChatScreen";

const App = () => {
  return (
    // <ChatScreen />
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/another_chat" element={<AnotherChatScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
