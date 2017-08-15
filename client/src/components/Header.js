import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      adminLoggedIn: props.adminLoggedIn
    };
  }

  componentDidMount() {
    fetch("/auth/userInfo", { credentials: "include" })
      .then(res => res.json())
      .then(user => this.setState({ adminLoggedIn: true, user }))
      .catch(e => console.log(e));
  }

  render() {
    let authSection;
    if (this.props.history.location.pathname === "/admin") {
      if (!this.state.adminLoggedIn) {
        authSection = (
          <AdminLoginForm adminLoginHandler={this.props.adminLoginHandler} />
        );
      }
    } else {
      authSection = (
        <button
          type="submit"
          onClick={() => this.props.onClickHandler(this.props.history)}
        >
          {this.props.loggedIn ? "Logout" : "Login with Facebook"}
        </button>
      );
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
          this.props.adminLoginHandler();
        } else {
          this.setState({ adminSigninError: "Incorrect email/password" });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (!this.state.adminLoggedIn) {
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
    } else {
      return (
        <div>
          <h1>I WILL NOW DISPLAY ALL YO POSTS!</h1>
          <h3>
            {JSON.stringify(this.state.user)}
          </h3>
        </div>
      );
    }
  }
}
