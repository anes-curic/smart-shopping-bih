import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SavedListDetail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("savedListId");
  const [list, setList] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/savedLists/${id}`)
      .then(res => setList(res.data))
      .catch(() => alert("Greska kod detalja liste"));
  }, [id]);

  const getBestPrice = (prices) => {
    const valid = Object.entries(prices).filter(([_, val]) => val);
    if (valid.length === 0) return { store: "-", price: "N/A" };
    const [store, price] = valid.reduce((a, b) => parseFloat(a[1]) < parseFloat(b[1]) ? a : b);
    return { store, price };
  };

  if (!list) return <p>Učitavanje...</p>;

  return (
    <div className="saved-list-detail">
      <h2>Lista sačuvana: {list.date}</h2>
      {list.items.map((item, index) => {
        const best = getBestPrice(item.prices);
        return (
          <div key={index} className="product-detail-card">
            <h3>{item.name}</h3>
            <p>Najbolja cijena: {best.price} KM ({best.store})</p>
          </div>
        );
      })}
    </div>
  );
};

export default SavedListDetail;
