import React, { useState } from 'react';
import htm from 'htm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthState.js';

const html = htm.bind(React.createElement);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await login(email, password);

    if (error) {
      setError(error.message || 'Invalid login credentials');
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return html`
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">HEADY ADMIN</h1>
          <p className="text-slate-400">Sign in to manage your store</p>
        </div>

        ${error && html`
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            ${error}
          </div>
        `}

        <form onSubmit=${handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              required
              value=${email}
              onChange=${(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="admin@heady.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              required
              value=${password}
              onChange=${(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled=${loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors active:scale-[0.98] disabled:opacity-50"
          >
            ${loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Assessment Sample Login</p>
          <p className="text-sm text-slate-400 mt-2">Email: admin@heady.com</p>
          <p className="text-sm text-slate-400">Password: admin123</p>
        </div>
      </div>
    </div>
  `;
}
