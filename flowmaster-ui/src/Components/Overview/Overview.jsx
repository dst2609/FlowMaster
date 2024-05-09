// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   NavLink,
// } from "react-router-dom";
// import Dashboard from "../Dashboard/Dashboard";
// import Projects from "../Projects/Projects";
// import YourWork from "../YourWork/YourWork";
// import OverviewContent from "../OverviewContent/OverviewContent";
// import LoginForm from "../LoginForm/LoginForm";
// import RegistrationForm from "../RegistrationForm/RegistrationForm";
// import jwtDecode from "jwt-decode";

// import "./Overview.css";

// const Overview = () => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoggedIn = () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const decodedToken = jwtDecode(token);
//         if (decodedToken.exp * 1000 > Date.now()) {
//           setLoggedIn(true);
//         } else {
//           handleLogout();
//         }
//       }
//     };

//     checkLoggedIn();
//   }, []);

//   const handleLogin = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:3000/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.status === 200) {
//         localStorage.setItem("token", data.token); // Store the token in localStorage
//         setLoggedIn(true);
//       } else {
//         console.log(data.error || "Failed to login");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleRegistration = async (name, email, password) => {
//     try {
//       const response = await fetch("http://localhost:3000/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();
//       if (response.status === 201) {
//         localStorage.setItem("token", data.token); // Store the token in localStorage
//         setLoggedIn(true);
//       } else {
//         console.log(data.error || "Failed to register");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove the token from localStorage
//     setLoggedIn(false);
//   };

//   return (
//     <Router>
//       {loggedIn ? (
//         <div>
//           <header>
//             <nav>
//               <ul>
//                 <li>
//                   <NavLink
//                     to="/overview"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                   >
//                     Overview
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/overview/dashboard"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                   >
//                     Dashboard
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/overview/projects"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                   >
//                     Projects
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/overview/your-work"
//                     className={({ isActive }) => (isActive ? "active" : "")}
//                   >
//                     Your Work
//                   </NavLink>
//                 </li>
//                 <li>
//                   <button onClick={handleLogout}>Logout</button>
//                 </li>
//               </ul>
//             </nav>
//           </header>
//           <div className="content">
//             <Routes>
//               <Route path="/" element={<OverviewContent />} />
//               <Route path="/overview" element={<OverviewContent />} />
//               <Route path="/overview/dashboard" element={<Dashboard />} />
//               <Route path="/overview/projects" element={<Projects />} />
//               <Route path="/overview/your-work" element={<YourWork />} />
//             </Routes>
//           </div>
//         </div>
//       ) : (
//         <div className="login-registration">
//           <LoginForm onLogin={handleLogin} />
//           <RegistrationForm onRegister={handleRegistration} />
//         </div>
//       )}
//     </Router>
//   );
// };

// export default Overview;
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Projects from "../Projects/Projects";
import YourWork from "../YourWork/YourWork";
import OverviewContent from "../OverviewContent/OverviewContent";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import jwtDecode from "jwt-decode";

import "./Overview.css";

const Overview = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true); // State to toggle between login and registration form

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          handleLogout();
        }
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
      } else {
        console.log(data.error || "Failed to login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegistration = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
      } else {
        console.log(data.error || "Failed to register");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <Router>
      {loggedIn ? (
        <div>
          <header>
            <nav>
              <ul>
                <li>
                  <NavLink
                    to="/overview"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/overview/dashboard"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/overview/projects"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/overview/your-work"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Your Work
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<OverviewContent />} />
            <Route path="/overview" element={<OverviewContent />} />
            <Route path="/overview/dashboard" element={<Dashboard />} />
            <Route path="/overview/projects" element={<Projects />} />
            <Route path="/overview/your-work" element={<YourWork />} />
          </Routes>
        </div>
      ) : (
        <div className="login-registration">
          {showLoginForm ? (
            <>
              <LoginForm onLogin={handleLogin} />
              <div className="center-button">
                <button onClick={() => setShowLoginForm(false)}>
                  Not a user yet? Register here
                </button>
              </div>
            </>
          ) : (
            <>
              <RegistrationForm onRegister={handleRegistration} />
              <div className="center-button">
                <button onClick={() => setShowLoginForm(true)}>
                  Already Registered? Login here
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Router>
  );
};

export default Overview;
