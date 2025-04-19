import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./StatefulComponents/Dashboard/dashboard";
import UserLogin from "./StatefulComponents/Login/userLogin";
import UserSignUp from "./StatefulComponents/User/userSignUp";

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Login</Link> | <Link to="/dashboard">Dashboard</Link>
          | <Link to="/signup">Sign Up</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<UserSignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
