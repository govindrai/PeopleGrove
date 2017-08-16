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
        authSection = <LogoutButton admin />;
      }
    } else {
      authSection = <FacebookAuthButton {...this.props} />;
    }

    return (
      <div className="row valign-wrapper">
        <div className="col l5">
          <Link to="/">
            <h1 className="teal-text darken-4">PeopleGrove Task Tracker</h1>
          </Link>
        </div>
        <div className="col l7 right-align">
          {authSection}
        </div>
      </div>
    );
  }
}

class FacebookAuthButton extends Component {
  render() {
    if (this.props.loggedIn) {
      return <LogoutButton />;
    } else {
      return (
        <div>
          <a href="/auth/facebook" className="waves-effect waves-light btn">
            <i className="material-icons left">account_circle</i>
            Login with Facebook
          </a>
        </div>
      );
    }
  }
}

function LogoutButton(props) {
  return (
    <a href="/auth/logout" className="waves-effect waves-light btn">
      <i className="material-icons right">exit_to_app</i>
      {props.admin ? "Admin Logout" : "Logout"}
    </a>
  );
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
