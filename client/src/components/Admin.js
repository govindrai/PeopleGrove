import React, { Component } from "react";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }
  componentDidMount() {
    if (this.props.admin) {
      fetch("/api/todos", { credentials: "include" })
        .then(res => res.json())
        .then(todos => this.setState({ todos }));
    }
  }

  render() {
    if (this.props.admin) {
      return (
        <table>
          <thead>
            <tr>
              <td>Activity Name</td>
              <td>Time Spent on Activity</td>
              <td>Author</td>
              <td>Date Created</td>
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
                    {todo.user.email}
                  </td>
                  <td>
                    {todo.createdAt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return (
        <div className="center-align">
          <img
            className="responsive-img"
            src="/images/macbookpro_admin.png"
            alt="macbookpro with admin page snapshot"
          />
        </div>
      );
    }
  }
}
