import "./login.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import axios from "axios";
import Brand from "./srec_logo.jpg";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const [tutor_id, settutor_id] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateFunction = () => {
    if (tutor_id == "") {
      alert("Please fill id !");
    } else if (Password == "") {
      alert("Please fill password !");
    } else {
      try {
        axios
          .post("http://localhost:8081/validateTutor", {
            tutor_id: tutor_id,
            password: Password,
          })
          .then((response) => {
            if (response.data.length != "0") {
              alert("Successfully Logged in ");
              localStorage.setItem("name", response.data[0].name);
              localStorage.setItem("id", response.data[0].id);
              navigate("/tutorHome");
            } else {
              alert("Invalid credential");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };
  return (
    <>
      <form className="wrapper" style={{ marginTop: "100px" }}>
        <h2>Tutor Login</h2>
        <section className="group">
          <input
            type="text"
            size="30"
            className="input"
            name="namr"
            value={tutor_id}
            onChange={(event) => settutor_id(event.target.value)}
            required
          />
          <label htmlFor="email" className="label">
            Tutor Id
          </label>
        </section>
        <section className="group">
          <input
            type="text"
            minLength="8"
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

export default Staff;
