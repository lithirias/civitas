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
  justiceFunctions?: {
    publicProsecution: string;
    publicDefender: string;
    stateAttorney: string;
  };
  capitalCity?: {
    mayor: string;
    party: string;
    viceMayor?: string;
    councilorsCount: number;
    term: string;
    note?: string;
  };
}

export interface JudgeMember {
  name: string;
  role?: string;
  origin?: string;
  appointedBy?: string;
  startYear?: string | number;
  photoUrl?: string;
  notes?: string;
  category?: string;
}

export interface SuperiorCourtDetail {
  name: string;
  acronym: string;
  totalMinisters: number;
  seat: string;
  role: string;
  compositionRule: string;
  presidentName?: string;
  presidentPhoto?: string;
  vicePresidentName?: string;
  members: JudgeMember[];
}

export interface FederalStructure {
  name: string;
  capital: string;
  executive: {
    president: string;
    presidentPhoto?: string;
    party: string;
    vicePresident: string;
    vicePhoto?: string;
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
      presidentName?: string;
      presidentPhoto?: string;
      seat: string;
      mandateYears: number;
      criteria: string;
      roles: string[];
    };
    federalSenate: {
      totalSenators: number;
      president: string;
      presidentName?: string;
      presidentPhoto?: string;
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
      presidentName?: string;
      presidentPhoto?: string;
      appointmentCriteria: string;
      role: string;
      members: JudgeMember[];
    };
    superiorCourts: SuperiorCourtDetail[];
    cnj: {
      name: string;
      totalMembers: number;
      role: string;
      compositionRule?: string;
      members?: JudgeMember[];
    };
  };
  checksAndBalances: {
    title: string;
    description: string;
    executiveOnOthers: string[];
    legislativeOnOthers: string[];
    judiciaryOnOthers: string[];
  };
  essentialToJustice: {
    title: string;
    description: string;
    publicProsecution: {
      name: string;
      headTitle: string;
      headName: string;
      headPhoto?: string;
      seat: string;
      role: string;
      branches: string[];
      cnmp: {
        name: string;
        totalMembers: number;
        role: string;
      };
    };
    publicAdvocacy: {
      name: string;
      headTitle: string;
      headName: string;
      seat: string;
      role: string;
    };
    publicDefenders: {
      name: string;
      headTitle: string;
      headName: string;
      seat: string;
      role: string;
    };
    privateAdvocacy: {
      name: string;
      role: string;
    };
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
