import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    api.get("/usuarios").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  function newUser() {
    api
      .post("/usuarios", {
        age,
        name,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="div-principal">
      <h1>Cadastrar Usuário</h1>
      <input
        placeholder="Nome"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="Idade"
        onChange={(event) => setAge(event.target.value)}
      />
      <button onClick={newUser}>Cadastrar</button>

      <h1>Lista Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            Nome: {user.name} - Idade: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
