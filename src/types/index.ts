export type Region = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

export interface Senator {
  name: string;
  party: string;
  mandate: string;
  email?: string;
  photoUrl?: string;
}

export interface FederalDeputy {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
  email?: string;
}

export interface StateData {
  id: string; // Ex: 'SP', 'RJ'
  name: string;
  region: Region;
  capital: string;
  population: string;
  area: string;
  municipalitiesCount: number;
  anthem?: string;
  executive: {
    governor: string;
    party: string;
    viceGovernor: string;
    viceParty: string;
    seat: string;
    mandate: string;
    photoUrl?: string;
  };
  legislative: {
    assembly: string;
    stateDeputies: number;
    federalDeputies: number;
    senators: Senator[];
  };
  judiciary: {
    court: string;
    jurisdiction: string;
    seat: string;
  };
}

export interface FederalStructure {
  name: string;
  executive: {
    president: string;
    party: string;
    vicePresident: string;
    viceParty: string;
    seat: string;
    mandate: string;
  };
  legislative: {
    nationalCongress: string;
    chamberOfDeputies: {
      totalDeputies: number;
      president: string;
      seat: string;
    };
    federalSenate: {
      totalSenators: number;
      president: string;
      seat: string;
    };
  };
  judiciary: {
    supremeCourt: string;
    seat: string;
    totalMinisters: number;
  };
}

export interface DatabaseMetadata {
  lastUpdated: string;
  version: string;
  sources: {
    name: string;
    url: string;
  }[];
}

export interface BrazilDataset {
  metadata: DatabaseMetadata;
  federal: FederalStructure;
  states: Record<string, StateData>;
}
