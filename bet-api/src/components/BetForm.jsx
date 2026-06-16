export default function BetForm({ evento, palpite, cotacao, valor, setValor, aoConfirmar, aoFechar }) {
  const retornoCalculado = valor > 0 ? (Number(valor) * cotacao).toFixed(2) : '0.00';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100">
        <h3 className="font-black text-slate-900 text-md mb-1">Confirmar Bilhete Fictício</h3>
        <p className="text-xs text-slate-500 mb-4">{evento?.timeCasa} x {evento?.timeVisitante}</p>
        
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4 text-xs space-y-1">
          <p className="text-slate-600">Palpite: <span className="font-bold text-slate-900 capitalize">{palpite}</span></p>
          <p className="text-slate-600">Cotação: <span className="font-mono font-bold text-slate-900">{cotacao.toFixed(2)}</span></p>
        </div>

        <form onSubmit={aoConfirmar} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Valor do Palpite (R$)</label>
            <input type="number" min="1" step="any" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ex: 50" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500" required />
          </div>
          
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex justify-between text-xs font-bold text-emerald-800 font-mono">
            <span>Retorno Potencial:</span>
            <span>R$ {retornoCalculado}</span>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={aoFechar} className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-xs cursor-pointer transition">Voltar</button>
            <button type="submit" className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs cursor-pointer transition">Apostar</button>
          </div>
        </form>
      </div>
    </div>
  );
}