import React from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

export function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <FavoriteProvider>
          <AppRoutes />
        </FavoriteProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
