import React, { Component } from "react";

export default class Header extends Component {
  render() {
    const location = this.props.history.location.pathname;
    let authSection;
    if (location === "/admin") {
      if (!this.props.loggedIn || !this.props.admin) {
        authSection = <AdminLoginForm {...this.props} />;
      } else {
        authSection = <a href="/auth/logout">Admin Logout</a>;
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

class FacebookAuthButton extends Component {
  render() {
    if (this.props.loggedIn) {
      return <a href="/auth/logout">Logout</a>;
    } else {
      return <a href="/auth/facebook">Login with Facebook</a>;
    }
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
