// Funcionários
const funcionarios = [
    { nome: "Ana Silva", sexo: "Feminino", cargo: "Cozinheiro", idade: 25, qtd_transporte: { "Loja 1": 1, "Loja 2": 2, "Loja 3": 3 } },
    { nome: "Carlos Souza", sexo: "Masculino", cargo: "Atendente", idade: 30, qtd_transporte: { "Loja 1": 2, "Loja 2": 1, "Loja 3": 2 } },
    { nome: "Juliana Martins", sexo: "Feminino", cargo: "Caixa", idade: 22, qtd_transporte: { "Loja 1": 3, "Loja 2": 3, "Loja 3": 1 } },
    { nome: "Pedro Alves", sexo: "Masculino", cargo: "Gerente", idade: 40, qtd_transporte: { "Loja 1": 1, "Loja 2": 1, "Loja 3": 1 } },
    { nome: "Fernanda Rocha", sexo: "Feminino", cargo: "Zelador", idade: 35, qtd_transporte: { "Loja 1": 2, "Loja 2": 2, "Loja 3": 3 } },
    { nome: "Rafael Dias", sexo: "Masculino", cargo: "Cozinheiro", idade: 28, qtd_transporte: { "Loja 1": 3, "Loja 2": 1, "Loja 3": 2 } },
    { nome: "Mariana Lima", sexo: "Feminino", cargo: "Atendente", idade: 24, qtd_transporte: { "Loja 1": 1, "Loja 2": 3, "Loja 3": 3 } },
    { nome: "Lucas Andrade", sexo: "Masculino", cargo: "Caixa", idade: 32, qtd_transporte: { "Loja 1": 2, "Loja 2": 3, "Loja 3": 2 } },
    { nome: "Patrícia Gonçalves", sexo: "Feminino", cargo: "Gerente", idade: 38, qtd_transporte: { "Loja 1": 3, "Loja 2": 2, "Loja 3": 1 } },
    { nome: "Roberto Oliveira", sexo: "Masculino", cargo: "Zelador", idade: 45, qtd_transporte: { "Loja 1": 1, "Loja 2": 1, "Loja 3": 3 } },
    { nome: "Tiago Mendes", sexo: "Masculino", cargo: "Cozinheiro", idade: 27, qtd_transporte: { "Loja 1": 2, "Loja 2": 3, "Loja 3": 1 } },
	{ nome: "Camila Ribeiro", sexo: "Feminino", cargo: "Atendente", idade: 31, qtd_transporte: { "Loja 1": 1, "Loja 2": 2, "Loja 3": 3 } },
	{ nome: "Larissa Nogueira", sexo: "Feminino", cargo: "Caixa", idade: 29, qtd_transporte: { "Loja 1": 3, "Loja 2": 1, "Loja 3": 2 } },
	{ nome: "Henrique Farias", sexo: "Masculino", cargo: "Gerente", idade: 42, qtd_transporte: { "Loja 1": 2, "Loja 2": 3, "Loja 3": 1 } },
	{ nome: "Sofia Castro", sexo: "Feminino", cargo: "Zelador", idade: 36, qtd_transporte: { "Loja 1": 1, "Loja 2": 1, "Loja 3": 2 } },
	{ nome: "Vinicius Correia", sexo: "Masculino", cargo: "Cozinheiro", idade: 23, qtd_transporte: { "Loja 1": 3, "Loja 2": 2, "Loja 3": 3 } },
	{ nome: "Daniela Moura", sexo: "Feminino", cargo: "Atendente", idade: 34, qtd_transporte: { "Loja 1": 2, "Loja 2": 1, "Loja 3": 1 } },
	{ nome: "André Luiz", sexo: "Masculino", cargo: "Caixa", idade: 39, qtd_transporte: { "Loja 1": 1, "Loja 2": 3, "Loja 3": 2 } }
];

const escalas = {
    "Loja 1": { "Cozinheiro": [], "Atendente": [], "Caixa": [], "Gerente": [], "Zelador": [] },
    "Loja 2": { "Cozinheiro": [], "Atendente": [], "Caixa": [], "Gerente": [], "Zelador": [] },
    "Loja 3": { "Cozinheiro": [], "Atendente": [], "Caixa": [], "Gerente": [], "Zelador": [] }
};

document.addEventListener('DOMContentLoaded', (event) => {
    const botaoGerar = document.getElementById('botao-gerar');
    if (botaoGerar) {
        botaoGerar.addEventListener('click', gerarEscalas);
    }
});


function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Função para gerar as escalas
function gerarEscalas() {
    // Resetar as escalas
    for (const loja in escalas) {
        for (const cargo in escalas[loja]) {
            escalas[loja][cargo] = [];
        }
    }

	embaralharArray(funcionarios);

    let todosAlocados = false;
    while (!todosAlocados) {
        todosAlocados = true;

        funcionarios.forEach(funcionario => {
            for (const loja in escalas) {
                if (funcionario.qtd_transporte[loja] <= 2 && !escalas[loja][funcionario.cargo].includes(funcionario.nome)) {
                    escalas[loja][funcionario.cargo].push(funcionario.nome);
                    break;
                }
            }
        });

        // Verificar se todos os cargos em todas as lojas estão preenchidos
        for (const loja in escalas) {
            for (const cargo in escalas[loja]) {
                if (escalas[loja][cargo].length === 0) {
                    todosAlocados = false;
                }
            }
        }
    }

    exibirEscalas();
}

// Função para exibir as escalas no HTML
function exibirEscalas() {
    const escalasContainer = document.getElementById('escalas-container');
    escalasContainer.innerHTML = ''; // Limpar conteúdo anterior

    for (const loja in escalas) {
        let tabela = `<h2>${loja}</h2>`;
        tabela += '<table><tr><th>Cargo</th><th>Funcionários</th></tr>';

        for (const cargo in escalas[loja]) {
            tabela += `<tr><td>${cargo}</td><td>${escalas[loja][cargo].join(', ')}</td></tr>`;
        }

        tabela += '</table>';
        escalasContainer.innerHTML += tabela;
    }
}

// Disponibilizando a função gerarEscalas para ser chamada globalmente
window.gerarEscalas = gerarEscalas;
