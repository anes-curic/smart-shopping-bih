import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel";
import Register from "./pages/Register";
import AdminStore from "./pages/AdminStore";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import SavedLists from "./pages/SavedLists";
import SavedListDetail from "./pages/SavedListDetail";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profil" element={<SavedLists />} />
              <Route path="/saved-lists" element={<SavedLists />} />
              <Route path="/saved-list/:id" element={<SavedListDetail />} />
             




              {/* Zaštićene admin rute */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              <Route path="/admin-bingo" element={
                <ProtectedRoute allowedRoles={['admin', 'admin-bingo']}>
                  <AdminStore storeName="Bingo" />
                </ProtectedRoute>
              } />
              
              <Route path="/admin-konzum" element={
                <ProtectedRoute allowedRoles={['admin', 'admin-konzum']}>
                  <AdminStore storeName="Konzum" />
                </ProtectedRoute>
              } />
              
              <Route path="/admin-best" element={
                <ProtectedRoute allowedRoles={['admin', 'admin-best']}>
                  <AdminStore storeName="Best" />
                </ProtectedRoute>
              } />
              
              <Route path="/admin-ekor" element={
                <ProtectedRoute allowedRoles={['admin', 'admin-ekor']}>
                  <AdminStore storeName="Ekor" />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;