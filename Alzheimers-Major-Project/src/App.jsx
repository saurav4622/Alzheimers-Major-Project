import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CoverPage from "./StatelessComponents/CoverPage/CoverPage";
import Dashboard from "./StatelessComponents/Dashboard/dashboard";
import UserLogin from "./StatelessComponents/Login/userLogin";
import UserSignUp from "./StatelessComponents/User/userSignUp";

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Login</Link> | <Link to="/dashboard">Dashboard</Link>
          | <Link to="/signup">Sign Up</Link> | <Link to="/coverpage">CoverPage</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/coverpage" element={<CoverPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
