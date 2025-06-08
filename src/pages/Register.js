import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validacija
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Sva polja su obavezna!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Lozinka mora imati najmanje 6 znakova");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Lozinke se ne podudaraju!");
      return;
    }

    try {
      // Provjeri postoji li već korisnik s tim e-mailom
      const checkResponse = await fetch(`http://localhost:5000/users?email=${formData.email}`);
      const existingUsers = await checkResponse.json();
      
      if (existingUsers.length > 0) {
        setError("Korisnik s ovim e-mailom već postoji!");
        return;
      }

      // Kreiraj novog korisnika
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password, // U stvarnoj aplikaciji lozinku bi hashirali
          role: "user"
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Greška prilikom registracije. Pokušajte ponovo.");
      }
    } catch (error) {
      setError("Došlo je do greške. Provjerite vašu internet vezu.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registracija</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Registracija uspješna! Preusmjeravamo vas na prijavu...</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ime i prezime</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
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
            <small>Lozinka mora imati najmanje 6 znakova</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Potvrda lozinke</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={success}>
            Registruj se
          </button>
        </form>
        
        <p className="form-link">
          Već imate račun? <Link to="/login">Prijavite se ovdje</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;