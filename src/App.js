import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateJobPage from './pages/CreateJobPage';
import ManageApplicants from './pages/manageApplicants';
import Thankspage from './pages/thankspage';
import { useState } from 'react';
import {signOut} from 'firebase/auth';
import {auth} from './firebase-config';
//import ApplicantManage from './pages/applicantManage';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    })
  }

  return (
    <Router>
      <div className='webtitle'>
        <h1>Met-Employed</h1>
      </div>
      <div>
      <nav>
        <Link to="/"> Home </Link>
        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createJobPage"> Post a Job </Link>
            <Link to="/ManageApplicants"> Manage Applicants </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}

      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/CreateJobPage" element={<CreateJobPage isAuth={isAuth}/>} />
        <Route path="/ManageApplicants" element={<ManageApplicants isAuth={isAuth}/>} />
        <Route path="/thankspage" element={<Thankspage/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
