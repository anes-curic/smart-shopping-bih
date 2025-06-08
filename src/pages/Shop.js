import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Greška pri dohvaćanju proizvoda:", err));
  }, []);

  return (
    <div className="shop-container">
      <h2>Dostupni proizvodi</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            {product.prices && (
              <p className="price">
                Najniža cijena:{" "}
                {Math.min(...Object.values(product.prices).map(p => parseFloat(p) || Infinity))} KM
              </p>
            )}
            <button onClick={() => addToCart(product)} className="add-btn">
              Dodaj u korpu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
