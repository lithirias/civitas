import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  Building2, 
  Scale, 
  Users, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  RefreshCw, 
  Sparkles,
  ChevronDown,
  ChevronUp
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
  const [activeTab, setActiveTab] = useState<'executivo' | 'legislativo' | 'judiciario'>('executivo');
  
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

  // Se nenhum estado estiver selecionado, exibe a estrutura da União Federal
  if (!stateData) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl backdrop-blur-md flex flex-col h-full text-slate-100">
        <div className="border-b border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Landmark className="w-4 h-4" /> Nível Nacional
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {federalData.name}
          </h2>
          <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500" /> Capital Federal: Brasília - DF
          </p>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-1">
          {/* Poder Executivo Federal */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
              <Building2 className="w-4 h-4" /> Poder Executivo Federal
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800">
                <span className="text-xs text-slate-400 block">Presidente da República</span>
                <span className="font-bold text-white text-base block">{federalData.executive.president}</span>
                <span className="text-xs text-emerald-400 font-medium">Partido: {federalData.executive.party}</span>
              </div>
              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800">
                <span className="text-xs text-slate-400 block">Vice-Presidente</span>
                <span className="font-bold text-white text-base block">{federalData.executive.vicePresident}</span>
                <span className="text-xs text-emerald-400 font-medium">Partido: {federalData.executive.viceParty}</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>Sede:</strong> {federalData.executive.seat}</span>
              <span><strong>Mandato:</strong> {federalData.executive.mandate}</span>
            </div>
          </div>

          {/* Poder Legislativo Federal */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-3">
              <Users className="w-4 h-4" /> Poder Legislativo Federal (Congresso Nacional)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800">
                <span className="text-xs text-slate-400 block">Câmara dos Deputados</span>
                <span className="font-bold text-white text-base block">{federalData.legislative.chamberOfDeputies.totalDeputies} Deputados Federais</span>
                <span className="text-xs text-slate-400">Representação proporcional da população</span>
              </div>
              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800">
                <span className="text-xs text-slate-400 block">Senado Federal</span>
                <span className="font-bold text-white text-base block">{federalData.legislative.federalSenate.totalSenators} Senadores</span>
                <span className="text-xs text-slate-400">3 senadores por estado e DF</span>
              </div>
            </div>
          </div>

          {/* Poder Judiciário Federal */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-3">
              <Scale className="w-4 h-4" /> Poder Judiciário Federal
            </div>
            <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800">
              <span className="text-xs text-slate-400 block">Cúpula Constitucional</span>
              <span className="font-bold text-white text-base block">{federalData.judiciary.supremeCourt}</span>
              <span className="text-xs text-slate-400 block mt-1">Composto por {federalData.judiciary.totalMinisters} Ministros indicados pelo Presidente e sabatinados pelo Senado.</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>Base curada nacional</span>
          <span>Atualizado em: {lastUpdated}</span>
        </div>
      </div>
    );
  }

  // Visualização de um Estado selecionado
  return (
    <div className="bg-slate-900/85 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col h-full text-slate-100">
      {/* Cabeçalho do Estado */}
      <div className="border-b border-slate-800 pb-5 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-black text-xl text-blue-400">
              {stateData.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{stateData.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                  {stateData.region}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Capital: <strong className="text-white">{stateData.capital}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Indicadores Rápidos */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/60 text-xs">
          <div className="bg-slate-950/40 p-2 rounded-lg text-center">
            <span className="text-slate-400 block text-[11px]">População</span>
            <span className="font-semibold text-slate-200">{stateData.population}</span>
          </div>
          <div className="bg-slate-950/40 p-2 rounded-lg text-center">
            <span className="text-slate-400 block text-[11px]">Área</span>
            <span className="font-semibold text-slate-200">{stateData.area}</span>
          </div>
          <div className="bg-slate-950/40 p-2 rounded-lg text-center">
            <span className="text-slate-400 block text-[11px]">Municípios</span>
            <span className="font-semibold text-slate-200">{stateData.municipalitiesCount}</span>
          </div>
        </div>
      </div>

      {/* Abas dos Três Poderes */}
      <div className="flex gap-2 p-1 bg-slate-950/80 rounded-xl mb-5 border border-slate-800 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('executivo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
            activeTab === 'executivo'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Building2 className="w-4 h-4" /> Executivo
        </button>
        <button
          onClick={() => setActiveTab('legislativo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
            activeTab === 'legislativo'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Users className="w-4 h-4" /> Legislativo
        </button>
        <button
          onClick={() => setActiveTab('judiciario')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
            activeTab === 'judiciario'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Scale className="w-4 h-4" /> Judiciário
        </button>
      </div>

      {/* Conteúdo das Abas */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {/* ABA: PODER EXECUTIVO */}
        {activeTab === 'executivo' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-3">
                Chefia do Poder Executivo Estadual
              </span>

              {/* Governador */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 mb-3 flex items-start justify-between">
                <div>
                  <span className="text-xs text-slate-400">Governador(a)</span>
                  <h3 className="text-lg font-bold text-white">{stateData.executive.governor}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 text-xs font-semibold border border-blue-700/50">
                      Partido: {stateData.executive.party}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {stateData.executive.mandate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vice-Governador */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                <span className="text-xs text-slate-400">Vice-Governador(a)</span>
                <h3 className="text-base font-bold text-white">{stateData.executive.viceGovernor}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                  Partido: {stateData.executive.viceParty}
                </span>
              </div>
            </div>

            {/* Sede do Governo */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
              <Landmark className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block">Sede Governamental</span>
                <span className="text-sm font-medium text-slate-200">{stateData.executive.seat}</span>
              </div>
            </div>
          </div>
        )}

        {/* ABA: PODER LEGISLATIVO */}
        {activeTab === 'legislativo' && (
          <div className="space-y-4 animate-fade-in">
            {/* Senadores da República (3) */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                  Senadores Federais (Representação do Estado)
                </span>
                <span className="text-[11px] text-slate-400 font-medium">3 Cadeiras no Senado</span>
              </div>

              <div className="space-y-2">
                {stateData.legislative.senators.map((senator, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-3 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <span className="text-xs text-slate-400 block">Senador(a)</span>
                      <span className="font-bold text-sm text-white">{senator.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-800/50 text-xs font-semibold">
                        {senator.party}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Mandato: {senator.mandate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assembleia Legislativa Estadual */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2">
                Poder Legislativo Estadual
              </span>
              <h4 className="text-sm font-bold text-white mb-1">{stateData.legislative.assembly}</h4>
              <p className="text-xs text-slate-400">
                Composta por <strong className="text-white">{stateData.legislative.stateDeputies} Deputados Estaduais</strong> eleitos pelo povo do estado.
              </p>
            </div>

            {/* Bancada Federal na Câmara + Integração com API da Câmara */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                    Bancada na Câmara dos Deputados
                  </span>
                  <span className="text-sm font-bold text-white">
                    {stateData.legislative.federalDeputies} Deputados Federais
                  </span>
                </div>

                <button
                  onClick={handleLoadDeputies}
                  disabled={loadingDeputies}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingDeputies ? 'animate-spin' : ''}`} />
                  {loadingDeputies ? 'Consultando API...' : 'Consultar Deputados ao Vivo'}
                </button>
              </div>

              {deputiesError && (
                <div className="mt-3 p-2.5 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs">
                  {deputiesError}
                </div>
              )}

              {/* Lista ao vivo retornada pela API da Câmara */}
              {liveDeputies && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> {liveDeputies.length} Deputados carregados da API Oficial:
                    </span>
                    <button
                      onClick={() => setShowDeputiesList(!showDeputiesList)}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
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
                          className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center gap-3 text-xs"
                        >
                          <img
                            src={dep.urlFoto}
                            alt={dep.nome}
                            className="w-9 h-11 rounded object-cover bg-slate-800 border border-slate-700 shrink-0"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-white block truncate">{dep.nome}</span>
                            <span className="text-[11px] text-slate-400">
                              Partido: <strong className="text-slate-200">{dep.siglaPartido}</strong> • {dep.siglaUf}
                            </span>
                            {dep.email && (
                              <span className="text-[10px] text-blue-400 block truncate">{dep.email}</span>
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
        {activeTab === 'judiciario' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2">
                Justiça Estadual
              </span>
              <h3 className="text-base font-bold text-white mb-2">{stateData.judiciary.court}</h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Jurisdição:</span>
                  <span className="font-medium text-slate-200">{stateData.judiciary.jurisdiction}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Sede:</span>
                  <span className="font-medium text-slate-200">{stateData.judiciary.seat}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
                <Scale className="w-4 h-4 text-blue-400" /> Competência do TJ
              </div>
              O Tribunal de Justiça é a instância máxima do Poder Judiciário em âmbito estadual, julgando recursos das comarcas de primeira instância e matérias de competência originária do estado.
            </div>
          </div>
        )}
      </div>

      {/* Rodapé com Metadados e Sincronização */}
      <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Base curada: Legislatura 2023–2026/2031</span>
        <span className="flex items-center gap-1">
          Última checagem: <strong className="text-slate-400">{lastUpdated}</strong>
        </span>
      </div>
    </div>
  );
};
