import './App.css';
import {useEffect, useRef} from "react";
import {useLocalState} from "../util/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard";
import Homepage from "../Homepage";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";

function App() {
  const initialized = useRef(false);
  const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect(
  // () => {
  //   if(!jwt) {
  //     if (!initialized.current) {
  //       initialized.current = true
  //
  //       const reqBody = {
  //         "username": "suhas",
  //         "password": "123123"
  //       };
  //       fetch("api/auth/login", {
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         method: "post",
  //         body: JSON.stringify(reqBody)
  //       }).then((response)=> Promise.all([response.json(), response.headers]))
  //           .then(([body, headers]) => {
  //             setJwt(headers.get("authorization"));
  //           });
  //     }
  //   }
  // }
  // ,[]);

  useEffect(()=>{
    console.log("jwt :: "+ jwt);
  }, [jwt]);

  return (
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
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
