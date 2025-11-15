// Arquivo: Passo1.js
import { quizData } from "./perguntasQuizz.js";

// --- Constante para o HTML de Conclusão (Melhoria de Manutenibilidade) ---
const quizConclusionHTML = `<h3 class="feedback-title success" style="font-size: 1.2rem;">Conclusões Importantes:</h3><div class="feedback-content"><p>Observe que para n = 1 não há retângulos, e para n = 2 temos o primeiro caso com um retângulo. Por isso, o caso base nessa exploração é n = 2.</p><p>Observe que a área desse retângulo pode ser escrita como: </p><p><math>

  <mrow>

    <mi>A(</mi>

    <mn>2)</mn>

    <mo>=</mo>

    <mrow>

      <mo>(</mo>

      <mfrac>

        <mn>1</mn>

        <mn>2</mn>

      </mfrac>

      <mo>)</mo>

    </mrow>

    <mo>&middot;</mo>

    <msup>

      <mrow>

        <mo>(</mo>

        <mfrac>

          <mn>1</mn>

          <mn>2</mn>

        </mfrac>

        <mo>)</mo>

      </mrow>

      <mn>2</mn>

    </msup>

    <mo>=</mo>

    <mfrac>

      <msup>

        <mn>1</mn>

        <mn>2</mn>

      </msup>

      <msup>

        <mn>2</mn>

        <mn>3</mn>

      </msup>

    </mfrac>

    <mo>=</mo>

    <mfrac>

      <msup>

        <mrow>

          <mo>(</mo>

          <mrow>

            <mn>2</mn>

            <mo>&minus;</mo>

            <mn>1</mn>

          </mrow>

          <mo>)</mo>

        </mrow>

        <mn>2</mn>

      </msup>

      <msup>

        <mn>2</mn>

        <mn>3</mn>

      </msup>

    </mfrac>

    <mo>=</mo>

    <mrow>

      <mfrac>

        <mn>1</mn>

        <msup>

          <mn>2</mn>

          <mn>3</mn>

        </msup>

      </mfrac>

    </mrow>

    <mo>&middot;</mo>

    <msup>

      <mrow>

        <mo>(</mo>

        <mrow>

          <mn>2</mn>

          <mo>&minus;</mo>

          <mn>1</mn>

        </mrow>

        <mo>)</mo>

      </mrow>

      <mn>2</mn>

    </msup>

  </mrow>

</math></p><p>E portanto, para n = 2, a A(n) é verdadeira.</p></div>`;

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
  const perguntasDiv = document.getElementById("perguntas");
  const alternativasDiv = document.getElementById("alternativas");
  const justificativaDiv = document.getElementById("Justific");
  const refazerBtn = document.getElementById("refazerBtn");
  const proximaPerguntaBtn = document.getElementById("ProximaPerguntaBtn");
  const finalizarBtn = document.getElementById("finalizarBtn");
  const progressBar = document.getElementById("quiz-progress-bar");
  const progressText = document.getElementById("quiz-progress-text");
  const parabola1 = document.getElementById("grafico-parabola-n2");
  const parabola2 = document.getElementById("grafico-parabola-n3");

  // Botões do Menu
  const problemaBtn = document.getElementById("voltarTeoria");
  const instrucoesBtn = document.getElementById("Instrucao");
  const pimBtn = document.getElementById("Verificar");
  const sairBtn = document.getElementById("Sair");

  // --- 2. ESTADO DO QUIZZ ---
  let currentQuestionIndex = 0;
  let correctAnswersCount = 0;
  let attempts = 0;
  const questions = [...quizData]; // Cria cópia mutável para embaralhar

  // Sons e Efeitos
  const errorSound = new Audio("../sons/Erro.mp3");
  const clapSound = new Audio("../sons/Aplausos.mp3");
  const PenaSound = new Audio("../sons/Pena.mp3");
  const confettiConfig = { particleCount: 500, spread: 70, origin: { y: 0.6 } };

  // --- 3. FUNÇÕES DE LÓGICA DO QUIZZ ---

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function resetUIForNewQuestion() {
    proximaPerguntaBtn.classList.add("hidden");
    justificativaDiv.classList.add("hidden");
    parabola2.classList.add("hidden");
    finalizarBtn.classList.add("hidden");
    refazerBtn.classList.add("hidden");
    parabola1.classList.remove("hidden");
    justificativaDiv.innerHTML = "";
  }

  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${Math.round(progress)}%`;
    progressBar.classList.remove("hidden");
  }

  function mostrarPergunta() {
    resetUIForNewQuestion();
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      perguntasDiv.innerHTML = currentQuestion.pergunta;
      alternativasDiv.innerHTML = "";

      currentQuestion.alternativas.forEach((alt, index) => {
        const button = document.createElement("button");
        button.className = "alternativa-btn";
        button.dataset.answerIndex = index;
        button.innerHTML = alt;
        alternativasDiv.appendChild(button);
      });

      attempts = 0;
      updateProgressBar();
    } else {
      finalizarQuiz();
    }
  }

  /**
   * OTIMIZAÇÃO: Função centralizada para lidar com o próximo passo
   * (mostrar próximo botão ou finalizar o quiz).
   */
  function handleNextStep(delay = 0) {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    if (isLastQuestion) {
      setTimeout(finalizarQuiz, delay);
    } else {
      // Adiciona um pequeno delay antes de mostrar o botão
      setTimeout(() => proximaPerguntaBtn.classList.remove("hidden"), 300);
    }
  }

  function verificarResposta(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.respostaCorretaIndex;

    document.querySelectorAll(".alternativa-btn").forEach(btn => (btn.disabled = true));
    justificativaDiv.classList.remove("hidden");

    if (isCorrect) {
      correctAnswersCount++;
      justificativaDiv.innerHTML = `<h1 class="feedback-title success">Parabéns! Resposta Correta!</h1><p class="feedback-content">${currentQuestion.justificativa}</p>`;
      parabola1.classList.add("hidden");
      parabola2.classList.remove("hidden");
      handleNextStep(2000); // Avança após 2 segundos
    } else {
      attempts++;
      if (attempts < 3) {
        errorSound.play().catch(e => console.error("Erro ao tocar som:", e));
        justificativaDiv.innerHTML = `<h1 class="feedback-title error">Resposta incorreta.</h1><p>Você tem ${3 - attempts} tentativa(s) restante(s).</p>`;

        setTimeout(() => {
          justificativaDiv.classList.add("hidden");
          document.querySelectorAll(".alternativa-btn").forEach(btn => (btn.disabled = false));
        }, 2000);
      } else {
        PenaSound.play().catch(e => console.error("Erro ao tocar som:", e));
        justificativaDiv.innerHTML = `<h1 class="feedback-title error">Que Pena!</h1><p class="feedback-content">Você usou todas as suas tentativas. A resposta correta é: <br>  ${currentQuestion.alternativas[currentQuestion.respostaCorretaIndex]}</p>`;
        parabola1.classList.add("hidden");
        parabola2.classList.remove("hidden");
        handleNextStep(3000); // Avança após 3 segundos
      }
    }
  }

  function finalizarQuiz() {
    const scorePercentage = (correctAnswersCount / questions.length) * 100;

    alternativasDiv.innerHTML = "";
    perguntasDiv.innerHTML = "";
    proximaPerguntaBtn.classList.add("hidden");
    justificativaDiv.classList.remove("hidden");

    if (scorePercentage < 70) {
      PenaSound.play().catch(e => console.error("Erro ao tocar som:", e));

      // CORREÇÃO DE ERRO: Tag <p> fechada corretamente
      justificativaDiv.innerHTML = `<h1 class="feedback-title error">Que Pena!</h1><h2 class="feedback-content">Sua pontuação foi de ${scorePercentage.toFixed(1)}%.</h2><p>Você precisa refazer o Quizz para prosseguir.</p>`;
      refazerBtn.classList.remove("hidden");
    } else {
      clapSound.play().catch(e => console.error("Erro ao tocar som:", e));
      confetti(confettiConfig);
      justificativaDiv.innerHTML = `<h2 class="feedback-title success">Parabéns!</h2><p class="feedback-content">Sua pontuação foi de ${scorePercentage.toFixed(1)}%.</p>`;

      setTimeout(() => {
        justificativaDiv.innerHTML = `<h2 class="feedback-title success">Agora, você está pronto para o Passo 2!</h2>`;

        // Inserindo o HTML da constante
        perguntasDiv.innerHTML = quizConclusionHTML;

        // CORREÇÃO CRÍTICA: Manda o MathJax renderizar as novas fórmulas
        if (window.MathJax && typeof window.MathJax.typeset === 'function') {
          window.MathJax.typeset([perguntasDiv]);
        }

        finalizarBtn.classList.remove("hidden");
        parabola1.classList.add("hidden");
        parabola2.classList.remove("hidden");
      }, 3000);
    }
  }

  function refazerQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    attempts = 0;
    shuffleArray(questions);
    mostrarPergunta();
  }

  function exitApp() {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
    window.location.href = 'https://www.google.com.br';
  }

  // --- 4. ADIÇÃO DOS EVENT LISTENERS ---

  alternativasDiv.addEventListener("click", (event) => {
    if (event.target && event.target.matches(".alternativa-btn")) {
      const selectedIndex = parseInt(event.target.dataset.answerIndex, 10);
      verificarResposta(selectedIndex);
    }
  });

  proximaPerguntaBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    mostrarPergunta();
  });

  refazerBtn.addEventListener("click", refazerQuiz);
  finalizarBtn.addEventListener("click", () => window.location.href = "./Passo2.html");

  // Menu
  problemaBtn.addEventListener("click", () => window.open('./ProblemaPasso1.html', '_blank'));
  instrucoesBtn.addEventListener("click", () => window.open('./instrucao.html', '_blank'));
  pimBtn.addEventListener("click", () => window.open('./apresentacaoPasso1.html', '_blank'));
  sairBtn.addEventListener("click", exitApp);

  // --- 5. INICIALIZAÇÃO ---
  shuffleArray(questions);
  mostrarPergunta();
});