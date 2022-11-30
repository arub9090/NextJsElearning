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
      USER DASHBOARD
      </h1>
    </UserRoute>
  )
}

export default UserIndex;

