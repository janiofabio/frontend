import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente principal (App.js)
import '../src/styles/main.css'; // Importa os estilos, se existirem

// Obtém o elemento root do index.html
const rootElement = document.getElementById('app');

// Cria a raiz do React
const root = ReactDOM.createRoot(rootElement);

// Renderiza o componente principal (App)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
