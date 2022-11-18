import React from "react";
import {useContext } from "react";
import AuthContext from "../../context/AuthContext";
import UserRoute from "../../component/routes/UserRoute";

function UserIndex() {
  const {
    state: { user },
  } = useContext(AuthContext);
  return(
    <UserRoute>
      <h1 className="jumbotron text-center square">
        <pre>{JSON.stringify(user, null ,4)} Welcome Here</pre>
      </h1>
    </UserRoute>
  )
}

export default UserIndex;

