import React, { useState, useEffect } from "react";
import "./Signup.css";
import validation from "./validation";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  let navigate = useNavigate();
  const [formValues, setformValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrorValues, setFormErrorValues] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrorValues(validation(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrorValues).length === 0 && isSubmit) {
      fetchAPI();
      alert("successful Signup");
    }
  });

  async function fetchAPI() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      }),
    };
    console.log("called fetch");
    const response = await fetch(
      "http://localhost:5001/signup/adduser",
      requestOptions
    );
    const respData = await response.json();
    console.log("resp::", respData);
    if (respData) {
      console.log("goin to navigate::");
      navigate("/login");
    }
  }

  return (
    <div className="SignupContainer">
      {Object.keys(formErrorValues).length === 0 && isSubmit ? (
        <Login />
      ) : (
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="signup">
            <form onSubmit={handleSubmit}>
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                type="text"
                name="username"
                placeholder="User name"
                required=""
                value={formValues.username}
                onChange={handleChange}
              />

              <p className="error">{formErrorValues.username}</p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required=""
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="error">{formErrorValues.email}</p>

              <input
                type="password"
                name="password"
                placeholder="Password"
                required=""
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="error">{formErrorValues.password}</p>
              <button>Sign up</button>
            </form>
          </div>
        </div>
      )}

      {/* <div className="login">
              <form>
                <label for="chk" aria-hidden="true">
                  Login
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
                <input
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                />
                <button>Login</button>
              </form>
            </div> */}
    </div>
  );
}

export default Signup;
