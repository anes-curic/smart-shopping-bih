import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "../styles.css";

const Cart = () => {
  const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getBestPrice = (prices) => {
    if (!prices || typeof prices !== "object") return { price: "N/A", store: "Nepoznato" };

    const entries = Object.entries(prices).filter(
      ([_, value]) => value && !isNaN(parseFloat(value))
    );

    if (!entries.length) return { price: "N/A", store: "Nepoznato" };

    const [store, price] = entries.reduce((a, b) =>
      parseFloat(a[1]) < parseFloat(b[1]) ? a : b
    );

    return { price, store };
  };

  const handleSaveList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setErrorMessage("Morate biti prijavljeni da biste sačuvali listu.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    const payload = {
      userId: user.id,
      date: new Date().toISOString(),
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity || 1,
        prices: item.prices
      }))
    };

    try {
      setIsSaving(true);
      await axios.post("http://localhost:5000/savedLists", payload);
      setSuccessMessage("Lista je uspješno sačuvana!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Greška pri čuvanju liste:", error);
      setErrorMessage("Došlo je do greške pri čuvanju liste.");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCheckout = () => {
    setCartItems([]);
    setSuccessMessage("Kupovina završena! Hvala na povjerenju.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="cart-container">
      <h2>Moja košarica</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Vaša košarica je prazna.</p>
          <button onClick={() => navigate("/shop")} className="continue-shopping-btn">
            Nastavi kupovinu
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const best = getBestPrice(item.prices);
              const otherPrices = Object.entries(item.prices || {}).filter(
                ([store]) => store !== best.store
              );

              return (
                <div key={item.id} className="product-card">
                  <img src={item.image} alt={item.name} className="product-image" />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><strong>Najjeftinija cijena:</strong> {best.price} KM ({best.store})</p>
                  {otherPrices.length > 0 && (
                    <div className="ostale-cijene">
                      <p><strong>Ostale cijene:</strong></p>
                      <ul>
                        {otherPrices.map(([store, price], i) => (
                          <li key={i}>{store}: {price} KM</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Ukloni
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-footer">
            <button onClick={() => navigate("/shop")} className="continue-shopping-btn">
              Nastavi kupovinu
            </button>
            <button onClick={handleSaveList} className="save-list-btn" disabled={isSaving}>
              {isSaving ? "Spremanje..." : "Sačuvaj listu"}
            </button>
            <button onClick={handleCheckout} className="checkout-btn">
              Završi kupovinu
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
