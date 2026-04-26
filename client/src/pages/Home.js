import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaLaptopCode, FaStore, FaBlog, FaBriefcase, FaTools, FaLink } from 'react-icons/fa';

function Home() {
  const features = [
    { icon: <FaLaptopCode className="text-5xl text-red-600" />, title: "Aprender Programação", desc: "Cursos completos de Python, JavaScript, React e muito mais", link: "/aprender" },
    { icon: <FaStore className="text-5xl text-yellow-600" />, title: "Loja Digital", desc: "E-books, templates e códigos fonte para o seu negócio", link: "/loja" },
    { icon: <FaBlog className="text-5xl text-black" />, title: "Blog", desc: "Artigos sobre tecnologia, freelancing e empreendedorismo", link: "/blog" },
    { icon: <FaBriefcase className="text-5xl text-red-600" />, title: "Freelas", desc: "Ofereça ou contrate serviços digitais", link: "/freelas" },
    { icon: <FaTools className="text-5xl text-yellow-600" />, title: "Ferramentas", desc: "Utilitários online gratuitos", link: "/ferramentas" },
    { icon: <FaLink className="text-5xl text-black" />, title: "Linktree", desc: "Todos os seus links num só lugar", link: "/linktree" },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-red-700 via-yellow-500 to-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">JDComercial</h1>
          <p className="text-xl mb-8">🇦🇴 O seu ecossistema digital completo em Angola 🇦🇴</p>
          <div className="flex gap-4 justify-center">
            <Link to="/aprender" className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Começar Agora
            </Link>
            <Link to="/loja" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
              Explorar Produtos
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que oferecemos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-4xl font-bold text-yellow-400">50+</div><div>Cursos</div></div>
            <div><div className="text-4xl font-bold text-yellow-400">100+</div><div>Produtos</div></div>
            <div><div className="text-4xl font-bold text-yellow-400">30+</div><div>Freelancers</div></div>
            <div><div className="text-4xl font-bold text-yellow-400">5000+</div><div>Utilizadores</div></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
