import React, { useState, useEffect, createContext, useContext } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export const RouterContext = createContext({
  currentPath: '/',
  navigate: () => {}
});

export function useRouter() {
  return useContext(RouterContext);
}

// Router Provider
export function Router({ children }) {
  const [currentPath, setCurrentPath] = useState(
    () => window.location.hash.replace('#', '') || '/'
  );

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
  };

  return html`
    <${RouterContext.Provider} value=${{ currentPath, navigate }}>
      ${children}
    </${RouterContext.Provider}>
  `;
}

// Custom Link Component
export function Link({ to, children, className = '' }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return html`
    <a href=${`#${to}`} onClick=${handleClick} className=${className}>
      ${children}
    </a>
  `;
}
