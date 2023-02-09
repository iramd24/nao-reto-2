import './App.css';

import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user, setLoginUser] = useState({

  });
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={
              user && user._id ? (
                <Homepage /> 
              ) : (
                <Navigate replace to={"/Login"} />
              )
            }
            />
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
