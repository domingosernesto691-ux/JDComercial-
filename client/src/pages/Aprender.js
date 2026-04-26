import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Aprender() {
  const cursos = [
    { nome: "Python do Zero ao Avançado", descricao: "Aprenda Python com projetos reais", preco: 15000, nivel: "Iniciante" },
    { nome: "React Completo", descricao: "Desenvolva aplicações modernas", preco: 25000, nivel: "Intermediário" },
    { nome: "JavaScript Essencial", descricao: "Fundamentos para web", preco: 10000, nivel: "Iniciante" },
    { nome: "Node.js API REST", descricao: "Crie backends profissionais", preco: 20000, nivel: "Avançado" },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">📚 Cursos de Programação</h1>
        <p className="text-gray-600 mb-8">Aprenda as tecnologias mais procuradas no mercado angolano e internacional</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-red-700 to-yellow-500 h-32 flex items-center justify-center">
                <span className="text-white text-6xl">📘</span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{curso.nome}</h3>
                <p className="text-gray-600 mb-2">{curso.descricao}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded">{curso.nivel}</span>
                  <span className="text-2xl font-bold text-red-600">{curso.preco} AOA</span>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                  Comprar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aprender;
