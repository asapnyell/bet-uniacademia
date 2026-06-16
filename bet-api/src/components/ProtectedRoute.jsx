import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedProfile }) {
  const { user, loading, authenticated } = useAuth();

  if (loading) {
    return <div className="p-6 text-center text-xs font-mono">Carregando barreira de segurança...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedProfile && user.perfil !== allowedProfile) {
    return <Navigate to={user.perfil === 'administrador' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}