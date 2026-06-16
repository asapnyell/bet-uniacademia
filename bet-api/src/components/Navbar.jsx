import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const lidarComSair = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-950 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2 font-black tracking-wider text-lg">
        <span className="text-blue-500">BET</span><span>ACADÊMICA</span>
      </div>

      <div className="flex gap-5 text-xs font-semibold uppercase tracking-wider items-center">
        {user?.perfil === 'jogador' && (
          <>
            <Link to="/dashboard" className="hover:text-blue-400 transition">Meu Extrato</Link>
            <Link to="/apostar" className="hover:text-blue-400 transition">Eventos</Link>
            <Link to="/historico" className="hover:text-blue-400 transition">Meus Palpites</Link>
            <Link to="/ranking" className="hover:text-blue-400 transition text-amber-400">🏆 Ranking</Link>
          </>
        )}
        {user?.perfil === 'administrador' && (
          <>
            <Link to="/admin" className="hover:text-blue-400 transition">Painel Geral</Link>
            <Link to="/admin/criar" className="hover:text-blue-400 transition text-blue-400">+ Novo Jogo</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs">
        {user?.perfil === 'jogador' && (
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg font-mono text-emerald-400 font-bold">
            R$ {user.saldo?.toFixed(2)}
          </div>
        )}
        <button onClick={lidarComSair} className="bg-rose-600 hover:bg-rose-700 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer">
          Sair
        </button>
      </div>
    </nav>
  );
}