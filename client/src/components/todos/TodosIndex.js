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
      this.fetchTodos(this.state.date);
    }
  }

  fetchTodos(date) {
    fetch(`/api/todos?date=${date}`, { credentials: "include" })
      .then(res => res.json())
      .then(todos => this.setState({ date, todos }));
  }

  dateChangeHandler(event) {
    let modifier;
    switch (event.currentTarget.name) {
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
    console.log(newDate);
    newDate.setDate(newDate.getDate() + modifier);
    this.fetchTodos(newDate);
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <div className="row valign-wrapper">
            <div className="col l8">
              <h3>
                Date: {this.state.date.toLocaleDateString()}
              </h3>
            </div>
            <div className="col l4 right-align">
              <Link
                to="/todos/new"
                className="btn-floating btn waves-effect waves-light"
              >
                <i className="material-icons">add</i>Track Task
              </Link>
            </div>
          </div>
          <table className="centered responsive-table highlight bordered">
            <thead>
              <tr>
                <th>
                  {changeDateButton(this.dateChangeHandler, "previous")}
                </th>
                <th>Task Name</th>
                <th>Time Spent</th>
                <th>Task Created</th>
                <th />
                <th>
                  {changeDateButton(this.dateChangeHandler, "next")}
                </th>
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
                      {createdAt.toLocaleDateString()}
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
      return (
        <img
          className="responsive-img"
          src="/images/macbookpro.png"
          alt="macbook pro displaying main app page"
        />
      );
    }
  }
}

function changeDateButton(onPressHandler, direction) {
  let button = direction === "previous" ? "chevron_left" : "chevron_right";
  return (
    <button className="btn" name={direction} onClick={onPressHandler}>
      <i className="material-icons">
        {button}
      </i>
    </button>
  );
}
