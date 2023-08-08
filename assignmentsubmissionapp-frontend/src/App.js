import './App.css';

function App() {
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
  }).then((response)=> response.json())
    .then((data) => console.log(data));
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
