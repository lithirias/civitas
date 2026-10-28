import React, { useState } from 'react';
import { X, ArrowRightLeft, MapPin, Building2, Users, Scale, ExternalLink } from 'lucide-react';
import { BrazilDataset } from '../types';

interface StateComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: BrazilDataset;
  initialStateAId?: string;
  initialStateBId?: string;
  onSelectState: (stateId: string) => void;
}

export const StateComparatorModal: React.FC<StateComparatorModalProps> = ({
  isOpen,
  onClose,
  dataset,
  initialStateAId = 'SP',
  initialStateBId = 'RJ',
  onSelectState
}) => {
  const [stateAId, setStateAId] = useState<string>(initialStateAId || 'SP');
  const [stateBId, setStateBId] = useState<string>(initialStateBId || 'RJ');

  if (!isOpen) return null;

  const statesList = Object.values(dataset.states).sort((a, b) => a.name.localeCompare(b.name));
  const stateA = dataset.states[stateAId] || dataset.states['SP'];
  const stateB = dataset.states[stateBId] || dataset.states['RJ'];

  const handleSwap = () => {
    setStateAId(stateBId);
    setStateBId(stateAId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in transition-colors">
      <div className="bg-white border border-zinc-200 rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl relative text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 transition-colors">
        {/* Cabeçalho do Modal */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
              <ArrowRightLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white">
                Comparador Federativo de Estados
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Análise comparativa lado a lado entre duas Unidades Federativas do Brasil
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Seletores dos 2 Estados */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Seletor Estado A */}
          <div className="w-full sm:flex-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
              Primeiro Estado:
            </label>
            <select
              value={stateAId}
              onChange={(e) => setStateAId(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm font-bold text-zinc-900 dark:text-white shadow-xs focus:outline-none"
            >
              {statesList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.id}) • Região {s.region}
                </option>
              ))}
            </select>
          </div>

          {/* Botão de Inverter */}
          <button
            onClick={handleSwap}
            className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white shadow-xs transition-colors shrink-0"
            title="Inverter lados"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* Seletor Estado B */}
          <div className="w-full sm:flex-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
              Segundo Estado:
            </label>
            <select
              value={stateBId}
              onChange={(e) => setStateBId(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm font-bold text-zinc-900 dark:text-white shadow-xs focus:outline-none"
            >
              {statesList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.id}) • Região {s.region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade Comparativa Lado a Lado */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          {/* Cabeçalho dos 2 Estados */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            {/* Estado A */}
            <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">{stateA.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold">{stateA.id}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Capital: {stateA.capital} • Região {stateA.region}</p>
              </div>
              <button
                onClick={() => {
                  onSelectState(stateA.id);
                  onClose();
                }}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Abrir <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Estado B */}
            <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">{stateB.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold">{stateB.id}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Capital: {stateB.capital} • Região {stateB.region}</p>
              </div>
              <button
                onClick={() => {
                  onSelectState(stateB.id);
                  onClose();
                }}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Abrir <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* SEÇÃO 1: DADOS GERAIS & DEMOGRAFIA */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Geografia & Demografia (IBGE)
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-zinc-500">População Estimada:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateA.population}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-zinc-500">Área Territorial:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateA.area}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Nº de Municípios:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateA.municipalitiesCount}</strong>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-zinc-500">População Estimada:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateB.population}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-zinc-500">Área Territorial:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateB.area}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Nº de Municípios:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateB.municipalitiesCount}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: PODER EXECUTIVO ESTADUAL */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Poder Executivo Estadual
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Governador(a):</span>
                    <strong className="text-sm font-bold text-zinc-950 dark:text-white">{stateA.executive.governor}</strong>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs">
                    {stateA.executive.party}
                  </span>
                </div>
                <div className="text-zinc-500 text-[11px] pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  Vice: <strong className="text-zinc-700 dark:text-zinc-300">{stateA.executive.viceGovernor} ({stateA.executive.viceParty})</strong>
                </div>
                <div className="text-zinc-500 text-[11px]">
                  Sede: <strong className="text-zinc-700 dark:text-zinc-300">{stateA.executive.seat}</strong>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Governador(a):</span>
                    <strong className="text-sm font-bold text-zinc-950 dark:text-white">{stateB.executive.governor}</strong>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs">
                    {stateB.executive.party}
                  </span>
                </div>
                <div className="text-zinc-500 text-[11px] pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  Vice: <strong className="text-zinc-700 dark:text-zinc-300">{stateB.executive.viceGovernor} ({stateB.executive.viceParty})</strong>
                </div>
                <div className="text-zinc-500 text-[11px]">
                  Sede: <strong className="text-zinc-700 dark:text-zinc-300">{stateB.executive.seat}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: GESTÃO MUNICIPAL DA CAPITAL */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Executivo Municipal da Capital (2025–2028)
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                {stateA.capitalCity ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 block text-[11px]">Prefeito(a) de {stateA.capital}:</span>
                        <strong className="text-sm font-bold text-zinc-950 dark:text-white">{stateA.capitalCity.mayor}</strong>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 font-bold text-xs">
                        {stateA.capitalCity.party}
                      </span>
                    </div>
                    {stateA.capitalCity.councilorsCount > 0 && (
                      <p className="text-zinc-500 text-[11px] pt-1">
                        Câmara Municipal: <strong>{stateA.capitalCity.councilorsCount} Vereadores</strong>
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-zinc-400 italic">Não disponível</span>
                )}
              </div>

              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                {stateB.capitalCity ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 block text-[11px]">Prefeito(a) de {stateB.capital}:</span>
                        <strong className="text-sm font-bold text-zinc-950 dark:text-white">{stateB.capitalCity.mayor}</strong>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 font-bold text-xs">
                        {stateB.capitalCity.party}
                      </span>
                    </div>
                    {stateB.capitalCity.councilorsCount > 0 && (
                      <p className="text-zinc-500 text-[11px] pt-1">
                        Câmara Municipal: <strong>{stateB.capitalCity.councilorsCount} Vereadores</strong>
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-zinc-400 italic">Não disponível</span>
                )}
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: PODER LEGISLATIVO & BANCADA FEDERAL */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Poder Legislativo (Estadual & Congresso Nacional)
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Deputados Estaduais:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateA.legislative.stateDeputies} cadeiras</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Câmara dos Deputados:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{stateA.legislative.federalDeputies} Deputados Federais</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">3 Senadores da República:</span>
                  <div className="space-y-1">
                    {stateA.legislative.senators.map((s, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{s.name}</span>
                        <span className="text-zinc-500">({s.party})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Deputados Estaduais:</span>
                  <strong className="text-zinc-950 dark:text-white">{stateB.legislative.stateDeputies} cadeiras</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Câmara dos Deputados:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{stateB.legislative.federalDeputies} Deputados Federais</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">3 Senadores da República:</span>
                  <div className="space-y-1">
                    {stateB.legislative.senators.map((s, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{s.name}</span>
                        <span className="text-zinc-500">({s.party})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 5: PODER JUDICIÁRIO */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" /> Poder Judiciário Estadual
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
                <strong className="text-zinc-950 dark:text-white block font-semibold">{stateA.judiciary.court}</strong>
                <span className="text-zinc-500 text-[11px]">Sede: {stateA.judiciary.seat}</span>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
                <strong className="text-zinc-950 dark:text-white block font-semibold">{stateB.judiciary.court}</strong>
                <span className="text-zinc-500 text-[11px]">Sede: {stateB.judiciary.seat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            Comparação direta baseada na Constituição de 1988 e registros eleitorais vigentes.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-semibold transition-colors shadow-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
