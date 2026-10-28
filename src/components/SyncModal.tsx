import React from 'react';
import { X, Database, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in transition-colors">
      <div className="bg-white border border-zinc-200 rounded-xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">Base Curada & Sincronização</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Transparência dos dados e rotina de atualização</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
          <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 p-3.5 rounded-lg">
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1.5 flex items-center gap-2 text-xs">
              <Calendar className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> Política de Atualização Mensal
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              O projeto combina uma <strong>base de dados estática de alta performance (0ms)</strong> com rotinas de consulta às APIs públicas oficiais. Mudanças nos quadros de parlamentares e executivo podem ser sincronizadas mensalmente via rotina automatizada.
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Última revisão da base: <strong>{metadata.lastUpdated}</strong></span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-500 dark:text-zinc-400 text-[11px] uppercase tracking-wider mb-2">
              Fontes Oficiais Utilizadas:
            </h4>
            <div className="space-y-1.5">
              {metadata.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:border-zinc-400 dark:bg-zinc-950/50 dark:border-zinc-800/80 dark:text-zinc-300 dark:hover:text-white transition-colors"
                >
                  <span>{src.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 p-3 rounded-lg text-xs text-zinc-700 dark:text-zinc-300">
            💡 <strong>Dica de Desenvolvimento:</strong> Você pode rodar <code className="bg-zinc-200 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-mono">npm run sync-data</code> no terminal para atualizar os dados com as APIs oficiais a qualquer momento.
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-semibold text-xs transition-colors shadow-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
