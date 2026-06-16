import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

export default function Historico() {
  const { user, syncDatabase } = useAuth();
  const [bilhetes, setBilhetes] = useState([]);

  useEffect(() => {
    async function carregarBilhetes() {
      await syncDatabase();
      const resposta = await api.get(`/apostas?usuarioId=${String(user.id)}&_expand=evento`);
      setBilhetes(resposta.data.sort((a, b) => new Date(b.dataAposta) - new Date(a.dataAposta)));
    }
    if (user?.id) carregarBilhetes();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">📋 Meus Bilhetes Registrados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bilhetes.map(b => (
            <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2 mb-2 items-center">
                <span className="font-extrabold text-slate-800 text-sm">{b.evento?.timeCasa} x {b.evento?.timeVisitante}</span>
                <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${b.status === 'ganha' ? 'bg-emerald-100 text-emerald-800' : b.status === 'perdida' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>{b.status}</span>
              </div>
              <div className="grid grid-cols-3 text-center bg-slate-50 p-2 rounded-xl text-xs font-mono font-bold text-slate-600">
                <div><span className="block text-[9px] text-slate-400 font-sans">Palpite</span><span className="capitalize">{b.palpite}</span></div>
                <div><span className="block text-[9px] text-slate-400 font-sans">Quantia</span>R$ {b.valorApostado.toFixed(2)}</div>
                <div><span className="block text-[9px] text-slate-400 font-sans">Retorno</span>R$ {b.retornoPossivel.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}