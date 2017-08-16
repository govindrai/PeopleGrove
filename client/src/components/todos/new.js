import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";

export default class TodosNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      name: "",
      duration: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const { name, duration } = this.state;
    fetch("/api/todos", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      credentials: "include",
      body: JSON.stringify({ name, duration })
    }).then(res => {
      this.props.history.push("/");
    });
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (!this.props.loggedIn) {
      return <NotFound />;
    }
    return (
      <form onSubmit={this.onSubmitHandler}>
        <h1>
          {this.state.user.email}
        </h1>
        <div className="input-field">
          <input
            id="name"
            className="input-field"
            name="name"
            onChange={this.onChangeHandler}
            type="text"
            value={this.state.name}
          />
          <label className="active" for="name">
            Name of Activity:{" "}
          </label>
        </div>
        <div className="input-field">
          <label className="active" for="duration">
            Duration of Activity:{" "}
          </label>
          <input
            id="duration"
            name="duration"
            onChange={this.onChangeHandler}
            type="text"
            value={this.state.duration}
          />
        </div>
        <button
          type="submit"
          value="Track Time"
          className="left waves-effect waves-light btn"
        >
          Track Time
          <i className="material-icons left">access_time</i>
        </button>
        <Link
          className="right waves-effect waves-light btn teal lighten-2 class"
          to="/"
        >
          Cancel<i className="material-icons left">cancel</i>
        </Link>
      </form>
    );
  }
}
