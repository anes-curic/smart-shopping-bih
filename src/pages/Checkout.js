import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const [selectedStore, setSelectedStore] = useState("");
  const navigate = useNavigate();

  const getTotalPrice = (store) => {
    return cartItems
      .reduce((total, item) => {
        const price = item.prices[store];
        return total + (price ? parseFloat(price) : 0);
      }, 0)
      .toFixed(2);
  };

  const getBestStore = () => {
    const stores = ["Bingo", "Konzum", "Best", "Ekor"];
    const storeTotals = stores.map(store => ({
      store,
      total: parseFloat(getTotalPrice(store))
    }));
    
    return storeTotals.reduce((best, current) => 
      current.total > 0 && (best.total === 0 || current.total < best.total) ? current : best
    , { store: "Nije dostupno", total: 0 });
  };

  const bestStore = getBestStore();

  const completePurchase = () => {
    if (currentUser) {
      // Ovdje bi se inače slala narudžba na backend
      alert(`Kupovina uspješno potvrđena! Uštedili ste kupovinom u ${selectedStore || bestStore.store}.`);
      clearCart();
      navigate("/");
    } else {
      if (window.confirm("Za završetak kupovine potrebno je da se prijavite. Želite li se prijaviti?")) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="checkout-container">
      <h2>Pregled kupovine</h2>

      {cartItems.length === 0 ? (
        <div className="empty-checkout">
          <p>Nema proizvoda za pregled.</p>
          <button onClick={() => navigate("/shop")} className="continue-shopping-btn">
            Idi na kupovinu
          </button>
        </div>
      ) : (
        <>
          <div className="store-comparison">
            <h3>Usporedba cijena po trgovinama:</h3>
            <div className="store-prices-grid">
              {["Bingo", "Konzum", "Best", "Ekor"].map(store => (
                <div 
                  key={store} 
                  className={`store-price-card ${selectedStore === store ? 'selected' : ''} 
                    ${store === bestStore.store ? 'best-price' : ''}`}
                  onClick={() => setSelectedStore(store)}
                >
                  <h4>{store}</h4>
                  <p className="store-total">{getTotalPrice(store)} KM</p>
                  {store === bestStore.store && <span className="best-badge">Najjeftinije</span>}
                </div>
              ))}
            </div>
            <p className="savings-info">
              Preporučena trgovina: <strong>{bestStore.store}</strong>
            </p>
          </div>

          <div className="checkout-summary">
            <h3>Proizvodi u korpi:</h3>
            <ul className="checkout-items">
              {cartItems.map(item => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>{item.prices[selectedStore || bestStore.store]} KM</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Ukupno:</span>
              <span>{getTotalPrice(selectedStore || bestStore.store)} KM</span>
            </div>
          </div>

          <div className="checkout-actions">
            <button onClick={() => navigate("/cart")} className="back-btn">
              Nazad na korpu
            </button>
            <button onClick={completePurchase} className="complete-purchase-btn">
              Završi kupovinu
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;