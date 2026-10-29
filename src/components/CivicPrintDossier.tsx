import React from 'react';
import { StateData, FederalStructure } from '../types';

interface CivicPrintDossierProps {
  stateData: StateData | null;
  federalData: FederalStructure;
  lastUpdated: string;
}

export const CivicPrintDossier: React.FC<CivicPrintDossierProps> = ({
  stateData,
  federalData,
  lastUpdated
}) => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Se nenhum estado estiver selecionado, imprime o Dossier da União Federal
  if (!stateData) {
    return (
      <div className="print-only font-sans text-black p-4 max-w-[210mm] mx-auto">
        {/* Cabeçalho da Ficha */}
        <div className="border-b-2 border-black pb-4 mb-5 text-center">
          <span className="text-xs uppercase tracking-widest font-bold text-zinc-600 block mb-1">
            República Federativa do Brasil • Civitas Brasil
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Dossiê Cívico da União Federal
          </h1>
          <p className="text-xs text-zinc-600 mt-1">
            Organização dos Três Poderes da República e Funções Essenciais à Justiça (CF/88)
          </p>
        </div>

        {/* Quadro 1: Chefia do Poder Executivo */}
        <div className="border border-zinc-400 rounded-lg p-4 mb-4">
          <h2 className="text-sm font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
            1. Poder Executivo Federal
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-zinc-600 block">Presidente da República:</span>
              <strong className="text-sm font-bold">{federalData.executive.president} ({federalData.executive.party})</strong>
            </div>
            <div>
              <span className="text-zinc-600 block">Vice-Presidente:</span>
              <strong className="text-sm font-bold">{federalData.executive.vicePresident} ({federalData.executive.viceParty})</strong>
            </div>
            <div>
              <span className="text-zinc-600 block">Sede Governamental:</span>
              <span>{federalData.executive.seat}</span>
            </div>
            <div>
              <span className="text-zinc-600 block">Mandato Constitucional:</span>
              <span>{federalData.executive.mandate}</span>
            </div>
          </div>
        </div>

        {/* Quadro 2: Congresso Nacional */}
        <div className="border border-zinc-400 rounded-lg p-4 mb-4">
          <h2 className="text-sm font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
            2. Poder Legislativo da União (Congresso Nacional)
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border-r border-zinc-200 pr-3">
              <strong className="block font-bold mb-1">Câmara dos Deputados (Casa do Povo)</strong>
              <p>513 Deputados Federais eleitos proporcionalmente.</p>
              <p className="mt-1">Presidência: {federalData.legislative.chamberOfDeputies.presidentName || 'Arthur Lira'}</p>
            </div>
            <div>
              <strong className="block font-bold mb-1">Senado Federal (Casa da Federação)</strong>
              <p>81 Senadores da República (3 por estado e DF, mandato de 8 anos).</p>
              <p className="mt-1">Presidência: {federalData.legislative.federalSenate.presidentName || 'Rodrigo Pacheco'}</p>
            </div>
          </div>
        </div>

        {/* Quadro 3: Cúpula do Poder Judiciário */}
        <div className="border border-zinc-400 rounded-lg p-4 mb-4">
          <h2 className="text-sm font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
            3. Poder Judiciário Federal
          </h2>
          <div className="text-xs space-y-1.5">
            <p><strong>Supremo Tribunal Federal (STF):</strong> Cúpula do Judiciário e Guardião da Carta Magna, composto por 11 Ministros.</p>
            <p><strong>Cortes Superiores:</strong> Superior Tribunal de Justiça (STJ - 33 ministros), Tribunal Superior Eleitoral (TSE - 7 membros), Tribunal Superior do Trabalho (TST - 27 ministros), Superior Tribunal Militar (STM - 15 ministros).</p>
            <p><strong>Conselho Nacional de Justiça (CNJ):</strong> 15 Conselheiros sob presidência do Ministro Presidente do STF.</p>
          </div>
        </div>

        {/* Quadro 4: Funções Essenciais à Justiça */}
        <div className="border border-zinc-400 rounded-lg p-4 mb-5">
          <h2 className="text-sm font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
            4. Funções Essenciais à Justiça (Título IV, Cap. IV CF/88)
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <strong className="block">Ministério Público da União (MPU)</strong>
              <span>Procurador-Geral da República: {federalData.essentialToJustice.publicProsecution.headName}</span>
            </div>
            <div>
              <strong className="block">Advocacia-Geral da União (AGU)</strong>
              <span>Advogado-Geral: {federalData.essentialToJustice.publicAdvocacy.headName}</span>
            </div>
            <div>
              <strong className="block">Defensoria Pública da União (DPU)</strong>
              <span>Defensor Público-Geral: {federalData.essentialToJustice.publicDefenders.headName}</span>
            </div>
            <div>
              <strong className="block">Ordem dos Advogados do Brasil (CFOAB)</strong>
              <span>Indispensabilidade do Advogado (Art. 133 CF/88)</span>
            </div>
          </div>
        </div>

        {/* Rodapé da Impressão */}
        <div className="border-t border-zinc-300 pt-3 flex items-center justify-between text-[10px] text-zinc-500">
          <span>Civitas Brasil • Plataforma Cívica Aberta (https://lithirias.github.io/polis/)</span>
          <span>Emissão: {currentDate} • Base curada: {lastUpdated}</span>
        </div>
      </div>
    );
  }

  // Visualização de Estado selecionado para Impressão
  return (
    <div className="print-only font-sans text-black p-4 max-w-[210mm] mx-auto">
      {/* Cabeçalho da Ficha */}
      <div className="border-b-2 border-black pb-4 mb-5 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-zinc-600 block mb-0.5">
            República Federativa do Brasil • Civitas Brasil
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Ficha Cívica: {stateData.name} ({stateData.id})
          </h1>
          <p className="text-xs text-zinc-600">
            Capital: {stateData.capital} • Região {stateData.region}
          </p>
        </div>
        <div className="text-right">
          <div className="w-12 h-12 rounded border-2 border-black flex items-center justify-center font-black text-xl">
            {stateData.id}
          </div>
        </div>
      </div>

      {/* Indicadores Demográficos */}
      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div className="border border-zinc-300 rounded p-2 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold">População Estimada</span>
          <strong className="text-sm font-bold">{stateData.population}</strong>
        </div>
        <div className="border border-zinc-300 rounded p-2 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold">Área Territorial</span>
          <strong className="text-sm font-bold">{stateData.area}</strong>
        </div>
        <div className="border border-zinc-300 rounded p-2 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold">Municípios</span>
          <strong className="text-sm font-bold">{stateData.municipalitiesCount}</strong>
        </div>
      </div>

      {/* Quadro 1: Poder Executivo Estadual */}
      <div className="border border-zinc-400 rounded-lg p-3.5 mb-3.5">
        <h2 className="text-xs font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
          1. Poder Executivo Estadual
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-zinc-600 block text-[11px]">Governador(a):</span>
            <strong className="text-sm font-bold">{stateData.executive.governor} ({stateData.executive.party})</strong>
          </div>
          <div>
            <span className="text-zinc-600 block text-[11px]">Vice-Governador(a):</span>
            <strong className="text-sm font-bold">{stateData.executive.viceGovernor} ({stateData.executive.viceParty})</strong>
          </div>
          <div>
            <span className="text-zinc-600 block text-[11px]">Sede do Governo Estadual:</span>
            <span>{stateData.executive.seat}</span>
          </div>
          <div>
            <span className="text-zinc-600 block text-[11px]">Mandato:</span>
            <span>{stateData.executive.mandate}</span>
          </div>
        </div>
      </div>

      {/* Quadro 2: Gestão Municipal da Capital */}
      {stateData.capitalCity && (
        <div className="border border-zinc-400 rounded-lg p-3.5 mb-3.5">
          <h2 className="text-xs font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
            2. Gestão Municipal da Capital ({stateData.capital})
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-zinc-600 block text-[11px]">Prefeito(a) da Capital:</span>
              <strong className="text-sm font-bold">{stateData.capitalCity.mayor} ({stateData.capitalCity.party})</strong>
              {stateData.capitalCity.viceMayor && (
                <span className="text-zinc-500 block text-[11px] mt-0.5">Vice: {stateData.capitalCity.viceMayor}</span>
              )}
            </div>
            <div>
              <span className="text-zinc-600 block text-[11px]">Poder Legislativo Municipal:</span>
              {stateData.capitalCity.councilorsCount > 0 ? (
                <strong className="text-xs font-bold">{stateData.capitalCity.councilorsCount} Vereadores Eleitos (Mandato {stateData.capitalCity.term})</strong>
              ) : (
                <span className="text-zinc-600 text-[11px]">{stateData.capitalCity.note || 'Regime Singular (CLDF)'}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quadro 3: Poder Legislativo */}
      <div className="border border-zinc-400 rounded-lg p-3.5 mb-3.5">
        <h2 className="text-xs font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
          3. Poder Legislativo (Estadual & Federal)
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs mb-2">
          <div>
            <span className="text-zinc-600 block text-[11px]">Assembleia Legislativa Estadual:</span>
            <strong className="font-bold">{stateData.legislative.assembly}</strong>
            <p className="text-[11px] text-zinc-600 mt-0.5">{stateData.legislative.stateDeputies} Deputados Estaduais</p>
          </div>
          <div>
            <span className="text-zinc-600 block text-[11px]">Bancada na Câmara dos Deputados:</span>
            <strong className="font-bold">{stateData.legislative.federalDeputies} Deputados Federais</strong>
          </div>
        </div>
        <div className="pt-2 border-t border-zinc-200">
          <span className="text-zinc-600 block text-[11px] mb-1 font-bold">3 Senadores Federais em Exercício:</span>
          <div className="grid grid-cols-3 gap-2">
            {stateData.legislative.senators.map((s, idx) => (
              <div key={idx} className="bg-zinc-100 p-1.5 rounded text-[11px]">
                <strong className="block truncate">{s.name}</strong>
                <span className="text-zinc-600">{s.party} • {s.mandate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quadro 4: Poder Judiciário & Funções Essenciais */}
      <div className="border border-zinc-400 rounded-lg p-3.5 mb-4">
        <h2 className="text-xs font-black uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">
          4. Justiça & Funções Essenciais à Justiça
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <strong className="block text-[11px]">Poder Judiciário Estadual:</strong>
            <span>{stateData.judiciary.court} (Sede: {stateData.judiciary.seat})</span>
          </div>
          <div>
            <strong className="block text-[11px]">Ministério Público Estadual:</strong>
            <span>MP{stateData.id} • Procuradoria-Geral de Justiça</span>
          </div>
          <div>
            <strong className="block text-[11px]">Defensoria Pública Estadual:</strong>
            <span>DPE-{stateData.id} • Assistência Jurídica Gratuita</span>
          </div>
          <div>
            <strong className="block text-[11px]">Advocacia Pública & OAB:</strong>
            <span>PGE-{stateData.id} • Seccional OAB/{stateData.id}</span>
          </div>
        </div>
      </div>

      {/* Rodapé da Impressão */}
      <div className="border-t border-zinc-300 pt-3 flex items-center justify-between text-[10px] text-zinc-500">
        <span>Civitas Brasil • Plataforma Cívica Aberta (https://lithirias.github.io/polis/)</span>
        <span>Emissão: {currentDate} • Base curada: {lastUpdated}</span>
      </div>
    </div>
  );
};
