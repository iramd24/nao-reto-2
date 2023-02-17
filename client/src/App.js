import './App.css';

import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import DataDisplay from "./components/dataDisplay/dataDisplay";
import DataUpload from "./components/dataUpload/dataUpload";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({
    _id: "",
    email: "",
    password: ""
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log('App');
      //console.log(foundUser && foundUser._id);
      //setUser(foundUser );
      /*setUser({
        ...foundUser,
      });*/
      //console.log(user._id);
      //console.log(user);
    }
  }, []);
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={
              localStorage.getItem("user") ? (
                <Homepage />
              ) : (
                <Navigate replace to={"/Login"} />
              )
            }
            />
            <Route exact path="/capacity" element={
              localStorage.getItem("user") ? (
                <DataDisplay />
              ) : (
                <Navigate replace to={"/Login"} />
              )
            }
            />
            <Route exact path="/capacity/upload" element={
              localStorage.getItem("user") ? (
                <DataUpload />
              ) : (
                <Navigate replace to={"/Login"} />
              )
            }
            />
            <Route path="/Login" element={<Login/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
