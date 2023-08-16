import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
function App() {
  return (
    <>
      <Router>
      <Header/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
