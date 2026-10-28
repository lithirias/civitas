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
      presidentPhoto: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%28ombros%29_denoise.jpg/330px-Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%28ombros%29_denoise.jpg',
      party: 'PT',
      vicePresident: 'Geraldo Alckmin',
      vicePhoto: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/08.08.2026_-_FOTOS_OFICIAIS_-_55450293534.jpg/330px-08.08.2026_-_FOTOS_OFICIAIS_-_55450293534.jpg',
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
        presidentName: 'Arthur Lira',
        presidentPhoto: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Lula_e_Lira_2022_%28cropped2%29.jpg/330px-Lula_e_Lira_2022_%28cropped2%29.jpg',
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
        presidentName: 'Rodrigo Pacheco',
        presidentPhoto: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Foto_oficial_2_Senador_Rodrigo_Pacheco.jpg/330px-Foto_oficial_2_Senador_Rodrigo_Pacheco.jpg',
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
        presidentName: 'Ministro Luís Roberto Barroso',
        presidentPhoto: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Ministro_Roberto_Barroso.jpg/330px-Ministro_Roberto_Barroso.jpg',
        seat: 'Praça dos Três Poderes, Brasília - DF',
        totalMinisters: 11,
        appointmentCriteria: 'Cidadãos entre 35 e 70 anos de notável saber jurídico e reputação ilibada, indicados pelo Presidente da República e aprovados por maioria absoluta do Senado Federal após sabatina pública (Art. 101 CF).',
        role: 'Guardião supremo da Constituição Federal. Julga Ações Diretas de Inconstitucionalidade (ADI), crimes comuns de autoridades federais com prerrogativa de função e recursos extraordinários com repercussão geral.',
        members: [
          {
            name: 'Luís Roberto Barroso',
            role: 'Presidente do STF',
            origin: 'Advocacia / Jurista (RJ)',
            appointedBy: 'Dilma Rousseff',
            startYear: 2013,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Ministro_Roberto_Barroso.jpg/330px-Ministro_Roberto_Barroso.jpg',
            notes: 'Ex-Procurador do Estado do RJ e Professor Titular de Direito Constitucional da UERJ.'
          },
          {
            name: 'Edson Fachin',
            role: 'Vice-Presidente do STF',
            origin: 'Advocacia / Jurista (PR)',
            appointedBy: 'Dilma Rousseff',
            startYear: 2015,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Edson_Fachin_%28cropped%29.jpg/330px-Edson_Fachin_%28cropped%29.jpg',
            notes: 'Professor Titular de Direito Civil da UFPR e ex-Presidente do TSE.'
          },
          {
            name: 'Gilmar Mendes',
            role: 'Decano da Corte',
            origin: 'Ministério Público Federal / AGU (MT)',
            appointedBy: 'Fernando Henrique Cardoso',
            startYear: 2002,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Gilmar_Mendes_2016.jpg/330px-Gilmar_Mendes_2016.jpg',
            notes: 'Ex-Advogado-Geral da União, ex-Presidente do STF e membro com maior tempo de atuação na Corte.'
          },
          {
            name: 'Cármen Lúcia',
            role: 'Ministra (Presidente do TSE)',
            origin: 'Advocacia / Procuradoria (MG)',
            appointedBy: 'Luiz Inácio Lula da Silva',
            startYear: 2006,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/C%C3%A1rmen_L%C3%BAcia_em_outubro_de_2019.jpg/330px-C%C3%A1rmen_L%C3%BAcia_em_outubro_de_2019.jpg',
            notes: 'Ex-Procuradora-Geral de Minas Gerais e ex-Presidente do STF (2016-2018).'
          },
          {
            name: 'Dias Toffoli',
            role: 'Ministro',
            origin: 'Advocacia / AGU (SP)',
            appointedBy: 'Luiz Inácio Lula da Silva',
            startYear: 2009,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Dias_Toffoli_em_outubro_de_2019.jpg/330px-Dias_Toffoli_em_outubro_de_2019.jpg',
            notes: 'Ex-Advogado-Geral da União, ex-Presidente do TSE e ex-Presidente do STF (2018-2020).'
          },
          {
            name: 'Luiz Fux',
            role: 'Ministro',
            origin: 'Magistratura de Carreira / STJ (RJ)',
            appointedBy: 'Dilma Rousseff',
            startYear: 2011,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/19.12.2025_-_Luiz_Fux.jpg/330px-19.12.2025_-_Luiz_Fux.jpg',
            notes: 'Ex-Ministro do STJ, ex-Desembargador do TJ-RJ e ex-Presidente do STF (2020-2022).'
          },
          {
            name: 'Alexandre de Moraes',
            role: 'Ministro',
            origin: 'Ministério Público / Ministério da Justiça (SP)',
            appointedBy: 'Michel Temer',
            startYear: 2017,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Ministro_Alexandre_de_Moraes_como_presidente_do_TSE.jpg/330px-Ministro_Alexandre_de_Moraes_como_presidente_do_TSE.jpg',
            notes: 'Ex-Ministro da Justiça, ex-Promotor de Justiça em SP e ex-Presidente do TSE (2022-2024).'
          },
          {
            name: 'Nunes Marques',
            role: 'Ministro (Vice-Presidente do TSE)',
            origin: 'Magistratura Federal / TRF-1 (PI)',
            appointedBy: 'Jair Bolsonaro',
            startYear: 2020,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Nunes_Marques%2C_February_2025_%28cropped%29.jpg/330px-Nunes_Marques%2C_February_2025_%28cropped%29.jpg',
            notes: 'Ex-Desembargador e Vice-Presidente do Tribunal Regional Federal da 1ª Região (TRF-1).'
          },
          {
            name: 'André Mendonça',
            role: 'Ministro',
            origin: 'Advocacia-Geral da União / MJSP (SP)',
            appointedBy: 'Jair Bolsonaro',
            startYear: 2021,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Ministro_Andr%C3%A9_Mendon%C3%A7a_em_outubro_de_2025_%283x4%29.jpg/330px-Ministro_Andr%C3%A9_Mendon%C3%A7a_em_outubro_de_2025_%283x4%29.jpg',
            notes: 'Ex-Advogado-Geral da União e ex-Ministro da Justiça e Segurança Pública.'
          },
          {
            name: 'Cristiano Zanin',
            role: 'Ministro',
            origin: 'Advocacia Privada (SP)',
            appointedBy: 'Luiz Inácio Lula da Silva',
            startYear: 2023,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Cristiano_Zanin_%28cropped%29.jpg/330px-Cristiano_Zanin_%28cropped%29.jpg',
            notes: 'Advogado especialista em litígios estratégicos, Direito Empresarial e Processo Penal.'
          },
          {
            name: 'Flávio Dino',
            role: 'Ministro',
            origin: 'Magistratura Federal / MJSP (MA)',
            appointedBy: 'Luiz Inácio Lula da Silva',
            startYear: 2024,
            photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Fl%C3%A1vio_Dino_no_voto_da_A%C3%A7%C3%A3o_Penal_%28AP%29_2668_%28cropped%29.jpg/330px-Fl%C3%A1vio_Dino_no_voto_da_A%C3%A7%C3%A3o_Penal_%28AP%29_2668_%28cropped%29.jpg',
            notes: 'Ex-Juiz Federal (1994-2006), ex-Governador do Maranhão, Senador e Ministro da Justiça e Segurança Pública.'
          }
        ]
      },
      superiorCourts: [
        {
          name: 'Superior Tribunal de Justiça',
          acronym: 'STJ',
          totalMinisters: 33,
          seat: 'Setor de Administração Federal Sul (SAFS), Brasília - DF',
          role: 'Conhecido como o "Tribunal da Cidadania", é o guardião e uniformizador da interpretação da legislação federal infraconstitucional em todo o território nacional. Julga Recursos Especiais (REsp) e crimes comuns praticados por Governadores de Estado e Desembargadores de Tribunais de Justiça.',
          compositionRule: '33 Ministros nomeados pelo Presidente da República após sabatina no Senado: 1/3 dentre Juízes de Tribunais Regionais Federais (TRFs), 1/3 dentre Desembargadores dos Tribunais de Justiça (TJs) e 1/3 alternadamente entre Advogados (OAB) e membros do Ministério Público (MPF e MPs Estaduais).',
          presidentName: 'Ministro Luis Felipe Salomão',
          vicePresidentName: 'Ministro Mauro Campbell Marques',
          members: [
            // 1/3 TRFs (11 ministros)
            { name: 'Francisco Falcão', role: 'Ministro', origin: 'TRF-5', category: 'TRF', appointedBy: 'Fernando Henrique Cardoso', startYear: 1999 },
            { name: 'Benedito Gonçalves', role: 'Ministro', origin: 'TRF-2', category: 'TRF', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2008 },
            { name: 'Isabel Gallotti', role: 'Ministra', origin: 'TRF-1', category: 'TRF', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2010 },
            { name: 'Regina Helena Costa', role: 'Ministra', origin: 'TRF-3', category: 'TRF', appointedBy: 'Dilma Rousseff', startYear: 2013 },
            { name: 'Gurgel de Faria', role: 'Ministro', origin: 'TRF-5', category: 'TRF', appointedBy: 'Dilma Rousseff', startYear: 2014 },
            { name: 'Reynaldo Soares da Fonseca', role: 'Ministro', origin: 'TRF-1', category: 'TRF', appointedBy: 'Dilma Rousseff', startYear: 2015 },
            { name: 'Ribeiro Dantas', role: 'Ministro', origin: 'TRF-5', category: 'TRF', appointedBy: 'Dilma Rousseff', startYear: 2015 },
            { name: 'Joel Ilan Paciornik', role: 'Ministro', origin: 'TRF-4', category: 'TRF', appointedBy: 'Dilma Rousseff', startYear: 2016 },
            { name: 'Messod Azulay Neto', role: 'Ministro', origin: 'TRF-2', category: 'TRF', appointedBy: 'Jair Bolsonaro', startYear: 2022 },
            { name: 'Paulo Sérgio Domingues', role: 'Ministro', origin: 'TRF-3', category: 'TRF', appointedBy: 'Jair Bolsonaro', startYear: 2022 },
            { name: 'Carlos Pires Brandão', role: 'Ministro', origin: 'TRF-1', category: 'TRF', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2025 },
            // 1/3 TJs (11 ministros)
            { name: 'Nancy Andrighi', role: 'Ministra', origin: 'TJ-DFT', category: 'TJ', appointedBy: 'Fernando Henrique Cardoso', startYear: 1999 },
            { name: 'Humberto Martins', role: 'Ministro', origin: 'TJ-AL', category: 'TJ', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2006 },
            { name: 'Luis Felipe Salomão', role: 'Presidente do STJ', origin: 'TJ-RJ', category: 'TJ', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2008 },
            { name: 'Og Fernandes', role: 'Ministro', origin: 'TJ-PE', category: 'TJ', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2008 },
            { name: 'Raul Araújo', role: 'Ministro', origin: 'TJ-CE', category: 'TJ', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2010 },
            { name: 'Marco Buzzi', role: 'Ministro', origin: 'TJ-SC', category: 'TJ', appointedBy: 'Dilma Rousseff', startYear: 2011 },
            { name: 'Marco Aurélio Bellizze', role: 'Ministro', origin: 'TJ-RJ', category: 'TJ', appointedBy: 'Dilma Rousseff', startYear: 2011 },
            { name: 'Moura Ribeiro', role: 'Ministro', origin: 'TJ-SP', category: 'TJ', appointedBy: 'Dilma Rousseff', startYear: 2013 },
            { name: 'Antonio Saldanha Palheiro', role: 'Ministro', origin: 'TJ-RJ', category: 'TJ', appointedBy: 'Dilma Rousseff', startYear: 2016 },
            { name: 'Teodoro Silva Santos', role: 'Ministro', origin: 'TJ-CE', category: 'TJ', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2023 },
            { name: 'José Afrânio Vilela', role: 'Ministro', origin: 'TJ-MG', category: 'TJ', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2023 },
            // 1/3 OAB e Ministério Público (11 ministros)
            { name: 'João Otávio de Noronha', role: 'Ministro', origin: 'OAB-DF', category: 'OAB/MP', appointedBy: 'Fernando Henrique Cardoso', startYear: 2002 },
            { name: 'Maria Thereza de Assis Moura', role: 'Ministra', origin: 'OAB-SP', category: 'OAB/MP', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2006 },
            { name: 'Herman Benjamin', role: 'Ministro', origin: 'MP-SP', category: 'OAB/MP', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2006 },
            { name: 'Mauro Campbell Marques', role: 'Vice-Presidente do STJ', origin: 'MP-AM', category: 'OAB/MP', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2008 },
            { name: 'Sebastião Reis Júnior', role: 'Ministro', origin: 'OAB-DF', category: 'OAB/MP', appointedBy: 'Dilma Rousseff', startYear: 2011 },
            { name: 'Antonio Carlos Ferreira', role: 'Ministro', origin: 'OAB-SP', category: 'OAB/MP', appointedBy: 'Dilma Rousseff', startYear: 2011 },
            { name: 'Ricardo Villas Bôas Cueva', role: 'Ministro', origin: 'OAB-SP', category: 'OAB/MP', appointedBy: 'Dilma Rousseff', startYear: 2011 },
            { name: 'Sérgio Kukina', role: 'Ministro', origin: 'MP-PR', category: 'OAB/MP', appointedBy: 'Dilma Rousseff', startYear: 2013 },
            { name: 'Rogerio Schietti Cruz', role: 'Ministro', origin: 'MP-DFT', category: 'OAB/MP', appointedBy: 'Dilma Rousseff', startYear: 2013 },
            { name: 'Daniela Teixeira', role: 'Ministra', origin: 'OAB-DF', category: 'OAB/MP', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2023 },
            { name: 'Marluce Caldas', role: 'Ministra', origin: 'MP-AL', category: 'OAB/MP', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2025 }
          ]
        },
        {
          name: 'Tribunal Superior Eleitoral',
          acronym: 'TSE',
          totalMinisters: 7,
          seat: 'Setor de Administração Federal Sul (SAFS), Brasília - DF',
          role: 'Instância máxima da Justiça Eleitoral brasileira. Responsável pela governança dos processos eleitorais, registro de candidaturas a cargos federais (Presidência e Vice), prestação de contas dos partidos políticos e diplomação dos eleitos.',
          compositionRule: 'No mínimo 7 ministros titulares: 3 Ministros do STF (que tradicionalmente ocupam a Presidência e a Vice-Presidência), 2 Ministros do STJ (um deles exercendo a Corregedoria-Geral Eleitoral) e 2 Juristas da advocacia indicados pelo STF e nomeados pelo Presidente da República.',
          presidentName: 'Ministra Cármen Lúcia',
          vicePresidentName: 'Ministro Nunes Marques',
          members: [
            {
              name: 'Cármen Lúcia',
              role: 'Presidente do TSE',
              origin: 'Supremo Tribunal Federal (STF)',
              category: 'STF',
              appointedBy: 'Eleita pelo STF',
              startYear: 2024,
              photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/C%C3%A1rmen_L%C3%BAcia_em_outubro_de_2019.jpg/330px-C%C3%A1rmen_L%C3%BAcia_em_outubro_de_2019.jpg',
              notes: 'Ministra Titular da vaga do STF'
            },
            {
              name: 'Nunes Marques',
              role: 'Vice-Presidente do TSE',
              origin: 'Supremo Tribunal Federal (STF)',
              category: 'STF',
              appointedBy: 'Eleito pelo STF',
              startYear: 2024,
              photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Nunes_Marques%2C_February_2025_%28cropped%29.jpg/330px-Nunes_Marques%2C_February_2025_%28cropped%29.jpg',
              notes: 'Ministro Titular da vaga do STF'
            },
            {
              name: 'André Mendonça',
              role: 'Ministro Titular',
              origin: 'Supremo Tribunal Federal (STF)',
              category: 'STF',
              appointedBy: 'Eleito pelo STF',
              startYear: 2024,
              photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Ministro_Andr%C3%A9_Mendon%C3%A7a_em_outubro_de_2025_%283x4%29.jpg/330px-Ministro_Andr%C3%A9_Mendon%C3%A7a_em_outubro_de_2025_%283x4%29.jpg',
              notes: 'Ministro Titular da vaga do STF'
            },
            {
              name: 'Raul Araújo',
              role: 'Ministro Titular',
              origin: 'Superior Tribunal de Justiça (STJ)',
              category: 'STJ',
              appointedBy: 'Eleito pelo STJ',
              startYear: 2022,
              notes: 'Ministro Titular da vaga do STJ'
            },
            {
              name: 'Isabel Gallotti',
              role: 'Corregedora-Geral da Justiça Eleitoral',
              origin: 'Superior Tribunal de Justiça (STJ)',
              category: 'STJ',
              appointedBy: 'Eleita pelo STJ',
              startYear: 2023,
              notes: 'Ministra Titular da vaga do STJ e Corregedora-Geral'
            },
            {
              name: 'Floriano Peixoto de Azevedo Marques Neto',
              role: 'Ministro Titular',
              origin: 'Classe dos Juristas / Advocacia',
              category: 'Advocacia / Jurista',
              appointedBy: 'Luiz Inácio Lula da Silva',
              startYear: 2023,
              notes: 'Professor Titular da Faculdade de Direito da USP'
            },
            {
              name: 'André Ramos Tavares',
              role: 'Ministro Titular',
              origin: 'Classe dos Juristas / Advocacia',
              category: 'Advocacia / Jurista',
              appointedBy: 'Luiz Inácio Lula da Silva',
              startYear: 2023,
              notes: 'Professor Titular da Faculdade de Direito da USP'
            }
          ]
        },
        {
          name: 'Tribunal Superior do Trabalho',
          acronym: 'TST',
          totalMinisters: 27,
          seat: 'Setor de Administração Federal Sul (SAFS), Brasília - DF',
          role: 'Instância máxima da Justiça do Trabalho no Brasil. Tem como atribuição principal pacificar a jurisprudência trabalhista, julgar recursos de revista, agravos regimentais e dissídios coletivos que ultrapassem a jurisdição de um Tribunal Regional do Trabalho.',
          compositionRule: '27 Ministros vitalícios indicados pelo Presidente da República e sabatinados pelo Senado: 1/5 dentre advogados com mais de 10 anos de efetiva atividade e membros do Ministério Público do Trabalho (MPT), e os demais 4/5 dentre Juízes de Tribunais Regionais do Trabalho (TRTs).',
          presidentName: 'Ministro Aloysio Corrêa da Veiga',
          vicePresidentName: 'Ministro Mauricio Godinho Delgado',
          members: [
            { name: 'Aloysio Corrêa da Veiga', role: 'Presidente do TST', origin: 'TRT-1 (RJ)', category: 'Magistratura TRT', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2004 },
            { name: 'Mauricio Godinho Delgado', role: 'Vice-Presidente do TST', origin: 'TRT-3 (MG)', category: 'Magistratura TRT', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2007 },
            { name: 'Luiz Philippe Vieira de Mello Filho', role: 'Corregedor-Geral da Justiça do Trabalho', origin: 'TRT-3 (MG)', category: 'Magistratura TRT', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2006 },
            { name: 'Ives Gandra Martins Filho', role: 'Ministro', origin: 'Ministério Público do Trabalho (MPT)', category: 'Quinto MPT', appointedBy: 'Fernando Henrique Cardoso', startYear: 1999 },
            { name: 'Dora Maria da Costa', role: 'Ministra', origin: 'TRT-18 (GO)', category: 'Magistratura TRT', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2007 },
            { name: 'Kátia Magalhães Arruda', role: 'Ministra', origin: 'TRT-7 (CE)', category: 'Magistratura TRT', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2008 },
            { name: 'Augusto César Leite de Carvalho', role: 'Ministro', origin: 'TRT-20 (SE)', category: 'Magistratura TRT', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2009 },
            { name: 'José Roberto Freire Pimenta', role: 'Ministro', origin: 'TRT-3 (MG)', category: 'Magistratura TRT', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2010 },
            { name: 'Delaíde Miranda Arantes', role: 'Ministra', origin: 'OAB (GO)', category: 'Quinto OAB', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2011 },
            { name: 'Hugo Carlos Scheuermann', role: 'Ministro', origin: 'TRT-4 (RS)', category: 'Magistratura TRT', appointedBy: 'Dilma Rousseff', startYear: 2012 },
            { name: 'Alexandre de Souza Agra Belmonte', role: 'Ministro', origin: 'TRT-1 (RJ)', category: 'Magistratura TRT', appointedBy: 'Dilma Rousseff', startYear: 2012 },
            { name: 'Cláudio Mascarenhas Brandão', role: 'Ministro', origin: 'TRT-5 (BA)', category: 'Magistratura TRT', appointedBy: 'Dilma Rousseff', startYear: 2013 },
            { name: 'Douglas Alencar Rodrigues', role: 'Ministro', origin: 'TRT-10 (DF)', category: 'Magistratura TRT', appointedBy: 'Dilma Rousseff', startYear: 2014 },
            { name: 'Maria Helena Mallmann', role: 'Ministra', origin: 'TRT-4 (RS)', category: 'Magistratura TRT', appointedBy: 'Dilma Rousseff', startYear: 2014 },
            { name: 'Sergio Pinto Martins', role: 'Ministro', origin: 'TRT-2 (SP)', category: 'Magistratura TRT', appointedBy: 'Jair Bolsonaro', startYear: 2022 },
            { name: 'Evandro Valadão', role: 'Ministro', origin: 'TRT-1 (RJ)', category: 'Magistratura TRT', appointedBy: 'Jair Bolsonaro', startYear: 2019 },
            { name: 'Morgana de Almeida Richa', role: 'Ministra', origin: 'TRT-9 (PR)', category: 'Magistratura TRT', appointedBy: 'Jair Bolsonaro', startYear: 2021 },
            { name: 'Amaury Rodrigues Pinto Junior', role: 'Ministro', origin: 'TRT-24 (MS)', category: 'Magistratura TRT', appointedBy: 'Jair Bolsonaro', startYear: 2021 },
            { name: 'Alberto Bastos Balazeiro', role: 'Ministro', origin: 'Ministério Público do Trabalho (MPT)', category: 'Quinto MPT', appointedBy: 'Jair Bolsonaro', startYear: 2021 },
            { name: 'Liana Chaib', role: 'Ministra', origin: 'TRT-22 (PI)', category: 'Magistratura TRT', appointedBy: 'Jair Bolsonaro', startYear: 2022 },
            { name: 'Antônio Fabrício de Campos Gonçalves', role: 'Ministro', origin: 'OAB (MG)', category: 'Quinto OAB', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2024 }
          ]
        },
        {
          name: 'Superior Tribunal Militar',
          acronym: 'STM',
          totalMinisters: 15,
          seat: 'Praça dos Tribunais Superiores, SAS, Brasília - DF',
          role: 'Cúpula da Justiça Militar da União, sendo a mais antiga corte superior do Brasil (criada em 1808 pelo Príncipe Regente D. João VI). Processa e julga em grau de recurso os crimes militares tipificados no Código Penal Militar cometidos por militares das Três Forças Armadas e civis contra instituições e bens militares.',
          compositionRule: '15 Ministros togados e vitalícios nomeados pelo Presidente da República após aprovação do Senado: 3 Oficiais-Generais da Marinha da ativa, 4 Oficiais-Generais do Exército da ativa, 3 Oficiais-Generais da Aeronáutica da ativa e 5 Ministros Civis (3 advogados com notório saber jurídico e 2 oriundos da magistratura militar ou MPM).',
          presidentName: 'Ministra Dra. Maria Elizabeth Rocha',
          vicePresidentName: 'Tenente-Brigadeiro do Ar Francisco Joseli Parente Camelo',
          members: [
            { name: 'Dra. Maria Elizabeth Guimarães Teixeira Rocha', role: 'Presidente do STM', origin: 'Advocacia Civil', category: 'Civil', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2007, notes: 'Primeira mulher a presidir a mais antiga Corte Superior do Brasil em 217 anos.' },
            { name: 'Ten.-Brig. Ar Francisco Joseli Parente Camelo', role: 'Vice-Presidente do STM', origin: 'Força Aérea Brasileira', category: 'Aeronáutica', appointedBy: 'Dilma Rousseff', startYear: 2015 },
            // Marinha (3)
            { name: 'Almirante de Esquadra Leonardo Puntel', role: 'Ministro', origin: 'Marinha do Brasil', category: 'Marinha', appointedBy: 'Jair Bolsonaro', startYear: 2020 },
            { name: 'Almirante de Esquadra Celso Luiz Nazareth', role: 'Ministro', origin: 'Marinha do Brasil', category: 'Marinha', appointedBy: 'Jair Bolsonaro', startYear: 2020 },
            { name: 'Almirante de Esquadra Claudio Portugal de Viveiros', role: 'Ministro', origin: 'Marinha do Brasil', category: 'Marinha', appointedBy: 'Jair Bolsonaro', startYear: 2021 },
            // Exército (4)
            { name: 'General de Exército Lúcio Mário de Barros Góes', role: 'Ministro', origin: 'Exército Brasileiro', category: 'Exército', appointedBy: 'Dilma Rousseff', startYear: 2012 },
            { name: 'General de Exército Lourival Carvalho Silva', role: 'Ministro', origin: 'Exército Brasileiro', category: 'Exército', appointedBy: 'Jair Bolsonaro', startYear: 2022 },
            { name: 'General de Exército Marco Antônio de Farias', role: 'Ministro', origin: 'Exército Brasileiro', category: 'Exército', appointedBy: 'Dilma Rousseff', startYear: 2015 },
            { name: 'General de Exército Odilson Sampaio Benzi', role: 'Ministro', origin: 'Exército Brasileiro', category: 'Exército', appointedBy: 'Dilma Rousseff', startYear: 2014 },
            // Aeronáutica (3)
            { name: 'Ten.-Brig. Ar Carlos Augusto Amaral Oliveira', role: 'Ministro', origin: 'Força Aérea Brasileira', category: 'Aeronáutica', appointedBy: 'Jair Bolsonaro', startYear: 2020 },
            { name: 'Ten.-Brig. Ar Carlos Vuyk de Aquino', role: 'Ministro', origin: 'Força Aérea Brasileira', category: 'Aeronáutica', appointedBy: 'Michel Temer', startYear: 2018 },
            // Civis (demais)
            { name: 'Dr. José Coêlho Ferreira', role: 'Ministro (Decano)', origin: 'Advocacia Civil', category: 'Civil', appointedBy: 'Fernando Henrique Cardoso', startYear: 2001 },
            { name: 'Dr. Artur Vidigal de Oliveira', role: 'Ministro', origin: 'Advocacia Civil', category: 'Civil', appointedBy: 'Luiz Inácio Lula da Silva', startYear: 2010 },
            { name: 'Dr. Péricles Aurélio Lima de Queiroz', role: 'Ministro', origin: 'Ministério Público Militar (MPM)', category: 'Civil', appointedBy: 'Michel Temer', startYear: 2018 },
            { name: 'Dr. Carlos Augusto Gomes Rogério', role: 'Ministro', origin: 'Magistratura Militar de 1ª Instância', category: 'Civil', appointedBy: 'Jair Bolsonaro', startYear: 2022 }
          ]
        }
      ],
      cnj: {
        name: 'Conselho Nacional de Justiça (CNJ)',
        totalMembers: 15,
        role: 'Órgão de cúpula do controle administrativo e financeiro de todo o Poder Judiciário nacional, além da fiscalização do cumprimento dos deveres éticos e disciplinares dos magistrados de todas as instâncias.',
        compositionRule: 'Composto por 15 membros com mandato de 2 anos (admitida uma recondução). É presidido pelo Presidente do STF e conta com representantes do STJ, TST, Desembargadores de TJ, Juízes Federais, Juízes Estaduais, Juízes do Trabalho, Ministério Público da União e dos Estados, Advogados indicados pelo CFOAB e Cidadãos indicados pela Câmara e pelo Senado.'
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
    },
    essentialToJustice: {
      title: 'Funções Essenciais à Justiça (Título IV, Cap. IV da CF/88)',
      description: 'Instituições autônomas e permanentes encarregadas da defesa da ordem jurídica, dos direitos fundamentais, do patrimônio público e da representação judicial e extrajudicial.',
      publicProsecution: {
        name: 'Ministério Público da União (MPU)',
        headTitle: 'Procurador-Geral da República (PGR)',
        headName: 'Paulo Gonet Branco',
        headPhoto: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Paulo_Gonet_Branco_%28cropped%29.jpg/330px-Paulo_Gonet_Branco_%28cropped%29.jpg',
        seat: 'Setor de Administração Federal Sul (SAFS), Brasília - DF',
        role: 'Instituição autônoma indispensável à função jurisdicional do Estado, incumbida da defesa da ordem jurídica, do regime democrático e dos interesses sociais e individuais indisponíveis. O PGR atua perante o STF e TSE.',
        branches: [
          'Ministério Público Federal (MPF)',
          'Ministério Público do Trabalho (MPT)',
          'Ministério Público Militar (MPM)',
          'Ministério Público do Distrito Federal e Territórios (MPDFT)'
        ],
        cnmp: {
          name: 'Conselho Nacional do Ministério Público (CNMP)',
          totalMembers: 14,
          role: 'Órgão de controle da atuação administrativa e financeira do Ministério Público de todo o Brasil e do cumprimento dos deveres funcionais de seus membros.'
        }
      },
      publicAdvocacy: {
        name: 'Advocacia-Geral da União (AGU)',
        headTitle: 'Advogado-Geral da União',
        headName: 'Jorge Messias',
        seat: 'Esplanada dos Ministérios, Brasília - DF',
        role: 'Instituição que representa judicial e extrajudicialmente a União, prestando serviços de consultoria e assessoramento jurídico ao Poder Executivo Federal.'
      },
      publicDefenders: {
        name: 'Defensoria Pública da União (DPU)',
        headTitle: 'Defensor Público-Geral Federal',
        headName: 'Leonardo Cardoso de Magalhães',
        seat: 'Setor Bancário Norte (SBN), Brasília - DF',
        role: 'Instituição permanente e essencial à função jurisdicional do Estado, que garante orientação jurídica, promoção dos direitos humanos e defesa integral e gratuita aos necessitados perante a Justiça Federal.'
      },
      privateAdvocacy: {
        name: 'Advocacia e Ordem dos Advogados do Brasil (CFOAB)',
        role: 'O advogado é indispensável à administração da justiça (Art. 133 CF), sendo inviolável por seus atos e manifestações no exercício da profissão nos limites da lei.'
      }
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
      capitalCity: {
        mayor: 'Tião Bocalom',
        party: 'PL',
        viceMayor: 'Alysson Bestene',
        councilorsCount: 21,
        term: '2025–2028'
      },
      executive: {
        governor: 'Gladson Cameli',
        party: 'PP',
        viceGovernor: 'Mailza Gomes',
        viceParty: 'PP',
        seat: 'Palácio Rio Branco',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Retrato_oficial_Gladson_Cameli_2019.jpg/330px-Retrato_oficial_Gladson_Cameli_2019.jpg'
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
      capitalCity: {
        mayor: 'JHC (João Henrique Caldas)',
        party: 'PL',
        viceMayor: 'Rodrigo Cunha',
        councilorsCount: 27,
        term: '2025–2028'
      },
      executive: {
        governor: 'Paulo Dantas',
        party: 'MDB',
        viceGovernor: 'Ronaldo Lessa',
        viceParty: 'PDT',
        seat: 'Palácio República dos Palmares',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Paulo_Dantas_Foto_Oficial_%28cropped%29.jpg/330px-Paulo_Dantas_Foto_Oficial_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Dr. Furlan',
        party: 'MDB',
        viceMayor: 'Mário Neto',
        councilorsCount: 23,
        term: '2025–2028'
      },
      executive: {
        governor: 'Clécio Luís',
        party: 'Solidariedade',
        viceGovernor: 'Teles Júnior',
        viceParty: 'PDT',
        seat: 'Palácio do Setentrião',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Foto_oficial_do_governador_do_Estado_do_Amap%C3%A1%2C_Cl%C3%A9cio_Lu%C3%ADs.jpg/330px-Foto_oficial_do_governador_do_Estado_do_Amap%C3%A1%2C_Cl%C3%A9cio_Lu%C3%ADs.jpg'
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
      capitalCity: {
        mayor: 'David Almeida',
        party: 'Avante',
        viceMayor: 'Renato Júnior',
        councilorsCount: 41,
        term: '2025–2028'
      },
      executive: {
        governor: 'Wilson Lima',
        party: 'UNIÃO',
        viceGovernor: 'Tadeu de Souza',
        viceParty: 'Avante',
        seat: 'Palácio do Governo do Estado do Amazonas',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Wilson_Lima.jpg/330px-Wilson_Lima.jpg'
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
      capitalCity: {
        mayor: 'Bruno Reis',
        party: 'União Brasil',
        viceMayor: 'Ana Paula Matos',
        councilorsCount: 43,
        term: '2025–2028'
      },
      executive: {
        governor: 'Jerônimo Rodrigues',
        party: 'PT',
        viceGovernor: 'Geraldo Júnior',
        viceParty: 'MDB',
        seat: 'Palácio de Ondina',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/18_01_2023_-_Visita_de_Cortesia_Jer%C3%B4nimo_Rodrigues_%28Governador_do_Estado_da_Bahia-BA%29_%2852635213362%29_%28cropped%29.jpg/330px-18_01_2023_-_Visita_de_Cortesia_Jer%C3%B4nimo_Rodrigues_%28Governador_do_Estado_da_Bahia-BA%29_%2852635213362%29_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Evandro Leitão',
        party: 'PT',
        viceMayor: 'Gabriella Aguiar',
        councilorsCount: 43,
        term: '2025–2028'
      },
      executive: {
        governor: 'Elmano de Freitas',
        party: 'PT',
        viceGovernor: 'Jade Romero',
        viceParty: 'MDB',
        seat: 'Palácio da Abolição',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Plen%C3%A1rio_do_Congresso_%2854441463325%29.jpg/330px-Plen%C3%A1rio_do_Congresso_%2854441463325%29.jpg'
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
      capitalCity: {
        mayor: 'Sem Prefeito (Governo Direto)',
        party: 'Não aplicável',
        councilorsCount: 0,
        term: 'Constitucional',
        note: 'O Distrito Federal não pode ser dividido em Municípios (Art. 32 da CF/88). Suas atribuições municipais e estaduais são exercidas cumulativamente pelo Governador e pela CLDF.'
      },
      executive: {
        governor: 'Ibaneis Rocha',
        party: 'MDB',
        viceGovernor: 'Celina Leão',
        viceParty: 'PP',
        seat: 'Palácio do Buriti',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Ibaneis_Rocha%2C_January_2023_%28cropped%29.jpg/330px-Ibaneis_Rocha%2C_January_2023_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Lorenzo Pazolini',
        party: 'Republicanos',
        viceMayor: 'Cris Samorini',
        councilorsCount: 21,
        term: '2025–2028'
      },
      executive: {
        governor: 'Renato Casagrande',
        party: 'PSB',
        viceGovernor: 'Ricardo Ferraço',
        viceParty: 'MDB',
        seat: 'Palácio Anchieta',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Renato_Casagrande_em_mar%C3%A7o_de_2019.jpg/330px-Renato_Casagrande_em_mar%C3%A7o_de_2019.jpg'
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
      capitalCity: {
        mayor: 'Sandro Mabel',
        party: 'União Brasil',
        viceMayor: 'Cláudia Lira',
        councilorsCount: 37,
        term: '2025–2028'
      },
      executive: {
        governor: 'Ronaldo Caiado',
        party: 'UNIÃO',
        viceGovernor: 'Daniel Vilela',
        viceParty: 'MDB',
        seat: 'Palácio das Esmeraldas',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Foto_oficial_do_governador_de_Goi%C3%A1s%2C_Ronaldo_Caiado_em_2023_%28ombros%29.jpg/330px-Foto_oficial_do_governador_de_Goi%C3%A1s%2C_Ronaldo_Caiado_em_2023_%28ombros%29.jpg'
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
      capitalCity: {
        mayor: 'Eduardo Braide',
        party: 'PSD',
        viceMayor: 'Professora Esmênia',
        councilorsCount: 31,
        term: '2025–2028'
      },
      executive: {
        governor: 'Carlos Brandão',
        party: 'PSB',
        viceGovernor: 'Felipe Camarão',
        viceParty: 'PT',
        seat: 'Palácio dos Leões',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Retrato_Oficial_de_Carlos_Brand%C3%A3o_como_governador_do_Maranh%C3%A3o.jpg/330px-Retrato_Oficial_de_Carlos_Brand%C3%A3o_como_governador_do_Maranh%C3%A3o.jpg'
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
      capitalCity: {
        mayor: 'Abilio Brunini',
        party: 'PL',
        viceMayor: 'Cel. Vânia',
        councilorsCount: 27,
        term: '2025–2028'
      },
      executive: {
        governor: 'Mauro Mendes',
        party: 'UNIÃO',
        viceGovernor: 'Otaviano Pivetta',
        viceParty: 'REPUBLICANOS',
        seat: 'Palácio Paiaguás',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/2019_Reuni%C3%A3o_com_Ministros_da_Casa_Civil%2C_Defesa%2C_Rela%C3%A7%C3%B5es_Exteriores%2C_Meio_Ambiente%2C_Secretaria-Geral%2C_Secretaria_de_Governo%2C_GSI_e_Governadores_da_Amaz%C3%B4nia_Legal_-_48630502003_%28cropped%29_Mauro_Mendes.jpg/330px-thumbnail.jpg'
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
      capitalCity: {
        mayor: 'Adriane Lopes',
        party: 'PP',
        viceMayor: 'Dra. Camilla',
        councilorsCount: 29,
        term: '2025–2028'
      },
      executive: {
        governor: 'Eduardo Riedel',
        party: 'PSDB',
        viceGovernor: 'José Carlos Barbosa',
        viceParty: 'PP',
        seat: 'Governadoria de Mato Grosso do Sul',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Governador_Eduardo_Riedel.jpg/330px-Governador_Eduardo_Riedel.jpg'
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
      capitalCity: {
        mayor: 'Fuad Noman',
        party: 'PSD',
        viceMayor: 'Álvaro Damião',
        councilorsCount: 41,
        term: '2025–2028'
      },
      executive: {
        governor: 'Romeu Zema',
        party: 'NOVO',
        viceGovernor: 'Mateus Simões',
        viceParty: 'NOVO',
        seat: 'Palácio Tiradentes (Cidade Administrativa)',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Romeu_Zema_2025_%28cropped%29.jpg/330px-Romeu_Zema_2025_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Igor Normando',
        party: 'MDB',
        viceMayor: 'Cássio Andrade',
        councilorsCount: 35,
        term: '2025–2028'
      },
      executive: {
        governor: 'Helder Barbalho',
        party: 'MDB',
        viceGovernor: 'Hana Ghassan',
        viceParty: 'MDB',
        seat: 'Palácio do Governo do Pará',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Helder_Barbalho%2C_January_2023_%28cropped%29.jpg/330px-Helder_Barbalho%2C_January_2023_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Cícero Lucena',
        party: 'PP',
        viceMayor: 'Leo Bezerra',
        councilorsCount: 29,
        term: '2025–2028'
      },
      executive: {
        governor: 'João Azevêdo',
        party: 'PSB',
        viceGovernor: 'Lucas Ribeiro',
        viceParty: 'PP',
        seat: 'Palácio da Redenção',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Jo%C3%A3o_Azev%C3%AAdo%2C_May_2023_%28cropped%29.jpg/330px-Jo%C3%A3o_Azev%C3%AAdo%2C_May_2023_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Eduardo Pimentel',
        party: 'PSD',
        viceMayor: 'Paulo Martins',
        councilorsCount: 38,
        term: '2025–2028'
      },
      executive: {
        governor: 'Ratinho Júnior',
        party: 'PSD',
        viceGovernor: 'Darci Piana',
        viceParty: 'PSD',
        seat: 'Palácio Iguaçu',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Ratinho_J%C3%BAnior_as_governor_of_Paran%C3%A1%2C_January_2023_%28cropped%29.jpg/330px-Ratinho_J%C3%BAnior_as_governor_of_Paran%C3%A1%2C_January_2023_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'João Campos',
        party: 'PSB',
        viceMayor: 'Victor Marques',
        councilorsCount: 37,
        term: '2025–2028'
      },
      executive: {
        governor: 'Raquel Lyra',
        party: 'PSDB',
        viceGovernor: 'Priscila Krause',
        viceParty: 'CIDADANIA',
        seat: 'Palácio do Campo das Princesas',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/RL45_14-09.jpg/330px-RL45_14-09.jpg'
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
      capitalCity: {
        mayor: 'Silvio Mendes',
        party: 'União Brasil',
        viceMayor: 'Jeová Alencar',
        councilorsCount: 29,
        term: '2025–2028'
      },
      executive: {
        governor: 'Rafael Fonteles',
        party: 'PT',
        viceGovernor: 'Themístocles Filho',
        viceParty: 'MDB',
        seat: 'Palácio de Karnak',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Ipea_Recebe_o_Governador_do_Piau%C3%AD_Rafael_Fonteles_%2854119348754%29_%28cropped%29.jpg/330px-Ipea_Recebe_o_Governador_do_Piau%C3%AD_Rafael_Fonteles_%2854119348754%29_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Eduardo Paes',
        party: 'PSD',
        viceMayor: 'Eduardo Cavaliere',
        councilorsCount: 51,
        term: '2025–2028'
      },
      executive: {
        governor: 'Cláudio Castro',
        party: 'PL',
        viceGovernor: 'Thiago Pampolha',
        viceParty: 'MDB',
        seat: 'Palácio Guanabara',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Cl%C3%A1udio_Castro%2C_governador_do_Rio_de_Janeiro.jpg/330px-Cl%C3%A1udio_Castro%2C_governador_do_Rio_de_Janeiro.jpg'
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
      capitalCity: {
        mayor: 'Paulinho Freire',
        party: 'União Brasil',
        viceMayor: 'Joanna Guerra',
        councilorsCount: 29,
        term: '2025–2028'
      },
      executive: {
        governor: 'Fátima Bezerra',
        party: 'PT',
        viceGovernor: 'Walter Alves',
        viceParty: 'MDB',
        seat: 'Palácio de Despachos de Lagoa Nova',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/F%C3%A1tima_Bezerra%2C_2023.jpg/330px-F%C3%A1tima_Bezerra%2C_2023.jpg'
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
      capitalCity: {
        mayor: 'Sebastião Melo',
        party: 'MDB',
        viceMayor: 'Betina Worm',
        councilorsCount: 36,
        term: '2025–2028'
      },
      executive: {
        governor: 'Eduardo Leite',
        party: 'PSDB',
        viceGovernor: 'Gabriel Souza',
        viceParty: 'MDB',
        seat: 'Palácio Piratini',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/09.02.2026_%E2%80%93_Eduardo_Leite_in_February_2026_-_55087496770_%283x4%29.jpg/330px-09.02.2026_%E2%80%93_Eduardo_Leite_in_February_2026_-_55087496770_%283x4%29.jpg'
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
      capitalCity: {
        mayor: 'Léo Moraes',
        party: 'Podemos',
        viceMayor: 'Magna dos Anjos',
        councilorsCount: 23,
        term: '2025–2028'
      },
      executive: {
        governor: 'Marcos Rocha',
        party: 'UNIÃO',
        viceGovernor: 'Sérgio Gonçalves',
        viceParty: 'UNIÃO',
        seat: 'Palácio Rio Madeira',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Desfile_de_7_de_Setembro_08.09.22_Foto_Daiane_Mendon%C3%A7a_%28384%29_%2852342537421%29_%28cropped%29.jpg/330px-Desfile_de_7_de_Setembro_08.09.22_Foto_Daiane_Mendon%C3%A7a_%28384%29_%2852342537421%29_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Arthur Henrique',
        party: 'MDB',
        viceMayor: 'Tenente-Coronel Zeitoune',
        councilorsCount: 23,
        term: '2025–2028'
      },
      executive: {
        governor: 'Antonio Denarium',
        party: 'PP',
        viceGovernor: 'Edilson Damião',
        viceParty: 'REPUBLICANOS',
        seat: 'Palácio Senador Hélio Campos',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Foto_Governador_Antonio_Denarium.jpg/330px-Foto_Governador_Antonio_Denarium.jpg'
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
      capitalCity: {
        mayor: 'Topázio Neto',
        party: 'PSD',
        viceMayor: 'Maryanne Mattos',
        councilorsCount: 23,
        term: '2025–2028'
      },
      executive: {
        governor: 'Jorginho Mello',
        party: 'PL',
        viceGovernor: 'Marilisa Boehm',
        viceParty: 'PL',
        seat: 'Centro Administrativo do Governo de SC',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Governador_Jorginho_Mello_-_Foto_Eduardo_Valente_-_GOVSC-7.jpg/330px-Governador_Jorginho_Mello_-_Foto_Eduardo_Valente_-_GOVSC-7.jpg'
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
      capitalCity: {
        mayor: 'Ricardo Nunes',
        party: 'MDB',
        viceMayor: 'Cel. Mello Araújo',
        councilorsCount: 55,
        term: '2025–2028'
      },
      executive: {
        governor: 'Tarcísio de Freitas',
        party: 'REPUBLICANOS',
        viceGovernor: 'Felício Ramuth',
        viceParty: 'PSD',
        seat: 'Palácio dos Bandeirantes',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Governador_do_Estado_de_S%C3%A3o_Paulo%2C_Tarc%C3%ADsio_de_Freitas_-_Foto_Oficial_%28cropped%29.jpg/330px-Governador_do_Estado_de_S%C3%A3o_Paulo%2C_Tarc%C3%ADsio_de_Freitas_-_Foto_Oficial_%28cropped%29.jpg'
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
      capitalCity: {
        mayor: 'Emília Corrêa',
        party: 'PL',
        viceMayor: 'Ricardo Marques',
        councilorsCount: 26,
        term: '2025–2028'
      },
      executive: {
        governor: 'Fábio Mitidieri',
        party: 'PSD',
        viceGovernor: 'Zezinho Sobral',
        viceParty: 'PDT',
        seat: 'Palácio Museu Olímpio Campos / Palácio de Despachos',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Foto_oficial_do_governador_F%C3%A1bio_Mitidieri.jpg/330px-Foto_oficial_do_governador_F%C3%A1bio_Mitidieri.jpg'
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
      capitalCity: {
        mayor: 'Eduardo Siqueira Campos',
        party: 'Podemos',
        viceMayor: 'Pastor Carlos Eduardo',
        councilorsCount: 23,
        term: '2025–2028'
      },
      executive: {
        governor: 'Wanderlei Barbosa',
        party: 'REPUBLICANOS',
        viceGovernor: 'Laurez Moreira',
        viceParty: 'PDT',
        seat: 'Palácio Araguaia',
        mandate: '2023 - 2026',
        photoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Wanderlei_Barbosa.jpg/330px-Wanderlei_Barbosa.jpg'
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
