import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Table } from "react-bootstrap";
import moment from "moment";

import useAxios, { configure } from "axios-hooks";
import LRU from "lru-cache";
import Axios from "axios";
import { Login } from "./components/login";
import { Dashboard } from "./components/dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const axios = Axios.create({
  baseURL: "http://localhost:39048/api",
});
const cache = new LRU({ max: 10 });
configure({ axios, cache });

const App = () => {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about"></Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
