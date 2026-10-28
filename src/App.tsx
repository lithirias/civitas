import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BrazilMap } from './components/BrazilMap';
import { GovernmentPanel } from './components/GovernmentPanel';
import { SyncModal } from './components/SyncModal';
import { initialBrazilData } from './data/brazilData';
import { Region } from './types';

export const App: React.FC = () => {
  const [dataset] = useState(initialBrazilData);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<Region | 'Todas'>('Todas');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  const selectedStateData = selectedStateId ? dataset.states[selectedStateId] : null;

  const handleSelectState = (stateId: string) => {
    setSelectedStateId(stateId ? stateId.toUpperCase() : null);
  };

  const handleSelectRegion = (region: Region | 'Todas') => {
    setActiveRegionFilter(region);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Barra de Navegação */}
      <Navbar
        dataset={dataset}
        selectedStateId={selectedStateId}
        onSelectState={handleSelectState}
        onOpenSyncInfo={() => setIsSyncModalOpen(true)}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Banner de Boas-vindas / Contexto */}
        <div className="mb-6 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>🇧🇷</span> Organização dos Poderes nos Estados Brasileiros
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore o mapa político interativo: clique em qualquer estado para visualizar seus representantes nos Poderes Executivo, Legislativo e Judiciário.
            </p>
          </div>
          {selectedStateId && (
            <button
              onClick={() => setSelectedStateId(null)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors shrink-0 border border-slate-700"
            >
              ← Voltar à Visão da União
            </button>
          )}
        </div>

        {/* Grade: Mapa à esquerda | Painel de Hierarquia à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Coluna do Mapa (5 colunas em telas grandes) */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
            <BrazilMap
              dataset={dataset}
              selectedStateId={selectedStateId}
              onSelectState={handleSelectState}
              activeRegionFilter={activeRegionFilter}
              onSelectRegion={handleSelectRegion}
            />
          </div>

          {/* Coluna do Painel de Hierarquia (6-7 colunas) */}
          <div className="lg:col-span-6 xl:col-span-7">
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
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            <strong>Pólis Brasil</strong> • Projeto Cívico de Código Aberto • Deploy via GitHub Pages
          </p>
          <p className="mt-1 text-[11px] text-slate-600">
            Dados públicos consolidados a partir da Câmara dos Deputados, Senado Federal, IBGE e Tribunais de Justiça.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
