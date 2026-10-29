# 🇧🇷 Civitas Brasil - Hierarquia de Governo e Representação dos Estados

Uma aplicação web interativa e cívica projetada para visualizar a organização política dos 26 estados brasileiros e do Distrito Federal, detalhando seus representantes nos Poderes **Executivo**, **Legislativo** e **Judiciário**.

Deploy configurado para **GitHub Pages**.

---

## ✨ Funcionalidades

- **🗺️ Mapa Interativo do Brasil (SVG Vetorial):**
  - Contornos precisos com destaque ao passar o cursor (*hover*) e ao selecionar (*click*).
  - Cores temáticas divididas pelas 5 regiões (Norte, Nordeste, Centro-Oeste, Sudeste e Sul).
  - Indicadores circulares auxiliares para estados pequenos/litorâneos e o DF.
  - Navegação e seleção acessíveis via teclado e mouse.
- **🏛️ Painel dos Três Poderes:**
  - **Poder Executivo:** Governador, Vice-Governador, partidos, mandatos e sedes governamentais (Palácios).
  - **Poder Legislativo:**
    - Os 3 Senadores de cada unidade federativa no Congresso Nacional.
    - Assembleia Legislativa Estadual (ALEs) e quantidade de Deputados Estaduais.
    - Bancada de Deputados Federais, com consulta em tempo real à **API Oficial de Dados Abertos da Câmara dos Deputados** (traz fotos oficiais, partidos e e-mails parlamentares).
  - **Poder Judiciário:** Tribunais de Justiça Estaduais (TJs), sedes e jurisdições.
- **🇧🇷 Visão Geral da União:**
  - Quando nenhum estado está selecionado, exibe a hierarquia do Governo Federal (Presidência, Congresso Nacional e STF).
- **🔄 Arquitetura Híbrida de Dados:**
  - **Base Curada Local:** Carregamento ultrarrápido (0ms de latência), sem quedas ou bloqueios de requisição.
  - **Rotina de Sincronização Mensal:** Script automatizado (`npm run sync-data`) e fluxo programado no GitHub Actions (`.github/workflows/monthly-sync.yml`) para verificar e atualizar os dados a cada mês.

---

## 🚀 Como Rodar Localmente

Certifique-se de ter o **Node.js 18+** instalado em sua máquina.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

---

## 🛠️ Comandos Disponíveis

- `npm run dev` - Inicia o servidor local de desenvolvimento Vite.
- `npm run build` - Valida tipos com TypeScript e compila o bundle otimizado na pasta `dist/`.
- `npm run preview` - Pré-visualiza localmente o build de produção.
- `npm run sync-data` - Executa a rotina de validação e sincronização contra as APIs públicas oficiais.

---

## 🌐 Publicação no GitHub Pages

O projeto já inclui o workflow de deploy automático em `.github/workflows/deploy.yml`.

Para publicar:
1. Crie um repositório no seu GitHub e suba o código:
   ```bash
   git init
   git add .
   git commit -m "feat: versão inicial do Polis Brasil"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
2. No seu repositório no GitHub, acesse **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. A cada `git push` no branch `main`, o site será automaticamente construído e publicado!

---

## 📜 Fontes de Dados Oficiais
- **Câmara dos Deputados:** [dadosabertos.camara.leg.br](https://dadosabertos.camara.leg.br)
- **Senado Federal:** [legis.senado.leg.br](https://legis.senado.leg.br/dadosabertos)
- **IBGE:** [servicodados.ibge.gov.br](https://servicodados.ibge.gov.br)
- **Conselho Nacional de Justiça (CNJ):** [cnj.jus.br](https://www.cnj.jus.br)
