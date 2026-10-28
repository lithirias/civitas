import React, { useState } from 'react';
import { X, Search, BookOpen, Scale, Landmark, ShieldCheck, HelpCircle, ExternalLink } from 'lucide-react';

export interface GlossaryTerm {
  id: string;
  term: string;
  article: string;
  category: 'Judiciário' | 'Legislativo' | 'Executivo' | 'Conceitos';
  definition: string;
  practicalExample: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'quinto-constitucional',
    term: 'Quinto Constitucional',
    article: 'Art. 94 da CF/88',
    category: 'Judiciário',
    definition: 'Regra que reserva um quinto (20%) das vagas nos Tribunais de Justiça dos Estados (TJs) e Tribunais Regionais Federais (TRFs) para membros do Ministério Público com mais de 10 anos de carreira e advogados de notório saber jurídico e reputação ilibada indicados pela OAB.',
    practicalExample: 'Garante que os tribunais colegiados não sejam compostos unicamente por juízes concursados, trazendo a visão da advocacia e do Ministério Público para as decisões judiciais.'
  },
  {
    id: 'bicameralismo-federativo',
    term: 'Bicameralismo Federativo',
    article: 'Arts. 44 a 47 da CF/88',
    category: 'Legislativo',
    definition: 'Sistema legislativo composto por duas Casas parlamentares: a Câmara dos Deputados (que representa o povo brasileiro proporcionalmente à população de cada estado) e o Senado Federal (que representa os 26 Estados e o DF com paridade absoluta de 3 senadores cada).',
    practicalExample: 'Impede que estados populosos (como SP e MG) aprovem leis que prejudiquem estados menores (como AC, AP e RR), pois qualquer projeto de lei precisa do aval de ambas as Casas.'
  },
  {
    id: 'adi-adc-adpf',
    term: 'Controle Concentrado (ADI, ADC e ADPF)',
    article: 'Art. 102, I, "a" e § 1º da CF/88',
    category: 'Judiciário',
    definition: 'Ações diretas julgadas exclusivamente pelo STF para fiscalizar a constitucionalidade das leis. A ADI anula leis contrárias à Constituição; a ADC confirma a validade constitucional de uma lei federal; e a ADPF protege preceitos fundamentais da Carta Magna contra atos do poder público.',
    practicalExample: 'Quando o Congresso aprova uma lei e partidos ou o Presidente da República recorrem ao STF questionando sua validade antes mesmo de ser aplicada a casos individuais.'
  },
  {
    id: 'repercussao-geral',
    term: 'Repercussão Geral',
    article: 'Art. 102, § 3º da CF/88',
    category: 'Judiciário',
    definition: 'Filtro processual no STF onde a Corte só julga Recursos Extraordinários cujas matérias ultrapassem o interesse individual das partes e possuam relevante impacto social, econômico, político ou jurídico para todo o país.',
    practicalExample: 'Ao fixar a tese de repercussão geral sobre um tema (ex.: fornecimento de remédios de alto custo pelo SUS), a decisão passa a valer obrigatoriamente para todos os juízes e tribunais do Brasil.'
  },
  {
    id: 'freios-e-contrapesos',
    term: 'Freios e Contrapesos (Checks and Balances)',
    article: 'Art. 2º da CF/88',
    category: 'Conceitos',
    definition: 'Princípio que estabelece que os Poderes Executivo, Legislativo e Judiciário são independentes e harmônicos entre si, concedendo a cada um deles prerrogativas e instrumentos para fiscalizar, conter e equilibrar os excessos dos outros.',
    practicalExample: 'O Presidente pode vetar leis do Congresso; o Congresso pode derrubar o veto presidencial; o STF pode anular leis inconstitucionais; e o Senado sabatina e aprova os ministros do STF.'
  },
  {
    id: 'medida-provisoria',
    term: 'Medida Provisória (MP)',
    article: 'Art. 62 da CF/88',
    category: 'Executivo',
    definition: 'Ato normativo unipessoal do Presidente da República com eficácia imediata de lei, privativo para matérias de relevância e urgência. Possui vigência inicial de 60 dias (prorrogável por mais 60) e precisa ser aprovada pelo Congresso Nacional para se converter em lei definitiva.',
    practicalExample: 'Utilizada pelo Executivo para liberar créditos orçamentários extraordinários em calamidades públicas ou reajustar o salário mínimo nacional com vigência imediata.'
  },
  {
    id: 'sabatina-senado',
    term: 'Sabatina e Aprovação pelo Senado',
    article: 'Art. 52, III da CF/88',
    category: 'Legislativo',
    definition: 'Arguição pública detalhada na Comissão de Constituição e Justiça (CCJ) e votação secreta no Plenário do Senado para aprovar a indicação do Presidente da República para cargos vitais: Ministros do STF, Procurador-Geral da República, Diretores do Banco Central e Embaixadores.',
    practicalExample: 'O Presidente da República não pode empossar um ministro do STF sem que a indicação obtenha maioria absoluta de votos favoráveis dos 81 senadores da República.'
  },
  {
    id: 'funcoes-essenciais-justica',
    term: 'Funções Essenciais à Justiça',
    article: 'Arts. 127 a 135 da CF/88',
    category: 'Conceitos',
    definition: 'Órgãos constitucionais permanentes e autônomos que não integram nenhum dos três poderes, mas são indispensáveis ao Estado Democrático de Direito: Ministério Público (fiscal da lei e titular da ação penal pública), Advocacia Pública/AGU (defesa judicial do Estado), Defensoria Pública (assistência jurídica gratuita) e a Advocacia.',
    practicalExample: 'A Defensoria Pública garante que um cidadão hipossuficiente (sem condições financeiras) tenha assistência jurídica de excelência gratuita em qualquer processo.'
  },
  {
    id: 'linha-sucessoria-presidencial',
    term: 'Linha Sucessória e Vacância Presidencial',
    article: 'Arts. 79 a 81 da CF/88',
    category: 'Executivo',
    definition: 'Ordem legal estabelecida pela CF para exercer a Presidência em caso de impedimento (viagem, doença) ou vacância: 1º Vice-Presidente ➔ 2º Presidente da Câmara ➔ 3º Presidente do Senado ➔ 4º Presidente do STF.',
    practicalExample: 'Se o Presidente viaja ao exterior e o Vice também está ausente, o Presidente da Câmara dos Deputados assume interinamente o comando do Palácio do Planalto.'
  },
  {
    id: 'maioria-absoluta-vs-simples',
    term: 'Maioria Absoluta vs. Maioria Simples',
    article: 'Art. 47 da CF/88',
    category: 'Legislativo',
    definition: 'Maioria Simples (ou Relativa) é a metade mais um dos presentes na sessão (com quórum mínimo). Maioria Absoluta é o primeiro número inteiro superior à metade do TOTAL de membros eleitos da Casa legislativa (257 de 513 na Câmara; 41 de 81 no Senado).',
    practicalExample: 'Projetos de Lei Ordinária exigem apenas maioria simples; já a aprovação de ministros do STF ou Leis Complementares exige o quórum rígido de maioria absoluta.'
  },
  {
    id: 'clausula-petrea',
    term: 'Cláusulas Pétreas',
    article: 'Art. 60, § 4º da CF/88',
    category: 'Conceitos',
    definition: 'Núcleo imutável e intangível da Constituição Federal que não pode ser abolido nem mesmo por Emenda Constitucional aprovada pelo Congresso: a forma federativa de Estado, o voto direto, secreto, universal e periódico, a separação dos Poderes e os direitos e garantias individuais.',
    practicalExample: 'Nem mesmo uma proposta com 100% dos votos dos parlamentares poderia transformar o Brasil numa monarquia ou extinguir o voto secreto.'
  },
  {
    id: 'cnj-e-correicao',
    term: 'Conselho Nacional de Justiça (CNJ)',
    article: 'Art. 103-B da CF/88',
    category: 'Judiciário',
    definition: 'Órgão de cúpula administrativa, orçamentária e correcional do Poder Judiciário. Não possui competência para julgar processos judiciais de cidadãos, mas fiscaliza a conduta ética de magistrados, zela pela celeridade processual e padroniza sistemas eletrônicos dos tribunais.',
    practicalExample: 'O CNJ pode instaurar processo administrativo disciplinar contra magistrados que descumpram deveres éticos da função judicante.'
  },
  {
    id: 'mandato-vs-mandado',
    term: 'Mandato Político vs. Mandado Judicial',
    article: 'CF/88 e Código Civil',
    category: 'Conceitos',
    definition: 'Mandato (com "t") é a delegação de poderes outorgada pelo povo nas urnas para governar ou legislar por período determinado (ex.: mandato de 4 anos de governador). Mandado (com "d") é a ordem emanada de juiz ou autoridade judicial competente.',
    practicalExample: 'Um parlamentar perde seu mandato eletivo por quebra de decoro; um policial cumpre um mandado de prisão preventiva expedido por um juiz.'
  },
  {
    id: 'paridade-senado',
    term: 'Paridade Federativa no Senado',
    article: 'Art. 46 da CF/88',
    category: 'Legislativo',
    definition: 'Princípio federativo segundo o qual todos os 26 Estados brasileiros e o Distrito Federal possuem exatamente o mesmo peso representativo no Senado Federal: 3 senadores cada, totalizando 81 parlamentares, independentemente da população ou riqueza do estado.',
    practicalExample: 'São Paulo (44 milhões de habitantes) e Roraima (630 mil habitantes) possuem rigorosamente a mesma bancada de 3 senadores, assegurando equilíbrio entre as federações.'
  }
];

