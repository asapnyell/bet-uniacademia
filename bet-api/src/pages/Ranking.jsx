import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import RankingTable from '../components/RankingTable';

export default function Ranking() {
  const [listaOrdenada, setListaOrdenada] = useState([]);

  useEffect(() => {
    async function montarPlacar() {
      const resposta = await api.get('/usuarios?perfil=jogador');
      // Faz a ordenação baseada no maior saldo no cliente de forma robusta
      const ranqueados = resposta.data.sort((a, b) => b.saldo - a.saldo);
      setListaOrdenada(ranqueados);
    }
    montarPlacar();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-black text-slate-800 mb-2">🏆 Tabela Geral de Líderes</h2>
        <p className="text-slate-500 text-xs mb-6">Competição saudável baseada no balanço atualizado da carteira de cada aluno.</p>
        <RankingTable listaUsuarios={listaOrdenada} />
      </main>
    </div>
  );
}