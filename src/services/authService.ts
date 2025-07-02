import { api, ApiResponse, ErrorResponse } from './api';
import { storageService } from './storageService';

// Tipos para autenticação
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Estrutura real da resposta da API
export interface AuthResponse {
  message: string;
  token: string;
  userId: number;
}

// Serviço de autenticação
export const authService = {
  // Registrar novo usuário
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      
      // Salvar token e userId no storage
      await storageService.saveToken(response.data.token);
      await storageService.saveUserId(response.data.userId);
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  // Fazer login
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      
      console.log('Resposta da API:', response.data);
      
      // Salvar token e userId no storage
      await storageService.saveToken(response.data.token);
      await storageService.saveUserId(response.data.userId);
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  // Buscar dados do usuário logado
  async getMe(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error: any) {
      // Se o endpoint não existir, criar usuário temporário
      console.log('⚠️ Endpoint /auth/me não encontrado, criando usuário temporário');
      const { userId } = await this.getStoredAuthData();
      
      // Retornar usuário temporário baseado no userId
      return {
        id: userId?.toString() || '0',
        name: 'Usuário',
        email: 'usuario@email.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  // Fazer logout
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error: any) {
      // Mesmo com erro, consideramos logout realizado
      console.log('Logout error:', error);
    } finally {
      // Sempre limpar os dados locais
      await storageService.clearAuthData();
    }
  },

  // Verificar se está autenticado
  async isAuthenticated(): Promise<boolean> {
    return await storageService.hasToken();
  },

  // Buscar dados salvos
  async getStoredAuthData(): Promise<{ token: string | null; userId: number | null }> {
    const token = await storageService.getToken();
    const userId = await storageService.getUserId();
    return { token, userId };
  },

  // Tratar erros da API
  handleError(error: any): ErrorResponse {
    if (error.response?.data) {
      return {
        success: false,
        message: error.response.data.message || 'Erro na requisição',
        errors: error.response.data.errors,
      };
    }
    
    if (error.request) {
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet.',
      };
    }
    
    return {
      success: false,
      message: error.message || 'Erro desconhecido',
    };
  },
};