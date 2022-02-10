import React, { useState } from "react";
import "../signup/Signup.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  let navigate = useNavigate();
  const [formValues, setformValues] = useState({
    email: "",
    password: "",
  });
  const [formErrorValues, setFormErrorValues] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValues({ ...formValues, [name]: value });
  };

  const loginUser = (event) => {
    event.preventDefault();
    fetchAPI();
  };

  async function fetchAPI() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password,
      }),
    };
    console.log("called fetch");
    const response = await fetch(
      "http://localhost:5001/login/verifyuser",
      requestOptions
    );
    const respData = await response.json();
    console.log("resp::", respData);
    if (respData) {
      console.log("goin to navigate::");
      props.loggedInUser(respData);
      navigate("/");
    } else {
      setFormErrorValues("Invalid credentials!!");
    }
  }

  return (
    <div className="SignupContainer">
      <div className="main">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required=""
            value={formValues.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required=""
            value={formValues.password}
            onChange={handleChange}
          />
          <button onClick={loginUser}>Login</button>
          <p className="error">{formErrorValues}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
