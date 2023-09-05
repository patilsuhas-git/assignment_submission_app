import './App.css';
import {useEffect, useRef} from "react";
import {useLocalState} from "../util/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard";
import Homepage from "../Homepage";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(()=>{
  }, [jwt]);

  return (
      <Routes>
        <Route path="/" element={
            <PrivateRoute>
                <Homepage />
            </PrivateRoute>}>
        </Route>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
  );
}

export default App;
