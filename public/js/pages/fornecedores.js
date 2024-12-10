import { api } from '../api.js';

export function renderFornecedores(container) {
    const fornecedoresForm = document.createElement('form');
    fornecedoresForm.innerHTML = `
        <h2>Cadastro de Fornecedores</h2>
        <input type="text" id="razao_social" placeholder="Razão Social/Nome" required>
        <input type="text" id="cpf_cnpj" placeholder="CPF/CNPJ" required>
        <button type="submit">Salvar</button>
        <button type="button" id="btn-sair">Sair</button>
    `;

    const listaFornecedores = document.createElement('div');
    listaFornecedores.innerHTML = '<h3>Lista de Fornecedores</h3>';

    fornecedoresForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const razao_social = document.getElementById('razao_social').value;
        const cpf_cnpj = document.getElementById('cpf_cnpj').value;

        try {
            const response = await api.post('/fornecedores', { razao_social, cpf_cnpj });
            alert('Fornecedor cadastrado com sucesso!');
            carregarFornecedores();
        } catch (error) {
            alert('Erro ao cadastrar fornecedor.');
        }
    });

    document.getElementById('btn-sair').addEventListener('click', () => {
        window.location.hash = '#';
    });

    async function carregarFornecedores() {
        try {
            const fornecedores = await api.get('/fornecedores');
            listaFornecedores.innerHTML = '<h3>Lista de Fornecedores</h3>';
            fornecedores.forEach(fornecedor => {
                listaFornecedores.innerHTML += `
                    <p>${fornecedor.razao_social} - ${fornecedor.cpf_cnpj}</p>
                `;
            });
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
        }
    }

    container.appendChild(fornecedoresForm);
    container.appendChild(listaFornecedores);
    carregarFornecedores();
}