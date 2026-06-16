import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('@BetAcademica:usuario');
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal));
    }
    setCarregando(false);
  }, []);

  const login = async (email) => {
    try {
      const resposta = await api.get(`/usuarios?email=${email}`);
      if (resposta.data.length > 0) {
        const usuarioLogado = resposta.data[0];
        setUsuario(usuarioLogado);
        localStorage.setItem('@BetAcademica:usuario', JSON.stringify(usuarioLogado));
        return usuarioLogado.perfil; 
      } else {
        throw new Error('E-mail simulado não encontrado.');
      }
    } catch (erro) {
      alert(erro.message);
      return null;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('@BetAcademica:usuario');
  };

  const updateBalance = (novoSaldo) => {
    setUsuario((antigo) => {
      const atualizado = { ...antigo, saldo: novoSaldo };
      localStorage.setItem('@BetAcademica:usuario', JSON.stringify(atualizado));
      return atualizado;
    });
  };

  const syncDatabase = async () => {
    const usuarioLocal = localStorage.getItem('@BetAcademica:usuario');
    if (!usuarioLocal) return;
    try {
      const resposta = await api.get(`/usuarios/${JSON.parse(usuarioLocal).id}`);
      setUsuario(resposta.data);
      localStorage.setItem('@BetAcademica:usuario', JSON.stringify(resposta.data));
    } catch (erro) {
      console.error("Erro ao sincronizar dados com o banco:", erro);
    }
  };

  return (
    <AuthContext.Provider value={{ user: usuario, login, logout, updateBalance, syncDatabase, authenticated: !!usuario, loading: carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}