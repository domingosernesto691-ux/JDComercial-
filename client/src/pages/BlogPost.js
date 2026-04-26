import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const postsData = {
    1: { titulo: "Como começar na programação em Angola", conteudo: "Conteúdo completo do artigo sobre como iniciar na programação...", data: "2024-01-15", autor: "JDComercial" },
    2: { titulo: "Freelancing: como ganhar dinheiro online", conteudo: "Conteúdo completo do artigo sobre freelancing...", data: "2024-01-20", autor: "JDComercial" },
    3: { titulo: "As melhores ferramentas para developers", conteudo: "Conteúdo completo do artigo sobre ferramentas...", data: "2024-01-25", autor: "JDComercial" },
  };

  useEffect(() => {
    setPost(postsData[id]);
  }, [id]);

  if (!post) return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">A carregar...</div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">{post.titulo}</h1>
        <div className="text-gray-500 mb-8">
          Por {post.autor} | {post.data}
        </div>
        <div className="prose max-w-none">
          <p>{post.conteudo}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;
