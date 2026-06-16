import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import BetForm from '../components/BetForm';

export default function Apostar() {
  const { user, updateBalance, syncDatabase } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [esporteFiltro, setEsporteFiltro] = useState('Todos');

  const [modalAberto, setModalAberto] = useState(false);
  const [eventoAlvo, setEventoAlvo] = useState(null);
  const [palpite, setPalpite] = useState('');
  const [cotacao, setCotacao] = useState(0);
  const [valorApostado, setValorApostado] = useState('');

  useEffect(() => {
    async function inicializarTela() {
      await syncDatabase();
      const resposta = await api.get('/eventos?status=aberto');
      setEventos(resposta.data);
    }
    inicializarTela();
  }, []);

  const lidarComSelecaoOdd = (evento, tipoPalpite, valorCotacao) => {
    setEventoAlvo(evento);
    setPalpite(tipoPalpite);
    setCotacao(valorCotacao);
    setValorApostado('');
    setModalAberto(true);
  };

  const processarBilhete = async (e) => {
    e.preventDefault();
    const quantia = Number(valorApostado);

    if (quantia > user.saldo) {
      alert('Saldo simulado insuficiente.');
      return;
    }

    try {
      await api.post('/apostas', {
        usuarioId: String(user.id),
        eventoId: String(eventoAlvo.id),
        palpite,
        valorApostado: quantia,
        retornoPossivel: quantia * cotacao,
        status: 'pendente',
        dataAposta: new Date().toISOString()
      });

      const novoSaldo = user.saldo - quantia;
      await api.patch(`/usuarios/${user.id}`, { saldo: novoSaldo });
      
      await api.post('/movimentacoes', {
        usuarioId: String(user.id),
        tipo: 'saida',
        descricao: `Palpite Realizado: ${eventoAlvo.timeCasa} x ${eventoAlvo.timeVisitante}`,
        valor: quantia,
        data: new Date().toISOString()
      });

      updateBalance(novoSaldo);
      setModalAberto(false);
      alert('Palpite computado com sucesso!');
    } catch (erro) {
      alert('Erro ao registrar transação.');
    }
  };

  const jogosFiltrados = esporteFiltro === 'Todos' 
    ? eventos 
    : eventos.filter(evt => evt.esporte === esporteFiltro);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Confrontos Disponíveis</h2>
            <p className="text-xs text-slate-400">Funcionalidade Extra: Filtro por Esportes</p>
          </div>
          <div className="flex bg-white border border-slate-200 p-1 rounded-xl gap-1">
            {['Todos', 'Futebol', 'Basquete'].map(esp => (
              <button key={esp} onClick={() => setEsporteFiltro(esp)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${esporteFiltro === esp ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>{esp}</button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jogosFiltrados.map(evt => (
            <EventCard key={evt.id} evento={evt} aoEscolherOdd={lidarComSelecaoOdd} />
          ))}
        </div>
      </main>
      
      {modalAberto && (
        <BetForm evento={eventoAlvo} palpite={palpite} cotacao={cotacao} valor={valorApostado} setValor={setValorApostado} aoConfirmar={processarBilhete} aoFechar={() => setModalAberto(false)} />
      )}
    </div>
  );
}