import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const [eventos, setEventos] = useState([]);
  const [jogoFoco, setJogoFoco] = useState(null);
  const [resultadoEscolhido, setResultadoEscolhido] = useState('');

  const buscarJogos = async () => {
    const resposta = await api.get('/eventos');
    setEventos(resposta.data);
  };

  useEffect(() => { buscarJogos(); }, []);

  const liquidarPartida = async (e) => {
    e.preventDefault();
    if (!resultadoEscolhido) return;

    try {
      await api.patch(`/eventos/${jogoFoco.id}`, { status: 'encerrado', resultado: resultadoEscolhido });
      const respostaApostas = await api.get(`/apostas?eventoId=${jogoFoco.id}`);
      
      for (const aposta of respostaApostas.data) {
        const venceu = aposta.palpite === resultadoEscolhido;
        await api.patch(`/apostas/${aposta.id}`, { status: venceu ? 'ganha' : 'perdida' });

        if (venceu) {
          const respostaUser = await api.get(`/usuarios/${aposta.usuarioId}`);
          const jogador = respostaUser.data;
          const saldoComPremio = jogador.saldo + aposta.retornoPossivel;

          await api.patch(`/usuarios/${jogador.id}`, { saldo: saldoComPremio });
          await api.post('/movimentacoes', {
            usuarioId: String(jogador.id), tipo: 'entrada',
            descricao: `Prêmio Recebido: ${jogoFoco.timeCasa} x ${jogoFoco.timeVisitante}`,
            valor: aposta.retornoPossivel, data: new Date().toISOString()
          });
        }
      }
      alert('Partida liquidada e fundos distribuídos!');
      setJogoFoco(null); setResultadoEscolhido(''); buscarJogos();
    } catch (erro) {
      console.error(erro);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">Painel de Controle Administrativo</h2>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white font-mono text-xs uppercase">
              <tr>
                <th className="p-4">Partida</th>
                <th className="p-4">Status</th>
                <th className="p-4">Vencedor Real</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {eventos.map(evt => (
                <tr key={evt.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold">{evt.timeCasa} x {evt.timeVisitante}</td>
                  <td className="p-4 uppercase text-xs font-bold text-slate-500">{evt.status}</td>
                  <td className="p-4 uppercase font-mono font-bold text-slate-400">{evt.resultado || 'Aguardando'}</td>
                  <td className="p-4 text-center">
                    {evt.status === 'aberto' ? (
                      <button onClick={() => setJogoFoco(evt)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition">Encerrar Jogo</button>
                    ) : <span className="text-xs text-slate-400 italic font-medium">Finalizado</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {jogoFoco && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-xl">
            <h3 className="font-black text-slate-900 mb-4 text-sm">Informar Resultado Oficial</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button onClick={() => setResultadoEscolhido('casa')} className={`p-2 border rounded-lg text-xs font-bold capitalize ${resultadoEscolhido === 'casa' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white'}`}>Vitória Casa</button>
              <button onClick={() => setResultadoEscolhido('empate')} className={`p-2 border rounded-lg text-xs font-bold capitalize ${resultadoEscolhido === 'empate' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white'}`}>Empate</button>
              <button onClick={() => setResultadoEscolhido('visitante')} className={`p-2 border rounded-lg text-xs font-bold capitalize ${resultadoEscolhido === 'visitante' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white'}`}>Vitória Visitante</button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setJogoFoco(null); setResultadoEscolhido(''); }} className="w-1/2 bg-slate-100 py-2 rounded-lg text-xs font-bold cursor-pointer">Sair</button>
              <button onClick={liquidarPartida} className="w-1/2 bg-rose-600 text-white py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-rose-700">Liquidar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}