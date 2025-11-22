import React, {useEffect,useState } from "react";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import axios from 'axios';
import Brand from './srec_logo.jpg';
import {useNavigate} from 'react-router-dom';
const AddStudent = () => {
    
    const [datatableUsers, setdatatableUsers] = useState([]);
    const [tutors,setTutor] = useState([]);
    const [image, setImage] = useState({ preview: '', data: '' })
    const [id,setID] = useState();
    
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:8081/tutor')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setTutor(data);
          });
      }, []);
      const [wardens,setwarden] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/warden')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setwarden(data);
          });
      }, []);
      useEffect(() => {
        fetch('http://localhost:8081/student')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setdatatableUsers(data);
          });
      }, []);
    

    const [searchInput, SetSearchInput] = useState("");
    const onFileChange = (e) => 
    {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
          }
          setImage(img)
    }
    const [data,setData] = useState();
    
    const [formData, setFormData] = useState({
      // Add your form fields here
      name: '',
      password: '',
      tutor_id:'',
      warden_id:'',
      rollno:"",
      address:'',
      p_name:'',
      mobile:'',
      file: null,
    });
    
    const handleSubmit = async (e) => {
      setFormData({name:e.target.name.value,
        password:e.target.password.value,
        tutor_id :e.target.tutor.value,
        warden_id :e.target.warden.value,
        rollno :e.target.rollno.value,
        address :e.target.address.value,
        p_name :e.target.p_name.value,
        mobile :e.target.mobile.value,
        file:image.data})
      
      e.preventDefault();
  
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
  
      
        await axios.post('http://localhost:8081/addStudent', data, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(response => {
          if(response.data=="success")
          {
              alert('student inserted successfully');
              window.location.reload();
          }
        
      }).catch(err=>{console.log(err)});
        
    };
    const FilteredData = () => {
        return datatableUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.password.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.tutor_id.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.warden_id.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.address.toLowerCase().includes(searchInput.toLowerCase())||
                user.p_name.toLowerCase().includes(searchInput.toLowerCase())||
                user.rollno.toLowerCase().includes(searchInput.toLowerCase())
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
        <span className="title"><h1 className="title">View and Add Students</h1></span>
        <div className="nav-elements">
          <ul>
          <li>
           Hello Admin
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
                    <a href="addStudent" class="active">Students
                        
                    </a>
                </li>
                <li>
                    <a href="addTutor">
                        
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
  <div class="row">
    <div class="col-25" style={{width:"33%"}}>
        <label for="tutor">Select Tutor</label>
        <select id="tutor" name="tutor" required>
        <option value="" >
         -- Select Tutor --
      </option>
      {tutors.map((tutor) => {
          return <option value={tutor.id}>{tutor.name} 
                 </option>;
        })}
        </select>
      </div>
      
      <div class="col-25" style={{width:"33%"}}>
        <label for="warden">Select Warden</label>
        <select id="warden" name="warden" required>
        <option value="" >
         -- Select Warden --
      </option>
      {wardens.map((warden) => {
          return <option value={warden.id}>{warden.name} 
                 </option>;
        })}
        </select>
      </div>
      <div class="col-25" style={{width:"33%"}}>
        <label for="lname"> Student image</label>
        <input type="file" onChange={onFileChange} id="file" name="file" required placeholder="enter roll no.."/>
      </div>
    </div>
    <div class="row">
      <div class="col-25" style={{width:"33%"}}>
        <label for="fname"> Name</label>
        <input type="text" id="name" name="name" required placeholder="Enter name.."/>
      </div>
      <div class="col-25" style={{width:"33%"}}>
        <label for="lname"> Roll number</label>
        <input type="text" id="rollno" name="rollno" required placeholder="enter roll no.."/>
      </div>
      <div class="col-25" style={{width:"33%"}}>
        <label for="fname"> Password</label>
        <input type="text" id="password" name="password" required placeholder="enter password .."/>
      </div>
    </div>
    <div class="row">
      <div class="col-25" style={{width:"33%"}}>
        <label for="fname"> Mobile</label>
        <input type="text" id="mobile" name="mobile" required placeholder="Enter MObile no.."/>
      </div>
      <div class="col-25" style={{width:"33%"}}>
        <label for="lname"> Parent Name</label>
        <input type="text" id="p_name" name="p_name" required placeholder="enter Parent name.."/>
      </div>
      <div class="col-25" style={{width:"33%"}}>
        <label for="fname"> Address</label>
        <input type="text" id="address" name="address" required placeholder="enter address .."/>
      </div>
    </div>
    <br></br>
    <div class="row">
      <input type="submit" value="Submit"/>
    </div>
    <br></br>
  </form>
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
                                                <th>Password </th>
                                                <th>Tutor Name</th>
                                                <th>Warden Name</th>
                                                <th>Roll No </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {FilteredData().map((data, index) => {
                                                const { id, name, file,password, tutor_id, warden_id, rollno,p_name,mobile,address} = data;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td><img style={{width:"110px",height:'95px'}}src={`/uploads/${file}`}></img><p>{name}</p></td>
                                                        <td><p>Parent name:{p_name}</p>
                                                        <p>Mobile No:{mobile}</p>
                                                        <p>Address:{address}</p></td>
                                                        <td>{password}</td>
                                                        <td>{tutor_id}</td>
                                                        <td>{warden_id}</td>
                                                        <td>{rollno}</td>
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
