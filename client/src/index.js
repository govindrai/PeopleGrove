import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import TodosIndex from "./components/todos/index";
import TodosNew from "./components/todos/new";
import TodosEdit from "./components/todos/edit";
import Admin from "./components/Admin";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      admin: false,
      loggedIn: false
    };

    this.handleAuth = this.handleAuth.bind(this);
  }

  componentDidMount() {
    fetch("/auth/userInfo", { credentials: "include" })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(res.status);
          throw "user is not logged in";
        }
      })
      .then(user => this.setState({ user, admin: user.admin, loggedIn: true }))
      .catch(e => console.log(e));
  }

  handleAuth(newState) {
    console.log("handleAuth was just called");
    console.log("here is the new state", newState);
    this.setState({ ...newState });
  }

  render() {
    console.log("App is rerendering");
    console.log("here is the new state:", this.state);
    return (
      <BrowserRouter>
        <div>
          <Route
            path="/"
            component={props =>
              <Header
                {...props}
                authHandler={this.handleAuth}
                {...this.state}
              />}
          />
          <Route
            exact
            path="/"
            component={props => <TodosIndex {...props} {...this.state} />}
          />
          <Route path="/todos/new" component={TodosNew} />
          <Route path="/todos/edit/:id" component={TodosEdit} />
          <Route
            path="/admin"
            component={props => <Admin {...props} {...this.state} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
