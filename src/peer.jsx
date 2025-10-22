import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import './App.css';
import Waling from './images/waling-waling.jpg';
import Sampaguita from './images/sampaguita.jpg';
import Santan from './images/santan.jpg';
import Gumamela from './images/gumamela.jpg';
import Anthurium from './images/anthurium.jpg';
import Bamboo from './images/bamboo.jpg';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [cart, setCart] = useState({});
  const [addedToCart, setAddedToCart] = useState(new Set());
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

 const plants = [
  { id: 1, name: 'Waling-Waling Orchid', price: 2500, category: 'Orchids', image: Waling },
  { id: 2, name: 'Sampaguita', price: 350, category: 'Flowering Plants', image: Sampaguita },
  { id: 3, name: 'Santan', price: 250, category: 'Flowering Plants', image: Santan },
  { id: 4, name: 'Gumamela', price: 300, category: 'Flowering Plants', image: Gumamela },
  { id: 5, name: 'Anthurium', price: 450, category: 'Tropical Foliage', image: Anthurium },
  { id: 6, name: 'Bamboo Palm', price: 800, category: 'Tropical Foliage', image: Bamboo }
];


  const categories = ['Orchids', 'Flowering Plants', 'Tropical Foliage'];

  const getTotalItems = () =>
    Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const getTotalCost = () =>
    Object.entries(cart).reduce((sum, [id, qty]) => {
      const plant = plants.find(p => p.id === parseInt(id));
      return sum + plant.price * qty;
    }, 0);

  const addToCart = (plantId) => {
    setCart(prev => ({ ...prev, [plantId]: (prev[plantId] || 0) + 1 }));
    setAddedToCart(prev => new Set([...prev, plantId]));
  };

  const increaseQty = (plantId) => {
    setCart(prev => ({ ...prev, [plantId]: prev[plantId] + 1 }));
  };

  const decreaseQty = (plantId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[plantId] > 1) {
        newCart[plantId]--;
      } else {
        delete newCart[plantId];
        setAddedToCart(prevAdded => {
          const newAdded = new Set(prevAdded);
          newAdded.delete(plantId);
          return newAdded;
        });
      }
      return newCart;
    });
  };

  const removeFromCart = (plantId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[plantId];
      return newCart;
    });
    setAddedToCart(prev => {
      const newAdded = new Set(prev);
      newAdded.delete(plantId);
      return newAdded;
    });
  };

  const FilipinoLogo = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="38" width="28" height="16" rx="4" fill="#8B4513" />
      <rect x="20" y="38" width="24" height="4" fill="#A0522D" />
      <rect x="31" y="20" width="2" height="18" fill="#2F855A" />
      <path d="M32 22C26 20 24 15 24 10C26 12 30 14 32 18C34 14 38 12 40 10C40 15 38 20 32 22Z" fill="#38A169" />
      <path d="M32 26C38 24 40 19 40 14C38 16 34 18 32 22C30 18 26 16 24 14C24 19 26 24 32 26Z" fill="#48BB78" />
      <circle cx="32" cy="8" r="3" fill="#EAB308" />
      <circle cx="32" cy="8" r="1.5" fill="#FACC15" />
    </svg>
  );

  const Header = () => (
    <header>
      <div className="header-container">
        <div className="header-logo" onClick={() => setCurrentPage('landing')}>
          <FilipinoLogo />
          <h1 className="header-title">Plantito & Plantita Co.</h1>
        </div>
        <nav className="header-nav">
          <button className="nav-button" onClick={() => setCurrentPage('products')}>Shop</button>
          <button className="cart-button" onClick={() => setCurrentPage('cart')}>
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && <span className="cart-count">{getTotalItems()}</span>}
          </button>
        </nav>
      </div>
    </header>
  );

  const LandingPage = () => (
    <div className="landing-page">
      <div className="landing-content">
        <div style={{ transform: 'scale(2)', marginBottom: '24px' }}><FilipinoLogo /></div>
        <h1 className="landing-title">Plantito & Plantita Co.</h1>
        <p className="landing-text">
          Welcome to Plantito & Plantita Co., your home for authentic Filipino houseplants.
          We feature native and tropical plants—like the Waling-Waling and Sampaguita—grown to thrive in our local climate.
          Bring a touch of Philippine nature into your home with our curated collection.
        </p>
        <button className="get-started-btn" onClick={() => setCurrentPage('products')}>
          Get Started <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const ProductListing = () => (
    <div>
      <Header />
      <div className="products-section">
        <h2 className="products-title">Our Collection</h2>
        {categories.map(category => {
          const categoryPlants = plants.filter(p => p.category === category);
          return (
            <div key={category}>
              <h3 className="category-title">{category}</h3>
              <div className="products-grid">
                {categoryPlants.map(plant => (
                  <div key={plant.id} className="product-card">
                    <div className="product-image">
                      <img src={plant.image} alt={plant.name} />
                    </div>
                    <div className="product-info">
                      <h4 className="product-name">{plant.name}</h4>
                      <p className="product-price">₱{plant.price.toLocaleString()}</p>
                      <button
                        onClick={() => addToCart(plant.id)}
                        disabled={addedToCart.has(plant.id)}
                        className={`add-to-cart-btn ${addedToCart.has(plant.id) ? 'disabled' : 'enabled'}`}
                      >
                        {addedToCart.has(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CartPage = () => {
    const cartItems = Object.entries(cart).map(([id, qty]) => ({
      ...plants.find(p => p.id === parseInt(id)),
      quantity: qty
    }));

    return (
      <div>
        <Header />
        <div className="cart-section">
          <h2 className="cart-title">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#4b5563' }}>Your cart is empty</p>
              <button onClick={() => setCurrentPage('products')} className="get-started-btn">Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-summary">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', marginBottom: '8px' }}>
                  <span className="font-semibold">Total Items:</span>
                  <span className="font-bold">{getTotalItems()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', borderTop: '1px solid #ddd', paddingTop: '16px' }}>
                  <span className="font-bold">Total Cost:</span>
                  <span className="font-bold" style={{ color: '#4d7c0f' }}>
                    ₱{getTotalCost().toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} className="cart-image" />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-price">₱{item.price.toLocaleString()} each</p>
                  </div>
                  <div className="cart-buttons">
                    <button onClick={() => decreaseQty(item.id)} className="quantity-btn minus"><Minus size={20} /></button>
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem', width: '32px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} className="quantity-btn plus"><Plus size={20} /></button>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}

              <div className="checkout-actions">
                <button onClick={() => setCurrentPage('products')} className="continue-btn">Continue Shopping</button>
                <button onClick={() => setShowCheckoutMessage(true)} className="checkout-btn">Checkout</button>
              </div>

              {showCheckoutMessage && (
                <div className="checkout-msg">
                  <p className="text-lg font-semibold">Coming Soon!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'products' && <ProductListing />}
      {currentPage === 'cart' && <CartPage />}
    </>
  );
};

export default App;
