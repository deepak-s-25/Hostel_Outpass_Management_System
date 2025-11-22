import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./App.css";

const Admin = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const validateFunction = () => {
    if (Name == "") {
      alert("Please fill name !");
    } else if (Password == "") {
      alert("Please fill password !");
    } else if (Name == "admin" && Password == "admin") {
      alert("Logged in successfully");
      navigate("/addStudent");
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <form className="wrapper" style={{ marginTop: "100px" }}>
        <h2>Admin Login</h2>
        <section className="group">
          <input
            type="text"
            size="30"
            className="input"
            name="name"
            value={Name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="email" className="label">
            Username
          </label>
        </section>
        <section className="group">
          <input
            type="text"
            className="input"
            name="password"
            value={Password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </section>
        <button onClick={validateFunction} type="button" className="btn">
          LOGIN
        </button>
        <span className="footer"></span>
      </form>
      <footer>
        <p>
          &copy; 2024 Sri Ramakrishna Engineering College Coimbatore - Hostel
          Management
        </p>
      </footer>
    </>
  );
};

export default Admin;
