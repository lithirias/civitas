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
  ShieldCheck
} from 'lucide-react';
import { StateData, FederalStructure, FederalDeputy } from '../types';
import { fetchDeputiesByState } from '../services/camaraApi';

interface GovernmentPanelProps {
  stateData: StateData | null;
  federalData: FederalStructure;
  lastUpdated: string;
}

export const GovernmentPanel: React.FC<GovernmentPanelProps> = ({
  stateData,
  federalData,
  lastUpdated
}) => {
  // Abas para a visão de Estado
  const [stateTab, setStateTab] = useState<'executivo' | 'legislativo' | 'judiciario'>('executivo');
  
  // Abas para a visão Federal
  const [federalTab, setFederalTab] = useState<'executivo' | 'legislativo' | 'judiciario' | 'equilibrio'>('executivo');

  // Estado para carregar deputados federais via API da Câmara
  const [loadingDeputies, setLoadingDeputies] = useState<boolean>(false);
  const [liveDeputies, setLiveDeputies] = useState<FederalDeputy[] | null>(null);
  const [deputiesError, setDeputiesError] = useState<string | null>(null);
  const [showDeputiesList, setShowDeputiesList] = useState<boolean>(false);

  // Limpa os deputados ao trocar de estado
  useEffect(() => {
    setLiveDeputies(null);
    setDeputiesError(null);
    setShowDeputiesList(false);
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

  // Se nenhum estado estiver selecionado, exibe a estrutura aprofundada da União Federal
  if (!stateData) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl p-5 sm:p-6 shadow-md dark:bg-zinc-900/85 dark:border-zinc-800 shadow-xl backdrop-blur-md flex flex-col h-full text-zinc-900 dark:text-zinc-100 transition-colors">
        {/* Cabeçalho Federal */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            <Landmark className="w-3.5 h-3.5" /> Governo Federal da União
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            {federalData.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> Capital Federal: <strong className="text-zinc-900 dark:text-white">{federalData.capital}</strong>
          </p>
        </div>

        {/* Abas da Estrutura Federal */}
        <div className="flex gap-1 p-1 bg-zinc-100 rounded-lg mb-4 border border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 text-xs sm:text-sm font-medium overflow-x-auto">
          <button
            onClick={() => setFederalTab('executivo')}
            className={`flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-all ${
              federalTab === 'executivo'
                ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Executivo
          </button>
          <button
            onClick={() => setFederalTab('legislativo')}
            className={`flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-all ${
              federalTab === 'legislativo'
                ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Legislativo
          </button>
          <button
            onClick={() => setFederalTab('judiciario')}
            className={`flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-all ${
              federalTab === 'judiciario'
                ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Judiciário
          </button>
          <button
            onClick={() => setFederalTab('equilibrio')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-all ${
              federalTab === 'equilibrio'
                ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" /> Freios & Contrapesos
          </button>
        </div>

        {/* Conteúdo das Abas Federais */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
          {/* ABA 1: EXECUTIVO FEDERAL */}
          {federalTab === 'executivo' && (
            <div className="space-y-3.5 animate-fade-in">
              {/* Presidência e Vice com fotos oficiais */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-3">
                  Chefia de Estado e de Governo
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {/* Card Presidente */}
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-3 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3">
                    {federalData.executive.presidentPhoto && (
                      <img
                        src={federalData.executive.presidentPhoto}
                        alt={federalData.executive.president}
                        className="w-13 h-16 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Presidente da República</span>
                      <span className="font-bold text-zinc-950 dark:text-white text-sm sm:text-base block truncate">{federalData.executive.president}</span>
                      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Partido: {federalData.executive.party}</span>
                    </div>
                  </div>

                  {/* Card Vice-Presidente */}
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-3 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3">
                    {federalData.executive.vicePhoto && (
                      <img
                        src={federalData.executive.vicePhoto}
                        alt={federalData.executive.vicePresident}
                        className="w-13 h-16 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Vice-Presidente</span>
                      <span className="font-bold text-zinc-950 dark:text-white text-sm sm:text-base block truncate">{federalData.executive.vicePresident}</span>
                      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Partido: {federalData.executive.viceParty}</span>
                    </div>
                  </div>
                </div>

                {/* Sedes e Palácios */}
                <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
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
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                    Ministérios da União
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {federalData.executive.ministriesCount} Pastas Ministeriais
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
                  Os Ministros de Estado são escolhidos livremente pelo Presidente da República para coordenar a administração pública federal.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {federalData.executive.keyMinistries.map((min, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-xs">
                      <strong className="text-zinc-900 dark:text-white block mb-0.5">{min.name}</strong>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight block">{min.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atribuições Constitucionais */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Competências Constitucionais (Art. 84 CF)
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
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
            <div className="space-y-3.5 animate-fade-in">
              {/* O Sistema Bicameral */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  {federalData.legislative.nationalCongress}
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {federalData.legislative.bicameralSystemDescription}
                </p>
              </div>

              {/* Comparativo Câmara dos Deputados vs Senado Federal com Fotos dos Presidentes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Câmara dos Deputados */}
                <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-zinc-950 dark:text-white">Câmara dos Deputados</h4>
                      <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 text-xs font-bold">
                        {federalData.legislative.chamberOfDeputies.totalDeputies} Cadeiras
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mb-2">
                      Mandato de <strong>{federalData.legislative.chamberOfDeputies.mandateYears} anos</strong> • {federalData.legislative.chamberOfDeputies.criteria}
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1 uppercase tracking-wide">
                      Funções Privativas:
                    </span>
                    <ul className="space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400 mb-3">
                      {federalData.legislative.chamberOfDeputies.roles.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Presidente da Câmara com Foto */}
                  {federalData.legislative.chamberOfDeputies.presidentName && (
                    <div className="flex items-center gap-2.5 pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
                      {federalData.legislative.chamberOfDeputies.presidentPhoto && (
                        <img
                          src={federalData.legislative.chamberOfDeputies.presidentPhoto}
                          alt={federalData.legislative.chamberOfDeputies.presidentName}
                          className="w-9 h-11 rounded object-cover border border-zinc-300 dark:border-zinc-700 shrink-0"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0">
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Presidente da Câmara</span>
                        <span className="text-xs font-bold text-zinc-950 dark:text-white truncate block">{federalData.legislative.chamberOfDeputies.presidentName}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Senado Federal */}
                <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-zinc-950 dark:text-white">Senado Federal</h4>
                      <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 text-xs font-bold">
                        {federalData.legislative.federalSenate.totalSenators} Cadeiras
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mb-2">
                      Mandato de <strong>{federalData.legislative.federalSenate.mandateYears} anos</strong> • {federalData.legislative.federalSenate.criteria}
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1 uppercase tracking-wide">
                      Funções Privativas:
                    </span>
                    <ul className="space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400 mb-3">
                      {federalData.legislative.federalSenate.roles.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Presidente do Senado com Foto */}
                  {federalData.legislative.federalSenate.presidentName && (
                    <div className="flex items-center gap-2.5 pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
                      {federalData.legislative.federalSenate.presidentPhoto && (
                        <img
                          src={federalData.legislative.federalSenate.presidentPhoto}
                          alt={federalData.legislative.federalSenate.presidentName}
                          className="w-9 h-11 rounded object-cover border border-zinc-300 dark:border-zinc-700 shrink-0"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0">
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Presidente do Senado e do Congresso</span>
                        <span className="text-xs font-bold text-zinc-950 dark:text-white truncate block">{federalData.legislative.federalSenate.presidentName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Órgão Auxiliar: TCU */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-3.5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs text-zinc-900 dark:text-white">{federalData.legislative.externalControl.name}</strong>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {federalData.legislative.externalControl.totalMinisters} Ministros
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {federalData.legislative.externalControl.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: JUDICIÁRIO FEDERAL */}
          {federalTab === 'judiciario' && (
            <div className="space-y-3.5 animate-fade-in">
              {/* STF com Foto do Presidente */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                    <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                      {federalData.judiciary.supremeCourt.name}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold">
                    {federalData.judiciary.supremeCourt.totalMinisters} Ministros
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2.5">
                  {federalData.judiciary.supremeCourt.role}
                </p>

                {/* Presidente do STF com Foto */}
                {federalData.judiciary.supremeCourt.presidentName && (
                  <div className="flex items-center gap-3 p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs mb-2.5">
                    {federalData.judiciary.supremeCourt.presidentPhoto && (
                      <img
                        src={federalData.judiciary.supremeCourt.presidentPhoto}
                        alt={federalData.judiciary.supremeCourt.presidentName}
                        className="w-10 h-13 rounded object-cover border border-zinc-300 dark:border-zinc-700 shrink-0"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0">
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Presidente do STF e do CNJ</span>
                      <strong className="text-xs font-bold text-zinc-950 dark:text-white block truncate">{federalData.judiciary.supremeCourt.presidentName}</strong>
                    </div>
                  </div>
                )}

                <div className="p-2.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <strong>Critério de Nomeação:</strong> {federalData.judiciary.supremeCourt.appointmentCriteria}
                </div>
              </div>

              {/* Tribunais Superiores */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2.5">
                  Tribunais Superiores Infraconstitucionais
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {federalData.judiciary.superiorCourts.map((court) => (
                    <div key={court.acronym} className="bg-white dark:bg-zinc-900 p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-xs">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-zinc-900 dark:text-white font-bold">{court.acronym}</strong>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{court.totalMinisters} Ministros</span>
                      </div>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block leading-tight">{court.name}</span>
                      <p className="text-[10.5px] text-zinc-600 dark:text-zinc-400 mt-1.5 leading-snug">{court.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CNJ */}
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-3.5 flex items-start gap-3">
                <Scale className="w-5 h-5 text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs text-zinc-900 dark:text-white">{federalData.judiciary.cnj.name}</strong>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {federalData.judiciary.cnj.totalMembers} Conselheiros
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {federalData.judiciary.cnj.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: FREIOS E CONTRAPESOS */}
          {federalTab === 'equilibrio' && (
            <div className="space-y-3.5 animate-fade-in">
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  {federalData.checksAndBalances.title}
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  {federalData.checksAndBalances.description}
                </p>
                <div className="p-2.5 rounded-md bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300 italic">
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
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
          <span>Base curada nacional da República</span>
          <span>Atualizado em: <strong className="text-zinc-700 dark:text-zinc-400">{lastUpdated}</strong></span>
        </div>
      </div>
    );
  }

  // Visualização de um Estado selecionado
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 sm:p-6 shadow-md dark:bg-zinc-900/85 dark:border-zinc-800 shadow-xl backdrop-blur-md flex flex-col h-full text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Cabeçalho do Estado */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-zinc-100 border border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 flex items-center justify-center font-black text-xl text-zinc-900 dark:text-white">
              {stateData.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">{stateData.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-transparent font-medium">
                  {stateData.region}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Capital: <strong className="text-zinc-900 dark:text-white">{stateData.capital}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Indicadores Rápidos */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 text-xs">
          <div className="bg-zinc-50 p-2 rounded-md text-center border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800/60">
            <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">População</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">{stateData.population}</span>
          </div>
          <div className="bg-zinc-50 p-2 rounded-md text-center border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800/60">
            <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Área</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">{stateData.area}</span>
          </div>
          <div className="bg-zinc-50 p-2 rounded-md text-center border border-zinc-200 dark:bg-zinc-950/50 dark:border-zinc-800/60">
            <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Municípios</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">{stateData.municipalitiesCount}</span>
          </div>
        </div>
      </div>

      {/* Abas dos Três Poderes Estaduais */}
      <div className="flex gap-1.5 p-1 bg-zinc-100 rounded-lg mb-4 border border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setStateTab('executivo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all ${
            stateTab === 'executivo'
              ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
          }`}
        >
          <Building2 className="w-4 h-4" /> Executivo
        </button>
        <button
          onClick={() => setStateTab('legislativo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all ${
            stateTab === 'legislativo'
              ? 'bg-white text-zinc-950 font-semibold shadow-xs border border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
          }`}
        >
          <Users className="w-4 h-4" /> Legislativo
        </button>
        <button
          onClick={() => setStateTab('judiciario')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all ${
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
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-3">
                Chefia do Poder Executivo Estadual
              </span>

              {/* Governador com Foto Oficial */}
              <div className="bg-white dark:bg-zinc-900 rounded-md p-3.5 border border-zinc-200 dark:border-zinc-800 mb-2.5 flex items-center gap-3.5 shadow-xs">
                {stateData.executive.photoUrl && (
                  <img
                    src={stateData.executive.photoUrl}
                    alt={stateData.executive.governor}
                    className="w-13 h-17 rounded-md object-cover bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shrink-0 shadow-xs"
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
                <span className="text-[11px] text-zinc-500 block">Sede Governamental</span>
                <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">{stateData.executive.seat}</span>
              </div>
            </div>
          </div>
        )}

        {/* ABA: PODER LEGISLATIVO */}
        {stateTab === 'legislativo' && (
          <div className="space-y-3.5 animate-fade-in">
            {/* Senadores da República (3) */}
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Senadores Federais (Representação no Congresso)
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">3 Cadeiras</span>
              </div>

              <div className="space-y-2">
                {stateData.legislative.senators.map((senator, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-2.5 flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
                  >
                    <div>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Senador(a)</span>
                      <span className="font-bold text-xs sm:text-sm text-zinc-950 dark:text-white">{senator.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 dark:bg-zinc-800 dark:text-amber-300 dark:border-zinc-700 text-xs font-semibold">
                        {senator.party}
                      </span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                        {senator.mandate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assembleia Legislativa Estadual */}
            <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950/70 dark:border-zinc-800 rounded-lg p-4">
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
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
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
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
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                              Partido: <strong className="text-zinc-800 dark:text-zinc-200">{dep.siglaPartido}</strong> • {dep.siglaUf}
                            </span>
                            {dep.email && (
                              <span className="text-[10px] text-blue-600 dark:text-zinc-400 block truncate">{dep.email}</span>
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
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
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
          </div>
        )}
      </div>

      {/* Rodapé com Metadados e Sincronização */}
      <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 flex flex-wrap items-center justify-between gap-2">
        <span>Base curada: Legislatura 2023–2026/2031</span>
        <span className="flex items-center gap-1">
          Última checagem: <strong className="text-zinc-700 dark:text-zinc-400">{lastUpdated}</strong>
        </span>
      </div>
    </div>
  );
};
