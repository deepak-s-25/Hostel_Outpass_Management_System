import React, { useState } from "react";
import "./login.css";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const [rollno, setRollno] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateFunction = () => {
    if (rollno == "") {
      alert("Please fill Roll No !");
    } else if (Password == "") {
      alert("Please fill password !");
    } else {
      try {
        axios
          .post("http://localhost:8081/validateStudent", {
            rollno: rollno,
            password: Password,
          })
          .then((response) => {
            if (response.data.length != "0") {
              alert("Successfully Logged in ");
              localStorage.setItem("studentname", response.data[0].name);
              localStorage.setItem("studentid", response.data[0].id);
              navigate("/studentHome");
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
        <h2>Student Login</h2>
        <section className="group">
          <input
            type="text"
            size="30"
            className="input"
            name="namr"
            value={rollno}
            onChange={(event) => setRollno(event.target.value)}
            required
          />
          <label htmlFor="email" className="label">
            Roll No
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

export default Student;
