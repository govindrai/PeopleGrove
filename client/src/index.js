import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

import TodosIndex from "./components/todos/index";
import TodosNew from "./components/todos/new";
import TodosEdit from "./components/todos/edit";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/todos/new" component={TodosNew} />
      <Route path="/todos/edit/:id" component={TodosEdit} />
      <Route exact path="/" component={TodosIndex} />
    </div>
  </BrowserRouter>,
  document.querySelector("#root")
);
