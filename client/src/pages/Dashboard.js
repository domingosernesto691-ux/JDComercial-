import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const meusCursos = [
    { nome: "Python do Zero", progresso: 75 },
    { nome: "React Completo", progresso: 40 }
  ];

  if (!user) return <div>A carregar...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-700 to-yellow-500 text-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold">Bem-vindo, {user.nome}!</h1>
          <p className="opacity-90">Gerencie seus cursos, serviços e muito mais</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">📚 Meus Cursos</h2>
            {meusCursos.map((curso, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-semibold">{curso.nome}</p>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 rounded-full h-2" style={{ width: `${curso.progresso}%` }}></div>
                </div>
                <p className="text-sm text-gray-600">{curso.progresso}% concluído</p>
              </div>
            ))}
            <Link to="/aprender" className="text-red-600 text-sm hover:underline">+ Explorar mais cursos</Link>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">📦 Últimas Compras</h2>
            <p className="text-gray-600">Nenhuma compra recente</p>
            <Link to="/loja" className="text-red-600 text-sm hover:underline">Ir à Loja</Link>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">💼 Meus Serviços</h2>
            <p className="text-gray-600">Ofereça seus serviços como freelancer</p>
            <Link to="/freelas" className="text-red-600 text-sm hover:underline">+ Criar serviço</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
