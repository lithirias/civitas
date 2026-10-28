import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  Building2, 
  Scale, 
  Users, 
  MapPin, 
  Calendar, 
  RefreshCw, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRightLeft,
  Gavel,
  BookOpen,
  ShieldCheck,
  Search,
  Filter,
  Award,
  ExternalLink,
  Phone,
  Mail,
  Printer
} from 'lucide-react';
import { StateData, FederalStructure, FederalDeputy, LiveSenator } from '../types';
import { fetchDeputiesByState } from '../services/camaraApi';
import { fetchSenatorsByState } from '../services/senadoApi';

interface GovernmentPanelProps {
  stateData: StateData | null;
  federalData: FederalStructure;
  lastUpdated: string;
  federalTab?: 'executivo' | 'legislativo' | 'judiciario' | 'justica' | 'equilibrio';
  onFederalTabChange?: (tab: 'executivo' | 'legislativo' | 'judiciario' | 'justica' | 'equilibrio') => void;
  selectedCourt?: 'STF' | 'STJ' | 'TSE' | 'TST' | 'STM' | 'CNJ';
  onSelectCourt?: (court: 'STF' | 'STJ' | 'TSE' | 'TST' | 'STM' | 'CNJ') => void;
  onOpenComparator?: () => void;
}

export const GovernmentPanel: React.FC<GovernmentPanelProps> = ({
  stateData,
  federalData,
  lastUpdated,
  federalTab: propFederalTab,
  onFederalTabChange,
  selectedCourt: propCourt,
  onSelectCourt,
  onOpenComparator
}) => {
  // Abas para a visão de Estado
  const [stateTab, setStateTab] = useState<'executivo' | 'legislativo' | 'judiciario'>('executivo');
  
  // Abas para a visão Federal
  const [internalFederalTab, setInternalFederalTab] = useState<'executivo' | 'legislativo' | 'judiciario' | 'justica' | 'equilibrio'>('executivo');
  const federalTab = propFederalTab ?? internalFederalTab;
  const setFederalTab = (tab: 'executivo' | 'legislativo' | 'judiciario' | 'justica' | 'equilibrio') => {
    setInternalFederalTab(tab);
    onFederalTabChange?.(tab);
  };

  // Sub-abas do Judiciário Federal (STF e TSIs)
  const [internalCourt, setInternalCourt] = useState<'STF' | 'STJ' | 'TSE' | 'TST' | 'STM' | 'CNJ'>('STF');
  const selectedCourt = propCourt ?? internalCourt;
  const setSelectedCourt = (court: 'STF' | 'STJ' | 'TSE' | 'TST' | 'STM' | 'CNJ') => {
    setInternalCourt(court);
    onSelectCourt?.(court);
  };

  const [memberSearch, setMemberSearch] = useState<string>('');
  const [stjFilter, setStjFilter] = useState<'TODOS' | 'TRF' | 'TJ' | 'OAB/MP'>('TODOS');
  const [stmFilter, setStmFilter] = useState<'TODOS' | 'Marinha' | 'Exército' | 'Aeronáutica' | 'Civil'>('TODOS');

  // Estado para carregar deputados federais via API da Câmara
  const [loadingDeputies, setLoadingDeputies] = useState<boolean>(false);
  const [liveDeputies, setLiveDeputies] = useState<FederalDeputy[] | null>(null);
  const [deputiesError, setDeputiesError] = useState<string | null>(null);
  const [showDeputiesList, setShowDeputiesList] = useState<boolean>(false);

  // Estado para carregar senadores federais via API do Senado
  const [loadingSenators, setLoadingSenators] = useState<boolean>(false);
  const [liveSenators, setLiveSenators] = useState<LiveSenator[] | null>(null);
  const [senatorsError, setSenatorsError] = useState<string | null>(null);

  // Limpa os dados ao trocar de estado
  useEffect(() => {
    setLiveDeputies(null);
    setDeputiesError(null);
    setShowDeputiesList(false);
    setLiveSenators(null);
    setSenatorsError(null);
  }, [stateData?.id]);

  const handleLoadDeputies = async () => {
    if (!stateData) return;
    setLoadingDeputies(true);
    setDeputiesError(null);

    try {
      const deputies = await fetchDeputiesByState(stateData.id);
      setLiveDeputies(deputies);
      setShowDeputiesList(true);
    } catch {
      setDeputiesError('Não foi possível conectar com a API da Câmara dos Deputados no momento.');
    } finally {
      setLoadingDeputies(false);
    }
  };

  const handleLoadSenators = async () => {
    if (!stateData) return;
    setLoadingSenators(true);
    setSenatorsError(null);

    try {
      const senators = await fetchSenatorsByState(stateData.id);
      setLiveSenators(senators);
    } catch {
      setSenatorsError('Não foi possível conectar com a API do Senado Federal no momento.');
    } finally {
      setLoadingSenators(false);
    }
  };

  // Se nenhum estado estiver selecionado, exibe a estrutura aprofundada da União Federal
  if (!stateData) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 xl:p-9 shadow-md dark:bg-zinc-900/85 dark:border-zinc-800 shadow-xl backdrop-blur-md flex flex-col h-full text-zinc-900 dark:text-zinc-100 transition-colors">
        {/* Cabeçalho Federal */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              <Landmark className="w-4 h-4" /> Governo Federal da União
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {federalData.name}
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-1.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-400 dark:text-zinc-500" /> Capital Federal: <strong className="text-zinc-900 dark:text-white">{federalData.capital}</strong>
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-700 text-xs font-semibold transition-colors shadow-xs shrink-0"
            title="Imprimir ou Salvar em PDF a Ficha da União"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
            <span className="hidden sm:inline">Imprimir Ficha (PDF)</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>

        {/* Abas da Estrutura Federal */}
        <div className="flex gap-1.5 p-1.5 bg-zinc-100 rounded-lg mb-5 border border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 text-sm sm:text-base font-semibold overflow-x-auto">
          <button
            onClick={() => setFederalTab('executivo')}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
              federalTab === 'executivo'
                ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <Building2 className="w-4 h-4" /> Executivo
          </button>
          <button
            onClick={() => setFederalTab('legislativo')}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
              federalTab === 'legislativo'
                ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" /> Legislativo
          </button>
          <button
            onClick={() => setFederalTab('judiciario')}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
              federalTab === 'judiciario'
                ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <Scale className="w-4 h-4" /> Judiciário
          </button>
          <button
            onClick={() => setFederalTab('justica')}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
              federalTab === 'justica'
                ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Funções à Justiça
          </button>
          <button
            onClick={() => setFederalTab('equilibrio')}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
              federalTab === 'equilibrio'
                ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" /> Freios & Contrapesos
          </button>
        </div>

        {/* Conteúdo das Abas Federais */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
          {/* ABA 1: EXECUTIVO FEDERAL */}
          {federalTab === 'executivo' && (
            <div className="space-y-4 animate-fade-in">
              {/* Presidência e Vice com fotos oficiais */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-5">
                <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-3.5">
                  Chefia de Estado e de Governo
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                  {/* Card Presidente */}
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-3.5 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                    {federalData.executive.presidentPhoto && (
                      <img
                        src={federalData.executive.presidentPhoto}
                        alt={federalData.executive.president}
                        className="w-16 h-20 sm:w-20 sm:h-24 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">Presidente da República</span>
                      <span className="font-extrabold text-zinc-950 dark:text-white text-base sm:text-lg block truncate">{federalData.executive.president}</span>
                      <span className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold">Partido: {federalData.executive.party}</span>
                    </div>
                  </div>

                  {/* Card Vice-Presidente */}
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-3.5 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                    {federalData.executive.vicePhoto && (
                      <img
                        src={federalData.executive.vicePhoto}
                        alt={federalData.executive.vicePresident}
                        className="w-16 h-20 sm:w-20 sm:h-24 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">Vice-Presidente</span>
                      <span className="font-extrabold text-zinc-950 dark:text-white text-base sm:text-lg block truncate">{federalData.executive.vicePresident}</span>
                      <span className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold">Partido: {federalData.executive.viceParty}</span>
                    </div>
                  </div>
                </div>

                {/* Sedes e Palácios */}
                <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pt-3 border-t border-zinc-200 dark:border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <span>Sede de Despacho Presidencial:</span>
                    <strong className="text-zinc-900 dark:text-zinc-200">{federalData.executive.seat}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Residência Oficial do Presidente:</span>
                    <strong className="text-zinc-900 dark:text-zinc-200">{federalData.executive.officialResidence}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Residência do Vice-Presidente:</span>
                    <strong className="text-zinc-900 dark:text-zinc-200">{federalData.executive.viceResidence}</strong>
                  </div>
                </div>
              </div>

              {/* Estrutura Ministerial */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider block">
                    Ministérios da União
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    {federalData.executive.ministriesCount} Pastas Ministeriais
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-3.5 leading-relaxed">
                  Os Ministros de Estado são escolhidos livremente pelo Presidente da República para coordenar a administração pública federal.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  {federalData.executive.keyMinistries.map((min, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 p-3 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-xs">
                      <strong className="text-zinc-950 dark:text-white font-bold block mb-1 text-sm">{min.name}</strong>
                      <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-snug block">{min.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atribuições Constitucionais */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-5">
                <span className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider block mb-2.5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Competências Constitucionais (Art. 84 CF)
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {federalData.executive.roles.map((role, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">•</span>
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ABA 2: LEGISLATIVO FEDERAL */}
          {federalTab === 'legislativo' && (
            <div className="space-y-4 animate-fade-in">
              {/* O Sistema Bicameral */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-5">
                <span className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1.5">
                  {federalData.legislative.nationalCongress}
                </span>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {federalData.legislative.bicameralSystemDescription}
                </p>
              </div>

              {/* Comparativo Câmara dos Deputados vs Senado Federal com Fotos dos Presidentes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Câmara dos Deputados */}
                <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="font-bold text-base sm:text-lg text-zinc-950 dark:text-white">Câmara dos Deputados</h4>
                      <span className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 text-xs sm:text-sm font-bold">
                        {federalData.legislative.chamberOfDeputies.totalDeputies} Cadeiras
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block mb-2.5">
                      Mandato de <strong>{federalData.legislative.chamberOfDeputies.mandateYears} anos</strong> • {federalData.legislative.chamberOfDeputies.criteria}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 block mb-1.5 uppercase tracking-wide">
                      Funções Privativas:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                      {federalData.legislative.chamberOfDeputies.roles.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Presidente da Câmara com Foto */}
                  {federalData.legislative.chamberOfDeputies.presidentName && (
                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                      {federalData.legislative.chamberOfDeputies.presidentPhoto && (
                        <img
                          src={federalData.legislative.chamberOfDeputies.presidentPhoto}
                          alt={federalData.legislative.chamberOfDeputies.presidentName}
                          className="w-12 h-15 sm:w-14 sm:h-18 rounded object-cover border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Presidente da Câmara</span>
                        <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white truncate block">{federalData.legislative.chamberOfDeputies.presidentName}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Senado Federal */}
                <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="font-bold text-base sm:text-lg text-zinc-950 dark:text-white">Senado Federal</h4>
                      <span className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 text-xs sm:text-sm font-bold">
                        {federalData.legislative.federalSenate.totalSenators} Cadeiras
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block mb-2.5">
                      Mandato de <strong>{federalData.legislative.federalSenate.mandateYears} anos</strong> • {federalData.legislative.federalSenate.criteria}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 block mb-1.5 uppercase tracking-wide">
                      Funções Privativas:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                      {federalData.legislative.federalSenate.roles.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Presidente do Senado com Foto */}
                  {federalData.legislative.federalSenate.presidentName && (
                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                      {federalData.legislative.federalSenate.presidentPhoto && (
                        <img
                          src={federalData.legislative.federalSenate.presidentPhoto}
                          alt={federalData.legislative.federalSenate.presidentName}
                          className="w-12 h-15 sm:w-14 sm:h-18 rounded object-cover border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Presidente do Senado e do Congresso</span>
                        <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white truncate block">{federalData.legislative.federalSenate.presidentName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Órgão Auxiliar: TCU */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 sm:p-5 flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2.5">
                    <strong className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">{federalData.legislative.externalControl.name}</strong>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                      {federalData.legislative.externalControl.totalMinisters} Ministros
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    {federalData.legislative.externalControl.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: JUDICIÁRIO FEDERAL (STF + TRIBUNAIS SUPERIORES + CNJ) */}
          {federalTab === 'judiciario' && (
            <div className="space-y-3.5 animate-fade-in">
              {/* Barra de Seleção de Tribunais / Instâncias */}
              <div className="flex gap-1.5 p-1 bg-zinc-100 rounded-lg border border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 text-xs font-medium overflow-x-auto">
                {[
                  { id: 'STF', label: 'STF', count: federalData.judiciary.supremeCourt.totalMinisters, desc: 'Constitucional' },
                  { id: 'STJ', label: 'STJ', count: 33, desc: 'Infraconstitucional' },
                  { id: 'TSE', label: 'TSE', count: 7, desc: 'Eleitoral' },
                  { id: 'TST', label: 'TST', count: 27, desc: 'Trabalho' },
                  { id: 'STM', label: 'STM', count: 15, desc: 'Militar' },
                  { id: 'CNJ', label: 'CNJ', count: 15, desc: 'Controle' }
                ].map((court) => (
                  <button
                    key={court.id}
                    onClick={() => { setSelectedCourt(court.id as any); setMemberSearch(''); }}
                    className={`flex-1 min-w-[85px] py-2 px-3 rounded-md transition-all flex items-center justify-center gap-2 whitespace-nowrap text-xs sm:text-sm font-semibold ${
                      selectedCourt === court.id
                        ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
                    }`}
                  >
                    <span>{court.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      selectedCourt === court.id
                        ? 'bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900'
                        : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}>
                      {court.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* TRIBUNAL SELECIONADO: STF */}
              {selectedCourt === 'STF' && (() => {
                const stf = federalData.judiciary.supremeCourt;
                const filteredMembers = stf.members.filter(m =>
                  !memberSearch ||
                  m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  m.role?.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  m.origin?.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  m.appointedBy?.toLowerCase().includes(memberSearch.toLowerCase())
                );

                return (
                  <div className="space-y-3">
                    <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Gavel className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                          <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                            {stf.name}
                          </h3>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold">
                          {stf.totalMinisters} Ministros
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                        {stf.role}
                      </p>
                      <div className="p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                        <Scale className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-zinc-900 dark:text-zinc-200">Critério Constitucional de Nomeação:</strong> {stf.appointmentCriteria}
                        </div>
                      </div>
                    </div>

                    {/* Barra de Busca de Ministros */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Buscar entre os 11 Ministros do STF..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                      />
                    </div>

                    {/* Grid dos 11 Ministros do STF com Fotos Oficiais */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filteredMembers.map((m) => (
                        <div
                          key={m.name}
                          className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-start gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                        >
                          {m.photoUrl ? (
                            <img
                              src={m.photoUrl}
                              alt={m.name}
                              className="w-14 h-18 sm:w-16 sm:h-20 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center shrink-0 text-zinc-600 dark:text-zinc-400 font-bold text-xs">
                              <Gavel className="w-4 h-4 mb-0.5 opacity-60" />
                              <span>{m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-1 mb-0.5">
                              <h4 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white leading-tight truncate">
                                {m.name}
                              </h4>
                              {m.role && m.role !== 'Ministro' && m.role !== 'Ministra' && (
                                <span className="text-xs px-1.5 py-0.2 rounded font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
                                  {m.role}
                                </span>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 block truncate">
                              {m.origin}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                              Posse em <strong>{m.startYear}</strong> • Indicado por {m.appointedBy}
                            </span>
                            {m.notes && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                                {m.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* TRIBUNAL SELECIONADO: STJ */}
              {selectedCourt === 'STJ' && (() => {
                const court = federalData.judiciary.superiorCourts.find(c => c.acronym === 'STJ');
                if (!court) return null;

                const filtered = court.members.filter(m => {
                  const matchCat = stjFilter === 'TODOS' || m.category === stjFilter;
                  const matchSearch = !memberSearch ||
                    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                    m.origin?.toLowerCase().includes(memberSearch.toLowerCase()) ||
                    m.appointedBy?.toLowerCase().includes(memberSearch.toLowerCase());
                  return matchCat && matchSearch;
                });

                return (
                  <div className="space-y-3">
                    <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                            {court.name} ({court.acronym})
                          </h3>
                          <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">
                            O "Tribunal da Cidadania" • {court.seat}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold">
                          {court.totalMinisters} Ministros
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                        {court.role}
                      </p>

                      {/* Liderança da Corte */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-3 text-xs">
                        <div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Presidente do STJ</span>
                          <strong className="text-zinc-950 dark:text-white font-semibold">{court.presidentName}</strong>
                        </div>
                        <div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Vice-Presidente do STJ</span>
                          <strong className="text-zinc-950 dark:text-white font-semibold">{court.vicePresidentName}</strong>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        <strong className="text-zinc-900 dark:text-zinc-200">Regra Constitucional dos Três Terços:</strong> {court.compositionRule}
                      </div>
                    </div>

                    {/* Filtros e Busca */}
                    <div className="space-y-2">
                      <div className="flex gap-1.5 p-1 bg-zinc-100 rounded-md border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 text-xs overflow-x-auto">
                        {(['TODOS', 'TRF', 'TJ', 'OAB/MP'] as const).map(cat => (
                          <button
                            key={cat}
                            onClick={() => setStjFilter(cat)}
                            className={`flex-1 py-1 px-2 rounded transition-all text-xs font-medium whitespace-nowrap ${
                              stjFilter === cat
                                ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                                : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                            }`}
                          >
                            {cat === 'TODOS' ? 'Todos (33)' : cat === 'TRF' ? '1/3 TRFs (11)' : cat === 'TJ' ? '1/3 TJs (11)' : '1/3 OAB & MP (11)'}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Buscar ministro do STJ por nome ou origem..."
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                        />
                      </div>
                    </div>

                    {/* Lista dos Ministros do STJ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filtered.map(m => (
                        <div
                          key={m.name}
                          className="bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-zinc-950 dark:text-white truncate">
                                {m.name}
                              </h4>
                              {m.role && m.role !== 'Ministro' && m.role !== 'Ministra' && (
                                <span className="text-[9.5px] px-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold shrink-0">
                                  {m.role}
                                </span>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">
                              Posse {m.startYear} • {m.appointedBy}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-md font-semibold shrink-0 border ${
                            m.category === 'TRF'
                              ? 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60'
                              : m.category === 'TJ'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60'
                              : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60'
                          }`}>
                            {m.origin}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* TRIBUNAL SELECIONADO: TSE */}
              {selectedCourt === 'TSE' && (() => {
                const court = federalData.judiciary.superiorCourts.find(c => c.acronym === 'TSE');
                if (!court) return null;

                const filtered = court.members.filter(m =>
                  !memberSearch ||
                  m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  m.role?.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  m.origin?.toLowerCase().includes(memberSearch.toLowerCase())
                );

                return (
                  <div className="space-y-3">
                    <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                            {court.name} ({court.acronym})
                          </h3>
                          <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">
                            Cúpula da Justiça Eleitoral • {court.seat}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold">
                          {court.totalMinisters} Ministros Titulares
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                        {court.role}
                      </p>
                      <div className="p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        <strong className="text-zinc-900 dark:text-zinc-200">Regra Constitucional de Composição:</strong> {court.compositionRule}
                      </div>
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Buscar ministro do TSE..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filtered.map(m => (
                        <div
                          key={m.name}
                          className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-start gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs"
                        >
                          {m.photoUrl ? (
                            <img
                              src={m.photoUrl}
                              alt={m.name}
                              className="w-14 h-18 sm:w-16 sm:h-20 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center shrink-0 text-zinc-600 dark:text-zinc-400 font-bold text-xs">
                              <Scale className="w-4 h-4 mb-0.5 opacity-60" />
                              <span>{m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-1 mb-0.5">
                              <h4 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white leading-tight truncate">
                                {m.name}
                              </h4>
                              <span className="text-xs px-1.5 py-0.2 rounded font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
                                {m.role}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 block font-medium">
                              Vaga: {m.origin}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                              {m.appointedBy} ({m.startYear})
                            </span>
                            {m.notes && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                                {m.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* TRIBUNAL SELECIONADO: TST */}
              {selectedCourt === 'TST' && (() => {
                const court = federalData.judiciary.superiorCourts.find(c => c.acronym === 'TST');
                if (!court) return null;

                const filtered = court.members.filter(m =>
                  !memberSearch ||
                  m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  m.role?.toLowerCase().includes(memberSearch.toLowerCase()) ||
                  m.origin?.toLowerCase().includes(memberSearch.toLowerCase())
                );

                return (
                  <div className="space-y-3">
                    <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                            {court.name} ({court.acronym})
                          </h3>
                          <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">
                            Cúpula da Justiça do Trabalho • {court.seat}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold">
                          {court.totalMinisters} Ministros
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                        {court.role}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-3 text-xs">
                        <div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Presidente do TST</span>
                          <strong className="text-zinc-950 dark:text-white font-semibold">{court.presidentName}</strong>
                        </div>
                        <div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Vice-Presidente do TST</span>
                          <strong className="text-zinc-950 dark:text-white font-semibold">{court.vicePresidentName}</strong>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        <strong className="text-zinc-900 dark:text-zinc-200">Regra de Composição (Quinto Constitucional + TRTs):</strong> {court.compositionRule}
                      </div>
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Buscar ministro do TST por nome ou tribunal regional de origem..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filtered.map(m => (
                        <div
                          key={m.name}
                          className="bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-zinc-950 dark:text-white truncate">
                                {m.name}
                              </h4>
                              {m.role && m.role !== 'Ministro' && m.role !== 'Ministra' && (
                                <span className="text-[9.5px] px-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold shrink-0">
                                  {m.role}
                                </span>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">
                              Posse {m.startYear} • {m.appointedBy}
                            </span>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-md font-semibold shrink-0 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                            {m.origin}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* TRIBUNAL SELECIONADO: STM */}
              {selectedCourt === 'STM' && (() => {
                const court = federalData.judiciary.superiorCourts.find(c => c.acronym === 'STM');
                if (!court) return null;

                const filtered = court.members.filter(m => {
                  const matchCat = stmFilter === 'TODOS' || m.category === stmFilter;
                  const matchSearch = !memberSearch ||
                    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                    m.role?.toLowerCase().includes(memberSearch.toLowerCase()) ||
                    m.origin?.toLowerCase().includes(memberSearch.toLowerCase());
                  return matchCat && matchSearch;
                });

                return (
                  <div className="space-y-3">
                    <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                            {court.name} ({court.acronym})
                          </h3>
                          <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">
                            Mais antigo Tribunal Superior do Brasil (criado em 1808) • {court.seat}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold">
                          {court.totalMinisters} Ministros
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                        {court.role}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-3 text-xs">
                        <div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Presidente do STM</span>
                          <strong className="text-zinc-950 dark:text-white font-semibold">{court.presidentName}</strong>
                        </div>
                        <div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Vice-Presidente do STM</span>
                          <strong className="text-zinc-950 dark:text-white font-semibold">{court.vicePresidentName}</strong>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        <strong className="text-zinc-900 dark:text-zinc-200">Regra Constitucional das Três Forças e Civis:</strong> {court.compositionRule}
                      </div>
                    </div>

                    {/* Filtros por Força / Civis */}
                    <div className="space-y-2">
                      <div className="flex gap-1.5 p-1 bg-zinc-100 rounded-md border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 text-xs overflow-x-auto">
                        {(['TODOS', 'Marinha', 'Exército', 'Aeronáutica', 'Civil'] as const).map(cat => (
                          <button
                            key={cat}
                            onClick={() => setStmFilter(cat)}
                            className={`flex-1 py-1 px-2 rounded transition-all text-xs font-medium whitespace-nowrap ${
                              stmFilter === cat
                                ? 'bg-white text-zinc-950 font-bold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                                : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                            }`}
                          >
                            {cat === 'TODOS' ? 'Todos (15)' : `${cat}`}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Buscar ministro do STM..."
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filtered.map(m => (
                        <div
                          key={m.name}
                          className="bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-zinc-950 dark:text-white truncate">
                                {m.name}
                              </h4>
                              {m.role && m.role !== 'Ministro' && m.role !== 'Ministra' && (
                                <span className="text-[9.5px] px-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold shrink-0">
                                  {m.role}
                                </span>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">
                              Posse {m.startYear} • {m.appointedBy}
                            </span>
                            {m.notes && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 italic mt-0.5 truncate">
                                {m.notes}
                              </p>
                            )}
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-md font-semibold shrink-0 border ${
                            m.category === 'Marinha'
                              ? 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60'
                              : m.category === 'Exército'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60'
                              : m.category === 'Aeronáutica'
                              ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-900/60'
                              : 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700'
                          }`}>
                            {m.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* TRIBUNAL SELECIONADO: CNJ */}
              {selectedCourt === 'CNJ' && (
                <div className="space-y-3">
                  <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                          {federalData.judiciary.cnj.name}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold">
                        {federalData.judiciary.cnj.totalMembers} Conselheiros
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                      {federalData.judiciary.cnj.role}
                    </p>
                    <div className="p-3 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                      <div>
                        <strong className="text-zinc-900 dark:text-zinc-200 block mb-1">Presidência do Conselho:</strong>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          É sempre exercida nativamente pelo Presidente do Supremo Tribunal Federal (atualmente {federalData.judiciary.supremeCourt.presidentName}).
                        </p>
                      </div>
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <strong className="text-zinc-900 dark:text-zinc-200 block mb-1">Composição Pluralista dos 15 Membros:</strong>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {federalData.judiciary.cnj.compositionRule}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ABA 4: FUNÇÕES ESSENCIAIS À JUSTIÇA (Art. 127 a 135 da CF/88) */}
          {federalTab === 'justica' && federalData.essentialToJustice && (
            <div className="space-y-4 animate-fade-in">
              {/* Contexto Constitucional */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <span className="text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider block mb-1">
                  {federalData.essentialToJustice.title}
                </span>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  {federalData.essentialToJustice.description}
                </p>
                <div className="p-2.5 rounded-md bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic">
                  Instituições autônomas e independentes que viabilizam o acesso à jurisdição, a defesa do Estado Democrático de Direito e a fiscalização da lei, sem subordinação a nenhum dos Três Poderes.
                </div>
              </div>

              {/* 1. Ministério Público da União (MPU) & PGR */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    {federalData.essentialToJustice.publicProsecution.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-bold">
                    Art. 127 a 130-A CF
                  </span>
                </div>

                {/* Card do Procurador-Geral da República */}
                <div className="bg-white dark:bg-zinc-900 rounded-md p-3.5 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                  {federalData.essentialToJustice.publicProsecution.headPhoto ? (
                    <img
                      src={federalData.essentialToJustice.publicProsecution.headPhoto}
                      alt={federalData.essentialToJustice.publicProsecution.headName}
                      className="w-16 h-20 sm:w-20 sm:h-24 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-md bg-purple-100 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-300 font-black text-xl shrink-0">
                      PGR
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">
                      {federalData.essentialToJustice.publicProsecution.headTitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white truncate">
                      {federalData.essentialToJustice.publicProsecution.headName}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {federalData.essentialToJustice.publicProsecution.seat}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {federalData.essentialToJustice.publicProsecution.role}
                </p>

                {/* 4 Ramos do MPU */}
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                    4 Ramos Integrantes do MPU:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {federalData.essentialToJustice.publicProsecution.branches.map((b, idx) => (
                      <div key={idx} className="bg-white dark:bg-zinc-900 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CNMP */}
                <div className="p-3 bg-purple-50/50 dark:bg-purple-950/20 rounded-md border border-purple-200 dark:border-purple-900/40 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-purple-950 dark:text-purple-300 font-bold">
                      {federalData.essentialToJustice.publicProsecution.cnmp.name}
                    </strong>
                    <span className="px-2 py-0.5 rounded bg-purple-200/80 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-semibold text-[11px]">
                      {federalData.essentialToJustice.publicProsecution.cnmp.totalMembers} Membros
                    </span>
                  </div>
                  <p className="text-purple-900/80 dark:text-purple-300/80 leading-relaxed">
                    {federalData.essentialToJustice.publicProsecution.cnmp.role} Presidido nativamente pelo Procurador-Geral da República.
                  </p>
                </div>
              </div>

              {/* 2. Advocacia Pública - AGU */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    {federalData.essentialToJustice.publicAdvocacy.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold">
                    Art. 131 CF
                  </span>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-md p-3 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">
                    {federalData.essentialToJustice.publicAdvocacy.headTitle}
                  </span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">
                    {federalData.essentialToJustice.publicAdvocacy.headName}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {federalData.essentialToJustice.publicAdvocacy.seat}
                  </p>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {federalData.essentialToJustice.publicAdvocacy.role}
                </p>
              </div>

              {/* 3. Defensoria Pública da União - DPU */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    {federalData.essentialToJustice.publicDefenders.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                    Art. 134 CF
                  </span>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-md p-3 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">
                    {federalData.essentialToJustice.publicDefenders.headTitle}
                  </span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">
                    {federalData.essentialToJustice.publicDefenders.headName}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {federalData.essentialToJustice.publicDefenders.seat}
                  </p>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {federalData.essentialToJustice.publicDefenders.role}
                </p>
              </div>

              {/* 4. Advocacia Privada & OAB */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    {federalData.essentialToJustice.privateAdvocacy.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-bold">
                    Art. 133 CF
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {federalData.essentialToJustice.privateAdvocacy.role}
                </p>
              </div>
            </div>
          )}

          {/* ABA 5: FREIOS E CONTRAPESOS */}
          {federalTab === 'equilibrio' && (
            <div className="space-y-3.5 animate-fade-in">
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  {federalData.checksAndBalances.title}
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  {federalData.checksAndBalances.description}
                </p>
                <div className="p-2.5 rounded-md bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic">
                  "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário." — Art. 2º da Constituição de 1988
                </div>
              </div>

              {/* 3 Colunas de Controles Mútuos */}
              <div className="space-y-2.5">
                {/* Executivo sobre outros */}
                <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-3.5">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs mb-1.5">
                    <Building2 className="w-3.5 h-3.5" /> Poder Executivo atua sobre:
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {federalData.checksAndBalances.executiveOnOthers.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legislativo sobre outros */}
                <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-3.5">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs mb-1.5">
                    <Users className="w-3.5 h-3.5" /> Poder Legislativo atua sobre:
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {federalData.checksAndBalances.legislativeOnOthers.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Judiciário sobre outros */}
                <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-3.5">
                  <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-bold text-xs mb-1.5">
                    <Scale className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> Poder Judiciário atua sobre:
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {federalData.checksAndBalances.judiciaryOnOthers.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-zinc-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé da Visão Federal */}
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-500 flex items-center justify-between">
          <span>Base curada nacional da República</span>
          <span>Atualizado em: <strong className="text-zinc-700 dark:text-zinc-400">{lastUpdated}</strong></span>
        </div>
      </div>
    );
  }

  // Visualização de um Estado selecionado
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 xl:p-9 shadow-md dark:bg-zinc-900/85 dark:border-zinc-800 shadow-xl backdrop-blur-md flex flex-col h-full text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Cabeçalho do Estado */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-zinc-100 border border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 flex items-center justify-center font-black text-2xl text-zinc-900 dark:text-white">
              {stateData.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">{stateData.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-transparent font-medium">
                  {stateData.region}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Capital: <strong className="text-zinc-900 dark:text-white">{stateData.capital}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenComparator && (
              <button
                onClick={onOpenComparator}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-700 text-xs font-semibold transition-colors shadow-xs"
                title={`Comparar ${stateData.name} com outro estado`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Comparar Estado</span>
                <span className="sm:hidden">Comparar</span>
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-700 text-xs font-semibold transition-colors shadow-xs"
              title={`Imprimir ou Salvar em PDF a Ficha Cívica de ${stateData.name}`}
            >
              <Printer className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
              <span className="hidden sm:inline">Ficha (PDF)</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Indicadores Rápidos */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 text-xs">
          <div className="bg-zinc-50 p-2 rounded-md text-center border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800/60">
            <span className="text-zinc-500 dark:text-zinc-400 block text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">População</span>
            <span className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">{stateData.population}</span>
          </div>
          <div className="bg-zinc-50 p-2 rounded-md text-center border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800/60">
            <span className="text-zinc-500 dark:text-zinc-400 block text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">Área</span>
            <span className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">{stateData.area}</span>
          </div>
          <div className="bg-zinc-50 p-2 rounded-md text-center border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800/60">
            <span className="text-zinc-500 dark:text-zinc-400 block text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">Municípios</span>
            <span className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">{stateData.municipalitiesCount}</span>
          </div>
        </div>
      </div>

      {/* Abas dos Três Poderes Estaduais */}
      <div className="flex gap-1.5 p-1.5 bg-zinc-100 rounded-lg mb-5 border border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 text-sm sm:text-base font-semibold">
        <button
          onClick={() => setStateTab('executivo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all ${
            stateTab === 'executivo'
              ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
          }`}
        >
          <Building2 className="w-4 h-4" /> Executivo
        </button>
        <button
          onClick={() => setStateTab('legislativo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all ${
            stateTab === 'legislativo'
              ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
          }`}
        >
          <Users className="w-4 h-4" /> Legislativo
        </button>
        <button
          onClick={() => setStateTab('judiciario')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all ${
            stateTab === 'judiciario'
              ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
          }`}
        >
          <Scale className="w-4 h-4" /> Judiciário
        </button>
      </div>

      {/* Conteúdo das Abas Estaduais */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
        {/* ABA: PODER EXECUTIVO */}
        {stateTab === 'executivo' && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-3">
                Chefia do Poder Executivo Estadual
              </span>

              {/* Governador com Foto Oficial */}
              <div className="bg-white dark:bg-zinc-900 rounded-md p-3.5 border border-zinc-200 dark:border-zinc-800 mb-2.5 flex items-center gap-3.5 shadow-xs">
                {stateData.executive.photoUrl && (
                  <img
                    src={stateData.executive.photoUrl}
                    alt={stateData.executive.governor}
                    className="w-16 h-20 sm:w-20 sm:h-25 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                    loading="lazy"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Governador(a) do Estado</span>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white truncate">{stateData.executive.governor}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 text-xs font-semibold dark:border-zinc-700">
                      Partido: {stateData.executive.party}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-400" /> {stateData.executive.mandate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vice-Governador */}
              <div className="bg-white dark:bg-zinc-900 rounded-md p-3 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Vice-Governador(a)</span>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">{stateData.executive.viceGovernor}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-300 text-xs font-medium dark:border-zinc-700/60">
                  Partido: {stateData.executive.viceParty}
                </span>
              </div>
            </div>

            {/* Sede do Governo */}
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800 rounded-lg p-3 flex items-center gap-3">
              <Landmark className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
              <div>
                <span className="text-xs sm:text-sm text-zinc-500 block">Sede Governamental Estadual</span>
                <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">{stateData.executive.seat}</span>
              </div>
            </div>

            {/* Poder Executivo Municipal da Capital */}
            {stateData.capitalCity && (
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                    Gestão Municipal da Capital — {stateData.capital}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 font-semibold">
                    Mandato {stateData.capitalCity.term}
                  </span>
                </div>

                {stateData.capitalCity.note ? (
                  <div className="p-3 rounded-md bg-amber-50 border border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900/50 dark:text-amber-200 text-xs leading-relaxed">
                    <strong>Regime Constitucional Singular:</strong> {stateData.capitalCity.note}
                  </div>
                ) : (
                  <>
                    <div className="bg-white dark:bg-zinc-900 rounded-md p-3 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Prefeito(a) da Capital</span>
                        <h4 className="text-base font-bold text-zinc-950 dark:text-white truncate">
                          {stateData.capitalCity.mayor}
                        </h4>
                        {stateData.capitalCity.viceMayor && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5 truncate">
                            Vice-Prefeito(a): <strong className="text-zinc-700 dark:text-zinc-300">{stateData.capitalCity.viceMayor}</strong>
                          </span>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60 text-xs font-bold shrink-0">
                        {stateData.capitalCity.party}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs px-1 text-zinc-600 dark:text-zinc-400">
                      <span>Câmara Municipal de {stateData.capital}:</span>
                      <strong className="text-zinc-950 dark:text-white font-semibold">
                        {stateData.capitalCity.councilorsCount} Vereadores Eleitos
                      </strong>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ABA: PODER LEGISLATIVO */}
        {stateTab === 'legislativo' && (
          <div className="space-y-3.5 animate-fade-in">
            {/* Senadores da República (3) */}
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                    Senadores Federais (Representação no Congresso)
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">3 Cadeiras por Estado da Federação</span>
                </div>

                <button
                  onClick={handleLoadSenators}
                  disabled={loadingSenators}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-700 disabled:opacity-50 dark:text-zinc-200 text-xs font-semibold transition-all shadow-xs self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingSenators ? 'animate-spin' : ''}`} />
                  {loadingSenators ? 'Conectando...' : liveSenators ? 'Atualizado do Senado' : 'Fotos e Gabinetes ao Vivo'}
                </button>
              </div>

              {senatorsError && (
                <div className="mb-3 p-2.5 rounded-md bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-300 text-xs">
                  {senatorsError}
                </div>
              )}

              {/* Lista dos Senadores (ao vivo ou curada) */}
              {liveSenators ? (
                <div className="space-y-2.5">
                  {liveSenators.map((sen) => (
                    <div
                      key={sen.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 flex items-start sm:items-center gap-3 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs"
                    >
                      {sen.photoUrl ? (
                        <img
                          src={sen.photoUrl}
                          alt={sen.name}
                          className="w-12 h-15 rounded-md object-cover bg-zinc-100 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-12 h-15 rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
                          SF
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-zinc-950 dark:text-white truncate">
                            {sen.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 dark:bg-zinc-800 dark:text-amber-300 dark:border-zinc-700 font-bold shrink-0">
                            {sen.party}
                          </span>
                        </div>
                        <span className="text-zinc-500 dark:text-zinc-400 block truncate">
                          {sen.fullName}
                        </span>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                          {sen.email && (
                            <a
                              href={`mailto:${sen.email}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" /> {sen.email}
                            </a>
                          )}
                          {sen.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {sen.phone}
                            </span>
                          )}
                          {sen.pageUrl && (
                            <a
                              href={sen.pageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white flex items-center gap-0.5 underline font-medium"
                            >
                              Perfil Oficial <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {stateData.legislative.senators.map((senator, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-2.5 flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
                    >
                      <div>
                        <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block">Senador(a)</span>
                        <span className="font-bold text-xs sm:text-sm text-zinc-950 dark:text-white">{senator.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 dark:bg-zinc-800 dark:text-amber-300 dark:border-zinc-700 text-xs font-semibold">
                          {senator.party}
                        </span>
                        <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 block mt-0.5">
                          {senator.mandate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assembleia Legislativa Estadual */}
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                Poder Legislativo Estadual
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white mb-1">{stateData.legislative.assembly}</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Composta por <strong className="text-zinc-950 dark:text-white">{stateData.legislative.stateDeputies} Deputados Estaduais</strong> eleitos pelo povo do estado.
              </p>
            </div>

            {/* Bancada Federal na Câmara + Integração com API da Câmara */}
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                    Bancada na Câmara dos Deputados
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                    {stateData.legislative.federalDeputies} Deputados Federais
                  </span>
                </div>

                <button
                  onClick={handleLoadDeputies}
                  disabled={loadingDeputies}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-700 disabled:opacity-50 dark:text-zinc-200 text-xs font-semibold transition-all shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingDeputies ? 'animate-spin' : ''}`} />
                  {loadingDeputies ? 'Consultando...' : 'Consultar Deputados ao Vivo'}
                </button>
              </div>

              {deputiesError && (
                <div className="mt-3 p-2.5 rounded-md bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-300 text-xs">
                  {deputiesError}
                </div>
              )}

              {/* Lista ao vivo retornada pela API da Câmara */}
              {liveDeputies && (
                <div className="mt-3.5 pt-3.5 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" /> {liveDeputies.length} Deputados carregados da API Oficial:
                    </span>
                    <button
                      onClick={() => setShowDeputiesList(!showDeputiesList)}
                      className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-1"
                    >
                      {showDeputiesList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {showDeputiesList ? 'Recolher' : 'Expandir'}
                    </button>
                  </div>

                  {showDeputiesList && (
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {liveDeputies.map((dep) => (
                        <div
                          key={dep.id}
                          className="bg-white dark:bg-zinc-900 p-2 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center gap-2.5 text-xs shadow-xs"
                        >
                          <img
                            src={dep.urlFoto}
                            alt={dep.nome}
                            className="w-8 h-10 rounded object-cover bg-zinc-100 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 shrink-0"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-zinc-900 dark:text-white block truncate">{dep.nome}</span>
                            <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                              Partido: <strong className="text-zinc-800 dark:text-zinc-200">{dep.siglaPartido}</strong> • {dep.siglaUf}
                            </span>
                            {dep.email && (
                              <span className="text-xs text-blue-600 dark:text-zinc-400 block truncate">{dep.email}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA: PODER JUDICIÁRIO */}
        {stateTab === 'judiciario' && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                Justiça Estadual
              </span>
              <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white mb-2">{stateData.judiciary.court}</h3>
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 dark:text-zinc-500">Jurisdição:</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{stateData.judiciary.jurisdiction}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 dark:text-zinc-500">Sede:</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{stateData.judiciary.seat}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-300 font-semibold mb-1">
                <Scale className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> Competência do TJ
              </div>
              O Tribunal de Justiça é a instância máxima do Poder Judiciário em âmbito estadual, julgando recursos das comarcas de primeira instância e matérias de competência originária do estado.
            </div>

            {/* Funções Essenciais à Justiça no Estado */}
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 space-y-2.5">
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                Funções Essenciais à Justiça em {stateData.name}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="font-bold text-zinc-950 dark:text-white block">Ministério Público Estadual</span>
                  <span className="text-zinc-500 dark:text-zinc-400">MP{stateData.id} • Procuradoria-Geral de Justiça</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="font-bold text-zinc-950 dark:text-white block">Defensoria Pública Estadual</span>
                  <span className="text-zinc-500 dark:text-zinc-400">DPE-{stateData.id} • Assistência Jurídica Gratuita</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="font-bold text-zinc-950 dark:text-white block">Advocacia Pública do Estado</span>
                  <span className="text-zinc-500 dark:text-zinc-400">PGE-{stateData.id} • Procuradoria-Geral do Estado</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="font-bold text-zinc-950 dark:text-white block">Ordem dos Advogados do Brasil</span>
                  <span className="text-zinc-500 dark:text-zinc-400">OAB/{stateData.id} • Seccional Estadual</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé com Metadados e Sincronização */}
      <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-500 flex flex-wrap items-center justify-between gap-2">
        <span>Base curada: Legislatura 2023–2026/2031</span>
        <span className="flex items-center gap-1">
          Última checagem: <strong className="text-zinc-700 dark:text-zinc-400">{lastUpdated}</strong>
        </span>
      </div>
    </div>
  );
};
