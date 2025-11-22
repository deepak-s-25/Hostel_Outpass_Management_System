import React, {useEffect,useState } from "react";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Brand from './srec_logo.jpg'
const AddStudent = () => {
    const [datatableUsers, setdatatableUsers] = useState([]);
    const [name1,setName1] = useState();
    useEffect(() => {
    setName1(localStorage.getItem("name"));
}, []);
try{
    axios.post("http://localhost:8081/getStudent", 
        {id:localStorage.getItem("id")})
.then(response => {
    if(response.data.length!=0)
    {
        
        setdatatableUsers(response.data)
        
    }
  
}).catch(err=>{console.log(err)});

  }catch(error)
  {
    console.log(error.response.data)
  }
    

    const [searchInput, SetSearchInput] = useState("");

    const FilteredData = () => {
        return datatableUsers.filter(
            (user) =>
                user.sname.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.warden_id.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.rollno.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.address.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.p_name.toLowerCase().includes(searchInput.toLowerCase()) 
        );
    };

    // console.log(FilteredData());
    // console.log(FilteredData().length);

    return (
        <>
        <nav className="navbar">
      <div className="container">
        <div >
         
        </div>
        <span className="title"><h1 className="title">View Students</h1></span>
        <div className="nav-elements">
          <ul>
          <li>
           Hello {name1}
          </li>
          <li>
          
          </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="wrapper">
   
        <div class="sidebar">
            
        <div class="profile">
                <img src={Brand} alt="profile_picture"/>
                <h3>SREC Hostels</h3>
                <p>Welcome </p>
                <ul>
                <li>
                    <a href="tutorHome" class="active">Student
                        
                    </a>
                </li>
                <li>
                    <a href="tutorWaitList">Pass: Waiting for approval 
                    </a>
                </li>
                <li>
                    <a href="tutorOutpassHistory">Out Pass history 
                    </a>
                </li>
                <li>
                    <a href="staff" class="">Logout
                        
                    </a>
                </li>
                </ul>
            </div>
        </div>

    </div>
    <div class="">
  
</div>
           <hr></hr>
           <br></br>
   
    <div className="col-md-3">
        <div className="form-group mb-0">
            <input type="text" style={{width: "30%"}}className="form-control" placeholder="Search" value={searchInput} onChange={(e) => SetSearchInput(e.target.value)} />
        </div>
    </div>
    <br></br>
                            
                            <div className="card-body p-0">
                                <div className="fixTableHead">
                                    <table className="table table-text-small mb-0">
                                        <thead className="thead-dark table-sorting">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Image </th>
                                                <th>Other Details</th>
                                                
                                                <th>Roll No</th>
                                                <th>Warden Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {FilteredData().map((data, index) => {
                                                const { id, file,sname, rollno, warden_id,p_name,mobile,address} = data;
                                                return (
                                                    <tr key={index}>
                                                       <td>{index+1}</td>
                                                        <td><img style={{width:"110px",height:'95px'}}src={`/uploads/${file}`}></img><p>{sname}</p></td>
                                                        <td><p>Parent name:{p_name}</p>
                                                        <p>Mobile No:{mobile}</p>
                                                        <p>Address:{address}</p></td>
                                                        
                                                        <td>{rollno}</td>
                                                        <td>{warden_id}</td>
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

export default AddStudent;
