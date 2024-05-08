import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Projects from '../Projects/Projects';
import YourWork from '../YourWork/YourWork';
import OverviewContent from '../OverviewContent/OverviewContent';
import './Overview.css';

const Overview = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>Overview</NavLink></li>
              <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : undefined}>Dashboard</NavLink></li>
              <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : undefined}>Projects</NavLink></li>
              <li><NavLink to="/your-work" className={({ isActive }) => isActive ? 'active' : undefined}>Your Work</NavLink></li>
            </ul>
          </nav>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<OverviewContent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/your-work" element={<YourWork />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Overview;
