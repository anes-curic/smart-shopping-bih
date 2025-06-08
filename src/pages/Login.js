import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Popunite sva polja!");
      return;
    }

    const user = await login(formData.email, formData.password);
    
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role.startsWith("admin-")) {
        navigate(`/admin-${user.role.split("-")[1]}`);
      } else {
        navigate("/shop");
      }
    } else {
      setError("Neispravni podaci za prijavu!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Prijava</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Prijavi se</button>
        </form>
        <button onClick={() => navigate("/shop")} className="btn-secondary">
          Nastavi kao gost
        </button>
        <p className="form-link">
          Nemate račun? <Link to="/register">Registrujte se ovdje</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;