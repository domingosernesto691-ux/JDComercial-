import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Ferramentas() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonValid, setJsonValid] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [moeda, setMoeda] = useState(0);
  const [moedaConvertida, setMoedaConvertida] = useState(0);

  const validarJSON = () => {
    try {
      JSON.parse(jsonInput);
      setJsonValid(true);
    } catch (e) {
      setJsonValid(false);
    }
  };

  const verificarPassword = (pwd) => {
    setPassword(pwd);
    let strength = 'Fraca';
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
      strength = 'Forte';
    } else if (pwd.length >= 6) {
      strength = 'Média';
    }
    setPasswordStrength(strength);
  };

  const converterMoeda = () => {
    setMoedaConvertida(moeda * 912);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">🧠 Ferramentas Úteis Online</h1>
        <p className="text-gray-600 mb-8">Utilitários gratuitos para o seu dia a dia</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">📋 Validador JSON</h2>
            <textarea 
              className="w-full border p-3 rounded mb-3 font-mono text-sm"
              rows="6"
              placeholder='{"nome": "JDComercial", "pais": "Angola"}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <button onClick={validarJSON} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Validar JSON
            </button>
            {jsonValid === true && <p className="text-green-600 mt-2">✅ JSON válido!</p>}
            {jsonValid === false && <p className="text-red-600 mt-2">❌ JSON inválido!</p>}
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">🔐 Força da Password</h2>
            <input 
              type="password"
              className="w-full border p-3 rounded mb-3"
              placeholder="Digite sua password"
              value={password}
              onChange={(e) => verificarPassword(e.target.value)}
            />
            {password && (
              <div className="mt-2">
                <span className="font-semibold">Força: </span>
                <span className={`${
                  passwordStrength === 'Forte' ? 'text-green-600' : 
                  passwordStrength === 'Média' ? 'text-yellow-600' : 'text-red-600'
                } font-bold`}>
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">💰 Conversor de Moeda</h2>
            <p className="text-sm text-gray-600 mb-3">Taxa: 1 USD = 912 AOA</p>
            <input 
              type="number"
              className="w-full border p-3 rounded mb-3"
              placeholder="Valor em USD"
              value={moeda}
              onChange={(e) => setMoeda(Number(e.target.value))}
            />
            <button onClick={converterMoeda} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Converter para AOA
            </button>
            {moedaConvertida > 0 && (
              <p className="mt-3 text-xl font-bold">{moedaConvertida} AOA</p>
            )}
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">🔢 Gerador de Referência</h2>
            <p className="text-gray-600 mb-3">Gere uma referência única para pagamentos</p>
            <button 
              onClick={() => {
                const ref = `JD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
                alert(`Referência gerada: ${ref}`);
              }}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
            >
              Gerar Referência
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ferramentas;
