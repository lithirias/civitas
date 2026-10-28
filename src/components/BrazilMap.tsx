import React, { useState } from 'react';
import { STATE_PATHS } from '../data/mapPaths';
import { BrazilDataset, Region } from '../types';

interface BrazilMapProps {
  dataset: BrazilDataset;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
  activeRegionFilter: Region | 'Todas';
  onSelectRegion: (region: Region | 'Todas') => void;
}

const REGION_COLORS: Record<Region, { base: string; hover: string; selected: string; border: string }> = {
  Norte: {
    base: '#059669', // emerald-600
    hover: '#10b981', // emerald-500
    selected: '#34d399', // emerald-400
    border: '#047857'
  },
  Nordeste: {
    base: '#d97706', // amber-600
    hover: '#f59e0b', // amber-500
    selected: '#fbbf24', // amber-400
    border: '#b45309'
  },
  'Centro-Oeste': {
    base: '#ca8a04', // yellow-600
    hover: '#eab308', // yellow-500
    selected: '#fde047', // yellow-300
    border: '#a16207'
  },
  Sudeste: {
    base: '#2563eb', // blue-600
    hover: '#3b82f6', // blue-500
    selected: '#60a5fa', // blue-400
    border: '#1d4ed8'
  },
  Sul: {
    base: '#7c3aed', // violet-600
    hover: '#8b5cf6', // violet-500
    selected: '#a78bfa', // violet-400
    border: '#6d28d9'
  }
};

export const BrazilMap: React.FC<BrazilMapProps> = ({
  dataset,
  selectedStateId,
  onSelectState,
  activeRegionFilter,
  onSelectRegion
}) => {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  const hoveredState = hoveredStateId ? dataset.states[hoveredStateId] : null;

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* Filtro rápido por região */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 px-1">
        <button
          onClick={() => onSelectRegion('Todas')}
          className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
            activeRegionFilter === 'Todas'
              ? 'bg-zinc-900 text-white font-semibold shadow-xs dark:bg-zinc-200 dark:text-zinc-950'
              : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800'
          }`}
        >
          Brasil (Todas)
        </button>

        {(['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'] as Region[]).map((reg) => {
          const isActive = activeRegionFilter === reg;
          return (
            <button
              key={reg}
              onClick={() => onSelectRegion(isActive ? 'Todas' : reg)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all border ${
                isActive
                  ? 'border-zinc-900 text-white shadow-xs dark:border-white'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
              }`}
              style={{
                backgroundColor: isActive ? REGION_COLORS[reg].base : undefined
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: REGION_COLORS[reg].base }}
              />
              {reg}
            </button>
          );
        })}
      </div>

      {/* Container do Mapa SVG com Tooltip flutuante */}
      <div className="relative w-full aspect-[450/460] bg-white rounded-xl p-3 sm:p-5 border border-zinc-200 shadow-md dark:bg-zinc-900/60 dark:border-zinc-800 dark:shadow-xl backdrop-blur-sm flex items-center justify-center transition-colors">
        {/* Tooltip de Hover */}
        {hoveredState && (
          <div className="absolute top-3 left-3 z-20 pointer-events-none bg-white/95 border border-zinc-200 text-zinc-900 shadow-lg dark:bg-zinc-950/95 dark:border-zinc-700 dark:text-zinc-100 rounded-md px-3.5 py-2.5 text-sm backdrop-blur-md animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">{hoveredState.name} ({hoveredState.id})</span>
              <span
                className="text-xs px-2 py-0.5 rounded text-white font-semibold"
                style={{ backgroundColor: REGION_COLORS[hoveredState.region].base }}
              >
                {hoveredState.region}
              </span>
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 mt-1">
              Cap.: <strong className="text-zinc-900 dark:text-zinc-200">{hoveredState.capital}</strong>
            </div>
            <div className="text-zinc-600 dark:text-zinc-400">
              Gov.: <span className="text-zinc-900 dark:text-zinc-200 font-medium">{hoveredState.executive.governor}</span> ({hoveredState.executive.party})
            </div>
          </div>
        )}

        <svg
          viewBox="0 0 460 470"
          className="w-full h-full max-h-[720px] 2xl:max-h-[820px] drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(5, 5)">
            {STATE_PATHS.map((item) => {
              const stateData = dataset.states[item.id];
              const isSelected = selectedStateId === item.id;
              const isHovered = hoveredStateId === item.id;
              const region = stateData?.region || 'Sudeste';
              const colors = REGION_COLORS[region];

              const isDimmed = activeRegionFilter !== 'Todas' && activeRegionFilter !== region;

              let fillColor = colors.base;
              if (isSelected) {
                fillColor = colors.selected;
              } else if (isHovered) {
                fillColor = colors.hover;
              }

              return (
                <g
                  key={item.id}
                  className="transition-all duration-200 cursor-pointer group"
                  onClick={() => onSelectState(item.id)}
                  onMouseEnter={() => setHoveredStateId(item.id)}
                  onMouseLeave={() => setHoveredStateId(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectState(item.id);
                    }
                  }}
                  aria-label={`${item.name} (${item.id})`}
                >
                  {/* Contorno do Estado */}
                  <path
                    d={item.pathD}
                    fill={fillColor}
                    stroke={isSelected ? '#ffffff' : colors.border}
                    strokeWidth={isSelected ? 2.5 : 1.1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isDimmed ? 0.25 : 1}
                    className="state-path"
                    style={{
                      filter: isSelected ? 'drop-shadow(0 0 8px rgba(0,0,0,0.4))' : undefined
                    }}
                  />

                  {/* Sigla do Estado */}
                  <text
                    transform={item.textTransform}
                    fill="#ffffff"
                    fontSize={['SE', 'AL', 'DF', 'ES', 'PB', 'RN', 'RJ'].includes(item.id) ? '9' : '11'}
                    fontFamily="system-ui, sans-serif"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
                    opacity={isDimmed ? 0.3 : 1}
                  >
                    {item.id}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="mt-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-between w-full px-1">
        <span>💡 Clique em qualquer estado para ver sua hierarquia política</span>
        {selectedStateId && (
          <button
            onClick={() => onSelectState('')}
            className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white underline font-medium"
          >
            Ver Visão Federal
          </button>
        )}
      </div>
    </div>
  );
};
