export default function RankingTable({ listaUsuarios }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider font-mono">
            <th className="p-4 w-20 text-center">Rank</th>
            <th className="p-4">Jogador</th>
            <th className="p-4 text-right">Patrimônio Simulado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
          {listaUsuarios.map((usr, index) => (
            <tr key={usr.id} className="hover:bg-slate-50/60 transition">
              <td className="p-4 text-center font-mono font-bold text-slate-400">
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
                {index > 2 && `${index + 1}º`}
              </td>
              <td className="p-4 font-bold text-slate-800">{usr.nome}</td>
              <td className="p-4 text-right font-mono font-bold text-emerald-600">R$ {usr.saldo?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}