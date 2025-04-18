import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./StatefulComponents/Dashboard/dashboard";
import UserLogin from "./StatefulComponents/Login/userLogin";

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Login</Link> | <Link to="/dashboard">Dashboard</Link>
          {/* <Link to="/about">About</Link> |{" "}
        <Link to="/login">Login</Link> */}
        </nav>

        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/login" element={<UserLogin />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
