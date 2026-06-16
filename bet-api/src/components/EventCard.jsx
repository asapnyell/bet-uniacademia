export default function EventCard({ evento, aoEscolherOdd }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase font-mono">{evento.esporte}</span>
        <span className="uppercase font-mono text-emerald-600 font-bold">{evento.status}</span>
      </div>
      
      <div className="text-center py-4 space-y-1">
        <p className="font-black text-slate-800 text-md">{evento.timeCasa}</p>
        <span className="text-[10px] font-bold text-slate-300 block">VS</span>
        <p className="font-black text-slate-800 text-md">{evento.timeVisitante}</p>
      </div>

      {evento.status === 'aberto' && aoEscolherOdd && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
          <button onClick={() => aoEscolherOdd(evento, 'casa', evento.cotacoes.casa)} className="border border-slate-200 hover:border-blue-500 rounded-lg p-2 font-mono text-xs cursor-pointer transition">
            <span className="block text-[9px] text-slate-400 font-sans">Casa</span>
            <strong>{evento.cotacoes.casa.toFixed(2)}</strong>
          </button>
          <button onClick={() => aoEscolherOdd(evento, 'empate', evento.cotacoes.empate)} className="border border-slate-200 hover:border-blue-500 rounded-lg p-2 font-mono text-xs cursor-pointer transition">
            <span className="block text-[9px] text-slate-400 font-sans">Empate</span>
            <strong>{evento.cotacoes.empate.toFixed(2)}</strong>
          </button>
          <button onClick={() => aoEscolherOdd(evento, 'visitante', evento.cotacoes.visitante)} className="border border-slate-200 hover:border-blue-500 rounded-lg p-2 font-mono text-xs cursor-pointer transition">
            <span className="block text-[9px] text-slate-400 font-sans">Visitante</span>
            <strong>{evento.cotacoes.visitante.toFixed(2)}</strong>
          </button>
        </div>
      )}
    </div>
  );
}