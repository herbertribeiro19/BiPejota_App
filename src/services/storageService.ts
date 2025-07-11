import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TOKEN: '@BiPejota:token',
  USER_ID: '@BiPejota:userId',
  USER_DATA: '@BiPejota:userData',
};

export const storageService = {
  // Salvar token
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      console.log('Erro ao salvar token:', error);
      throw error;
    }
  },

  // Buscar token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.log('Erro ao buscar token:', error);
      return null;
    }
  },

  // Salvar userId
  async saveUserId(userId: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, userId.toString());
    } catch (error) {
      console.log('Erro ao salvar userId:', error);
      throw error;
    }
  },

  // Buscar userId
  async getUserId(): Promise<number | null> {
    try {
      const userId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
      return userId ? parseInt(userId, 10) : null;
    } catch (error) {
      console.log('Erro ao buscar userId:', error);
      return null;
    }
  },

  // Salvar dados do usuário
  async saveUserData(userData: any): Promise<void> {
    try {
      if (!userData) {
        console.warn('Tentativa de salvar dados do usuário undefined/null');
        return;
      }
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      console.log('Erro ao salvar dados do usuário:', error);
      throw error;
    }
  },

  // Buscar dados do usuário
  async getUserData(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.log('Erro ao buscar dados do usuário:', error);
      return null;
    }
  },

  // Limpar todos os dados de autenticação
  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER_ID,
        STORAGE_KEYS.USER_DATA,
      ]);
    } catch (error) {
      console.log('Erro ao limpar dados de autenticação:', error);
      throw error;
    }
  },

  // Verificar se existe token salvo
  async hasToken(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
}; 