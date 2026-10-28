import React from 'react';
import { Landmark, Search, ShieldCheck, Sun, Moon } from 'lucide-react';
import { BrazilDataset } from '../types';
import { Theme } from '../hooks/useTheme';

interface NavbarProps {
  dataset: BrazilDataset;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
  onOpenSyncInfo: () => void;
  onOpenCommandPalette: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dataset,
  selectedStateId,
  onSelectState,
  onOpenSyncInfo,
  onOpenCommandPalette,
  theme,
  onToggleTheme
}) => {
  const statesList = Object.values(dataset.states).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <header className="border-b border-zinc-200 bg-white/85 dark:border-zinc-800 dark:bg-zinc-950/85 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-[1720px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Logo e Título */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer group"
          onClick={() => onSelectState('')}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 via-yellow-400 to-blue-600 p-[2px] shadow-sm">
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[6px] flex items-center justify-center transition-colors">
              <Landmark className="w-5 h-5 text-emerald-600 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white">
                Pólis <span className="text-zinc-500 dark:text-zinc-400">Brasil</span>
              </h1>
              <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 hidden sm:inline-block">
                Cívico & Transparência
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Hierarquia Governamental e Representação dos Estados
            </p>
          </div>
        </div>

        {/* Busca / Seletor de Estados + Ações */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Botão de Busca Rápida (Command Palette) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800 dark:text-zinc-300 text-sm transition-colors shadow-xs"
            title="Abrir busca global (Ctrl + K)"
          >
            <Search className="w-4 h-4 text-zinc-400" />
            <span className="hidden xl:inline text-xs font-medium">Buscar no Brasil...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono border border-zinc-300 dark:border-zinc-700 text-zinc-500">
              Ctrl K
            </kbd>
          </button>

          {/* Dropdown de Busca de Estados */}
          <div className="relative">
            <select
              value={selectedStateId || ''}
              onChange={(e) => onSelectState(e.target.value)}
              className="bg-white border border-zinc-300 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer transition-colors shadow-xs font-medium"
            >
              <option value="">🇧🇷 União (Federal)</option>
              {statesList.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name} ({state.id})
                </option>
              ))}
            </select>
          </div>

          {/* Botão de Info da Base e Sincronização */}
          <button
            onClick={onOpenSyncInfo}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-zinc-300 text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors shadow-xs"
            title="Sobre a Base de Dados e Sincronização Mensal"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">Base & Dados</span>
          </button>

          {/* Botão de Alternância de Tema (Dark / White) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-lg bg-white border border-zinc-300 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors shadow-xs text-sm"
            title={theme === 'dark' ? 'Mudar para White Mode' : 'Mudar para Dark Mode'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <span className="flex items-center gap-1.5 font-medium">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Claro</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-medium">
                <Moon className="w-4 h-4 text-zinc-700" />
                <span className="hidden sm:inline">Escuro</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
