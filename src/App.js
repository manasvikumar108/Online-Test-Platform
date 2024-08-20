import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Components/Dashboard/Dashboard';
import Signup from './Components/LoginSignup/Signup';
import Login from './Components/LoginSignup/Login';

function App() {
  return (
    <>
		{/* <Dashboard/> */}
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
