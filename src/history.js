import React, { useState, useEffect } from "react";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import axios from "axios";
import Brand from "./srec_logo.jpg";
import { useNavigate } from "react-router-dom";
import "./history.css";

import jsPDF from "jspdf";

import "./form.css";
const SearchFilter = () => {
  const [name1, setName1] = useState();
  const [wname, setWname] = useState();
  const [tname, setTname] = useState();
  const [image, setImage] = useState();
  const [data, setData] = useState([]);
  const [student, setStudentDetail] = useState([]);
  const [data1, setDataSet] = useState(null);
  useEffect(() => {
    if (data1) {
      generatePDF(); // Trigger PDF generation when studentData changes
    }
  }, [data1]);
  const fetchDataById = async (id) => {
    console.log(id);
    try {
      axios
        .post("http://localhost:8081/getPdfDetail", { id: id })
        .then((response) => {
          console.log(response.data[0]);
          setDataSet(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
  const onButtonClick = async (id) => {
    if (!id) {
      console.error("Student ID not provided. Unable to generate PDF.");
      return;
    }

    // Call the function to fetch data based on ID
    await fetchDataById(id);
  };

  const generatePDF = () => {
    // Call the function to fetch data based on ID

    console.log(data1);
    // Create a new instance of jsPDF
    const pdf = new jsPDF();

    // Set the border dimensions and position
    const borderWidth = 0.5; // Adjust the width of the border as needed
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const borderX = 9; // Adjust the X position of the border as needed
    const borderY = 9; // Adjust the Y position of the border as needed

    // Draw a border inside the page
    pdf.setDrawColor(0); // Border color
    pdf.rect(
      borderX,
      borderY,
      pageWidth - 2 * borderX,
      pageHeight - 2 * borderY
    ); // Adjust the border dimensions

    // Add header with logo and college details
    const logoUrl = "srec_logo.jpg"; // Replace with the actual path to your logo image
    const logoWidth = 43;
    const logoHeight = 39;
    pdf.addImage(logoUrl, "JPEG", 11, 11, logoWidth, logoHeight);

    // College details
    const collegeDetails = {
      name: "Sri Ramakrishna Engineering College",
      address: "123 College Avenue, Coimbatore, India",
    };

    // Add college name in the header
    pdf.setFontSize(16);
    pdf.text(collegeDetails.name, 60, 20);

    // Add college address in the header
    pdf.setFontSize(12);
    pdf.text(collegeDetails.address, 60, 30);

    // Add title for the out pass
    pdf.setFontSize(12);
    pdf.text("Hostel Out Pass", 60, 40);

    // Add horizontal line below the header
    pdf.line(10, 55, 200, 55);
    // Student details
    const studentDetails = {
      name: name1,
      imageUrl: `/uploads/${data1.file}`, // Replace with the actual path to the student's image
    };

    // Destination details
    const destinationDetails = {
      destination: data1.destination,
      address: data1.address,
      rollNumber: data1.rollno,
      mobile: data1.mobile,
      reason: data1.reason,
      parentname: data1.p_name,
      from_date: data1.from_date,
      to_date: data1.to_date,
    };

    // Date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    // Add title for student details box
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0); // Set text color to black
    pdf.text("Student Details", 25, 70); // Adjust the position of the title

    // Draw a card box for student details
    const cardWidth = 150;
    const cardHeight = 90;
    const cardX = 20;
    const cardY = 60;

    // Add student details within the card box
    pdf.setFontSize(12);
    pdf.text(`Name: ${name1}`, cardX + 90, cardY + 10);
    pdf.text(
      `Roll Number: ${destinationDetails.rollNumber}`,
      cardX + 90,
      cardY + 20
    );
    pdf.text(`Mobile: ${destinationDetails.mobile}`, cardX + 90, cardY + 30);
    pdf.text(
      `Parent Name: ${destinationDetails.parentname}`,
      cardX + 90,
      cardY + 40
    );
    pdf.text(`Reason: ${destinationDetails.reason}`, cardX + 90, cardY + 50);
    pdf.text(
      `Destination: ${destinationDetails.destination}`,
      cardX + 90,
      cardY + 60
    );
    pdf.text(`Address: ${destinationDetails.address}`, cardX + 90, cardY + 70);
    // Add student image within the card box
    const imageWidth = 40;
    const imageHeight = 38;
    pdf.addImage(
      studentDetails.imageUrl,
      "JPEG",
      cardX + 1,
      cardY + 20,
      imageWidth,
      imageHeight
    );
    // Add small content below the student image highlighting out time and date, in time and date
    // Add small content below the student image highlighting out time and date, in time and date in two columns

    // Add note below student details
    pdf.setFontSize(10);
    pdf.setTextColor(0, 124, 0);
    pdf.text(
      "Note : This out pass is approved by the tutor and warden.",
      15,
      cardY + cardHeight + 5
    );
    // Add small content below the student image highlighting out time and date, in time and date
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(
      `Out Date & Time: ${destinationDetails.from_date}`,
      cardX + 5,
      cardY + 70
    );
    pdf.text(
      `Out Date & Time: ${destinationDetails.to_date}`,
      cardX + 5,
      cardY + 75
    );

    // Save the PDF as a file
    pdf.save("hostel-out-pass.pdf");
  };
  const navigate = useNavigate();
  useEffect(() => {
    setName1(localStorage.getItem("studentname"));
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:8081/getRequestHistory", {
        id: localStorage.getItem("studentid"),
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    try {
      axios
        .post("http://localhost:8081/getStudentDetails", {
          id: localStorage.getItem("studentid"),
        })
        .then((response) => {
          setWname(response.data[0].warden_id);
          setTname(response.data[0].tutor_id);
          setImage(response.data[0].file);
          setStudentDetail(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div></div>
          <span className="title">
            <h1 className="title">
              <img
                src={Brand}
                style={{ width: "90px" }}
                alt="profile_picture"
              />{" "}
              Sri Ramakrishna Engineering College
            </h1>
          </span>
          <div className="nav-elements">
            <ul>
              <li>Tutor: {tname}</li>
              <li>Warden: {wname}</li>
              <li>
                <li>
                  <a href="student" style={{ color: "red" }} class="">
                    Logout
                  </a>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="wrapper">
        <div class="sidebar">
          <div class="profile">
            <img src={`/uploads/${image}`} alt="profile_picture" />
            <h3>SREC Hostels</h3>
            <p>Welcome {name1}</p>
            <p>Mobile: {student.mobile}</p>
            <p>Parent Name: {student.p_name}</p>
            <p>Address: {student.address}</p>
            <ul>
              <li>
                <a href="studentHome">Request Pass</a>
              </li>
              <li>
                <a href="requestHistory" class="active">
                  Request History
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-body p-0">
        <div className="" style={{ marginLeft: "20%", marginRight: "10%" }}>
          <p>
            Note: On Duty and Week day leaves need both tutor and warden
            approvals
          </p>
          <hr></hr>
          <br></br>
          <div class="cards">
            {data.map((item) => (
              <article class="card">
                <header>
                  <h2>Reason: {item.reason}</h2>
                  <h2>Destination: {item.destination}</h2>
                </header>
                <div class="content">
                  <p>From: {item.from_date}</p>
                  <p>To: {item.to_date}</p>
                  <h3>Approval Status -</h3>
                  {(() => {
                    switch (item.reason) {
                      case "OnDuty":
                        return (
                          <>
                            <p>Tutor approval: {item.t_approve}</p>
                            <p>Warden approval: {item.w_approve}</p>
                          </>
                        );
                      case "Holiday":
                        return (
                          <>
                            <p>Warden approval: {item.w_approve}</p>
                          </>
                        );
                      case "Week Day Leave":
                        return (
                          <>
                            <p>Tutor approval: {item.t_approve}</p>
                            <p>Warden approval: {item.w_approve}</p>
                          </>
                        );
                      case "Outing":
                        return (
                          <>
                            <p>Warden approval: {item.w_approve}</p>
                          </>
                        );
                    }
                  })()}
                </div>
                {(() => {
                  if (
                    (item.reason == "OnDuty" ||
                      item.reason == "Week Day Leave") &&
                    item.t_approve == "approved" &&
                    item.w_approve == "approved"
                  ) {
                    return (
                      <footer style={{ position: "relative" }}>
                        <button onClick={() => onButtonClick(item.id)}>
                          Download pass
                        </button>
                      </footer>
                    );
                  } else if (item.w_approve == "approved") {
                    return (
                      <footer
                        style={{ position: "relative" }}
                        className="footer"
                      >
                        {" "}
                        <button onClick={() => onButtonClick(item.id)}>
                          Download pass
                        </button>
                      </footer>
                    );
                  }
                })()}
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
