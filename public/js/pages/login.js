import { api } from '../api.js';

export function renderLogin(container) {
    const loginForm = document.createElement('form');
    loginForm.innerHTML = `
        <h2>Login</h2>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="senha" placeholder="Senha" required>
        <button type="submit">Entrar</button>
    `;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await api.post('/usuarios/login', { email, senha });
            localStorage.setItem('token', response.data.token);
            alert('Login realizado com sucesso!');
            // Redirecionar para a página principal ou atualizar o estado da aplicação
        } catch (error) {
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    });

    container.appendChild(loginForm);
}