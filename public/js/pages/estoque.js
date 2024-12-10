import { api } from '../api.js';

export function renderEstoque(container) {
    const estoqueForm = document.createElement('form');
    estoqueForm.innerHTML = `
        <h2>Atualização de Estoque</h2>
        <select id="local" required>
            <option value="Principal">Principal</option>
            <option value="Secundário">Secundário</option>
            <option value="Outros">Outros</option>
        </select>
        <select id="produto_id" required>
            <option value="">Selecione um produto</option>
        </select>
        <input type="number" id="quantidade" placeholder="Quantidade" required>
        <button type="submit">Salvar</button>
        <button type="button" id="btn-sair">Sair</button>
    `;

    const listaEstoque = document.createElement('div');
    listaEstoque.innerHTML = '<h3>Estoque Atual</h3>';

    estoqueForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const local = document.getElementById('local').value;
        const produto_id = document.getElementById('produto_id').value;
        const quantidade = document.getElementById('quantidade').value;

        try {
            const response = await api.post('/estoque', { local, produto_id, quantidade });
            alert('Estoque atualizado com sucesso!');
            carregarEstoque();
        } catch (error) {
            alert('Erro ao atualizar estoque.');
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

    async function carregarEstoque() {
        try {
            const estoque = await api.get('/estoque');
            listaEstoque.innerHTML = '<h3>Estoque Atual</h3>';
            estoque.forEach(item => {
                listaEstoque.innerHTML += `
                    <p>${item.local} - ${item.codigo} - ${item.descricao} - Quantidade: ${item.quantidade}</p>
                `;
            });
        } catch (error) {
            console.error('Erro ao carregar estoque:', error);
        }
    }

    container.appendChild(estoqueForm);
    container.appendChild(listaEstoque);
    carregarProdutos();
    carregarEstoque();
}