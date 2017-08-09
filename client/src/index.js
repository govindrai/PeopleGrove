import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

import TodosIndex from "./components/todos/index";
import TodosNew from "./components/todos/new";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/new" component={TodosNew} />
      <Route exact path="/" component={TodosIndex} />
    </div>
  </BrowserRouter>,
  document.querySelector("#root")
);
