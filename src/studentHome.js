import React, {useEffect,useState } from "react";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import axios from "axios";
import Brand from './srec_logo.jpg'
import './student.css'
import { useNavigate } from "react-router-dom";
const StudentHome = () => {
    const [name1,setName1] = useState();
    const [wname,setWname] = useState();
    const [tname,setTname] = useState();
    const [image,setImage] = useState();
    
  const [student,setStudentDetail]= useState([])
    const navigate = useNavigate();
    useEffect(() => {
    setName1(localStorage.getItem("studentname"));
   
}, []);
try{
    axios.post("http://localhost:8081/getStudentDetails", 
        {id:localStorage.getItem("studentid")})
.then(response => {
        setWname(response.data[0].warden_id)
        setTname(response.data[0].tutor_id)
        setImage(response.data[0].file)
        setStudentDetail(response.data[0])
        
       
  
}).catch(err=>{console.log(err)});

  }catch(error)
  {
    console.log(error.response.data)
  }
  const [data,setData] = useState();
const handleSubmit = (event) => {
  
 const reason = event.target.reason.value;
 const destination = event.target.destination.value;
 const from = event.target.from.value;
 const to = event.target.to.value;
 setData(
    {reason: reason,
      destination: destination,
      from: from,
      to:to,
      student_id:localStorage.getItem("studentid")
});
  try{
    axios.post("http://localhost:8081/addRequest", 
        data)
.then(response => {
    if(response.data=="success")
    {
        alert('request raised successfully ! kindly wait for approval');
        navigate('/requestHistory');
    }
  
}).catch(err=>{console.log(err)});

  }catch(error)
  {
    console.log(error.response.data)
  }
 
  event.preventDefault();
}
   
    return (
        <>
        <nav className="navbar">
      <div className="container">
        <div >
         
        </div>
        <span className="title"><h1 className="title" ><img src={Brand} style={{width:'90px'}}alt="profile_picture"/> Sri Ramakrishna Engineering College</h1></span>
        <div className="nav-elements">
          <ul>
          
          <li>
           Tutor:  {tname}
          </li>
          <li>
           Warden:  {wname}
          </li>
          <li>
          <li>
                    <a href="student" style={{color:"red"}}class="">Logout
                        
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
                <img src={`/uploads/${image}`} alt="profile_picture"/>
                <h3>SREC Hostels</h3>
                <p>Welcome {name1}</p>
                <p>Mobile: {student.mobile}</p>
                <p>Parent Name: {student.p_name}</p>
                <p>Address: {student.address}</p>
                <ul>
                <li>
                    <a href="studentHome" class="active">Request Pass
                        
                    </a>
                </li>
                <li>
                    <a href="requestHistory" >Request History
                        
                    </a>
                </li>
                </ul>
            </div>
        </div>

    </div>
    <div class="">
  
</div>
<div class="containerr">
            <form onSubmit={handleSubmit} id="form">
                <div class="column one">
                    <div class="field username">
                        <label for="reason">Reason</label>
                        <select name="reason" id="reason" required>
                          <option value="">Select Reason</option>
                          <option value="OnDuty">OnDuty</option>
                          <option value="Holiday">Holiday</option>
                          <option value="Week Day Leave">Week day leave</option>
                          <option value="Outing">Outing</option>

                        </select>
                    </div>
                    <div class="field password">
                        <label for="destination">Destination</label>
                        <input type="text" name="destination" id="destination" placeholder="type a destination" required/>
                    </div>
                    <div class="field email">
                        <label for="from">From</label>
                        <input type="datetime-local" min={new Date().toISOString().slice(0, -8)} name="from" id="from"  placeholder="type a valid email" required/>
                    </div>
                </div>
                <div class="column two">
                    <div class="field phone">
                        <label for="to">To</label>
                        <input type="datetime-local" min={new Date().toISOString().slice(0, -8)} name="to" id="to"  placeholder="type a valid email" required/>
                    </div>
                    
                </div>
                <input type="submit" value="Request" class="register"/>
            </form>
        </div>
          
           <br></br>
   
        </>
    );
};

export default StudentHome;
