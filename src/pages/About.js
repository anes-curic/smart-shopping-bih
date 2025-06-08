import React from "react";
import "../styles.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <h2 className="about-title">O nama</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            <strong>Smart Shopping BiH</strong> je inovativna web aplikacija koja pomaže
            građanima da lakše uporede cijene proizvoda u različitim trgovinama i pronađu
            najpovoljnije opcije – sve na jednom mjestu.
          </p>
          <p>
            Trenutno aktivna za Zenicu, naš tim radi na širenju prema ostalim gradovima
            BiH. Cilj nam je transparentna i efikasna kupovina – za kupce i trgovce.
          </p>
          <p>
            Sjedište projekta je na <strong>Univerzitetu u Zenici</strong>, a iza njega stoji
            tim mladih studenata softverskog inženjerstva koji žele napraviti promjenu.
          </p>
          <p>Kroz ovu platformu želimo pružiti praktičan alat koji štedi vrijeme, novac i olakšava donošenje pametnih odluka pri kupovini.</p>

        </div>

        

        <div className="about-map">
          <iframe
            title="Univerzitet u Zenici"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2870.351366020623!2d17.907579115152394!3d44.2042356791059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475eec6126cc34cd%3A0x2de157b2e6e39337!2sUniverzitet%20u%20Zenici!5e0!3m2!1sbs!2sba!4v1683314183743!5m2!1sbs!2sba"
            width="100%"
            height="300"
            style={{ border: "0", borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
