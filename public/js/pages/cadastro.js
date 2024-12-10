import { api } from '../api.js';

export function renderCadastro(container) {
    const cadastroForm = document.createElement('form');
    cadastroForm.innerHTML = `
        <h2>Cadastro de Usuário</h2>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="senha" placeholder="Senha" required>
        <input type="password" id="confirma_senha" placeholder="Confirmar Senha" required>
        <button type="submit">Salvar</button>
        <button type="button" id="btn-sair">Sair</button>
    `;

    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirma_senha = document.getElementById('confirma_senha').value;

        if (senha !== confirma_senha) {
            alert('As senhas não coincidem');
            return;
        }

        try {
            const response = await api.post('/usuarios/cadastro', { email, senha });
            alert('Usuário cadastrado com sucesso!');
            // Redirecionar para a página de login
            window.location.hash = '#login';
        } catch (error) {
            alert('Erro ao cadastrar usuário.');
        }
    });

    document.getElementById('btn-sair').addEventListener('click', () => {
        window.location.hash = '#login';
    });

    container.appendChild(cadastroForm);
}