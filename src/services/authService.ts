import { api } from './api';
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

// Serviço de autenticação simplificado
export const authService = {
  // Registrar novo usuário
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log('Enviando dados para registro:', data);
      const response = await api.post<AuthResponse>('/auth/register', data);
      console.log('Resposta da API:', response.data);
      
      // Não salvar token no registro - apenas retornar sucesso
      // O token será salvo apenas no login
      
      return response.data;
    } catch (error: any) {
      // console.error('Erro no registro:', error);
      throw error.response ? error.response.data : "Erro ao registrar usuário";
    }
  },

  // Fazer login
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('Enviando dados para login:', data);
      const response = await api.post<AuthResponse>('/auth/login', data);
      console.log('Resposta da API:', response.data);
      
      // Criar objeto usuário baseado na resposta
      const user: User = {
        id: response.data.userId.toString(),
        name: data.email.split('@')[0], // Usar parte do email como nome temporário
        email: data.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      console.log('Objeto usuário criado:', user);
      
      // Salvar token e dados do usuário no storage
      await storageService.saveToken(response.data.token);
      await storageService.saveUserData(user);
      
      return response.data;
    } catch (error: any) {
      // console.error('Erro no login:', error);
      throw error.response ? error.response.data : "Erro ao fazer login";
    }
  },

  // Fazer logout
  async logout(): Promise<void> {
    try {
      // Limpar dados locais
      await storageService.clearAuthData();
    } catch (error) {
      // console.error('Erro ao fazer logout:', error);
    }
  },

  // Verificar se está autenticado
  async isAuthenticated(): Promise<boolean> {
    return await storageService.hasToken();
  },

  // Buscar dados do usuário salvo
  async getStoredUser(): Promise<User | null> {
    return await storageService.getUserData();
  },

  // Buscar dados completos do usuário da API
  async getMe(): Promise<User | null> {
    try {
      const response = await api.get<User>('/auth/me');
      const userData = response.data;
      
      // Salvar dados atualizados
      await storageService.saveUserData(userData);
      
      return userData;
    } catch (error: any) {
      console.log('Endpoint /auth/me não disponível, usando dados salvos');
      return await this.getStoredUser();
    }
  },
};