import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { currentUser } = useContext(AuthContext);
  const formRef = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_rrw800r",         // tvoj service ID
        "template_8p1y7wq",        // tvoj template ID
        formRef.current,
        "nWlgNmfO3AVz6CcCn"        // tvoj public key
      )
      .then(() => {
        setSuccess(true);
        setIsSubmitting(false);
        formRef.current.reset();  // resetuj formu
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err) => {
        console.error(err);
        setError("Došlo je do greške pri slanju poruke.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-container">
      <h2>Kontaktirajte nas</h2>
      <p className="contact-intro">
        Imate pitanje, prijedlog ili primjedbu? Pošaljite poruku putem forme.
      </p>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-container">
          <h3>Hvala na vašoj poruci!</h3>
          <p>Odgovorit ćemo vam u najkraćem roku.</p>
        </div>
      )}

      {!success && (
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Ime i prezime</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={currentUser ? currentUser.name : ""}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={currentUser ? currentUser.email : ""}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Predmet</label>
            <input type="text" id="subject" name="subject" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Poruka</label>
            <textarea id="message" name="message" rows="6" required></textarea>
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Slanje..." : "Pošalji poruku"}
          </button>
        </form>
      )}

      <div className="contact-info">
        <h3>Naše sjedište</h3>
        <p>Univerzitet u Zenici</p>
        <p>Fakultetska 3, 72000 Zenica</p>
        <p>Email: smartshoppingbih@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;

