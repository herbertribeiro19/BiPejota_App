// Configurações da API
export const API_URL = __DEV__ 
  ? 'http://localhost:4020'  // Desenvolvimento
  : 'https://sua-api-producao.com'; // Produção

// Outras configurações
export const APP_CONFIG = {
  API_URL,
  TIMEOUT: 10000,
}; 