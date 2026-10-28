import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, MapPin, Building2, Scale, Users, Landmark, ArrowRight, CornerDownLeft, BarChart3, ArrowRightLeft, Printer } from 'lucide-react';
import { BrazilDataset } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: BrazilDataset;
  onSelectState: (stateId: string) => void;
  onSelectFederalTab?: (tab: 'executivo' | 'legislativo' | 'judiciario' | 'justica' | 'equilibrio', court?: 'STF' | 'STJ' | 'TSE' | 'TST' | 'STM' | 'CNJ') => void;
  onOpenAnalytics?: () => void;
  onOpenComparator?: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Estado' | 'Executivo' | 'Legislativo' | 'Judiciário' | 'Tribunal Superior' | 'Função à Justiça';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  dataset,
  onSelectState,
  onSelectFederalTab,
  onOpenAnalytics,
  onOpenComparator
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Foco automático no input quando abrir
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Indexação rápida de itens pesquisáveis
  const items: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [];

    // Atalho para o Raio-X Cívico
    if (onOpenAnalytics) {
      list.push({
        id: 'cmd-analytics',
        title: 'Raio-X Cívico & Gráficos da Federação',
        subtitle: 'Distribuição partidária, representação de gênero e equilíbrio regional CF/88',
        category: 'Executivo',
        icon: <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => {
          onClose();
          onOpenAnalytics();
        }
      });
    }

    // Atalho para o Comparador Federativo
    if (onOpenComparator) {
      list.push({
        id: 'cmd-comparator',
        title: 'Comparador Federativo de Estados',
        subtitle: 'Compare duas Unidades Federativas lado a lado (população, executivo, vereadores, bancada)',
        category: 'Estado',
        icon: <ArrowRightLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        action: () => {
          onClose();
          onOpenComparator();
        }
      });
    }

    // Atalho para Imprimir / Gerar PDF
    list.push({
      id: 'cmd-print',
      title: 'Imprimir / Exportar Ficha Cívica (PDF)',
      subtitle: 'Gera versão diagramada em folha A4 da Unidade Federativa atual ou da União',
      category: 'Executivo',
      icon: <Printer className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
      action: () => {
        onClose();
        setTimeout(() => window.print(), 200);
      }
    });

    // 1. Todos os 27 Estados e seus Governadores
    Object.values(dataset.states).forEach((state) => {
      // Estado
      list.push({
        id: `state-${state.id}`,
        title: `${state.name} (${state.id})`,
        subtitle: `Capital: ${state.capital} • Região ${state.region} • ${state.population}`,
        category: 'Estado',
        icon: <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => {
          onSelectState(state.id);
          onClose();
        }
      });

      // Governador
      list.push({
        id: `gov-${state.id}`,
        title: state.executive.governor,
        subtitle: `Governador(a) de ${state.name} (${state.id}) • Partido: ${state.executive.party}`,
        category: 'Executivo',
        icon: <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
        action: () => {
          onSelectState(state.id);
          onClose();
        }
      });

      // Prefeito da Capital
      if (state.capitalCity && state.capitalCity.councilorsCount > 0) {
        list.push({
          id: `mayor-${state.id}`,
          title: state.capitalCity.mayor,
          subtitle: `Prefeito(a) de ${state.capital} (${state.id}) • Partido: ${state.capitalCity.party} • Mandato ${state.capitalCity.term}`,
          category: 'Executivo',
          icon: <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          action: () => {
            onSelectState(state.id);
            onClose();
          }
        });
      }
    });

    // 2. Chefes do Executivo Federal
    list.push({
      id: 'fed-pres',
      title: dataset.federal.executive.president,
      subtitle: `Presidente da República Federativa do Brasil • Partido: ${dataset.federal.executive.party}`,
      category: 'Executivo',
      icon: <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      action: () => {
        onSelectState('');
        onSelectFederalTab?.('executivo');
        onClose();
      }
    });

    list.push({
      id: 'fed-vice',
      title: dataset.federal.executive.vicePresident,
      subtitle: `Vice-Presidente da República • Partido: ${dataset.federal.executive.viceParty}`,
      category: 'Executivo',
      icon: <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      action: () => {
        onSelectState('');
        onSelectFederalTab?.('executivo');
        onClose();
      }
    });

    // 3. Chefes do Legislativo Federal
    list.push({
      id: 'leg-camara',
      title: dataset.federal.legislative.chamberOfDeputies.presidentName || 'Arthur Lira',
      subtitle: 'Presidente da Câmara dos Deputados (513 parlamentares)',
      category: 'Legislativo',
      icon: <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      action: () => {
        onSelectState('');
        onSelectFederalTab?.('legislativo');
        onClose();
      }
    });

    list.push({
      id: 'leg-senado',
      title: dataset.federal.legislative.federalSenate.presidentName || 'Rodrigo Pacheco',
      subtitle: 'Presidente do Senado Federal e do Congresso Nacional (81 senadores)',
      category: 'Legislativo',
      icon: <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      action: () => {
        onSelectState('');
        onSelectFederalTab?.('legislativo');
        onClose();
      }
    });

    // 4. Tribunais e Ministros do Judiciário
    dataset.federal.judiciary.supremeCourt.members.forEach((m) => {
      list.push({
        id: `stf-${m.name}`,
        title: m.name,
        subtitle: `${m.role || 'Ministro'} do STF • Indicado por ${m.appointedBy} (${m.startYear})`,
        category: 'Judiciário',
        icon: <GavelIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
        action: () => {
          onSelectState('');
          onSelectFederalTab?.('judiciario', 'STF');
          onClose();
        }
      });
    });

    // Cortes Superiores
    const superiorCourts = [
      { acronym: 'STF', name: 'Supremo Tribunal Federal', desc: '11 Ministros • Guardião da Constituição' },
      { acronym: 'STJ', name: 'Superior Tribunal de Justiça', desc: '33 Ministros • Tribunal da Cidadania' },
      { acronym: 'TSE', name: 'Tribunal Superior Eleitoral', desc: '7 Ministros • Cúpula Eleitoral' },
      { acronym: 'TST', name: 'Tribunal Superior do Trabalho', desc: '27 Ministros • Justiça do Trabalho' },
      { acronym: 'STM', name: 'Superior Tribunal Militar', desc: '15 Ministros • Justiça Militar da União' },
      { acronym: 'CNJ', name: 'Conselho Nacional de Justiça', desc: '15 Conselheiros • Controle Administrativo' }
    ];

    superiorCourts.forEach((c) => {
      list.push({
        id: `court-${c.acronym}`,
        title: `${c.acronym} — ${c.name}`,
        subtitle: c.desc,
        category: 'Tribunal Superior',
        icon: <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        action: () => {
          onSelectState('');
          onSelectFederalTab?.('judiciario', c.acronym as any);
          onClose();
        }
      });
    });

    // 5. Funções Essenciais à Justiça (Título IV, Cap. IV da CF/88)
    if (dataset.federal.essentialToJustice) {
      const ej = dataset.federal.essentialToJustice;
      list.push({
        id: 'justica-pgr',
        title: `${ej.publicProsecution.headName} (${ej.publicProsecution.headTitle})`,
        subtitle: `${ej.publicProsecution.name} • Atuação perante o STF e TSE`,
        category: 'Função à Justiça',
        icon: <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
        action: () => {
          onSelectState('');
          onSelectFederalTab?.('justica');
          onClose();
        }
      });

      list.push({
        id: 'justica-agu',
        title: `${ej.publicAdvocacy.headName} (${ej.publicAdvocacy.headTitle})`,
        subtitle: `${ej.publicAdvocacy.name} • Representação jurídica da União`,
        category: 'Função à Justiça',
        icon: <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
        action: () => {
          onSelectState('');
          onSelectFederalTab?.('justica');
          onClose();
        }
      });

      list.push({
        id: 'justica-dpu',
        title: `${ej.publicDefenders.headName} (${ej.publicDefenders.headTitle})`,
        subtitle: `${ej.publicDefenders.name} • Assistência jurídica integral e gratuita`,
        category: 'Função à Justiça',
        icon: <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
        action: () => {
          onSelectState('');
          onSelectFederalTab?.('justica');
          onClose();
        }
      });

      list.push({
        id: 'justica-oab',
        title: ej.privateAdvocacy.name,
        subtitle: 'Art. 133 CF/88: Indispensabilidade do advogado à administração da justiça',
        category: 'Função à Justiça',
        icon: <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
        action: () => {
          onSelectState('');
          onSelectFederalTab?.('justica');
          onClose();
        }
      });
    }

    return list;
  }, [dataset, onSelectState, onSelectFederalTab, onClose]);

  // Filtro inteligente
  const filtered = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8); // Sugestões iniciais
    const clean = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return items.filter((item) => {
      const title = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const sub = item.subtitle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return title.includes(clean) || sub.includes(clean);
    }).slice(0, 15);
  }, [items, query]);

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border border-zinc-200 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 transition-colors"
        onKeyDown={handleKeyDown}
      >
        {/* Barra de Busca da Palette */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar estado, governador, ministro, tribunal ou autoridade... (ex: SP, Lula, Barroso, STJ)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm sm:text-base outline-none text-zinc-950 dark:text-white placeholder:text-zinc-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700 hidden sm:inline-block">
            ESC
          </span>
        </div>

        {/* Lista de Resultados */}
        <div ref={listRef} className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Nenhum representante, estado ou tribunal encontrado para "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-md bg-zinc-200/60 dark:bg-zinc-700/60 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base truncate">{item.title}</span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-zinc-200/80 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 text-zinc-400 pl-2">
                    {isSelected && (
                      <CornerDownLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-300 hidden sm:inline" />
                    )}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé com dicas de navegação */}
        <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-200 dark:bg-zinc-950/60 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[11px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[11px]">↓</kbd> para navegar</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[11px]">Enter</kbd> para selecionar</span>
          </div>
          <span>Pólis Brasil</span>
        </div>
      </div>
    </div>
  );
};

// Ícone Gavel auxiliar
const GavelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m14 13-7.5 7.5c-.8.8-2 .8-2.8 0s-.8-2 0-2.8L11.2 10.2"/>
    <path d="m16 16 6-6"/>
    <path d="m8 8 6-6"/>
    <path d="m9 7 8 8"/>
    <path d="m21 11-8-8"/>
  </svg>
);
