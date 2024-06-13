import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateMentor from './Comp/CreateMentor';
import CreateStudent from './Comp/CreateStudent';
import AssignStudents from './Comp/AssigningStudent';
import ChangeMentor from './Comp/ChangeMentor';
import ShowStudents from './Comp/ShowStudents';
import ShowPreviousMentors from './Comp/ShowMentor';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import './App.css'

function App() {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('https://assigning-mentor-backend-67zm.onrender.com/api/mentors');
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://assigning-mentor-backend-67zm.onrender.com/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchStudents();
  }, []);

  return (
    <Router>
      <div className="d-flex">
        <NavBar />
        <div className="content">
          <h1 className="my-4 text-center header-text">Mentor Student Management</h1>
          <Routes>
            <Route path="/" element={<CreateMentor fetchMentors={fetchMentors} />} />
            <Route path="/create-mentor" element={<CreateMentor fetchMentors={fetchMentors} />} />
            <Route path="/create-student" element={<CreateStudent fetchStudents={fetchStudents} />} />
            <Route path="/assign-students" element={<AssignStudents mentors={mentors} students={students} fetchStudents={fetchStudents} />} />
            <Route path="/change-mentor" element={<ChangeMentor mentors={mentors} students={students} fetchMentors={fetchMentors} fetchStudents={fetchStudents} />} />
            <Route path="/show-students" element={<ShowStudents mentors={mentors} />} />
            <Route path="/show-previous-mentors" element={<ShowPreviousMentors students={students} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;