import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BrazilMap } from './components/BrazilMap';
import { GovernmentPanel } from './components/GovernmentPanel';
import { SyncModal } from './components/SyncModal';
import { CommandPalette } from './components/CommandPalette';
import { CivicAnalyticsModal } from './components/CivicAnalyticsModal';
import { StateComparatorModal } from './components/StateComparatorModal';
import { CivicPrintDossier } from './components/CivicPrintDossier';
import { CivicGlossaryModal } from './components/CivicGlossaryModal';
import { initialBrazilData } from './data/brazilData';
import { Region } from './types';
import { useTheme } from './hooks/useTheme';
import { Check } from 'lucide-react';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [dataset] = useState(initialBrazilData);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<Region | 'Todas'>('Todas');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [glossaryTermId, setGlossaryTermId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);
  
  // Controle de abas da União para deep navigation
  const [federalTab, setFederalTab] = useState<'executivo' | 'legislativo' | 'judiciario' | 'justica' | 'equilibrio'>('executivo');
  const [selectedCourt, setSelectedCourt] = useState<'STF' | 'STJ' | 'TSE' | 'TST' | 'STM' | 'CNJ'>('STF');

  const selectedStateData = selectedStateId ? dataset.states[selectedStateId] : null;

  // Atalho global do teclado (Ctrl+K, Cmd+K ou '/') para abrir a Command Palette
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (
        e.key === '/' && 
        document.activeElement?.tagName !== 'INPUT' && 
        document.activeElement?.tagName !== 'SELECT' && 
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeydown);
    return () => window.removeEventListener('keydown', handleGlobalKeydown);
  }, []);

  // Leitura inicial de parâmetros da URL para Deep Linking (suporta ?uf=SP, ?tab=judiciario, etc. e hash #/SP)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace(/^#\/?/, '').toUpperCase();
    const ufParam = params.get('uf')?.toUpperCase() || hash;

    if (ufParam && dataset.states[ufParam]) {
      setSelectedStateId(ufParam);
    }

    const tabParam = params.get('tab') as any;
    if (tabParam && ['executivo', 'legislativo', 'judiciario', 'justica', 'equilibrio'].includes(tabParam)) {
      setFederalTab(tabParam);
    }

    const courtParam = params.get('court') as any;
    if (courtParam && ['STF', 'STJ', 'TSE', 'TST', 'STM', 'CNJ'].includes(courtParam)) {
      setSelectedCourt(courtParam);
    }

    const modalParam = params.get('modal');
    if (modalParam === 'glossario') setIsGlossaryOpen(true);
    else if (modalParam === 'analytics') setIsAnalyticsOpen(true);
    else if (modalParam === 'comparador') setIsComparatorOpen(true);
    else if (modalParam === 'sync') setIsSyncModalOpen(true);
  }, [dataset.states]);

  // Sincronização contínua da URL com o estado da aplicação
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedStateId) {
      params.set('uf', selectedStateId);
    } else {
      if (federalTab !== 'executivo') {
        params.set('tab', federalTab);
      }
      if (federalTab === 'judiciario' && selectedCourt !== 'STF') {
        params.set('court', selectedCourt);
      }
    }

    if (isGlossaryOpen) params.set('modal', 'glossario');
    else if (isAnalyticsOpen) params.set('modal', 'analytics');
    else if (isComparatorOpen) params.set('modal', 'comparador');
    else if (isSyncModalOpen) params.set('modal', 'sync');

    const queryString = params.toString();
    const newRelativeUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, '', newRelativeUrl);
  }, [selectedStateId, federalTab, selectedCourt, isGlossaryOpen, isAnalyticsOpen, isComparatorOpen, isSyncModalOpen]);

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
  };

  const handleSelectFederalTab = (tab: 'executivo' | 'legislativo' | 'judiciario' | 'justica' | 'equilibrio', court?: 'STF' | 'STJ' | 'TSE' | 'TST' | 'STM' | 'CNJ') => {
    setFederalTab(tab);
    if (court) setSelectedCourt(court);
  };

  const handleSelectRegion = (region: Region | 'Todas') => {
    setActiveRegionFilter(region);
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast('Link da página copiado para a área de transferência!');
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 selection:bg-zinc-300 selection:text-zinc-900 dark:selection:bg-zinc-700 dark:selection:text-white">
      {/* Barra de Navegação */}
      <Navbar
        dataset={dataset}
        selectedStateId={selectedStateId}
        onSelectState={handleSelectState}
        onOpenSyncInfo={() => setIsSyncModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenComparator={() => setIsComparatorOpen(true)}
        onOpenGlossary={() => {
          setGlossaryTermId(null);
          setIsGlossaryOpen(true);
        }}
        onShareLink={handleShareLink}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Conteúdo Principal */}
      <main className="screen-only flex-1 max-w-[1720px] 2xl:max-w-[1880px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
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
              onClick={() => handleSelectState('')}
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
              federalTab={federalTab}
              onFederalTabChange={setFederalTab}
              selectedCourt={selectedCourt}
              onSelectCourt={setSelectedCourt}
              onOpenComparator={() => setIsComparatorOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Busca Global Unificada (Command Palette) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        dataset={dataset}
        onSelectState={handleSelectState}
        onSelectFederalTab={handleSelectFederalTab}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenComparator={() => setIsComparatorOpen(true)}
        onOpenGlossary={(termId) => {
          setGlossaryTermId(termId || null);
          setIsGlossaryOpen(true);
        }}
      />

      {/* Modal do Glossário Cívico-Constitucional */}
      <CivicGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => {
          setIsGlossaryOpen(false);
          setGlossaryTermId(null);
        }}
        initialTermId={glossaryTermId}
      />

      {/* Modal de Sincronização e Metadados */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        metadata={dataset.metadata}
      />

      {/* Modal de Análise e Gráficos Cívicos */}
      <CivicAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        dataset={dataset}
      />

      {/* Modal de Comparador Federativo */}
      <StateComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        dataset={dataset}
        initialStateAId={selectedStateId || 'SP'}
        initialStateBId={selectedStateId === 'RJ' ? 'SP' : 'RJ'}
        onSelectState={handleSelectState}
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

      {/* Dossiê / Ficha Cívica Otimizada Exclusivamente para Impressão e PDF (A4) */}
      <CivicPrintDossier
        stateData={selectedStateData}
        federalData={dataset.federal}
        lastUpdated={dataset.metadata.lastUpdated}
      />

      {/* Notificação Toast ao Compartilhar Link */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-bounce">
          <Check className="w-4 h-4 shrink-0" />
          <span>{shareToast}</span>
        </div>
      )}
    </div>
  );
};

export default App;
