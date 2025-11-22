import React, { useState } from "react";
import "./login.css";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Warden = () => {
  const [warden, setwarden] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate("");
  const validateFunction = () => {
    if (warden == "") {
      alert("Please fill id !");
    } else if (Password == "") {
      alert("Please fill password !");
    } else {
      try {
        axios
          .post("http://localhost:8081/validateWarden", {
            warden_id: warden,
            password: Password,
          })
          .then((response) => {
            if (response.data.length != "0") {
              alert("Successfully Logged in ");
              localStorage.setItem("wardenname", response.data[0].name);
              localStorage.setItem("wardenid", response.data[0].id);
              navigate("/wardenHome");
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
        <h2>Staff Login</h2>
        <section className="group">
          <input
            type="text"
            size="30"
            className="input"
            name="namr"
            value={warden}
            onChange={(event) => setwarden(event.target.value)}
            required
          />
          <label htmlFor="email" className="label">
            Staff ID
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

export default Warden;
