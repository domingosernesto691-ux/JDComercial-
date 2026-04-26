import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Freelas() {
  const [showModal, setShowModal] = useState(false);

  const servicos = [
    { id: 1, titulo: "Desenvolvimento de Sites", preco: 50000, freelancer: "João Silva", categoria: "programacao", avaliacao: 4.8, entregas: 45 },
    { id: 2, titulo: "Design de Logotipos", preco: 25000, freelancer: "Maria Santos", categoria: "design", avaliacao: 4.9, entregas: 120 },
    { id: 3, titulo: "Marketing para Redes Sociais", preco: 35000, freelancer: "Carlos Lima", categoria: "marketing", avaliacao: 4.7, entregas: 89 },
    { id: 4, titulo: "Edição de Vídeo", preco: 40000, freelancer: "Ana Ferreira", categoria: "video", avaliacao: 4.9, entregas: 67 },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">💼 Freelancing</h1>
            <p className="text-gray-600">Contrate ou ofereça serviços digitais</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            + Oferecer Serviço
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map(servico => (
            <div key={servico.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{servico.titulo}</h3>
              <p className="text-gray-600 mb-2">por {servico.freelancer}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">⭐ {servico.avaliacao}</span>
                <span className="text-gray-500">({servico.entregas} entregas)</span>
              </div>
              <p className="text-2xl text-red-600 font-bold mb-3">{servico.preco} AOA</p>
              <button className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 transition">
                Contratar
              </button>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Oferecer Serviço</h2>
              <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); alert('Serviço publicado com sucesso!'); }}>
                <input type="text" placeholder="Título do serviço" className="w-full border p-2 mb-3 rounded" required />
                <textarea placeholder="Descrição" className="w-full border p-2 mb-3 rounded" rows="3" required></textarea>
                <input type="number" placeholder="Preço (AOA)" className="w-full border p-2 mb-3 rounded" required />
                <select className="w-full border p-2 mb-4 rounded" required>
                  <option value="">Selecione a categoria</option>
                  <option value="programacao">Programação</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="video">Edição de Vídeo</option>
                </select>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-300 py-2 rounded">Cancelar</button>
                  <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded">Publicar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Freelas;
