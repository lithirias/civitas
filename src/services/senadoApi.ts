import { LiveSenator } from '../types';

const SENADO_API_URL = 'https://legis.senado.leg.br/dadosabertos/senador/lista/atual';

// Cache em memória de todos os senadores para evitar múltiplas requisições
let allSenatorsCache: LiveSenator[] | null = null;
let cachePromise: Promise<LiveSenator[]> | null = null;

export async function fetchAllLiveSenators(): Promise<LiveSenator[]> {
  if (allSenatorsCache) {
    return allSenatorsCache;
  }

  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = (async () => {
    try {
      const response = await fetch(SENADO_API_URL, {
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao consultar API do Senado: ${response.statusText}`);
      }

      const data = await response.json();
      const rawList = data.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar || [];

      const senators: LiveSenator[] = rawList.map((item: any) => {
        const iden = item.IdentificacaoParlamentar || {};
        
        // Garante https na URL da foto
        let photo = iden.UrlFotoParlamentar || '';
        if (photo.startsWith('http://')) {
          photo = photo.replace('http://', 'https://');
        }

        // Telefones
        let phoneStr: string | undefined;
        if (iden.Telefones?.Telefone) {
          const t = Array.isArray(iden.Telefones.Telefone)
            ? iden.Telefones.Telefone[0]
            : iden.Telefones.Telefone;
          if (t?.NumeroTelefone) {
            phoneStr = `(61) ${t.NumeroTelefone}`;
          }
        }

        return {
          id: iden.CodigoParlamentar || '',
          name: iden.NomeParlamentar || '',
          fullName: iden.NomeCompletoParlamentar || '',
          party: iden.SiglaPartidoParlamentar || '',
          uf: (iden.UfParlamentar || '').toUpperCase(),
          photoUrl: photo,
          email: iden.EmailParlamentar || '',
          pageUrl: iden.UrlPaginaParlamentar || '',
          phone: phoneStr,
          leadership: iden.MembroLideranca === 'Sim'
        };
      });

      allSenatorsCache = senators;
      return senators;
    } catch (error) {
      console.error('Falha ao consultar API do Senado Federal:', error);
      throw error;
    } finally {
      cachePromise = null;
    }
  })();

  return cachePromise;
}

export async function fetchSenatorsByState(siglaUf: string): Promise<LiveSenator[]> {
  const all = await fetchAllLiveSenators();
  const upper = siglaUf.toUpperCase();
  return all.filter((s) => s.uf === upper);
}
