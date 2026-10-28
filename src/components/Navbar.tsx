import React from 'react';
import { Landmark, Search, ShieldCheck, Sun, Moon } from 'lucide-react';
import { BrazilDataset } from '../types';
import { Theme } from '../hooks/useTheme';

interface NavbarProps {
  dataset: BrazilDataset;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
  onOpenSyncInfo: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dataset,
  selectedStateId,
  onSelectState,
  onOpenSyncInfo,
  theme,
  onToggleTheme
}) => {
  const statesList = Object.values(dataset.states).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <header className="border-b border-zinc-200 bg-white/85 dark:border-zinc-800 dark:bg-zinc-950/85 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Logo e Título */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onSelectState('')}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 via-yellow-400 to-blue-600 p-[2px] shadow-sm">
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[6px] flex items-center justify-center transition-colors">
              <Landmark className="w-4 h-4 text-emerald-600 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white">
                Pólis <span className="text-zinc-500 dark:text-zinc-400">Brasil</span>
              </h1>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 hidden sm:inline-block">
                Cívico & Transparência
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Hierarquia Governamental e Representação dos Estados
            </p>
          </div>
        </div>

        {/* Busca / Seletor de Estados + Ações */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Dropdown de Busca de Estados */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedStateId || ''}
              onChange={(e) => onSelectState(e.target.value)}
              className="bg-white border border-zinc-300 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 text-xs sm:text-sm rounded-lg pl-8.5 pr-8 py-1.5 focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer transition-colors shadow-xs"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-300 text-xs text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors shadow-xs"
            title="Sobre a Base de Dados e Sincronização Mensal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">Base & Dados</span>
          </button>

          {/* Botão de Alternância de Tema (Dark / White) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white border border-zinc-300 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors shadow-xs"
            title={theme === 'dark' ? 'Mudar para White Mode' : 'Mudar para Dark Mode'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <span className="flex items-center gap-1.5 text-xs">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-medium">Claro</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs">
                <Moon className="w-4 h-4 text-zinc-700" />
                <span className="hidden sm:inline font-medium">Escuro</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
