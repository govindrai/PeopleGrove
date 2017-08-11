import React from "react";

export default props => {
  return (
    <div>
      <h1>PeopleGrove Task Tracker</h1>
      <button type="submit" onClick={() => props.onClickHandler(props.history)}>
        {props.loggedIn ? "Logout" : "Login with Facebook"}
      </button>
    </div>
  );
};
