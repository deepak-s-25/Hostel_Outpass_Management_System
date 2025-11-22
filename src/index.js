import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Navbar";
import Admin from "./Admin";
import Staff from "./Staff";
import Warden from "./Warden";
import Student from "./Student";
import AddStudent from "./addStudent";
import AddTutor from "./addTutor";
import AddWarden from "./addWarden";
import TutorHome from "./tutorHome";
import WardenHome from "./wardenHome";
import StudentHome from "./studentHome"
import RequestHistory from "./history";
import TutorWaitList from './tutorWaitList';
import WardenWaitList from './WardenWaitList';
import TutorOutpassHistory from './tutorOutpassHistory';
import OutpassHistoryWarden from './outpassHistoryWarden';
import Footer from './Footer';
import Home from './Home';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="staff" element={<Staff />} />
          <Route path="warden" element={<Warden />} />
          <Route path="Student" element={<Student />} /> 
          
        </Route>
        
        <Route path="addStudent" element={<AddStudent />} />
        <Route path="studentadd" element={<AddStudent />} />
        <Route path="addTutor" element={<AddTutor />} />
        <Route path="addWarden" element={<AddWarden />} />
        <Route path="tutorHome" element={<TutorHome />} />
        <Route path="wardenHome" element={<WardenHome />} />
        <Route path="studentHome" element={<StudentHome />} />
        <Route path="requestHistory" element={<RequestHistory />} />
        <Route path="tutorWaitList" element={<TutorWaitList />} />
        <Route path="wardenWaitList" element={<WardenWaitList />} />
        <Route path="tutorOutpassHistory" element={<TutorOutpassHistory />} />
        <Route path="outpassHistoryWarden" element={<OutpassHistoryWarden />} />
        
      </Routes>
      
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);