import React, { Component } from "react";

export default class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      duration: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/todos/edit/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(({ name, duration }) => this.setState({ name, duration }));
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const { name, duration } = this.state;
    const { id } = this.props.match.params;
    console.log(name, duration);
    fetch(`/api/todos/edit/${id}`, {
      method: "put",
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
        <input type="submit" value="Edit Activity" />
      </form>
    );
  }
}
