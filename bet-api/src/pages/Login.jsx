import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const lidarComLogin = async (e) => {
    e.preventDefault();
    const perfilObtido = await login(email);
    
    if (perfilObtido === 'administrador') navigate('/admin');
    if (perfilObtido === 'jogador') navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-200 w-full max-w-md">
        <h1 className="text-2xl font-black text-center text-blue-600 tracking-tight mb-6">Bet Acadêmica</h1>
        <form onSubmit={lidarComLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">E-mail de Acesso</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex: jogador@email.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-sm transition shadow-xs cursor-pointer">Entrar</button>
        </form>
      </div>
    </div>
  );
}