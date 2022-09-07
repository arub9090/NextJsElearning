import React from "react";
import { useState } from "react";
import axios from "axios";
import {toast } from 'react-toastify';

function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
      name,
      email,
      password,
    });
    toast.success("Registration Successfull")
    } catch (err) {
      toast.error(err.response.data)
    }
  };

  return (
    <>
      <h1 className="jumbotron bg-primary squre text-center display-4">
        Register Here
      </h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label for="nameHere">Name</label>
            <input
              type="text"
              id="nameHere"
              className="form-control mb-4 mt-2"
              placeholder="Name Here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label for="emailHere">Email</label>
            <input
              type="email"
              id="emailHere"
              className="form-control mb-4 mt-2"
              placeholder="Email Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="PasswordHere">Password</label>
            <input
              type="password"
              id="PasswordHere"
              className="form-control mb-4 mt-2"
              placeholder="Password Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default register;
