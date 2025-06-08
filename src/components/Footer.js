import React from "react";
import "../styles.css";
import logo from "./assets/logo.png"



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-center">
        <img src={logo} alt="Smart Shopping BiH" className="footer-logo-img" />
        <p className="footer-brand-name">Smart Shopping BiH</p>
        <div className="footer-info-centered">
          <p><strong>Adresa:</strong> Fakultetska 3, 72000 Zenica</p>
          <p><strong>Email:</strong> info@smartshoppingbih.ba</p>
          <p><strong>Telefon:</strong> +387 62 123 456</p>
        </div>
        <div className="footer-social-centered">
          <a href="https:facebook.com"><i className="fab fa-facebook-f"></i></a>
          <a href="https:instagram.com"><i className="fab fa-instagram"></i></a>
          <a href="https:twitter.com"><i className="fab fa-twitter"></i></a>
          <a href="#https:youtube.com"><i className="fab fa-youtube"></i></a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Smart Shopping BiH. Sva prava zadržana.</p>
      </div>
    </footer>
  );
};

export default Footer;
