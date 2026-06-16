import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import CriarEvento from '../pages/CriarEvento';
import UserDashboard from '../pages/UserDashboard';
import Apostar from '../pages/Apostar';
import Historico from '../pages/Historico';
import Ranking from '../pages/Ranking';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={
        <ProtectedRoute allowedProfile="administrador">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/criar" element={
        <ProtectedRoute allowedProfile="administrador">
          <CriarEvento />
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute allowedProfile="jogador">
          <UserDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/apostar" element={
        <ProtectedRoute allowedProfile="jogador">
          <Apostar />
        </ProtectedRoute>
      } />
      
      <Route path="/historico" element={
        <ProtectedRoute allowedProfile="jogador">
          <Historico />
        </ProtectedRoute>
      } />
      
      <Route path="/ranking" element={
        <ProtectedRoute allowedProfile="jogador">
          <Ranking />
        </ProtectedRoute>
      } />

      <Route path="*" element={<div className="p-8 text-center font-mono">Página não encontrada (404).</div>} />
    </Routes>
  );
}