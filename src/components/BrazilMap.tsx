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
    base: '#eab308', // yellow-500
    hover: '#facc15', // yellow-400
    selected: '#fef08a', // yellow-200
    border: '#ca8a04'
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
    <div className="flex flex-col items-center w-full max-w-xl mx-auto select-none">
      {/* Filtro rápido por região */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 px-2">
        <button
          onClick={() => onSelectRegion('Todas')}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
            activeRegionFilter === 'Todas'
              ? 'bg-slate-200 text-slate-900 shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all border ${
                isActive
                  ? 'border-white text-white shadow-md'
                  : 'border-transparent bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              style={{
                backgroundColor: isActive ? REGION_COLORS[reg].base : undefined
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: REGION_COLORS[reg].base }}
              />
              {reg}
            </button>
          );
        })}
      </div>

      {/* Container do Mapa SVG com Tooltip flutuante */}
      <div className="relative w-full aspect-[450/460] bg-slate-900/60 rounded-2xl p-2 sm:p-4 border border-slate-800/80 shadow-2xl backdrop-blur-sm flex items-center justify-center">
        {/* Tooltip de Hover */}
        {hoveredState && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none bg-slate-950/90 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-xs shadow-xl backdrop-blur-md animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-blue-400">{hoveredState.name} ({hoveredState.id})</span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded text-white font-semibold"
                style={{ backgroundColor: REGION_COLORS[hoveredState.region].base }}
              >
                {hoveredState.region}
              </span>
            </div>
            <div className="text-slate-300 mt-1">
              Cap.: <strong className="text-white">{hoveredState.capital}</strong>
            </div>
            <div className="text-slate-300">
              Gov.: <span className="text-white">{hoveredState.executive.governor}</span> ({hoveredState.executive.party})
            </div>
          </div>
        )}

        <svg
          viewBox="0 0 460 470"
          className="w-full h-full max-h-[580px] drop-shadow-md"
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
                    opacity={isDimmed ? 0.3 : 1}
                    className="state-path"
                    style={{
                      filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,255,255,0.7))' : undefined
                    }}
                  />

                  {/* Círculo auxiliar para estados pequenos/litorâneos */}
                  {item.circleD && (
                    <path
                      d={item.circleD}
                      fill={isSelected ? '#ffffff' : isHovered ? colors.hover : colors.base}
                      stroke={isSelected ? colors.selected : '#ffffff'}
                      strokeWidth={1}
                      opacity={isDimmed ? 0.3 : 1}
                      className="state-circle"
                    />
                  )}

                  {/* Sigla do Estado */}
                  <text
                    transform={item.textTransform}
                    fill={isSelected ? '#0f172a' : '#ffffff'}
                    fontSize="11"
                    fontFamily="system-ui, sans-serif"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    opacity={isDimmed ? 0.35 : 1}
                  >
                    {item.id}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="mt-3 text-xs text-slate-400 flex items-center justify-between w-full px-2">
        <span>💡 Clique em qualquer estado para ver sua hierarquia política</span>
        {selectedStateId && (
          <button
            onClick={() => onSelectState('')}
            className="text-blue-400 hover:text-blue-300 underline font-medium"
          >
            Ver Visão Federal
          </button>
        )}
      </div>
    </div>
  );
};
