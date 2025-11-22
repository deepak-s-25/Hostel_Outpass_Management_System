import React, { useState, useEffect } from "react";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import axios from "axios";
import Brand from "./srec_logo.jpg";
import { useNavigate } from "react-router-dom";

import "./form.css";
const AddTutor = () => {
  const [datatableUsers, setdatatableUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8081/tutor")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setdatatableUsers(data);
      });
  }, []);

  const [searchInput, SetSearchInput] = useState("");
  const [data, setData] = useState();
  const handleSubmit = (event) => {
    const name = event.target.name.value;
    const password = event.target.password.value;

    const tutor_id = event.target.tutor_id.value;
    setData({ name: name, password: password, tutor_id: tutor_id });
    try {
      axios
        .post("http://localhost:8081/addTutor", data)
        .then((response) => {
          if (response.data == "success") {
            alert("tutor inserted successfully");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.response.data);
    }

    event.preventDefault();
  };
  const FilteredData = () => {
    return datatableUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.password.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.tutor_id.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  // console.log(FilteredData());
  // console.log(FilteredData().length);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div></div>
          <span className="title">
            <h1 className="title">View and Add Tutor</h1>
          </span>
          <div className="nav-elements">
            <ul>
              <li>Hello Admin</li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="wrapper">
        <div class="sidebar">
          <div class="profile">
            <img src={Brand} alt="profile_picture" />
            <h3>SREC Hostels</h3>
            <p>Welcome </p>
            <ul>
              <li>
                <a href="addStudent">Student</a>
              </li>
              <li>
                <a href="addTutor" class="active">
                  <span class="item">Tutor</span>
                </a>
              </li>
              <li>
                <a href="addWarden">
                  <span class="item">Warden</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span class="item">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="">
        <form onSubmit={handleSubmit}>
          <div class="row" style={{ width: "30%" }}>
            <div class="col-25" style={{ width: "30%" }}>
              <label for="fname"> Name</label>
            </div>
            <div class="col-25" style={{ width: "70%" }}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter tutor name.."
                required
              />
            </div>
          </div>
          <div class="row" style={{ width: "30%" }}>
            <div class="col-25" style={{ width: "30%" }}>
              <label for="fname"> Tutor Id</label>
            </div>
            <div class="col-25" style={{ width: "70%" }}>
              <input
                type="text"
                id="tutor_id"
                name="tutor_id"
                placeholder="Enter tutor id.."
                required
              />
            </div>
          </div>
          <div class="row" style={{ width: "30%" }}>
            <div class="col-25" style={{ width: "30%" }}>
              <label for="fname"> Password</label>
            </div>
            <div class="col-25" style={{ width: "70%" }}>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter password.."
                required
              />
            </div>
          </div>

          <br></br>
          <div class="row">
            <input type="submit" value="Submit" />
          </div>
          <br></br>
        </form>
      </div>
      <hr></hr>
      <br></br>
      {/* <div className="col-md-3">
        {FilteredData().length === datatableUsers.length ? (
            ""
        ) : (
            <h5 className="text-primary">
                Search ({FilteredData().length}) result found from {datatableUsers.length}
            </h5>
        )}
    </div> */}
      <div className="col-md-3">
        <div className="form-group mb-0">
          <input
            type="text"
            style={{ width: "30%" }}
            className="form-control"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => SetSearchInput(e.target.value)}
          />
        </div>
      </div>
      <br></br>

      <div className="card-body p-0">
        <div className="fixTableHead">
          <table className="table table-text-small mb-0">
            <thead className="thead-dark table-sorting">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Password</th>
                <th>Tutor Id </th>
              </tr>
            </thead>
            <tbody>
              {FilteredData().map((data, index) => {
                const { id, name, password, tutor_id } = data;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{password}</td>
                    <td>{tutor_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddTutor;
