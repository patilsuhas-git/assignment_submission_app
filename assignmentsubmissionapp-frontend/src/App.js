import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {
  const initialized = useRef(false);

  const [jwt, setJwt] = useState("");

  useEffect(
  () => {
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
        console.log("jwt :: "+ jwt);
        console.log(body);
      });
      console.log('This is fired ');
    }
  }
  ,[jwt]);

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <div>JWT value : {jwt}</div>
    </div>
  );
}

export default App;
