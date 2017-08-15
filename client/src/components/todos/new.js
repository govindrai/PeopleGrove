import React, { Component } from "react";

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
    return (
      <form onSubmit={this.onSubmitHandler}>
        <h1>
          {this.state.user.email}
        </h1>
        <label>Name of Activity: </label>
        <input
          name="name"
          onChange={this.onChangeHandler}
          type="text"
          value={this.state.name}
        />
        <label>Duration of Activity: </label>
        <input
          name="duration"
          onChange={this.onChangeHandler}
          type="text"
          value={this.state.duration}
        />
        <input type="submit" value="Track Time" />
      </form>
    );
  }
}
