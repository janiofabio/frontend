import { api } from '../api.js';

export function renderProdutos(container) {
    const produtosForm = document.createElement('form');
    produtosForm.innerHTML = `
        <h2>Cadastro de Produtos</h2>
        <input type="text" id="codigo" placeholder="Código" required>
        <input type="text" id="descricao" placeholder="Descrição" required>
        <input type="text" id="tipo" placeholder="Tipo" required>
        <input type="number" id="valor_estimado" placeholder="Valor Estimado" step="0.01" required>
        <button type="submit">Salvar</button>
        <button type="button" id="btn-sair">Sair</button>
    `;

    const listaProdutos = document.createElement('div');
    listaProdutos.innerHTML = '<h3>Lista de Produtos</h3>';

    produtosForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const codigo = document.getElementById('codigo').value;
        const descricao = document.getElementById('descricao').value;
        const tipo = document.getElementById('tipo').value;
        const valor_estimado = document.getElementById('valor_estimado').value;

        try {
            const response = await api.post('/produtos', { codigo, descricao, tipo, valor_estimado });
            alert('Produto cadastrado com sucesso!');
            carregarProdutos();
        } catch (error) {
            alert('Erro ao cadastrar produto.');
        }
    });

    document.getElementById('btn-sair').addEventListener('click', () => {
        window.location.hash = '#';
    });

    async function carregarProdutos() {
        try {
            const produtos = await api.get('/produtos');
            listaProdutos.innerHTML = '<h3>Lista de Produtos</h3>';
            produtos.forEach(produto => {
                listaProdutos.innerHTML += `
                    <p>${produto.codigo} - ${produto.descricao} - ${produto.tipo} - R$ ${produto.valor_estimado.toFixed(2)}</p>
                `;
            });
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    }

    container.appendChild(produtosForm);
    container.appendChild(listaProdutos);
    carregarProdutos();
}