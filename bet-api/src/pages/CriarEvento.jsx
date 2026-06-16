import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function CriarEvento() {
  const navigate = useNavigate();
  const [esporte, setEsporte] = useState('Futebol');
  const [timeCasa, setTimeCasa] = useState('');
  const [timeVisitante, setTimeVisitante] = useState('');
  const [data, setData] = useState('');
  const [cCasa, setCCasa] = useState('');
  const [cEmpate, setCEmpate] = useState('');
  const [cVisitante, setCVisitante] = useState('');

  const lidarComCadastro = async (e) => {
    e.preventDefault();
    try {
      await api.post('/eventos', {
        esporte, timeCasa, timeVisitante,
        data: new Date(data).toISOString(),
        status: 'aberto', resultado: null,
        cotacoes: { casa: Number(cCasa), empate: Number(cEmpate), visitante: Number(cVisitante) }
      });
      alert('Confronto salvo com sucesso!');
      navigate('/admin');
    } catch (erro) {
      alert('Erro ao gravar dados do jogo.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">Adicionar Partida Esportiva</h2>
        <form onSubmit={lidarComCadastro} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Esporte</label>
              <select value={esporte} onChange={(e) => setEsporte(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option value="Futebol">Futebol</option>
                <option value="Basquete">Basquete</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Data/Horário</label>
              <input type="datetime-local" value={data} onChange={(e) => setData(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Mandante (Casa)" value={timeCasa} onChange={(e) => setTimeCasa(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required />
            <input type="text" placeholder="Visitante" value={timeVisitante} onChange={(e) => setTimeVisitante(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" step="0.01" placeholder="Odd Vitória Casa" value={cCasa} onChange={(e) => setCCasa(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono" required />
            <input type="number" step="0.01" placeholder="Odd Empate" value={cEmpate} onChange={(e) => setCEmpate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono" required />
            <input type="number" step="0.01" placeholder="Odd Vitória Visitante" value={cVisitante} onChange={(e) => setCVisitante(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-sm cursor-pointer transition shadow-xs">Criar Evento</button>
        </form>
      </main>
    </div>
  );
}