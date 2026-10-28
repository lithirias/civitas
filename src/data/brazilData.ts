import { BrazilDataset } from '../types';

export const initialBrazilData: BrazilDataset = {
  metadata: {
    lastUpdated: '2026-10-28',
    version: '1.0.0',
    sources: [
      { name: 'Câmara dos Deputados (Dados Abertos)', url: 'https://dadosabertos.camara.leg.br' },
      { name: 'Senado Federal (Dados Abertos)', url: 'https://legis.senado.leg.br/dadosabertos' },
      { name: 'IBGE (Localidades e População)', url: 'https://servicodados.ibge.gov.br' },
      { name: 'Tribunais Regionais e Estaduais', url: 'https://www.cnj.jus.br' }
    ]
  },
  federal: {
    name: 'República Federativa do Brasil',
    capital: 'Brasília - DF',
    executive: {
      president: 'Luiz Inácio Lula da Silva',
      party: 'PT',
      vicePresident: 'Geraldo Alckmin',
      viceParty: 'PSB',
      seat: 'Palácio do Planalto (Gabinete Presidencial)',
      officialResidence: 'Palácio da Alvorada',
      viceResidence: 'Palácio do Jaburu',
      mandate: '2023 - 2026',
      ministriesCount: 38,
      keyMinistries: [
        { name: 'Casa Civil', description: 'Coordenação e integração das ações governamentais e articulação dos ministérios.' },
        { name: 'Ministério da Fazenda', description: 'Política fiscal, arrecadação tributária, estabilidade monetária e gestão da dívida pública.' },
        { name: 'Relações Exteriores (Itamaraty)', description: 'Diplomacia, política externa e representação oficial do Brasil no mundo.' },
        { name: 'Justiça e Segurança Pública', description: 'Defesa da ordem jurídica, direitos constitucionais e coordenação de segurança federal (PF e PRF).' },
        { name: 'Ministério da Defesa', description: 'Coordenação e preparo conjunto das Forças Armadas (Exército, Marinha e Aeronáutica).' },
        { name: 'Planejamento e Orçamento', description: 'Elaboração das diretrizes orçamentárias (LDO, LOA) e plano plurianual (PPA).' }
      ],
      roles: [
        'Chefia de Estado: Representa a República Federativa do Brasil perante governos estrangeiros e organismos internacionais.',
        'Chefia de Governo: Administra as políticas públicas nacionais e a máquina pública federal.',
        'Sanção e Veto: Aprova ou veta total ou parcialmente projetos de lei aprovados pelo Congresso Nacional.',
        'Medidas Provisórias: Edita medidas com força de lei em situações de relevância e urgência, submetendo-as ao Congresso.',
        'Comandante Supremo: Ejerce o comando superior das Forças Armadas.'
      ]
    },
    legislative: {
      nationalCongress: 'Congresso Nacional (Sistema Bicameral)',
      bicameralSystemDescription: 'Adota o bicameralismo federativo: a Câmara representa o povo brasileiro proporcionalmente, enquanto o Senado representa os Estados e o DF em paridade igualitária.',
      chamberOfDeputies: {
        totalDeputies: 513,
        president: 'Presidência da Câmara dos Deputados',
        seat: 'Palácio do Congresso Nacional, Brasília - DF',
        mandateYears: 4,
        criteria: 'Voto proporcional da população por estado (mínimo de 8 e máximo de 70 parlamentares por UF).',
        roles: [
          'Autorizar a instauração de processo de impedimento (impeachment) contra o Presidente e Vice da República.',
          'Iniciativa privativa da discussão de leis sobre matérias de orçamento, plano plurianual e diretrizes orçamentárias.',
          'Tomar as contas do Presidente da República quando não apresentadas no prazo constitucional.'
        ]
      },
      federalSenate: {
        totalSenators: 81,
        president: 'Presidência do Senado Federal (Preside também o Congresso)',
        seat: 'Palácio do Congresso Nacional, Brasília - DF',
        mandateYears: 8,
        criteria: '3 senadores eleitos por maioria simples para cada uma das 27 UFs (renovação de 1/3 e 2/3 alternadamente a cada 4 anos).',
        roles: [
          'Processar e julgar o Presidente e Vice-Presidente da República e Ministros de Estado em crimes de responsabilidade.',
          'Aprovar após sabatina pública a indicação de Ministros do STF, Tribunais Superiores, PGR, diretores do Banco Central e embaixadores.',
          'Autorizar operações externas de natureza financeira e fixar limites da dívida pública consolidada da União, estados e municípios.'
        ]
      },
      externalControl: {
        name: 'Tribunal de Contas da União (TCU)',
        totalMinisters: 9,
        role: 'Órgão constitucional de controle externo que auxilia o Congresso Nacional na fiscalização contábil, financeira, orçamentária e patrimonial da administração pública.'
      }
    },
    judiciary: {
      supremeCourt: {
        name: 'Supremo Tribunal Federal (STF)',
        seat: 'Praça dos Três Poderes, Brasília - DF',
        totalMinisters: 11,
        appointmentCriteria: 'Cidadãos com mais de 35 e menos de 70 anos, de notável saber jurídico e reputação ilibada, indicados pelo Presidente e aprovados pelo Senado.',
        role: 'Guardião supremo da Constituição Federal. Julga Ações Diretas de Inconstitucionalidade (ADI), crimes comuns de autoridades federais com foro privilegiado e recursos extraordinários.'
      },
      superiorCourts: [
        {
          name: 'Superior Tribunal de Justiça',
          acronym: 'STJ',
          totalMinisters: 33,
          role: 'Uniformizador da interpretação da lei federal infraconstitucional em todo o território nacional.'
        },
        {
          name: 'Tribunal Superior Eleitoral',
          acronym: 'TSE',
          totalMinisters: 7,
          role: 'Cúpula da Justiça Eleitoral; responsável pela organização, apuração e fiscalização das eleições em âmbito nacional.'
        },
        {
          name: 'Tribunal Superior do Trabalho',
          acronym: 'TST',
          totalMinisters: 27,
          role: 'Instância máxima da Justiça do Trabalho para julgamento de matérias trabalhistas e dissídios coletivos.'
        },
        {
          name: 'Superior Tribunal Militar',
          acronym: 'STM',
          totalMinisters: 15,
          role: 'Cúpula da Justiça Militar da União, processando e julgando crimes militares estabelecidos em lei.'
        }
      ],
      cnj: {
        name: 'Conselho Nacional de Justiça (CNJ)',
        totalMembers: 15,
        role: 'Responsável pelo controle da atuação administrativa e financeira do Poder Judiciário e do cumprimento dos deveres funcionais dos juízes.'
      }
    },
    checksAndBalances: {
      title: 'Sistema de Freios e Contrapesos (Checks and Balances)',
      description: 'Garante que nenhum dos três poderes atue com soberania absoluta, existindo mecanismos de vigilância mútua estabelecidos pelo Artigo 2º da Constituição Federal de 1988.',
      executiveOnOthers: [
        'Veto Presidencial: O Executivo pode vetar projetos de lei aprovados pelo Legislativo por inconstitucionalidade ou interesse público.',
        'Indicação de Magistrados: O Presidente indica os Ministros do STF e Tribunais Superiores.'
      ],
      legislativeOnOthers: [
        'Derrubada de Vetos: O Congresso pode rejeitar os vetos presidenciais em sessão conjunta por maioria absoluta.',
        'Sabatina e Aprovação: O Senado pode rejeitar indicações do Presidente para o STF, PGR e tribunais.',
        'Julgamento Político: O Congresso tem a prerrogativa constitucional de destituir o Presidente ou Ministros por impeachment.'
      ],
      judiciaryOnOthers: [
        'Controle de Constitucionalidade: O STF pode anular leis aprovadas pelo Congresso ou decretos do Executivo que contrariem a Carta Magna.',
        'Julgamento Penal: Julga membros do Executivo e Legislativo em crimes comuns no foro competente.'
      ]
    }
  },
  states: {
    AC: {
      id: 'AC',
      name: 'Acre',
      region: 'Norte',
      capital: 'Rio Branco',
      population: '830.018 hab.',
      area: '164.123 km²',
      municipalitiesCount: 22,
      executive: {
        governor: 'Gladson Cameli',
        party: 'PP',
        viceGovernor: 'Mailza Gomes',
        viceParty: 'PP',
        seat: 'Palácio Rio Branco',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Acre (ALEAC)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Alan Rick', party: 'UNIÃO', mandate: '2023 - 2031' },
          { name: 'Márcio Bittar', party: 'UNIÃO', mandate: '2019 - 2027' },
          { name: 'Sérgio Petecão', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Acre (TJAC)',
        jurisdiction: 'Estadual',
        seat: 'Rio Branco'
      }
    },
    AL: {
      id: 'AL',
      name: 'Alagoas',
      region: 'Nordeste',
      capital: 'Maceió',
      population: '3.127.683 hab.',
      area: '27.848 km²',
      municipalitiesCount: 102,
      executive: {
        governor: 'Paulo Dantas',
        party: 'MDB',
        viceGovernor: 'Ronaldo Lessa',
        viceParty: 'PDT',
        seat: 'Palácio República dos Palmares',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa de Alagoas (ALEALE)',
        stateDeputies: 27,
        federalDeputies: 9,
        senators: [
          { name: 'Renan Calheiros', party: 'MDB', mandate: '2019 - 2027' },
          { name: 'Rodrigo Cunha', party: 'PODEMOS', mandate: '2019 - 2027' },
          { name: 'Fernando Farias', party: 'MDB', mandate: '2023 - 2031' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado de Alagoas (TJAL)',
        jurisdiction: 'Estadual',
        seat: 'Maceió'
      }
    },
    AP: {
      id: 'AP',
      name: 'Amapá',
      region: 'Norte',
      capital: 'Macapá',
      population: '733.759 hab.',
      area: '142.828 km²',
      municipalitiesCount: 16,
      executive: {
        governor: 'Clécio Luís',
        party: 'Solidariedade',
        viceGovernor: 'Teles Júnior',
        viceParty: 'PDT',
        seat: 'Palácio do Setentrião',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Amapá (ALAP)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Davi Alcolumbre', party: 'UNIÃO', mandate: '2023 - 2031' },
          { name: 'Lucas Barreto', party: 'PSD', mandate: '2019 - 2027' },
          { name: 'Randolfe Rodrigues', party: 'PT', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Amapá (TJAP)',
        jurisdiction: 'Estadual',
        seat: 'Macapá'
      }
    },
    AM: {
      id: 'AM',
      name: 'Amazonas',
      region: 'Norte',
      capital: 'Manaus',
      population: '3.941.613 hab.',
      area: '1.559.146 km²',
      municipalitiesCount: 62,
      executive: {
        governor: 'Wilson Lima',
        party: 'UNIÃO',
        viceGovernor: 'Tadeu de Souza',
        viceParty: 'Avante',
        seat: 'Palácio do Governo do Estado do Amazonas',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Amazonas (ALEAM)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Omar Aziz', party: 'PSD', mandate: '2023 - 2031' },
          { name: 'Eduardo Braga', party: 'MDB', mandate: '2019 - 2027' },
          { name: 'Plínio Valério', party: 'PSDB', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Amazonas (TJAM)',
        jurisdiction: 'Estadual',
        seat: 'Manaus'
      }
    },
    BA: {
      id: 'BA',
      name: 'Bahia',
      region: 'Nordeste',
      capital: 'Salvador',
      population: '14.141.626 hab.',
      area: '564.760 km²',
      municipalitiesCount: 417,
      executive: {
        governor: 'Jerônimo Rodrigues',
        party: 'PT',
        viceGovernor: 'Geraldo Júnior',
        viceParty: 'MDB',
        seat: 'Palácio de Ondina',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado da Bahia (ALBA)',
        stateDeputies: 63,
        federalDeputies: 39,
        senators: [
          { name: 'Otto Alencar', party: 'PSD', mandate: '2023 - 2031' },
          { name: 'Jaques Wagner', party: 'PT', mandate: '2019 - 2027' },
          { name: 'Angelo Coronel', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado da Bahia (TJBA)',
        jurisdiction: 'Estadual',
        seat: 'Salvador'
      }
    },
    CE: {
      id: 'CE',
      name: 'Ceará',
      region: 'Nordeste',
      capital: 'Fortaleza',
      population: '8.794.957 hab.',
      area: '148.894 km²',
      municipalitiesCount: 184,
      executive: {
        governor: 'Elmano de Freitas',
        party: 'PT',
        viceGovernor: 'Jade Romero',
        viceParty: 'MDB',
        seat: 'Palácio da Abolição',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Ceará (ALECE)',
        stateDeputies: 46,
        federalDeputies: 22,
        senators: [
          { name: 'Camilo Santana', party: 'PT', mandate: '2023 - 2031' },
          { name: 'Cid Gomes', party: 'PSB', mandate: '2019 - 2027' },
          { name: 'Eduardo Girão', party: 'NOVO', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Ceará (TJCE)',
        jurisdiction: 'Estadual',
        seat: 'Fortaleza'
      }
    },
    DF: {
      id: 'DF',
      name: 'Distrito Federal',
      region: 'Centro-Oeste',
      capital: 'Brasília',
      population: '2.817.381 hab.',
      area: '5.760 km²',
      municipalitiesCount: 1,
      executive: {
        governor: 'Ibaneis Rocha',
        party: 'MDB',
        viceGovernor: 'Celina Leão',
        viceParty: 'PP',
        seat: 'Palácio do Buriti',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Câmara Legislativa do Distrito Federal (CLDF)',
        stateDeputies: 24, // Deputados Distritais
        federalDeputies: 8,
        senators: [
          { name: 'Damares Alves', party: 'REPUBLICANOS', mandate: '2023 - 2031' },
          { name: 'Izalci Lucas', party: 'PL', mandate: '2019 - 2027' },
          { name: 'Leila Barros', party: 'PDT', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do DF e dos Territórios (TJDFT)',
        jurisdiction: 'Distrital/Federal',
        seat: 'Brasília'
      }
    },
    ES: {
      id: 'ES',
      name: 'Espírito Santo',
      region: 'Sudeste',
      capital: 'Vitória',
      population: '3.833.712 hab.',
      area: '46.074 km²',
      municipalitiesCount: 78,
      executive: {
        governor: 'Renato Casagrande',
        party: 'PSB',
        viceGovernor: 'Ricardo Ferraço',
        viceParty: 'MDB',
        seat: 'Palácio Anchieta',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Espírito Santo (ALES)',
        stateDeputies: 30,
        federalDeputies: 10,
        senators: [
          { name: 'Magno Malta', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Fabiano Contarato', party: 'PT', mandate: '2019 - 2027' },
          { name: 'Marcos do Val', party: 'PODEMOS', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Espírito Santo (TJES)',
        jurisdiction: 'Estadual',
        seat: 'Vitória'
      }
    },
    GO: {
      id: 'GO',
      name: 'Goiás',
      region: 'Centro-Oeste',
      capital: 'Goiânia',
      population: '7.056.495 hab.',
      area: '340.203 km²',
      municipalitiesCount: 246,
      executive: {
        governor: 'Ronaldo Caiado',
        party: 'UNIÃO',
        viceGovernor: 'Daniel Vilela',
        viceParty: 'MDB',
        seat: 'Palácio das Esmeraldas',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado de Goiás (ALEGO)',
        stateDeputies: 41,
        federalDeputies: 17,
        senators: [
          { name: 'Wilder Morais', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Jorge Kajuru', party: 'PSB', mandate: '2019 - 2027' },
          { name: 'Vanderlan Cardoso', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado de Goiás (TJGO)',
        jurisdiction: 'Estadual',
        seat: 'Goiânia'
      }
    },
    MA: {
      id: 'MA',
      name: 'Maranhão',
      region: 'Nordeste',
      capital: 'São Luís',
      population: '6.776.699 hab.',
      area: '329.651 km²',
      municipalitiesCount: 217,
      executive: {
        governor: 'Carlos Brandão',
        party: 'PSB',
        viceGovernor: 'Felipe Camarão',
        viceParty: 'PT',
        seat: 'Palácio dos Leões',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Maranhão (ALEMA)',
        stateDeputies: 42,
        federalDeputies: 18,
        senators: [
          { name: 'Ana Paula Lobato', party: 'PSB', mandate: '2023 - 2031' },
          { name: 'Weverton Rocha', party: 'PDT', mandate: '2019 - 2027' },
          { name: 'Eliziane Gama', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Maranhão (TJMA)',
        jurisdiction: 'Estadual',
        seat: 'São Luís'
      }
    },
    MT: {
      id: 'MT',
      name: 'Mato Grosso',
      region: 'Centro-Oeste',
      capital: 'Cuiabá',
      population: '3.658.649 hab.',
      area: '903.208 km²',
      municipalitiesCount: 141,
      executive: {
        governor: 'Mauro Mendes',
        party: 'UNIÃO',
        viceGovernor: 'Otaviano Pivetta',
        viceParty: 'REPUBLICANOS',
        seat: 'Palácio Paiaguás',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado de Mato Grosso (ALMT)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Wellington Fagundes', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Jayme Campos', party: 'UNIÃO', mandate: '2019 - 2027' },
          { name: 'Margareth Buzetti', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado de Mato Grosso (TJMT)',
        jurisdiction: 'Estadual',
        seat: 'Cuiabá'
      }
    },
    MS: {
      id: 'MS',
      name: 'Mato Grosso do Sul',
      region: 'Centro-Oeste',
      capital: 'Campo Grande',
      population: '2.757.013 hab.',
      area: '357.142 km²',
      municipalitiesCount: 79,
      executive: {
        governor: 'Eduardo Riedel',
        party: 'PSDB',
        viceGovernor: 'José Carlos Barbosa',
        viceParty: 'PP',
        seat: 'Governadoria de Mato Grosso do Sul',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa de Mato Grosso do Sul (ALEMS)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Tereza Cristina', party: 'PP', mandate: '2023 - 2031' },
          { name: 'Nelsinho Trad', party: 'PSD', mandate: '2019 - 2027' },
          { name: 'Soraya Thronicke', party: 'PODEMOS', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Mato Grosso do Sul (TJMS)',
        jurisdiction: 'Estadual',
        seat: 'Campo Grande'
      }
    },
    MG: {
      id: 'MG',
      name: 'Minas Gerais',
      region: 'Sudeste',
      capital: 'Belo Horizonte',
      population: '20.539.989 hab.',
      area: '586.514 km²',
      municipalitiesCount: 853,
      executive: {
        governor: 'Romeu Zema',
        party: 'NOVO',
        viceGovernor: 'Mateus Simões',
        viceParty: 'NOVO',
        seat: 'Palácio Tiradentes (Cidade Administrativa)',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado de Minas Gerais (ALMG)',
        stateDeputies: 77,
        federalDeputies: 53,
        senators: [
          { name: 'Cleitinho Azevedo', party: 'REPUBLICANOS', mandate: '2023 - 2031' },
          { name: 'Rodrigo Pacheco', party: 'PSD', mandate: '2019 - 2027' },
          { name: 'Carlos Viana', party: 'PODEMOS', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça de Minas Gerais (TJMG)',
        jurisdiction: 'Estadual',
        seat: 'Belo Horizonte'
      }
    },
    PA: {
      id: 'PA',
      name: 'Pará',
      region: 'Norte',
      capital: 'Belém',
      population: '8.120.131 hab.',
      area: '1.245.871 km²',
      municipalitiesCount: 144,
      executive: {
        governor: 'Helder Barbalho',
        party: 'MDB',
        viceGovernor: 'Hana Ghassan',
        viceParty: 'MDB',
        seat: 'Palácio do Governo do Pará',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Pará (ALEPA)',
        stateDeputies: 41,
        federalDeputies: 17,
        senators: [
          { name: 'Beto Faro', party: 'PT', mandate: '2023 - 2031' },
          { name: 'Jader Barbalho', party: 'MDB', mandate: '2019 - 2027' },
          { name: 'Zequinha Marinho', party: 'PODEMOS', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Pará (TJPA)',
        jurisdiction: 'Estadual',
        seat: 'Belém'
      }
    },
    PB: {
      id: 'PB',
      name: 'Paraíba',
      region: 'Nordeste',
      capital: 'João Pessoa',
      population: '3.974.687 hab.',
      area: '56.467 km²',
      municipalitiesCount: 223,
      executive: {
        governor: 'João Azevêdo',
        party: 'PSB',
        viceGovernor: 'Lucas Ribeiro',
        viceParty: 'PP',
        seat: 'Palácio da Redenção',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa da Paraíba (ALPB)',
        stateDeputies: 36,
        federalDeputies: 12,
        senators: [
          { name: 'Efraim Filho', party: 'UNIÃO', mandate: '2023 - 2031' },
          { name: 'Veneziano Vital do Rêgo', party: 'MDB', mandate: '2019 - 2027' },
          { name: 'Daniella Ribeiro', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado da Paraíba (TJPB)',
        jurisdiction: 'Estadual',
        seat: 'João Pessoa'
      }
    },
    PR: {
      id: 'PR',
      name: 'Paraná',
      region: 'Sul',
      capital: 'Curitiba',
      population: '11.444.380 hab.',
      area: '199.299 km²',
      municipalitiesCount: 399,
      executive: {
        governor: 'Ratinho Júnior',
        party: 'PSD',
        viceGovernor: 'Darci Piana',
        viceParty: 'PSD',
        seat: 'Palácio Iguaçu',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Paraná (ALEP)',
        stateDeputies: 54,
        federalDeputies: 30,
        senators: [
          { name: 'Sergio Moro', party: 'UNIÃO', mandate: '2023 - 2031' },
          { name: 'Oriovisto Guimarães', party: 'PODEMOS', mandate: '2019 - 2027' },
          { name: 'Flávio Arns', party: 'PSB', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Paraná (TJPR)',
        jurisdiction: 'Estadual',
        seat: 'Curitiba'
      }
    },
    PE: {
      id: 'PE',
      name: 'Pernambuco',
      region: 'Nordeste',
      capital: 'Recife',
      population: '9.058.931 hab.',
      area: '98.067 km²',
      municipalitiesCount: 185,
      executive: {
        governor: 'Raquel Lyra',
        party: 'PSDB',
        viceGovernor: 'Priscila Krause',
        viceParty: 'CIDADANIA',
        seat: 'Palácio do Campo das Princesas',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado de Pernambuco (ALEPE)',
        stateDeputies: 49,
        federalDeputies: 25,
        senators: [
          { name: 'Teresa Leitão', party: 'PT', mandate: '2023 - 2031' },
          { name: 'Humberto Costa', party: 'PT', mandate: '2019 - 2027' },
          { name: 'Fernando Dueire', party: 'MDB', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça de Pernambuco (TJPE)',
        jurisdiction: 'Estadual',
        seat: 'Recife'
      }
    },
    PI: {
      id: 'PI',
      name: 'Piauí',
      region: 'Nordeste',
      capital: 'Teresina',
      population: '3.271.199 hab.',
      area: '251.755 km²',
      municipalitiesCount: 224,
      executive: {
        governor: 'Rafael Fonteles',
        party: 'PT',
        viceGovernor: 'Themístocles Filho',
        viceParty: 'MDB',
        seat: 'Palácio de Karnak',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Piauí (ALEPI)',
        stateDeputies: 30,
        federalDeputies: 10,
        senators: [
          { name: 'Wellington Dias (lic.) / Jussara Lima', party: 'PSD', mandate: '2023 - 2031' },
          { name: 'Ciro Nogueira', party: 'PP', mandate: '2019 - 2027' },
          { name: 'Marcelo Castro', party: 'MDB', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Piauí (TJPI)',
        jurisdiction: 'Estadual',
        seat: 'Teresina'
      }
    },
    RJ: {
      id: 'RJ',
      name: 'Rio de Janeiro',
      region: 'Sudeste',
      capital: 'Rio de Janeiro',
      population: '16.055.174 hab.',
      area: '43.750 km²',
      municipalitiesCount: 92,
      executive: {
        governor: 'Cláudio Castro',
        party: 'PL',
        viceGovernor: 'Thiago Pampolha',
        viceParty: 'MDB',
        seat: 'Palácio Guanabara',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Rio de Janeiro (ALERJ)',
        stateDeputies: 70,
        federalDeputies: 46,
        senators: [
          { name: 'Romário', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Flávio Bolsonaro', party: 'PL', mandate: '2019 - 2027' },
          { name: 'Carlos Portinho', party: 'PL', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Rio de Janeiro (TJRJ)',
        jurisdiction: 'Estadual',
        seat: 'Rio de Janeiro'
      }
    },
    RN: {
      id: 'RN',
      name: 'Rio Grande do Norte',
      region: 'Nordeste',
      capital: 'Natal',
      population: '3.302.729 hab.',
      area: '52.809 km²',
      municipalitiesCount: 167,
      executive: {
        governor: 'Fátima Bezerra',
        party: 'PT',
        viceGovernor: 'Walter Alves',
        viceParty: 'MDB',
        seat: 'Palácio de Despachos de Lagoa Nova',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Rio Grande do Norte (ALRN)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Rogério Marinho', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Styvenson Valentim', party: 'PODEMOS', mandate: '2019 - 2027' },
          { name: 'Zenaide Maia', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Rio Grande do Norte (TJRN)',
        jurisdiction: 'Estadual',
        seat: 'Natal'
      }
    },
    RS: {
      id: 'RS',
      name: 'Rio Grande do Sul',
      region: 'Sul',
      capital: 'Porto Alegre',
      population: '10.882.965 hab.',
      area: '281.707 km²',
      municipalitiesCount: 497,
      executive: {
        governor: 'Eduardo Leite',
        party: 'PSDB',
        viceGovernor: 'Gabriel Souza',
        viceParty: 'MDB',
        seat: 'Palácio Piratini',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Rio Grande do Sul (ALRS)',
        stateDeputies: 55,
        federalDeputies: 31,
        senators: [
          { name: 'Hamilton Mourão', party: 'REPUBLICANOS', mandate: '2023 - 2031' },
          { name: 'Luis Carlos Heinze', party: 'PP', mandate: '2019 - 2027' },
          { name: 'Paulo Paim', party: 'PT', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Rio Grande do Sul (TJRS)',
        jurisdiction: 'Estadual',
        seat: 'Porto Alegre'
      }
    },
    RO: {
      id: 'RO',
      name: 'Rondônia',
      region: 'Norte',
      capital: 'Porto Velho',
      population: '1.581.196 hab.',
      area: '237.765 km²',
      municipalitiesCount: 52,
      executive: {
        governor: 'Marcos Rocha',
        party: 'UNIÃO',
        viceGovernor: 'Sérgio Gonçalves',
        viceParty: 'UNIÃO',
        seat: 'Palácio Rio Madeira',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa de Rondônia (ALERO)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Jaime Bagattoli', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Confúcio Moura', party: 'MDB', mandate: '2019 - 2027' },
          { name: 'Marcos Rogério', party: 'PL', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado de Rondônia (TJRO)',
        jurisdiction: 'Estadual',
        seat: 'Porto Velho'
      }
    },
    RR: {
      id: 'RR',
      name: 'Roraima',
      region: 'Norte',
      capital: 'Boa Vista',
      population: '636.707 hab.',
      area: '223.644 km²',
      municipalitiesCount: 15,
      executive: {
        governor: 'Antonio Denarium',
        party: 'PP',
        viceGovernor: 'Edilson Damião',
        viceParty: 'REPUBLICANOS',
        seat: 'Palácio Senador Hélio Campos',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa de Roraima (ALERR)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Dr. Hiran', party: 'PP', mandate: '2023 - 2031' },
          { name: 'Chico Rodrigues', party: 'PSB', mandate: '2019 - 2027' },
          { name: 'Mecias de Jesus', party: 'REPUBLICANOS', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado de Roraima (TJRR)',
        jurisdiction: 'Estadual',
        seat: 'Boa Vista'
      }
    },
    SC: {
      id: 'SC',
      name: 'Santa Catarina',
      region: 'Sul',
      capital: 'Florianópolis',
      population: '7.610.361 hab.',
      area: '95.730 km²',
      municipalitiesCount: 295,
      executive: {
        governor: 'Jorginho Mello',
        party: 'PL',
        viceGovernor: 'Marilisa Boehm',
        viceParty: 'PL',
        seat: 'Centro Administrativo do Governo de SC',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa de Santa Catarina (ALESC)',
        stateDeputies: 40,
        federalDeputies: 16,
        senators: [
          { name: 'Jorge Seif', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Esperidião Amin', party: 'PP', mandate: '2019 - 2027' },
          { name: 'Ivete da Silveira', party: 'MDB', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça de Santa Catarina (TJSC)',
        jurisdiction: 'Estadual',
        seat: 'Florianópolis'
      }
    },
    SP: {
      id: 'SP',
      name: 'São Paulo',
      region: 'Sudeste',
      capital: 'São Paulo',
      population: '44.411.238 hab.',
      area: '248.219 km²',
      municipalitiesCount: 645,
      executive: {
        governor: 'Tarcísio de Freitas',
        party: 'REPUBLICANOS',
        viceGovernor: 'Felício Ramuth',
        viceParty: 'PSD',
        seat: 'Palácio dos Bandeirantes',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado de São Paulo (ALESP)',
        stateDeputies: 94,
        federalDeputies: 70,
        senators: [
          { name: 'Astronauta Marcos Pontes', party: 'PL', mandate: '2023 - 2031' },
          { name: 'Mara Gabrilli', party: 'PSD', mandate: '2019 - 2027' },
          { name: 'Giordano', party: 'MDB', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado de São Paulo (TJSP)',
        jurisdiction: 'Estadual',
        seat: 'Palácio da Justiça, São Paulo'
      }
    },
    SE: {
      id: 'SE',
      name: 'Sergipe',
      region: 'Nordeste',
      capital: 'Aracaju',
      population: '2.210.004 hab.',
      area: '21.925 km²',
      municipalitiesCount: 75,
      executive: {
        governor: 'Fábio Mitidieri',
        party: 'PSD',
        viceGovernor: 'Zezinho Sobral',
        viceParty: 'PDT',
        seat: 'Palácio Museu Olímpio Campos / Palácio de Despachos',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado de Sergipe (ALESE)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Laércio Oliveira', party: 'PP', mandate: '2023 - 2031' },
          { name: 'Alessandro Vieira', party: 'MDB', mandate: '2019 - 2027' },
          { name: 'Rogério Carvalho', party: 'PT', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado de Sergipe (TJSE)',
        jurisdiction: 'Estadual',
        seat: 'Aracaju'
      }
    },
    TO: {
      id: 'TO',
      name: 'Tocantins',
      region: 'Norte',
      capital: 'Palmas',
      population: '1.511.460 hab.',
      area: '277.466 km²',
      municipalitiesCount: 139,
      executive: {
        governor: 'Wanderlei Barbosa',
        party: 'REPUBLICANOS',
        viceGovernor: 'Laurez Moreira',
        viceParty: 'PDT',
        seat: 'Palácio Araguaia',
        mandate: '2023 - 2026'
      },
      legislative: {
        assembly: 'Assembleia Legislativa do Estado do Tocantins (ALETO)',
        stateDeputies: 24,
        federalDeputies: 8,
        senators: [
          { name: 'Professora Dorinha Seabra', party: 'UNIÃO', mandate: '2023 - 2031' },
          { name: 'Eduardo Gomes', party: 'PL', mandate: '2019 - 2027' },
          { name: 'Irajá', party: 'PSD', mandate: '2019 - 2027' }
        ]
      },
      judiciary: {
        court: 'Tribunal de Justiça do Estado do Tocantins (TJTO)',
        jurisdiction: 'Estadual',
        seat: 'Palmas'
      }
    }
  }
};
