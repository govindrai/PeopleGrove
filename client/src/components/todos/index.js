import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <h1>PeopleGrove Time Tracker</h1>
        <Link to="/new">Track Task</Link>
        <table>
          <thead>
            <tr>
              <td>Task Name</td>
              <td>Time Spent</td>
              <td>Task Created</td>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map(todo => {
              return (
                <tr key={todo._id}>
                  <td>
                    {todo.name}
                  </td>
                  <td>
                    {todo.duration}
                  </td>
                  <td>
                    {todo.createdAt}
                  </td>
                  <td>
                    <Link to={`/todos/edit/${todo._id}`}>Edit</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
