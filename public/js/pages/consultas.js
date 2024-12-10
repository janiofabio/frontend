import { api } from '../api.js';

export function renderConsultas(container) {
    const consultasForm = document.createElement('form');
    consultasForm.innerHTML = `
        <h2>Consultas</h2>
        <select id="tipo_consulta">
            <option value="produto">Por Produto</option>
            <option value="fornecedor">Por Fornecedor</option>
            <option value="movimentacao">Movimentações</option>
        </select>
        <input type="text" id="termo_busca" placeholder="Termo de busca">
        <input type="date" id="data_inicio">
        <input type="date" id="data_fim">
        <button type="submit">Consultar</button>
        <button type="button" id="btn-sair">Sair</button>
    `;

    const resultadoConsulta = document.createElement('div');
    resultadoConsulta.innerHTML = '<h3>Resultado da Consulta</h3>';

    consultasForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tipo_consulta = document.getElementById('tipo_consulta').value;
        const termo_busca = document.getElementById('termo_busca').value;
        const data_inicio = document.getElementById('data_inicio').value;
        const data_fim = document.getElementById('data_fim').value;

        try {
            let resultado;
            switch (tipo_consulta) {
                case 'produto':
                    resultado = await api.get(`/produtos?busca=${termo_busca}`);
                    break;
                case 'fornecedor':
                    resultado = await api.get(`/fornecedores?busca=${termo_busca}`);
                    break;
                case 'movimentacao':
                    resultado = await api.get(`/movimentacoes?inicio=${data_inicio}&fim=${data_fim}`);
                    break;
            }
            exibirResultado(tipo_consulta, resultado);
        } catch (error) {
            alert('Erro ao realizar consulta.');
        }
    });

    document.getElementById('btn-sair').addEventListener('click', () => {
        window.location.hash = '#';
    });

    function exibirResultado(tipo, dados) {
        resultadoConsulta.innerHTML = '<h3>Resultado da Consulta</h3>';
        switch (tipo) {
            case 'produto':
                dados.forEach(produto => {
                    resultadoConsulta.innerHTML += `
                        <p>${produto.codigo} - ${produto.descricao} - ${produto.tipo} - R$ ${produto.valor_estimado.toFixed(2)}</p>
                    `;
                });
                break;
            case 'fornecedor':
                dados.forEach(fornecedor => {
                    resultadoConsulta.innerHTML += `
                        <p>${fornecedor.razao_social} - ${fornecedor.cpf_cnpj}</p>
                    `;
                });
                break;
            case 'movimentacao':
                dados.forEach(movimentacao => {
                    resultadoConsulta.innerHTML += `
                        <p>${movimentacao.data_hora} - ${movimentacao.local} - ${movimentacao.codigo} - ${movimentacao.descricao} - ${movimentacao.tipo} - Quantidade: ${movimentacao.quantidade}</p>
                    `;
                });
                break;
        }
    }

    container.appendChild(consultasForm);
    container.appendChild(resultadoConsulta);
}