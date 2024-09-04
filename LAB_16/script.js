const visor = document.getElementById('operacao-atual');
let operacaoAtual = '';

document.querySelectorAll('.numero').forEach(botao => {
    botao.addEventListener('click', () => {
        if (visor.textContent === '0' && botao.textContent !== ',') {
            visor.textContent = botao.textContent;
        } else {
            visor.textContent += botao.textContent;
        }
        operacaoAtual += botao.textContent === ',' ? '.' : botao.textContent;
    });
});

document.querySelectorAll('.operador').forEach(botao => {
    botao.addEventListener('click', () => {
        if (botao.textContent === 'AC') {
            visor.textContent = '0';
            operacaoAtual = '';
        } else {
            operacaoAtual += botao.textContent === '÷' ? '/' :
                botao.textContent === 'x' ? '*' :
                    botao.textContent;
            visor.textContent += botao.textContent;
        }
    });
});

document.querySelector('.igual').addEventListener('click', () => {
    try {
        visor.textContent = eval(operacaoAtual.replace(/,/g, '.'));
        operacaoAtual = visor.textContent;
    } catch {
        visor.textContent = 'Erro';
        operacaoAtual = '';
    }
});
