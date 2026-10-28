import React, { useState, useMemo } from 'react';
import { X, BarChart3, Users, Building2, MapPin, Award, Scale, PieChart } from 'lucide-react';
import { BrazilDataset } from '../types';

interface CivicAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: BrazilDataset;
}

type AnalyticsTab = 'partidos' | 'regioes' | 'genero';
type PartyScope = 'governadores' | 'senadores' | 'prefeitos';

export const CivicAnalyticsModal: React.FC<CivicAnalyticsModalProps> = ({
  isOpen,
  onClose,
  dataset
}) => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('partidos');
  const [partyScope, setPartyScope] = useState<PartyScope>('governadores');

  const states = useMemo(() => Object.values(dataset.states), [dataset.states]);

  // Estatísticas Partidárias
  const partyStats = useMemo(() => {
    const govCounts: Record<string, { count: number; ufs: string[] }> = {};
    const senCounts: Record<string, { count: number; ufs: string[] }> = {};
    const mayorCounts: Record<string, { count: number; ufs: string[] }> = {};

    states.forEach((s) => {
      // Governadores
      const gParty = s.executive.party || 'Outros';
      if (!govCounts[gParty]) govCounts[gParty] = { count: 0, ufs: [] };
      govCounts[gParty].count += 1;
      govCounts[gParty].ufs.push(s.id);

      // Senadores
      s.legislative.senators.forEach((sen) => {
        const sParty = sen.party || 'Outros';
        if (!senCounts[sParty]) senCounts[sParty] = { count: 0, ufs: [] };
        senCounts[sParty].count += 1;
        if (!senCounts[sParty].ufs.includes(s.id)) senCounts[sParty].ufs.push(s.id);
      });

      // Prefeitos das Capitais
      if (s.capitalCity && s.capitalCity.councilorsCount > 0) {
        const mParty = s.capitalCity.party || 'Outros';
        if (!mayorCounts[mParty]) mayorCounts[mParty] = { count: 0, ufs: [] };
        mayorCounts[mParty].count += 1;
        mayorCounts[mParty].ufs.push(`${s.capital} (${s.id})`);
      }
    });

    const sortList = (rec: Record<string, { count: number; ufs: string[] }>) =>
      Object.entries(rec)
        .map(([party, data]) => ({ party, ...data }))
        .sort((a, b) => b.count - a.count);

    return {
      governadores: sortList(govCounts),
      senadores: sortList(senCounts),
      prefeitos: sortList(mayorCounts)
    };
  }, [states]);

  // Estatísticas Regionais
  const regionalStats = useMemo(() => {
    const regions: Record<string, {
      name: string;
      statesCount: number;
      federalDeputies: number;
      senatorsCount: number;
      totalPopNumber: number;
    }> = {
      'Sudeste': { name: 'Sudeste', statesCount: 0, federalDeputies: 0, senatorsCount: 0, totalPopNumber: 0 },
      'Nordeste': { name: 'Nordeste', statesCount: 0, federalDeputies: 0, senatorsCount: 0, totalPopNumber: 0 },
      'Sul': { name: 'Sul', statesCount: 0, federalDeputies: 0, senatorsCount: 0, totalPopNumber: 0 },
      'Norte': { name: 'Norte', statesCount: 0, federalDeputies: 0, senatorsCount: 0, totalPopNumber: 0 },
      'Centro-Oeste': { name: 'Centro-Oeste', statesCount: 0, federalDeputies: 0, senatorsCount: 0, totalPopNumber: 0 }
    };

    states.forEach((s) => {
      const reg = regions[s.region];
      if (reg) {
        reg.statesCount += 1;
        reg.federalDeputies += s.legislative.federalDeputies;
        reg.senatorsCount += s.legislative.senators.length;

        // Parse população aproximada ("44.420.459 hab." -> 44420459)
        const num = parseInt(s.population.replace(/\D/g, ''), 10) || 0;
        reg.totalPopNumber += num;
      }
    });

    const totalPopNational = Object.values(regions).reduce((acc, r) => acc + r.totalPopNumber, 0) || 1;
    const totalDeputiesNational = 513;

    return Object.values(regions).map((r) => ({
      ...r,
      popPct: ((r.totalPopNumber / totalPopNational) * 100).toFixed(1),
      deputiesPct: ((r.federalDeputies / totalDeputiesNational) * 100).toFixed(1)
    }));
  }, [states]);

  // Mulheres nos cargos principais
  const genderStats = useMemo(() => {
    // Mulheres no Executivo Estadual
    const womenGovs = states.filter((s) => ['Fátima Bezerra', 'Raquel Lyra'].includes(s.executive.governor));
    // Mulheres nas prefeituras de capitais (mandato 2025-2028)
    const womenMayors = states.filter((s) => ['Adriane Lopes', 'Emília Corrêa'].includes(s.capitalCity?.mayor || ''));

    // Senadoras mulheres conhecidas
    const womenSenatorsNames = [
      'Tereza Cristina', 'Eliziane Gama', 'Soraya Thronicke', 'Mara Gabrilli',
      'Daniella Ribeiro', 'Ivete da Silveira', 'Teresa Leitão', 'Zenaide Maia',
      'Jussara Lima', 'Leila Barros', 'Damares Alves', 'Margareth Buzetti',
      'Professora Dorinha', 'Ana Paula Lobato'
    ];

    const womenSens: { name: string; party: string; uf: string }[] = [];
    states.forEach((s) => {
      s.legislative.senators.forEach((sen) => {
        if (womenSenatorsNames.some((n) => sen.name.includes(n))) {
          womenSens.push({ name: sen.name, party: sen.party, uf: s.id });
        }
      });
    });

    return {
      governors: womenGovs,
      mayors: womenMayors,
      senators: womenSens
    };
  }, [states]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in transition-colors">
      <div className="bg-white border border-zinc-200 rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 transition-colors">
        {/* Cabeçalho do Modal */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white">
                Raio-X Cívico da Federação
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Análise comparativa partidária, equilíbrio regional e representatividade
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

        {/* Abas Principais de Análise */}
        <div className="px-5 pt-3 border-b border-zinc-200 dark:border-zinc-800 flex gap-2 bg-zinc-50 dark:bg-zinc-950/40 text-xs sm:text-sm font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('partidos')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'partidos'
                ? 'border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <PieChart className="w-4 h-4" /> Distribuição Partidária
          </button>
          <button
            onClick={() => setActiveTab('regioes')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'regioes'
                ? 'border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <MapPin className="w-4 h-4" /> Equilíbrio Regional (CF/88)
          </button>
          <button
            onClick={() => setActiveTab('genero')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'genero'
                ? 'border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4" /> Representação Feminina
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          {/* ABA 1: PARTIDOS */}
          {activeTab === 'partidos' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-zinc-50 dark:bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-xs">
                  Selecione o cargo para ver o mapa de forças:
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPartyScope('governadores')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      partyScope === 'governadores'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                        : 'bg-white text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    27 Governadores
                  </button>
                  <button
                    onClick={() => setPartyScope('senadores')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      partyScope === 'senadores'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                        : 'bg-white text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    81 Senadores
                  </button>
                  <button
                    onClick={() => setPartyScope('prefeitos')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      partyScope === 'prefeitos'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                        : 'bg-white text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    26 Prefeitos de Capitais
                  </button>
                </div>
              </div>

              {/* Lista com Gráfico de Barras Proporcionais */}
              <div className="space-y-2.5">
                {partyStats[partyScope].map((item) => {
                  const total = partyScope === 'governadores' ? 27 : partyScope === 'senadores' ? 81 : 26;
                  const pct = ((item.count / total) * 100).toFixed(1);

                  return (
                    <div
                      key={item.party}
                      className="bg-zinc-50 dark:bg-zinc-950/60 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-zinc-950 dark:text-white px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-xs">
                            {item.party}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {item.count} {item.count === 1 ? 'representante' : 'representantes'} ({pct}%)
                          </span>
                        </div>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                          {item.ufs.slice(0, 8).join(', ')}{item.ufs.length > 8 ? ` +${item.ufs.length - 8}` : ''}
                        </span>
                      </div>

                      {/* Barra de Progresso SVG/CSS */}
                      <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 2: EQUILÍBRIO REGIONAL */}
          {activeTab === 'regioes' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3.5 bg-blue-50/60 border border-blue-200 dark:bg-blue-950/30 dark:border-blue-900/40 rounded-lg text-xs leading-relaxed text-blue-950 dark:text-blue-200">
                <strong>O Princípio Federativo na CF/88:</strong> No Senado Federal, cada um dos 26 estados e o DF possuem rigorosamente 3 Senadores (paridade total). Na Câmara dos Deputados, as cadeiras variam de 8 a 70 parlamentares de acordo com o peso populacional aferido pelo IBGE.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {regionalStats.map((reg) => (
                  <div
                    key={reg.name}
                    className="bg-zinc-50 dark:bg-zinc-950/60 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-base text-zinc-950 dark:text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Região {reg.name}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold">
                        {reg.statesCount} Unidades Federativas
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-white dark:bg-zinc-900 p-2 rounded-md border border-zinc-200 dark:border-zinc-800">
                        <span className="text-zinc-500 dark:text-zinc-400 block">População Est.</span>
                        <strong className="text-zinc-950 dark:text-white font-bold">{reg.popPct}% do Brasil</strong>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 p-2 rounded-md border border-zinc-200 dark:border-zinc-800">
                        <span className="text-zinc-500 dark:text-zinc-400 block">Câmara dos Deputados</span>
                        <strong className="text-zinc-950 dark:text-white font-bold">{reg.federalDeputies} Dep. ({reg.deputiesPct}%)</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                      <span>Cadeiras no Senado:</span>
                      <strong className="text-amber-700 dark:text-amber-400 font-semibold">{reg.senatorsCount} Senadores da República</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 3: REPRESENTAÇÃO FEMININA */}
          {activeTab === 'genero' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-950/60 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
                  <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block font-semibold">Governadoras Estaduais</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 my-1 block">
                    {genderStats.governors.length} / 27
                  </span>
                  <span className="text-xs text-zinc-500">
                    {((genderStats.governors.length / 27) * 100).toFixed(1)}% dos governos
                  </span>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950/60 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
                  <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block font-semibold">Prefeitas nas Capitais</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 my-1 block">
                    {genderStats.mayors.length} / 26
                  </span>
                  <span className="text-xs text-zinc-500">
                    {((genderStats.mayors.length / 26) * 100).toFixed(1)}% das capitais
                  </span>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950/60 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
                  <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider block font-semibold">Bancada Feminina Senado</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400 my-1 block">
                    {genderStats.senators.length} / 81
                  </span>
                  <span className="text-xs text-zinc-500">
                    ~{((genderStats.senators.length / 81) * 100).toFixed(1)}% da Casa Alta
                  </span>
                </div>
              </div>

              {/* Destaques */}
              <div className="space-y-3">
                <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block mb-2">
                    Chefes de Poder Executivo Estadual Eleitas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {genderStats.governors.map((g) => (
                      <div key={g.id} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2">
                        <span>{g.executive.governor}</span>
                        <span className="text-zinc-500 font-normal">({g.name} - {g.executive.party})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block mb-2">
                    Prefeitas Eleitas em Capitais Brasileiras (Mandato 2025–2028):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {genderStats.mayors.map((m) => (
                      <div key={m.id} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2">
                        <span>{m.capitalCity?.mayor}</span>
                        <span className="text-zinc-500 font-normal">({m.capital} - {m.capitalCity?.party})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            Fonte: Dados curados da Federação Brasileira (Câmara, Senado, TSE e IBGE)
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
