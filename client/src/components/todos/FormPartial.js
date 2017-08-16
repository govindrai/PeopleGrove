import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";

export default function FormPartial(props) {
  if (!props.loggedIn) {
    return <NotFound />;
  }
  return (
    <form onSubmit={props.onSubmitHandler}>
      <div className="input-field">
        <label className="active" htmlFor="name">
          Name of Activity:{" "}
        </label>
        <input
          id="name"
          className="input-field"
          name="name"
          onChange={props.onChangeHandler}
          type="text"
          value={props.name}
        />
      </div>
      <div className="input-field">
        <label className="active" htmlFor="duration">
          Duration of Activity:{" "}
        </label>
        <input
          id="duration"
          name="duration"
          onChange={props.onChangeHandler}
          type="text"
          value={props.duration}
        />
      </div>
      <button
        type="submit"
        value="Track Time"
        className="left waves-effect waves-light btn"
      >
        {props.history.location.pathname === "/todos/new"
          ? "Track Activity"
          : "Edit Activity"}
        <i className="material-icons left">access_time</i>
      </button>
      <Link
        className="right waves-effect waves-light btn teal lighten-2 class"
        to="/"
      >
        Cancel<i className="material-icons left">cancel</i>
      </Link>
    </form>
  );
}
