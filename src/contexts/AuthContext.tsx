import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, RegisterData, LoginData, User } from '../services/authService';
import { useToast } from '../hooks/useToast';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    initializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { toast, showError, showSuccess, hideToast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);

    // Verificar autenticação ao iniciar o app
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            console.log('Verificando status de autenticação...');

            const hasToken = await authService.isAuthenticated();
            console.log('Token encontrado:', hasToken);

            if (hasToken) {
                // Se tem token, buscar dados do usuário salvos
                console.log('Buscando dados do usuário...');
                const userData = await authService.getStoredUser();

                if (userData) {
                    console.log('Usuário autenticado:', userData);
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    console.log('Dados do usuário não encontrados');
                    await authService.logout();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                console.log('Nenhum token encontrado');
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            showError("Erro ao verificar autenticação, tente novamente.");
            // Em caso de erro, limpar dados
            await authService.logout();
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            console.log('Verificação de autenticação concluída');
            setInitializing(false);
        }
    };

    const login = async (data: LoginData) => {
        try {
            setLoading(true);
            console.log('Iniciando login...');

            await authService.login(data);
            console.log('Login realizado com sucesso');

            // Aguardar 1 segundo antes de definir como autenticado
            setTimeout(async () => {
                // Tentar buscar dados completos do usuário via API
                const userData = await authService.getMe();
                if (userData) {
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            }, 1000);

        } catch (error: any) {
            showError("Erro ao fazer login, tente novamente.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setLoading(true);
            console.log('Iniciando registro...');

            await authService.register(data);
            console.log('Registro realizado com sucesso');

            // Não definir como autenticado após registro
            // O usuário deve fazer login para ser autenticado

        } catch (error: any) {
            showError("Erro ao criar conta, tente novamente.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            console.log('Fazendo logout...');
            await authService.logout();
        } catch (error) {
            showError("Erro ao sair da conta, tente novamente.");
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            console.log('Logout concluído');
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading,
        initializing,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};