import './App.css';
import {useEffect, useRef} from "react";
import {useLocalState} from "../util/useLocalStorage";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  const initialized = useRef(false);
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(
  () => {
    if(!jwt) {
      if (!initialized.current) {
        initialized.current = true

        const reqBody = {
          "username": "suhas",
          "password": "123123"
        };
        fetch("api/auth/login", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "post",
          body: JSON.stringify(reqBody)
        }).then((response)=> Promise.all([response.json(), response.headers]))
            .then(([body, headers]) => {
              setJwt(headers.get("authorization"));
            });
      }
    }
  }
  ,[]);

  useEffect(()=>{
    console.log("jwt :: "+ jwt);
  }, [jwt]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
