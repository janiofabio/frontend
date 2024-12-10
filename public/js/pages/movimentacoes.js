import { api } from '../api.js';

export function renderMovimentacoes(container) {
    const movimentacoesForm = document.createElement('form');
    movimentacoesForm.innerHTML = `
        <h2>Registro de Movimentações</h2>
        <select id="local" required>
            <option value="Principal">Principal</option>
            <option value="Secundário">Secundário</option>
            <option value="Outros">Outros</option>
        </select>
        <select id="produto_id" required>
            <option value="">Selecione um produto</option>
        </select>
        <select id="tipo" required>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
        </select>
        <input type="number" id="quantidade" placeholder="Quantidade" required>
        <button type="submit">Salvar</button>
        <button type="button" id="btn-sair">Sair</button>
    `;

    const listaMovimentacoes = document.createElement('div');
    listaMovimentacoes.innerHTML = '<h3>Últimas Movimentações</h3>';

    movimentacoesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const local = document.getElementById('local').value;
        const produto_id = document.getElementById('produto_id').value;
        const tipo = document.getElementById('tipo').value;
        const quantidade = document.getElementById('quantidade').value;

        try {
            const response = await api.post('/movimentacoes', { local, produto_id, tipo, quantidade });
            alert('Movimentação registrada com sucesso!');
            carregarMovimentacoes();
        } catch (error) {
            alert('Erro ao registrar movimentação.');
        }
    });

    document.getElementById('btn-sair').addEventListener('click', () => {
        window.location.hash = '#';
    });

    async function carregarProdutos() {
        try {
            const produtos = await api.get('/produtos');
            const selectProduto = document.getElementById('produto_id');
            produtos.forEach(produto => {
                const option = document.createElement('option');
                option.value = produto.id;
                option.textContent = `${produto.codigo} - ${produto.descricao}`;
                selectProduto.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    }

    async function carregarMovimentacoes() {
        try {
            const movimentacoes = await api.get('/movimentacoes');
            listaMovimentacoes.innerHTML = '<h3>Últimas Movimentações</h3>';
            movimentacoes.forEach(movimentacao => {
                listaMovimentacoes.innerHTML += `
                    <p>${movimentacao.data_hora} - ${movimentacao.local} - ${movimentacao.codigo} - ${movimentacao.descricao} - ${movimentacao.tipo} - Quantidade: ${movimentacao.quantidade}</p>
                `;
            });
        } catch (error) {
            console.error('Erro ao carregar movimentações:', error);
        }
    }

    container.appendChild(movimentacoesForm);
    container.appendChild(listaMovimentacoes);
    carregarProdutos();
    carregarMovimentacoes();
}