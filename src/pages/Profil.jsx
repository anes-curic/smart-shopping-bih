import React, { useEffect, useState } from "react";
import axios from "axios";

const Profil = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [lists, setLists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/savedLists?userId=${user.id}`)
      .then(res => setLists(res.data))
      .catch(err => console.error(err));
  }, [user.id]);

  const dates = [...new Set(lists.map(l => l.date))];

  const filteredItems = selectedDate
    ? lists.find(l => l.date === selectedDate)?.items || []
    : [];

  const getBestPrice = (prices) => {
    const valid = Object.entries(prices || {}).filter(([_, val]) => val);
    if (valid.length === 0) return { store: "-", price: "N/A" };
    const [store, price] = valid.reduce((a, b) =>
      parseFloat(a[1]) < parseFloat(b[1]) ? a : b
    );
    return { store, price };
  };

  return (
    <div>
      <h2>Moje sačuvane liste</h2>
      <ul>
        {dates.map(date => (
          <li key={date}>
            <button onClick={() => setSelectedDate(date)}>
              {date}
            </button>
          </li>
        ))}
      </ul>

      {selectedDate && (
        <>
          <h3>Lista sačuvana {selectedDate}</h3>
          <ul>
            {filteredItems.map((item, idx) => {
              const best = getBestPrice(item.prices);
              return (
                <li key={idx}>
                  {item.name} x {item.quantity || 1}
                  <br />
                  <span style={{ fontSize: "0.9em", color: "#555" }}>
                    Najniža cijena: {best.price} KM ({best.store})
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Profil;
