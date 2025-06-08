import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles.css";
import ConfirmModal from "../components/ConfirmModal";



const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    prices: { Bingo: "", Konzum: "", Best: "", Ekor: "" }
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:5000/products"),
          fetch("http://localhost:5000/categories")
        ]);
        
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        setError("Greška prilikom učitavanja podataka");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handlePriceChange = (e, store) => {
    const { value } = e.target;
    setNewProduct({
      ...newProduct,
      prices: { ...newProduct.prices, [store]: value }
    });
  };

  const handleEditPriceChange = (e, store) => {
    const { value } = e.target;
    setEditingProduct({
      ...editingProduct,
      prices: { ...editingProduct.prices, [store]: value }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Kreiranje preview-a slike
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      // Kreiranje preview-a slike
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProduct = (product) => {
    if (!product.name || !product.category || !product.description) {
      setError("Molimo popunite sva obavezna polja");
      return false;
    }
    return true;
  };

const addProduct = async () => {
  if (!validateProduct(newProduct)) return;

  if (!imageFile) {
    setError("Molimo odaberite sliku proizvoda");
    return;
  }

  try {
    setIsLoading(true);

const newProductWithImage = {
  ...newProduct,
  image: imagePreview,
  id: Date.now() 
};

    // KORISTI POST ZA DODAVANJE!
    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductWithImage),
    });

    if (response.ok) {
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({
        name: "",
        category: "",
        description: "",
        prices: { Bingo: "", Konzum: "", Best: "", Ekor: "" }
      });
      setImageFile(null);
      setImagePreview("");
      showSuccessMessage("Proizvod uspješno dodan!");
    } else {
      setError("Greška prilikom dodavanja proizvoda");
    }
  } catch (error) {
    setError("Došlo je do greške. Provjerite vašu internet vezu.");
    console.error("Error adding product:", error);
  } finally {
    setIsLoading(false);
  }
};

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditImagePreview(product.image);
    setError("");
  };
const handleUpdate = async () => {
  if (!validateProduct(editingProduct)) return;

  try {
    setIsLoading(true);

    let updatedProductData = { ...editingProduct };

    if (editImageFile) {
      updatedProductData.image = editImagePreview;
    }

    const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProductData),
    });

    if (response.ok) {
      setProducts(products.map(p =>
        p._id === editingProduct.id ? updatedProductData : p
      ));
      setEditingProduct(null);
      setEditImageFile(null);
      setEditImagePreview("");
      showSuccessMessage("Proizvod uspješno ažuriran!");
    } else {
      setError("Greška prilikom ažuriranja proizvoda");
    }
  } catch (error) {
    setError("Došlo je do greške. Provjerite vašu internet vezu.");
    console.error("Error updating product:", error);
  } finally {
    setIsLoading(false);
  }
};

const handleDeleteClick = (id) => {
  setSelectedProductId(id);
  setShowModal(true);
};

const handleConfirmDelete = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`http://localhost:5000/products/${selectedProductId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts(products.filter(p => p.id !== selectedProductId));
      if (editingProduct && editingProduct.id === selectedProductId) {
        setEditingProduct(null);
      }
      showSuccessMessage("Proizvod uspješno obrisan!");
    } else {
      setError("Greška prilikom brisanja proizvoda");
    }
  } catch (error) {
    setError("Došlo je do greške. Provjerite vašu internet vezu.");
    console.error("Error deleting product:", error);
  } finally {
    setIsLoading(false);
    setShowModal(false);
    setSelectedProductId(null);
  }
};

const handleCancelDelete = () => {
  setShowModal(false);
  setSelectedProductId(null);
};

  if (!currentUser || currentUser.role !== 'admin') {
    return <div className="error-container">Nemate pristup ovoj stranici.</div>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Upravljanje proizvodima</h2>
      
      {isLoading && <div className="loading">Učitavanje...</div>}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <div className="admin-section">
        <h3>Dodaj novi proizvod</h3>
        <div className="product-form">
          <div className="form-group">
            <label>Naziv proizvoda:</label>
            <input
              type="text"
              name="name"
              placeholder="Naziv proizvoda"
              value={newProduct.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Kategorija:</label>
            <select name="category" value={newProduct.category} onChange={handleChange}>
              <option value="">Odaberi kategoriju</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Slika proizvoda:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} 
                />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Opis:</label>
            <textarea
              name="description"
              placeholder="Opis proizvoda"
              value={newProduct.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <h4>Cijene po trgovinama:</h4>
          <div className="price-inputs">
            {["Bingo", "Konzum", "Best", "Ekor"].map(store => (
              <div key={store} className="form-group">
                <label>{store}:</label>
                <input
                  type="text"
                  placeholder={`Cijena (${store})`}
                  value={newProduct.prices[store]}
                  onChange={(e) => handlePriceChange(e, store)}
                />
              </div>
            ))}
          </div>
          
  <button onClick={addProduct} disabled={isLoading} className="update-price-btn">
    Dodaj proizvod
  </button>

        </div>
      </div>
      
      {editingProduct && (
        <div className="admin-section">
          <h3>Uredi proizvod</h3>
          <div className="product-form">
            <div className="form-group">
              <label>Naziv proizvoda:</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Kategorija:</label>
              <select 
                value={editingProduct.category} 
                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
              >
                <option value="">Odaberi kategoriju</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div class="button-row">
            <button class="update-btn">Uredi</button>
            <button class="delete-btn">Obriši</button>
          </div>


            <div className="form-group">
              <label>Slika proizvoda:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
              />
              <div className="image-preview">
                <img 
                  src={editImagePreview || editingProduct.image} 
                  alt={editingProduct.name}
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Opis:</label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
              ></textarea>
            </div>

            
            <h4>Cijene po trgovinama:</h4>
            <div className="price-inputs">
              {["Bingo", "Konzum", "Best", "Ekor"].map(store => (
                <div key={store} className="form-group">
                  <label>{store}:</label>
                  <input
                    type="text"
                    placeholder={`Cijena (${store})`}
                    value={editingProduct.prices[store]}
                    onChange={(e) => handleEditPriceChange(e, store)}
                  />
                </div>
              ))}
            </div>
            
            <div className="edit-buttons">
              <button onClick={handleUpdate} disabled={isLoading} className="update-btn">
                Ažuriraj proizvod
              </button>
              <button onClick={() => setEditingProduct(null)} className="cancel-btn">
                Odustani
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="admin-section">
        <h3>Pregled proizvoda</h3>
        {products.length === 0 ? (
          <p>Nema proizvoda za prikaz.</p>
        ) : (
<div className="products-price-list">
  {products.map(product => (
    <div key={product.id} className="product-price-item">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="description">{product.description}</p>
        <p><strong>Kategorija:</strong> {product.category}</p>
        <div className="product-prices">
          <strong>Cijene:</strong>
          <ul>
            {Object.entries(product.prices).map(([store, price]) =>
              price ? <li key={store}>{store}: {price}</li> : null
            )}
          </ul>
        </div>
        <button className="update-price-btn" onClick={() => handleEdit(product)}>
          Uredi
        </button>
        <button className="delete-btn" onClick={() => handleDeleteClick(product.id)}>
          Obriši
        </button>
      </div>
    </div>
  ))}
</div>

        )}
      </div>

      
                <ConfirmModal
                show={showModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Jeste li sigurni da želite obrisati ovaj proizvod?"
              />
              
    </div>
  );

};

export default AdminPanel;