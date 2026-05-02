import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setRole, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post("http://localhost:5000/auth/login", {
      email,
      password
    });

    const role = res.data.role;

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", role);

    setRole(role);

    if (role === "student") navigate("/student");
    else if (role === "teacher") navigate("/teacher");
    else navigate("/admin");
  };

 return (
  <div className="container">
    <div className="card">
      <h2>🎓 Vemu Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
    </div>
  </div>
);
}

export default Login;