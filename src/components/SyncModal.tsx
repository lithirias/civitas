import React from 'react';
import { X, RefreshCw, Database, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { DatabaseMetadata } from '../types';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: DatabaseMetadata;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  metadata
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Base Curada & Sincronização</h3>
            <p className="text-xs text-slate-400">Transparência dos dados e rotina de atualização</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" /> Política de Atualização Mensal
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              O projeto combina uma <strong>base de dados estática de alta performance (0ms)</strong> com rotinas de consulta às APIs públicas oficiais. Mudanças nos quadros de parlamentares e executivo podem ser sincronizadas mensalmente via rotina automatizada.
            </p>
            <div className="mt-3 flex items-center gap-2 text-emerald-400 font-medium text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Última revisão da base: <strong>{metadata.lastUpdated}</strong></span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-2 text-slate-400">
              Fontes Oficiais Utilizadas:
            </h4>
            <div className="space-y-1.5">
              {metadata.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 text-xs text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <span>{src.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-blue-950/30 border border-blue-900/50 p-3 rounded-xl text-xs text-blue-200/90">
            💡 <strong>Dica de Desenvolvimento:</strong> Você pode rodar <code className="bg-slate-950 px-1.5 py-0.5 rounded text-blue-300">npm run sync-data</code> no terminal para atualizar os dados com as APIs oficiais a qualquer momento.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
