import React from 'react';
import { Landmark, Search, ShieldCheck } from 'lucide-react';
import { BrazilDataset } from '../types';

interface NavbarProps {
  dataset: BrazilDataset;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
  onOpenSyncInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dataset,
  selectedStateId,
  onSelectState,
  onOpenSyncInfo
}) => {
  const statesList = Object.values(dataset.states).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Logo e Título */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onSelectState('')}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 via-yellow-400 to-blue-600 p-[2px] shadow-md">
            <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center">
              <Landmark className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                Pólis <span className="text-zinc-400">Brasil</span>
              </h1>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 hidden sm:inline-block">
                Cívico & Transparência
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Hierarquia Governamental e Representação dos Estados
            </p>
          </div>
        </div>

        {/* Busca / Seletor de Estados + Ações */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dropdown de Busca de Estados */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedStateId || ''}
              onChange={(e) => onSelectState(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs sm:text-sm rounded-lg pl-8.5 pr-8 py-1.5 focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer transition-colors"
            >
              <option value="">🇧🇷 Visão Geral (União)</option>
              {statesList.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name} ({state.id}) - {state.region}
                </option>
              ))}
            </select>
          </div>

          {/* Botão de Info da Base e Sincronização */}
          <button
            onClick={onOpenSyncInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Sobre a Base de Dados e Sincronização Mensal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Base & Dados</span>
          </button>
        </div>
      </div>
    </header>
  );
};
