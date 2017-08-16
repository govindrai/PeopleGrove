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

  // render() {
  //   if (!this.props.loggedIn) {
  //     return <NotFound />;
  //   }
  //   return (
  //     <form onSubmit={this.onSubmitHandler}>
  //       <label>Name of Activity: </label>
  //       <input
  //         name="name"
  //         onChange={this.onChangeHandler}
  //         type="text"
  //         value={this.state.name}
  //       />
  //       <label>Duration of Activity: </label>
  //       <input
  //         name="duration"
  //         onChange={this.onChangeHandler}
  //         type="text"
  //         value={this.state.duration}
  //       />
  //       <input type="submit" value="Edit Activity" />
  //     </form>
  //   );
  // }
}
