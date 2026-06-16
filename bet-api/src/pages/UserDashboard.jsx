import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

export default function UserDashboard() {
  const { user, syncDatabase } = useAuth();
  const [listaMovimentacoes, setListaMovimentacoes] = useState([]);

  useEffect(() => {
    async function buscarExtrato() {
      await syncDatabase();
      const resposta = await api.get(`/movimentacoes?usuarioId=${String(user.id)}`);
      // Ordena de forma cronológica decrescente no cliente
      setListaMovimentacoes(resposta.data.sort((a, b) => new Date(b.data) - new Date(a.data)));
    }
    if (user?.id) buscarExtrato();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">📊 Extrato de Transações (Fictício)</h2>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white font-mono text-xs uppercase">
              <tr>
                <th className="p-4">Data/Horário</th>
                <th className="p-4">Histórico</th>
                <th className="p-4 text-right">Balanço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {listaMovimentacoes.map(mov => (
                <tr key={mov.id} className="hover:bg-slate-50/50">
                  <td className="p-4 text-slate-400 font-mono text-xs">{new Date(mov.data).toLocaleString('pt-BR')}</td>
                  <td className="p-4 font-bold text-slate-700">{mov.descricao}</td>
                  <td className={`p-4 text-right font-mono font-bold ${mov.tipo === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {mov.tipo === 'entrada' ? '+ ' : '- '}R$ {mov.valor.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}