interface CivicGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string | null;
}

export const CivicGlossaryModal: React.FC<CivicGlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTermId
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');

  if (!isOpen) return null;

  const filteredTerms = GLOSSARY_TERMS.filter((t) => {
    const matchCategory = selectedCategory === 'TODAS' || t.category === selectedCategory;
    if (!matchCategory) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.article.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.practicalExample.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="glossary-modal-title"
      >
        {/* Cabeçalho */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/60 dark:bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="glossary-modal-title" className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                Glossário Cívico & Constitucional
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Dicionário da Democracia: termos políticos e jurídicos da Carta Magna explicados em linguagem simples.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Fechar glossário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar termo, conceito ou artigo constitucional (ex: Quinto, ADPF, Sabatina, Cláusula Pétrea)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-14 py-2 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Filtros por Categoria */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {['TODAS', 'Judiciário', 'Legislativo', 'Executivo', 'Conceitos'].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all text-xs cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat === 'TODAS' ? 'Todos os Termos' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de Termos */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {filteredTerms.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50 text-emerald-600" />
              <p className="text-sm font-medium">Nenhum termo constitucional encontrado para "{search}".</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('TODAS');
                }}
                className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Limpar busca e filtros
              </button>
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div key={item.id} className={idx > 0 ? 'pt-3.5' : ''}>
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white flex items-center gap-2">
                    {item.term}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {item.article}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {item.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                  {item.definition}
                </p>

                <div className="p-2.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/60 text-xs text-zinc-600 dark:text-zinc-400 leading-snug">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">💡 Aplicação prática: </span>
                  {item.practicalExample}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{filteredTerms.length} termos catalogados com base na CF/88</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-md font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
