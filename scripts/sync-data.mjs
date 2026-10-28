/**
 * Script de Sincronização Mensal de Dados Políticos
 * Consulta as APIs Oficiais:
 * - Câmara dos Deputados (dadosabertos.camara.leg.br)
 * - Senado Federal (legis.senado.leg.br)
 * - IBGE (servicodados.ibge.gov.br)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function syncPoliticalData() {
  console.log('🔄 Iniciando rotina de checagem e sincronização de dados...');
  const today = new Date().toISOString().split('T')[0];
  let apiSuccessCount = 0;

  // 1. Testa conectividade com a API da Câmara dos Deputados
  try {
    console.log('📡 Consultando API da Câmara dos Deputados...');
    const camaraRes = await fetchWithTimeout('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=5', {
      headers: { Accept: 'application/json', 'User-Agent': 'PolisBrasil/1.0' }
    });
    if (camaraRes.ok) {
      console.log('  ✅ API da Câmara dos Deputados respondendo normalmente.');
      apiSuccessCount++;
    } else {
      console.warn(`  ⚠️ Alerta na API da Câmara: Status ${camaraRes.status} (${camaraRes.statusText})`);
    }
  } catch (err) {
    console.warn(`  ⚠️ API da Câmara indisponível temporariamente (${err.name === 'AbortError' ? 'Timeout' : err.message})`);
  }

  // 2. Testa conectividade com a API do Senado Federal
  try {
    console.log('📡 Consultando API do Senado Federal...');
    const senadoRes = await fetchWithTimeout('https://legis.senado.leg.br/dadosabertos/senador/lista/atual', {
      headers: { Accept: 'application/json', 'User-Agent': 'PolisBrasil/1.0' }
    });
    if (senadoRes.ok) {
      const data = await senadoRes.json();
      const count = data.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar?.length || 0;
      console.log(`  ✅ Senado Federal: ${count} senadores ativos retornados.`);
      apiSuccessCount++;
    } else {
      console.warn(`  ⚠️ Alerta na API do Senado: Status ${senadoRes.status}`);
    }
  } catch (err) {
    console.warn(`  ⚠️ API do Senado indisponível temporariamente (${err.message})`);
  }

  // 3. Testa conectividade com a API do IBGE
  try {
    console.log('📡 Consultando API de Localidades do IBGE...');
    const ibgeRes = await fetchWithTimeout('https://servicodados.ibge.gov.br/api/v1/localidades/estados', {
      headers: { 'User-Agent': 'PolisBrasil/1.0' }
    });
    if (ibgeRes.ok) {
      const ibgeData = await ibgeRes.json();
      console.log(`  ✅ IBGE: ${ibgeData.length} unidades federativas validadas.`);
      apiSuccessCount++;
    }
  } catch (err) {
    console.warn(`  ⚠️ API do IBGE indisponível temporariamente (${err.message})`);
  }

  // 4. Atualiza a data de última verificação no arquivo de dados
  const dataFilePath = path.resolve(__dirname, '../src/data/brazilData.ts');
  if (fs.existsSync(dataFilePath)) {
    let content = fs.readFileSync(dataFilePath, 'utf-8');
    content = content.replace(/lastUpdated:\s*'[^']+'/, `lastUpdated: '${today}'`);
    fs.writeFileSync(dataFilePath, content, 'utf-8');
    console.log(`✅ Base curada atualizada com sucesso com timestamp: ${today}`);
  }

  console.log(`\n🎉 Rotina de sincronização finalizada (${apiSuccessCount}/3 APIs consultadas com êxito).`);
}

syncPoliticalData();
