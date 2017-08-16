import React, { Component } from "react";
import FormPartial from "./FormPartial";

export default class TodosEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      duration: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/todos/edit/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(({ name, duration }) => this.setState({ name, duration }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, duration } = this.state;
    const { id } = this.props.match.params;
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
