import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

export default function Eventos() {
  const [todosJogos, setTodosJogos] = useState([]);

  useEffect(() => {
    async function carregarMural() {
      const resposta = await api.get('/eventos');
      setTodosJogos(resposta.data);
    }
    carregarMural();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-black text-slate-800 mb-6">Mural Completo de Confrontos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todosJogos.map(evt => <EventCard key={evt.id} evento={evt} />)}
        </div>
      </main>
    </div>
  );
}