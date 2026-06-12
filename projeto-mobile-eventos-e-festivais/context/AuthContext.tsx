import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Usuario = {
  nome: string;
  email: string;
};

type AuthContextValue = {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AUTH_KEY = '@EventosFestivais:usuario';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const storedUser = await AsyncStorage.getItem(AUTH_KEY);
        if (storedUser) {
          setUsuario(JSON.parse(storedUser));
        }
      } catch (error) {
        console.warn('Erro ao carregar usuario salvo.', error);
      } finally {
        setIsLoadingAuth(false);
      }
    }

    carregarUsuario();
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo || senha.trim().length < 3) {
      throw new Error('Informe um e-mail e uma senha com pelo menos 3 caracteres.');
    }

    const novoUsuario: Usuario = {
      email: emailLimpo,
      nome: emailLimpo.split('@')[0] || 'Usuario',
    };

    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUsuario(null);
  }, []);

  const value = useMemo(
    () => ({
      usuario,
      isAuthenticated: !!usuario,
      isLoadingAuth,
      login,
      logout,
    }),
    [usuario, isLoadingAuth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
