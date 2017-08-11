import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import TodosIndex from "./components/todos/index";
import TodosNew from "./components/todos/new";
import TodosEdit from "./components/todos/edit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    fetch("/api/todos/UserInfo", { credentials: "include" })
      .then(res => res.json())
      .then(user => this.setState({ loggedIn: true }))
      .catch(e => console.log("User not logged in"));
  }

  onClickHandler(event, history) {
    event.preventDefault();
    switch (this.state.loggedIn) {
      case false:
        fetch("/auth/facebook", { credentials: "include", mode: "no-cors" })
          .then(() => {
            this.setState({ loggedIn: true });
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
        console.log("what are you tryiing to do?");
    }
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
                onClickHandler={this.onClickHandler}
                loggedIn={this.state.loggedIn}
              />}
          />
          <Route path="/todos/new" component={TodosNew} />
          <Route path="/todos/edit/:id" component={TodosEdit} />
          <Route
            exact
            path="/"
            component={props =>
              <TodosIndex {...props} loggedIn={this.state.loggedIn} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
