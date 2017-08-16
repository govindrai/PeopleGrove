import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormPartial from "./FormPartial";

export default class TodosNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      duration: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <FormPartial
        {...this.props}
        onChangeHandler={this.handleChange}
        onSubmitHandler={this.handleSubmit}
        {...this.state}
      />
    );
  }
}
