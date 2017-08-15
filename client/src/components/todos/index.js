import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TodosIndex extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.state = {
      todos: [],
      date: today
    };

    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      console.log("loggedIn so fetching Todos");
      this.fetchTodos(this.state.date);
    }
  }

  fetchTodos(date) {
    fetch(`/api/todos?date=${date}`, { credentials: "include" })
      .then(res => res.json())
      .then(todos => this.setState({ date, todos }));
  }

  dateChangeHandler(event) {
    event.preventDefault();
    let modifier;
    switch (event.target.name) {
      case "previous":
        modifier = -1;
        break;
      case "next":
        modifier = 1;
        break;
      default:
        break;
    }
    const newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() + modifier);
    this.fetchTodos(newDate);
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to="/todos/new">Track Task</Link>
          <h3>
            Date: {this.state.date.toLocaleDateString()}
          </h3>
          <table>
            <thead>
              <tr>
                <td>
                  {changeDateButton(this.dateChangeHandler, "previous")}
                </td>
                <td>Task Name</td>
                <td>Time Spent</td>
                <td>Task Created</td>
                <td />
                <td>
                  {changeDateButton(this.dateChangeHandler, "next")}
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map(todo => {
                const createdAt = new Date(todo.createdAt);
                createdAt.setHours(0, 0, 0, 0);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                let Edit;
                if (createdAt.getTime() === today.getTime()) {
                  Edit = <Link to={`/todos/edit/${todo._id}`}>Edit</Link>;
                }
                return (
                  <tr key={todo._id}>
                    <td />
                    <td>
                      {todo.name}
                    </td>
                    <td>
                      {todo.duration}
                    </td>
                    <td>
                      {createdAt.toLocaleString()}
                    </td>
                    <td>
                      {Edit}
                    </td>
                    <td />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

function changeDateButton(onPressHandler, direction) {
  return (
    <button name={direction} onClick={onPressHandler}>
      {direction === "previous" ? "<" : ">"}
    </button>
  );
}
