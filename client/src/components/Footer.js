import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">JDComercial</h3>
            <p className="text-gray-400">🇦🇴 O seu ecossistema digital completo em Angola</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/aprender" className="hover:text-yellow-400">Cursos</a></li>
              <li><a href="/loja" className="hover:text-yellow-400">Produtos Digitais</a></li>
              <li><a href="/freelas" className="hover:text-yellow-400">Freelancers</a></li>
              <li><a href="/blog" className="hover:text-yellow-400">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +244 947137639</li>
              <li>✉️ contato@jdcomercial.ao</li>
              <li>📍 Luanda, Angola</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Redes Sociais</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-yellow-400"><FaFacebook /></a>
              <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
              <a href="#" className="hover:text-yellow-400"><FaWhatsapp /></a>
              <a href="#" className="hover:text-yellow-400"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>© 2024 JDComercial. Todos os direitos reservados. 🇦🇴</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
