import React from "react";

export default props => {
  const nameAttribute = props.loggedIn ? "Logout" : "Login";
  return (
    <div>
      <h1>PeopleGrove Task Tracker</h1>
      <button
        name={nameAttribute}
        onClick={(proxy, event) => props.onClickHandler(event, props.history)}
      >
        {nameAttribute}
      </button>
    </div>
  );
};
