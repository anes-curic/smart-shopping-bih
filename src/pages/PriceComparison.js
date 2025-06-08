import React, { useState, useEffect } from "react";

const PriceComparison = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Greška pri dohvaćanju podataka");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Došlo je do greške prilikom učitavanja proizvoda");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getBestPrice = (prices) => {
    const validPrices = Object.entries(prices).filter(([_, price]) => 
      price && !isNaN(parseFloat(price))
    );
    
    if (validPrices.length === 0) return null;
    
    return validPrices.reduce((best, current) => 
      parseFloat(current[1]) < parseFloat(best[1]) ? current : best
    );
  };

  const getPriceDifference = (prices) => {
    const validPrices = Object.values(prices)
      .filter(price => price && !isNaN(parseFloat(price)))
      .map(price => parseFloat(price));
    
    if (validPrices.length <= 1) return 0;
    
    const min = Math.min(...validPrices);
    const max = Math.max(...validPrices);
    
    return max - min;
  };

  const getSavingsPercentage = (prices) => {
    const validPrices = Object.values(prices)
      .filter(price => price && !isNaN(parseFloat(price)))
      .map(price => parseFloat(price));
    
    if (validPrices.length <= 1) return 0;
    
    const min = Math.min(...validPrices);
    const max = Math.max(...validPrices);
    
    return ((max - min) / max * 100).toFixed(1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="price-comparison-container">
      <h2>Usporedba cijena proizvoda</h2>
      
      {isLoading && <div className="loading">Učitavanje...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {products.length === 0 && !isLoading ? (
        <p>Nema dostupnih proizvoda za usporedbu.</p>
      ) : (
        <div className="comparison-layout">
          <div className="products-list">
            <h3>Proizvodi</h3>
            {products.map(product => {
              const bestPrice = getBestPrice(product.prices);
              const savingsPercentage = getSavingsPercentage(product.prices);
              
              return (
                <div 
                  key={product.id} 
                  className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="product-info">
                    <img src={product.image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p>{product.category}</p>
                  </div>
                  
                  <div className="price-info">
                    {bestPrice ? (
                      <>
                        <p><strong>Najbolja cijena:</strong> {bestPrice[0]}: {bestPrice[1]} KM</p>
                        {savingsPercentage > 0 && (
                          <div className="savings-badge">Ušteda do {savingsPercentage}%</div>
                        )}
                      </>
                    ) : (
                      <p>Nema dostupnih cijena</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedProduct && (
            <div className="detailed-comparison">
              <h3>Detaljna usporedba cijena</h3>
              <div className="product-details">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
                <div>
                  <h4>{selectedProduct.name}</h4>
                  <p>{selectedProduct.description}</p>
                  <p><strong>Kategorija:</strong> {selectedProduct.category}</p>
                </div>
              </div>
              
              <div className="price-details">
                <h4>Cijene po trgovinama:</h4>
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>Trgovina</th>
                      <th>Cijena</th>
                      <th>Razlika od najjeftinije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedProduct.prices)
                      .filter(([_, price]) => price && !isNaN(parseFloat(price)))
                      .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
                      .map(([store, price], index) => {
                        const formattedPrice = parseFloat(price).toFixed(2);
                        const bestPrice = parseFloat(getBestPrice(selectedProduct.prices)[1]).toFixed(2);
                        const difference = (parseFloat(price) - parseFloat(bestPrice)).toFixed(2);
                        
                        return (
                          <tr key={store} className={index === 0 ? 'best-price-row' : ''}>
                            <td>{store}</td>
                            <td>{formattedPrice} KM</td>
                            <td>
                              {index === 0 ? (
                                <span className="best-price-label">Najjeftinije</span>
                              ) : (
                                <span className="price-difference">+{difference} KM</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                
                <div className="savings-info">
                  <p>
                    <strong>Moguća ušteda:</strong> {getPriceDifference(selectedProduct.prices).toFixed(2)} KM ({getSavingsPercentage(selectedProduct.prices)}%)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceComparison;