import React from "react";

import ChatBox from "./components/ChatBox";
import Login from "./components/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={ChatBox} />
    </Router>
  );
};

export default App;
