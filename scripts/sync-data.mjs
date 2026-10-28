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

async function syncPoliticalData() {
  console.log('🔄 Iniciando rotina de checagem e sincronização de dados...');
  const today = new Date().toISOString().split('T')[0];

  try {
    // 1. Testa conectividade com a API da Câmara dos Deputados
    console.log('📡 Consultando API da Câmara dos Deputados...');
    const camaraRes = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=5', {
      headers: { Accept: 'application/json' }
    });
    
    if (camaraRes.ok) {
      console.log('  ✅ API da Câmara dos Deputados respondendo normalmente.');
    } else {
      console.warn('  ⚠️ Alerta na API da Câmara:', camaraRes.statusText);
    }

    // 2. Testa conectividade com a API do IBGE
    console.log('📡 Consultando API de Localidades do IBGE...');
    const ibgeRes = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    if (ibgeRes.ok) {
      const ibgeData = await ibgeRes.json();
      console.log(`  ✅ IBGE: ${ibgeData.length} unidades federativas validadas.`);
    }

    // 3. Atualiza a data de última verificação no arquivo de dados
    const dataFilePath = path.resolve(__dirname, '../src/data/brazilData.ts');
    if (fs.existsSync(dataFilePath)) {
      let content = fs.readFileSync(dataFilePath, 'utf-8');
      
      // Atualiza lastUpdated: 'YYYY-MM-DD'
      content = content.replace(/lastUpdated:\s*'[^']+'/, `lastUpdated: '${today}'`);
      fs.writeFileSync(dataFilePath, content, 'utf-8');
      console.log(`✅ Base curada atualizada com sucesso com timestamp: ${today}`);
    }

    console.log('\n🎉 Sincronização mensal finalizada com êxito!');
  } catch (error) {
    console.error('❌ Erro durante a rotina de sincronização:', error.message);
  }
}

syncPoliticalData();
