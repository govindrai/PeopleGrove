import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    const location = this.props.history.location.pathname;
    let authSection;
    if (location === "/admin") {
      if (!this.props.loggedIn || !this.props.admin) {
        authSection = <AdminLoginForm {...this.props} />;
      } else {
        authSection = <button>Admin Logout Button (non functional)</button>;
      }
    } else {
      authSection = <FacebookAuthButton {...this.props} />;
    }

    return (
      <div>
        <h1>PeopleGrove Task Tracker</h1>
        {authSection}
      </div>
    );
  }
}

class AdminLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      adminSigninError: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    switch (this.props.loggedIn) {
      case true:
        logoutUser(this.props);
        break;
      default:
        const { email, password } = this.state;
        fetch("/auth/admin", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        })
          .then(res => res.json())
          .then(user => {
            if (user.admin) {
              this.props.authHandler({ user, loggedIn: true, admin: true });
              return this.history.push("/admin");
            } else {
              this.setState({ adminSigninError: "Incorrect email/password" });
            }
          })
          .catch(e => {
            console.log(e);
          });
        return;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} action="/auth/admin" method="post">
        <h1>Admin Login</h1>
        <div>
          <h3>
            {this.state.adminSigninError}
          </h3>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleFieldChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleFieldChange}
          />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

class FacebookAuthButton extends Component {
  constructor(props) {
    super(props);
    this.handleFacebookAuth = this.handleFacebookAuth.bind(this);
  }

  handleFacebookAuth() {
    switch (this.props.loggedIn) {
      case true:
        logoutUser(this.props);
        break;
      default:
        fetch("/auth/facebook", { credentials: "include" })
          .then(res => {
            console.log(res);
            return res.json();
          })
          .then(user => {
            this.props.authHandler({ loggedIn: true, user, admin: false });
          })
          .catch(e => console.log(e));
    }
  }

  render() {
    return (
      <button type="submit" onClick={this.handleFacebookAuth}>
        {this.props.loggedIn ? "Logout" : "Login with Facebook"}
      </button>
    );
  }
}

// Private Functions

function logoutUser(props) {
  fetch("/auth/logout", { credentials: "include" }).then(() => {
    props.authHandler({ user: null, admin: false, loggedIn: false });
    return props.history.push("/");
  });
}
