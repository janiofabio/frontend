import { renderLogin } from './pages/login.js';
import { renderCadastro } from './pages/cadastro.js';
import { renderFornecedores } from './pages/fornecedores.js';
import { renderProdutos } from './pages/produtos.js';
import { renderEstoque } from './pages/estoque.js';
import { renderMovimentacoes } from './pages/movimentacoes.js';
import { renderConsultas } from './pages/consultas.js';

const content = document.getElementById('content');
const navLinks = document.querySelectorAll('#sidebar a');

const routes = {
    login: renderLogin,
    cadastro: renderCadastro,
    fornecedores: renderFornecedores,
    produtos: renderProdutos,
    estoque: renderEstoque,
    movimentacoes: renderMovimentacoes,
    consultas: renderConsultas
};

function navigate(page) {
    const render = routes[page];
    if (render) {
        content.innerHTML = '';
        render(content);
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        navigate(page);
    });
});

// Iniciar com a página de login
navigate('login');