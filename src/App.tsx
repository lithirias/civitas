import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BrazilMap } from './components/BrazilMap';
import { GovernmentPanel } from './components/GovernmentPanel';
import { SyncModal } from './components/SyncModal';
import { initialBrazilData } from './data/brazilData';
import { Region } from './types';
import { useTheme } from './hooks/useTheme';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [dataset] = useState(initialBrazilData);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<Region | 'Todas'>('Todas');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  const selectedStateData = selectedStateId ? dataset.states[selectedStateId] : null;

  // Sincronização bidirecional via Hash (#/SP, #/RJ, etc.) para Deep Linking
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toUpperCase();
      if (hash && dataset.states[hash]) {
        setSelectedStateId(hash);
      } else if (!hash) {
        setSelectedStateId(null);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [dataset.states]);

  // Atualização dinâmica do título da página
  useEffect(() => {
    if (selectedStateData) {
      document.title = `${selectedStateData.name} (${selectedStateData.id}) - Pólis Brasil`;
    } else {
      document.title = 'Pólis Brasil - Hierarquia de Governo e Representação dos Estados';
    }
  }, [selectedStateData]);

  const handleSelectState = (stateId: string) => {
    const upper = stateId ? stateId.toUpperCase() : null;
    setSelectedStateId(upper);
    if (upper) {
      window.location.hash = `#/${upper}`;
    } else {
      // Remove o hash de forma limpa sem recarregar
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const handleSelectRegion = (region: Region | 'Todas') => {
    setActiveRegionFilter(region);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 selection:bg-zinc-300 selection:text-zinc-900 dark:selection:bg-zinc-700 dark:selection:text-white">
      {/* Barra de Navegação */}
      <Navbar
        dataset={dataset}
        selectedStateId={selectedStateId}
        onSelectState={handleSelectState}
        onOpenSyncInfo={() => setIsSyncModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-[1720px] 2xl:max-w-[1880px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        {/* Banner de Boas-vindas / Contexto */}
        <div className="mb-6 bg-white border border-zinc-200 shadow-xs dark:bg-gradient-to-r dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-950 dark:border-zinc-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2.5">
              <span>🇧🇷</span> Organização dos Poderes nos Estados Brasileiros
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              Explore o mapa político interativo: clique em qualquer estado para visualizar seus representantes nos Poderes Executivo, Legislativo e Judiciário.
            </p>
          </div>
          {selectedStateId && (
            <button
              onClick={() => setSelectedStateId(null)}
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 text-sm font-semibold transition-colors shrink-0 dark:border-zinc-700 shadow-xs"
            >
              ← Voltar à Visão da União
            </button>
          )}
        </div>

        {/* Grade: Mapa à esquerda | Painel de Hierarquia à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Coluna do Mapa (5 colunas no desktop grande, sticky para melhor navegabilidade) */}
          <div className="lg:col-span-5 2xl:col-span-5 flex justify-center lg:sticky lg:top-24">
            <BrazilMap
              dataset={dataset}
              selectedStateId={selectedStateId}
              onSelectState={handleSelectState}
              activeRegionFilter={activeRegionFilter}
              onSelectRegion={handleSelectRegion}
            />
          </div>

          {/* Coluna do Painel de Hierarquia (7 colunas) */}
          <div className="lg:col-span-7 2xl:col-span-7">
            <GovernmentPanel
              stateData={selectedStateData}
              federalData={dataset.federal}
              lastUpdated={dataset.metadata.lastUpdated}
            />
          </div>
        </div>
      </main>

      {/* Modal de Sincronização e Metadados */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        metadata={dataset.metadata}
      />

      {/* Rodapé */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400 transition-colors">
        <div className="max-w-[1720px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 lg:px-8">
          <p>
            <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">Pólis Brasil</strong> • Projeto Cívico de Código Aberto • Deploy via GitHub Pages
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            Dados públicos consolidados a partir da Câmara dos Deputados, Senado Federal, IBGE e Tribunais de Justiça.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
