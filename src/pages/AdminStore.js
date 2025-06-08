import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminStore = ({ storeName }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [priceUpdates, setPriceUpdates] = useState({});
  
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
        
        // Inicijaliziraj state za cijene
        const initialPriceUpdates = {};
        data.forEach(product => {
          initialPriceUpdates[product.id] = product.prices[storeName] || "";
        });
        setPriceUpdates(initialPriceUpdates);
      } catch (error) {
        setError("Greška prilikom učitavanja proizvoda");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [storeName]);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePriceChange = (productId, value) => {
    setPriceUpdates(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const updatePrice = async (product) => {
    try {
      setIsLoading(true);
      
      const newPrice = priceUpdates[product.id];
      
      const updatedProduct = {
        ...product,
        prices: {
          ...product.prices,
          [storeName]: newPrice
        }
      };

      const response = await fetch(`http://localhost:5000/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
        showSuccessMessage(`Cijena za ${product.name} uspješno ažurirana!`);
      } else {
        setError("Greška prilikom ažuriranja cijene");
      }
    } catch (error) {
      setError("Došlo je do greške. Provjerite vašu internet vezu.");
      console.error("Error updating price:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== `admin-${storeName.toLowerCase()}`)) {
    return <div className="error-container">Nemate pristup ovoj stranici.</div>;
  }

  return (
    <div className="admin-store">
      <h2>Admin Panel - {storeName}</h2>
      
      {isLoading && <div className="loading">Učitavanje...</div>}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <p className="admin-info">
        Ovdje možete ažurirati cijene proizvoda za trgovinu {storeName}.
      </p>
      
      <div className="products-price-list">
        {products.length === 0 ? (
          <p>Nema proizvoda za prikaz.</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-price-item">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p><strong>Kategorija:</strong> {product.category}</p>
              </div>
              <div className="price-update">
                <div className="current-price">
                  <strong>Trenutna cijena:</strong> {product.prices[storeName] || "Nije postavljena"}
                </div>
                <div className="price-form">
                  <input
                    type="text"
                    placeholder="Nova cijena"
                    value={priceUpdates[product.id]}
                    onChange={(e) => handlePriceChange(product.id, e.target.value)}
                  />
                  <button 
                    onClick={() => updatePrice(product)}
                    className="update-price-btn"
                  >
                    Ažuriraj
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminStore;