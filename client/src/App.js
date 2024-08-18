import React from 'react';
import LoginPage from './Pages/Login/Login';
import SignUpPage from './Pages/signUp/signup';
import Dashboard from "./Pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./Pages/Projects/Projects";
import Podcasts from "./Pages/AddPodcast/AddPodcast";
import Settings from "./Pages/userSettings/userSettings";
import EditPodcast from "./Pages/editPodcast/editPodcast";

function App() {
  return (

      <Router>
          <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/edit" element={<EditPodcast />} />


          </Routes>
      </Router>


  );
}

export default App;
