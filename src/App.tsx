import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;