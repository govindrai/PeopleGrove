import React from "react";

export default function(props) {
  if (props.adminLoggedIn) {
    return <div>"YOU ARE AN ADMIN AND LOGGED IN!"</div>;
  } else {
    return <div>See all tasks from all users below when you log in</div>;
  }
}
