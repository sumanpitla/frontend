// Desc: Main App component that will be rendered by ReactDOM in index.js.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import HomePage from './components/Homepage';
import AddCourse from './components/AddCourse';
import AddInstance from './components/AddInstance';
import ListAllcourses from './components/ListAllCourses';
import ListInstances from './components/ListInstances';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-instance" element={<AddInstance />} />
        <Route path="/list-courses" element={<ListAllcourses />} />
        <Route path="/list-instances" element={<ListInstances />} />
      </Routes>
    </Router>
  
  );
}

export default App;
