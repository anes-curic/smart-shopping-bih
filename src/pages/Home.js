import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <div className="home-text">
          <h1>Smart Shopping BiH</h1>
          <p>Ne plaćaj više nego što moraš – otkrij gdje je najjeftinije!</p>
          <p>Tvoje oružje protiv inflacije, odmah.</p>
          <p>Trenutno smo dostupni samo u Zenici, ali uskoro stižemo i u druge gradove BiH!</p>
          <Link to="/shop">
            <button className="shop-btn">Kupuj odmah</button>
          </Link>
        </div>
        <div className="home-image">
          <img src="../assets/naslovna.png" alt="Shopping" />
        </div>
      </div>
    </div>
  );
};

export default Home;
