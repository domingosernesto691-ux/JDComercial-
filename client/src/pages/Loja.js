import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function Loja() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reference, setReference] = useState(null);

  const produtos = [
    { id: 1, nome: "E-book: Como programar em Python", preco: 5000, tipo: "ebook", imagem: "📖" },
    { id: 2, nome: "Template React Admin", preco: 15000, tipo: "template", imagem: "🎨" },
    { id: 3, nome: "Script de Automação WhatsApp", preco: 10000, tipo: "codigo", imagem: "🤖" },
    { id: 4, nome: "Curso Completo de Marketing Digital", preco: 20000, tipo: "curso", imagem: "📈" },
  ];

  const handleComprar = async (produto) => {
    setSelectedProduct(produto);
    // Simular geração de referência
    const reference = `JD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setReference({
      reference,
      instrucoes: `Faça transferência para:\n\nBanco: BAI\nConta: JDComercial\nNIB: 0056 1234 5678 9012 3456 7\nValor: ${produto.preco} AOA\nReferência: ${reference}\n\nApós transferência, envie comprovativo para +244 9XX XXX XXX`,
      valor: produto.preco,
      produto: produto.nome
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">🛒 Loja de Produtos Digitais</h1>
        <p className="text-gray-600 mb-8">Adquira e-books, templates, códigos fonte e cursos</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map(produto => (
            <div key={produto.id} className="border rounded-lg p-4 text-center hover:shadow-lg transition">
              <div className="text-6xl mb-4">{produto.imagem}</div>
              <h3 className="font-bold text-lg mb-2">{produto.nome}</h3>
              <p className="text-2xl text-red-600 font-bold mb-3">{produto.preco} AOA</p>
              <button 
                onClick={() => handleComprar(produto)}
                className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 transition"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>

        {reference && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Instruções de Pagamento</h2>
              <div className="bg-gray-100 p-4 rounded mb-4 whitespace-pre-line">
                {reference.instrucoes}
              </div>
              <button 
                onClick={() => setReference(null)}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Loja;
