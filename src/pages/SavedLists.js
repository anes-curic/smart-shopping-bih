import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";
import ConfirmModal from "../components/ConfirmModal";

const SavedLists = () => {
  const [savedLists, setSavedLists] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get("http://localhost:5000/savedLists");
        const userLists = res.data.filter(list => list.userId === user?.id);
        setSavedLists(userLists.reverse());
      } catch (err) {
        console.error("Greška pri dohvaćanju listi:", err);
      }
    };
    fetchLists();
  }, [user?.id]);

  const getBestPrice = (prices) => {
    if (!prices || typeof prices !== "object") return "N/A";
    const entries = Object.entries(prices).filter(([_, value]) => value && !isNaN(value));
    if (!entries.length) return "N/A";
    const [store, price] = entries.reduce((a, b) =>
      parseFloat(a[1]) < parseFloat(b[1]) ? a : b
    );
    return `${price} KM (${store})`;
  };

  const handleDeleteClick = (id) => {
    setSelectedListId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/savedLists/${selectedListId}`);
      setSavedLists(prev => prev.filter(list => list.id !== selectedListId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Greška prilikom brisanja:", error);
    }
  };

  return (
    <div className="saved-lists-container">
      <h2>Moje sačuvane liste</h2>
      {savedLists.length === 0 ? (
        <p>Nemate sačuvanih listi.</p>
      ) : (
        <div className="lists-grid">
          {savedLists.map(list => (
            <div key={list.id} className="saved-list-card">
              <h4>Sačuvano: {new Date(list.date).toLocaleString()}</h4>
              <ul className="saved-list-items">
                {list.items?.map((item, i) => (
                  <li key={i}>
                    <strong>{item.name}</strong> x{item.quantity}
                    <br />
                    <span className="price-info">
                      Najniža cijena: {getBestPrice(item.prices)}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="delete-list-btn"
                onClick={() => handleDeleteClick(list.id)}
              >
                Obriši listu
              </button>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        show={showConfirmModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmModal(false)}
        message="Da li ste sigurni da želite obrisati ovu listu?"
      />
    </div>
  );
};

export default SavedLists;
