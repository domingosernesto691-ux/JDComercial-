import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-red-700 via-yellow-500 to-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-white text-red-700 px-2 py-1 rounded">JD</span>
            <span>Comercial</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-300 transition">Início</Link>
            <Link to="/aprender" className="hover:text-yellow-300 transition">📚 Aprender</Link>
            <Link to="/loja" className="hover:text-yellow-300 transition">🛒 Loja</Link>
            <Link to="/blog" className="hover:text-yellow-300 transition">✍️ Blog</Link>
            <Link to="/freelas" className="hover:text-yellow-300 transition">💼 Freelas</Link>
            <Link to="/ferramentas" className="hover:text-yellow-300 transition">🧠 Ferramentas</Link>
            <Link to="/linktree" className="hover:text-yellow-300 transition">🔗 Linktree</Link>
          </div>
          
          <div className="flex gap-3">
            <Link to="/login" className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400">
              Entrar
            </Link>
            <Link to="/register" className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
              Registrar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
