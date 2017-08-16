import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import TodosIndex from "./components/todos/TodosIndex";
import TodosNew from "./components/todos/TodosNew";
import TodosEdit from "./components/todos/TodosEdit";
import Admin from "./components/Admin";
import Footer from "./components/Footer";

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
      .then(res => res.json())
      .then(user => {
        if (user.email) {
          this.setState({ user, admin: user.admin, loggedIn: true });
        }
      })
      .catch(e => console.log(e));
  }

  handleAuth(newState) {
    this.setState({ ...newState });
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <Route
              component={props =>
                <Header
                  {...props}
                  authHandler={this.handleAuth}
                  {...this.state}
                />}
            />
          </header>
          <main>
            <Switch>
              <Route
                exact
                path="/"
                component={props => <TodosIndex {...props} {...this.state} />}
              />
              <Route
                path="/todos/new"
                component={props => <TodosNew {...props} {...this.state} />}
              />
              <Route
                path="/todos/edit/:id"
                component={props => <TodosEdit {...props} {...this.state} />}
              />
              <Route
                path="/admin"
                component={props => <Admin {...props} {...this.state} />}
              />
              <Route component={() => <div>SORRY No PAGE with that url</div>} />
            </Switch>
          </main>
          <Route component={Footer} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
