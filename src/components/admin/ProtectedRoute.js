import React from 'react';
import { Navigate } from 'react-router-dom';
import htm from 'htm';
import { useAuth } from '../../context/AuthState.js';

const html = htm.bind(React.createElement);

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return html`<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Verifying access...</div>`;
  }

  if (!user || !isAdmin) {
    return html`<${Navigate} to="/admin/login" replace />`;
  }

  return children;
}
