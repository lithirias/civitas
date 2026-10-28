import { FederalDeputy } from '../types';

const API_BASE = 'https://dadosabertos.camara.leg.br/api/v2';

// Cache em memória para não repetir requisições desnecessárias
const deputiesCache: Record<string, FederalDeputy[]> = {};

export async function fetchDeputiesByState(siglaUf: string): Promise<FederalDeputy[]> {
  const upperUf = siglaUf.toUpperCase();
  
  if (deputiesCache[upperUf]) {
    return deputiesCache[upperUf];
  }

  try {
    const response = await fetch(`${API_BASE}/deputados?siglaUf=${upperUf}&ordem=ASC&ordenarPor=nome`, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao consultar API da Câmara: ${response.statusText}`);
    }

    const data = await response.json();
    const deputies: FederalDeputy[] = data.dados || [];

    deputiesCache[upperUf] = deputies;
    return deputies;
  } catch (error) {
    console.error('Falha ao carregar deputados da API oficial:', error);
    throw error;
  }
}
