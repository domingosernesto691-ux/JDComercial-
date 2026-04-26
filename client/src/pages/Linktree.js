import React from 'react';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaFacebook } from 'react-icons/fa';

function Linktree() {
  const links = [
    { icon: <FaWhatsapp className="text-green-500" />, name: "WhatsApp", url: "https://wa.me/2449XXXXXXXX", color: "bg-green-500" },
    { icon: <FaInstagram className="text-pink-600" />, name: "Instagram", url: "https://instagram.com/jdcomercial", color: "bg-pink-600" },
    { icon: <FaFacebook className="text-blue-700" />, name: "Facebook", url: "https://facebook.com/jdcomercial", color: "bg-blue-700" },
    { icon: <FaLinkedin className="text-blue-700" />, name: "LinkedIn", url: "https://linkedin.com/company/jdcomercial", color: "bg-blue-700" },
    { icon: <FaGithub className="text-gray-800" />, name: "GitHub", url: "https://github.com/jdcomercial", color: "bg-gray-800" },
    { icon: <FaTwitter className="text-blue-400" />, name: "Twitter", url: "https://twitter.com/jdcomercial", color: "bg-blue-400" },
    { icon: <FaEnvelope className="text-red-600" />, name: "Email", url: "mailto:contato@jdcomercial.ao", color: "bg-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 via-yellow-500 to-black py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-6xl mb-4 shadow-lg">
            🇦🇴
          </div>
          <h1 className="text-3xl font-bold text-white">JDComercial</h1>
          <p className="text-white text-opacity-90 mt-2">@jdcomercial.ao</p>
          <p className="text-white text-opacity-75 text-sm mt-2">💻 Tecnologia | 📚 Educação | 🚀 Empreendedorismo</p>
        </div>

        <div className="space-y-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} hover:opacity-90 text-white rounded-lg p-4 flex items-center gap-4 transition transform hover:scale-105`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="flex-1 font-semibold">{link.name}</span>
              <span className="text-xl">→</span>
            </a>
          ))}
        </div>

        <div className="text-center text-white text-opacity-70 text-sm mt-8">
          © 2024 JDComercial - O seu ecossistema digital em Angola
        </div>
      </div>
    </div>
  );
}

export default Linktree;
