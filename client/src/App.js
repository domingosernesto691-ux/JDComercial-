import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Aprender from './pages/Aprender';
import Loja from './pages/Loja';
import Blog from './pages/Blog';
import Linktree from './pages/Linktree';
import Freelas from './pages/Freelas';
import Ferramentas from './pages/Ferramentas';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aprender" element={<Aprender />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/linktree" element={<Linktree />} />
          <Route path="/freelas" element={<Freelas />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
