import React from "react";

export default props => {
  const nameAttribute = props.loggedIn ? "Logout" : "Login";
  return (
    <div>
      <h1>PeopleGrove Task Tracker</h1>
      <button
        type="submit"
        name={nameAttribute}
        onClick={() => props.onClickHandler(props.history)}
      >
        {nameAttribute}
      </button>
    </div>
  );
};
