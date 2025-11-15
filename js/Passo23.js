// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Seleção dos Elementos ---
    const answerInput = document.getElementById("answer-input");
    const verifyButton = document.getElementById("Verificar");
    const feedbackContainer = document.getElementById("feedback-container");
    const nextStepButton = document.getElementById("ProximaEtapa");

    // NOVO: Seleciona as duas imagens que estão no HTML
    const challengeImage = document.getElementById("imagem-desafio-n3");
    const responseImage = document.getElementById("imagem-resposta-n3");

    const correctAnswer = 0.24;

    // Sons e Efeitos
    const errorSound = new Audio("../sons/Erro.mp3");
    const clapSound = new Audio("../sons/Aplausos.mp3");
    const PenaSound = new Audio("../sons/Pena.mp3");
    const confettiConfig = { particleCount: 500, spread: 70, origin: { y: 0.6 } };

    // Botões do Menu
    const problemaBtn = document.getElementById("problem-btn");
    const instrucoesBtn = document.getElementById("back-btn");
    const sairBtn = document.getElementById("Sair");

    // --- 2. Conteúdo do Feedback (HTML das mensagens) ---

    const errorEmptyHTML = `
    <div class="feedback-error">
      <p><strong>Erro:</strong> O campo está vazio. Por favor, digite um valor.</p>
    </div>
  `;

    const errorWrongHTML = `
    <div class="feedback-error">
      <p><strong>Resposta Incorreta.</strong> Tente calcular novamente.</p>
    </div>
  `;

    const successHTML = `
    <div class="feedback-success">
      <p><strong>Parabéns, resposta correta!</strong></p>
    </div>
  `;

    // --- 3. Lógica do Evento ---

    if (verifyButton) {
        verifyButton.addEventListener("click", () => {
            // Verifica se os elementos da imagem existem
            if (!challengeImage || !responseImage) {
                console.error("Imagens do desafio não encontradas!");
                return;
            }

            const answerValue = answerInput.value;

            // Caso 1: Vazio
            if (answerValue === "") {
                feedbackContainer.innerHTML = errorEmptyHTML;
                nextStepButton.classList.add("hidden");
                errorSound.play().catch(e => console.error("Erro ao tocar som:", e));

                // LÓGICA DA IMAGEM: Mostra o desafio, esconde a resposta
                challengeImage.classList.remove("hidden");
                responseImage.classList.add("hidden");
                return;
            }

            const parsedValue = parseFloat(answerValue);

            // Caso 2: Correto
            if (parsedValue === correctAnswer) {
                feedbackContainer.innerHTML = successHTML;
                nextStepButton.classList.remove("hidden");

                // LÓGICA DA IMAGEM: Esconde o desafio, mostra a resposta
                challengeImage.classList.add("hidden");
                responseImage.classList.remove("hidden");
                clapSound.play().catch(e => console.error("Erro ao tocar som:", e));
                confetti(confettiConfig);

                // Renderiza o MathJax
                if (window.MathJax && typeof window.MathJax.typeset === 'function') {
                    window.MathJax.typeset([feedbackContainer]);
                }
            }
            // Caso 3: Incorreto
            else {
                feedbackContainer.innerHTML = errorWrongHTML;
                nextStepButton.classList.add("hidden");
                errorSound.play().catch(e => console.error("Erro ao tocar som:", e));

                // LÓGICA DA IMAGEM: Mostra o desafio, esconde a resposta
                challengeImage.classList.remove("hidden");
                responseImage.classList.add("hidden");
            }
        });
    }
});