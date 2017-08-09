import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }
  componentDidMount() {
    fetch("/api/todos", { credentials: "include" })
      .then(res => res.json())
      .then(todos => this.setState({ todos }));
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <ul>
          {this.state.todos.map(todo => {
            return (
              <li key={todo._id}>
                {todo.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
