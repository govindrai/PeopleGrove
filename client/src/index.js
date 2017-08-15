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
      loggedIn: false,
      user: null,
      isAdmin: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.loginAdmin = this.loginAdmin.bind(this);
  }

  componentDidMount() {
    fetch("/auth/userInfo", { credentials: "include" })
      .then(res => res.json())
      .then(user => this.setState({ loggedIn: true, user }))
      .catch(e => console.log(e));
  }

  handleClick(history) {
    switch (this.state.loggedIn) {
      case false:
        fetch("/auth/facebook", { credentials: "include", mode: "no-cors" })
          .then(res => res.json())
          .then(user => {
            this.setState({ loggedIn: true, user });
            history.push("/");
          })
          .catch(e => console.log(e));
        break;
      case true:
        fetch("/auth/logout", { credentials: "include" }).then(() => {
          this.setState({ loggedIn: false });
          history.push("/");
        });
        break;
      default:
        console.log("what are you trying to do?");
    }
  }

  loginAdmin(user) {
    this.setState({ adminLoggedIn: true, user });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            path="/"
            component={props =>
              <Header
                {...props}
                adminLoginHandler={this.loginAdmin}
                onClickHandler={this.handleClick}
                {...this.state}
              />}
          />
          <Route
            exact
            path="/"
            component={props =>
              <TodosIndex {...props} loggedIn={this.state.loggedIn} />}
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
