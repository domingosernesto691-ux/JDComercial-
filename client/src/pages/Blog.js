import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Blog() {
  const posts = [
    { id: 1, titulo: "Como começar na programação em Angola", resumo: "Dicas e recursos para iniciantes", data: "2024-01-15", views: 150, imagem: "💻" },
    { id: 2, titulo: "Freelancing: como ganhar dinheiro online", resumo: "Plataformas e estratégias", data: "2024-01-20", views: 230, imagem: "💰" },
    { id: 3, titulo: "As melhores ferramentas para developers", resumo: "Aumente sua produtividade", data: "2024-01-25", views: 98, imagem: "🛠️" },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">✍️ Blog JDComercial</h1>
        <p className="text-gray-600 mb-8">Dicas, tutoriais e novidades sobre tecnologia e empreendedorismo</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link to={`/blog/${post.id}`} key={post.id}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="bg-gradient-to-r from-red-700 to-yellow-500 h-40 flex items-center justify-center text-6xl">
                  {post.imagem}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{post.titulo}</h3>
                  <p className="text-gray-600 mb-2">{post.resumo}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>📅 {post.data}</span>
                    <span>👁️ {post.views} visualizações</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
