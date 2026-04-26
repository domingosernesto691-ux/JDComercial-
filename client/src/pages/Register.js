import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.nome && formData.email && formData.password) {
      localStorage.setItem('user', JSON.stringify({ nome: formData.nome, email: formData.email }));
      navigate('/dashboard');
    } else {
      setError('Preencha todos os campos obrigatórios');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🇦🇴</div>
          <h1 className="text-2xl font-bold">Criar Conta</h1>
          <p className="text-gray-600">Junte-se ao ecossistema JDComercial</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              className="w-full border rounded-lg p-2"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-lg p-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone (opcional)"
              className="w-full border rounded-lg p-2"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded-lg p-2"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Registrar
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Já tem conta? <Link to="/login" className="text-red-600 hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
