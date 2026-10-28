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
  capital: string;
  executive: {
    president: string;
    party: string;
    vicePresident: string;
    viceParty: string;
    seat: string;
    officialResidence: string;
    viceResidence: string;
    mandate: string;
    ministriesCount: number;
    keyMinistries: { name: string; description: string }[];
    roles: string[];
  };
  legislative: {
    nationalCongress: string;
    bicameralSystemDescription: string;
    chamberOfDeputies: {
      totalDeputies: number;
      president: string;
      seat: string;
      mandateYears: number;
      criteria: string;
      roles: string[];
    };
    federalSenate: {
      totalSenators: number;
      president: string;
      seat: string;
      mandateYears: number;
      criteria: string;
      roles: string[];
    };
    externalControl: {
      name: string;
      totalMinisters: number;
      role: string;
    };
  };
  judiciary: {
    supremeCourt: {
      name: string;
      seat: string;
      totalMinisters: number;
      appointmentCriteria: string;
      role: string;
    };
    superiorCourts: {
      name: string;
      acronym: string;
      totalMinisters: number;
      role: string;
    }[];
    cnj: {
      name: string;
      totalMembers: number;
      role: string;
    };
  };
  checksAndBalances: {
    title: string;
    description: string;
    executiveOnOthers: string[];
    legislativeOnOthers: string[];
    judiciaryOnOthers: string[];
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
