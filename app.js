//h1 se refere ao Header 1 ou seja, é o título da página
//document.querySelector('h1') é uma função que busca o elemento h1 no HTML
//titulo.innerHTML é uma propriedade que permite alterar o conteúdo do elemento h1

function exibirTextoNaTela(tag, texto){
    // Altera um texto na tela seja no campo h1 ou no campo p
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.4; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    // Exibe a mensagem inicial do jogo
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
    // Função ativada ao clicar no botão Chutar, essa função compara o chute do usuário com o número secreto
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativa);
        // o comando abaixo habilita o botão reiniciar ao remover o atributo disabled
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Que pena! Tente novamente!');
        tentativas++;
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor que  ' + chute);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior que  ' + chute);
        }
        limparChute();
            
    }
}

function gerarNumeroAleatorio() {
    // Gera um número aleatório entre 1 e o numeroLimite
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumeros = listaDeNumeros.length;

    if(quantidadeNumeros == numeroLimite){
        // Se a lista de números estiver cheia, reinicia a lista
        listaDeNumeros = [];
    }   

    // O comando .includes verifica se um elemento está presente em uma lista
    if(listaDeNumeros.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        // O comando .push adiciona um elemento ao final de uma lista
        listaDeNumeros.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparChute(){
    // Limpa o campo de chute (deixa em branco)
    let campo = document.querySelector('input');
    campo.value = '';
}

function novoJogo(){
    // Recomeça o jogo gerando um novo número secreto e reiniciando as tentativas
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    limparChute();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

let listaDeNumeros = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();