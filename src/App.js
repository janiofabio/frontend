import React from 'react';

function App() {
  return (
    <div>
      <header>
        <h1>NutriSys - Controle de Estoque</h1>
      </header>
      <nav id="sidebar">
        <ul>
          <li><a href="#login">Login</a></li>
          <li><a href="#cadastro">Cadastro</a></li>
          <li><a href="#fornecedores">Fornecedores</a></li>
          <li><a href="#produtos">Produtos</a></li>
          <li><a href="#estoque">Estoque</a></li>
          <li><a href="#movimentacoes">Movimentações</a></li>
          <li><a href="#consultas">Consultas</a></li>
        </ul>
      </nav>
      <main id="content">
        <p>Bem-vindo ao sistema NutriSys!</p>
        <p>Escolha uma funcionalidade no menu lateral para começar.</p>
      </main>
    </div>
  );
}

export default App;
