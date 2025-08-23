// Arquivo: Passo1.js
import { generatePlot } from "./graficoP1.js";
import { quizData } from "./perguntasQuizz.js";

document.addEventListener("DOMContentLoaded", function () {
  let currentQuestionIndex = 0;
  let correctAnswersCount = 0;
  let attempts = 0;
  let questions = [...quizData];

  const perguntasDiv = document.getElementById("perguntas");
  const alternativasDiv = document.getElementById("alternativas");
  const justificativaDiv = document.getElementById("Justific");
  const proximaEtapaBtn = document.getElementById("ProximaEtapa");
  const refazerQuizzDiv = document.getElementById("RefazerQuizz");
  const refazerBtn = document.getElementById("refazerBtn");
  const proximaPerguntaBtn = document.getElementById("ProximaPerguntaBtn");
  const progressBarDiv = document.getElementById("quiz-progress-container");
  const progressBar = document.getElementById("quiz-progress-bar");
  const progressText = document.getElementById("quiz-progress-text");
  const parabola1 = document.getElementById("grafico-container");
  const parabola2 = document.getElementById("grafico-container2");

  // Esconde os elementos no início
  proximaPerguntaBtn.style.display = "none";
  justificativaDiv.style.display = "none";
  progressBarDiv.style.display = "none";
  progressBar.style.display = "none";
  progressText.style.display = "none";
  refazerQuizzDiv.style.display = "none";
  parabola2.style.display = "none";


  // Função para embaralhar as perguntas
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //Função para a barra de progresso do Quizz
  function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    if (progress > 0) {
      progressText.innerText = `${Math.round(progress)}%`;
      progressBarDiv.style.display = "block";
      progressBar.style.display = "block";
      progressText.style.display = "block";
    } // NOVA LINHA}
  }

  //Função que renderiza as perguntas
  function mostrarPergunta() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      perguntasDiv.innerHTML = currentQuestion.pergunta;
      alternativasDiv.innerHTML = currentQuestion.alternativas
        .map(
          (alt, index) =>
            `<button class="alternativa-btn" onclick="verificarResposta(${index})">${alt}</button>`
        )
        .join("");

      justificativaDiv.style.display = "none";
      proximaPerguntaBtn.style.display = "none";
      proximaEtapaBtn.style.display = "none";
      parabola2.style.display = "none";
      parabola1.style.display = "block";
      attempts = 0;
    } else {
      // Lógica de finalização do quiz
      proximaPerguntaBtn.style.display = "none";

      const scorePercentage = (correctAnswersCount / questions.length) * 100;
      justificativaDiv.innerHTML = `
    <h2 style="color: blue;">Parabéns!</h2>
    <div style="text-align: center; line-height: 1.3; font-size: 22px; margin: 0 20px 0 20px;">Sua porcentagem de acertos foi de ${scorePercentage.toFixed(
      2
    )}%. Prossiga para a próxima etapa.</div>`;
      justificativaDiv.style.display = "block";

      if (scorePercentage < 70) {
        // Pontuação insuficiente: exibir mensagem e botão para refazer o quiz
        justificativaDiv.innerHTML = `
    <h2 style="color: red;">Que Pena!</h2>
    <div style="text-align: center; line-height: 1.3; font-size: 22px; margin: 0 20px 0 20px;">Sua porcentagem de acertos foi de ${scorePercentage.toFixed(
      2
    )}%. Você precisa refazer o Quizz.</div>`;
        justificativaDiv.style.display = "block";
        refazerQuizzDiv.style.display = "block";
        progressBarDiv.style.display = "none";
        progressBar.style.display = "none";
        progressText.style.display = "none";
        parabola1.style.display = "block";
        parabola2.style.display = "none";

        // Adicionar este listener para o botão de refazer
        refazerBtn.addEventListener("click", refazerQuiz);
      } else {
        // Pontuação suficiente: exibir mensagem de porcentagem por 2s, depois a final
        setTimeout(() => {
          justificativaDiv.innerHTML = `<h2 style="color: blue;">Agora, você está pronto para o Passo 2!</h2><div style="text-align: center; line-height: 1.3; font-size: 22px; margin: 0 20px 0 20px;">Prossiga para a próxima etapa.</div>`;
          justificativaDiv.style.display = "block";
          perguntasDiv.innerHTML = `
          <h2 style="text-align: center; color:blue; line-height: 1.3; font-size: 22px; margin: 20px auto;">Conclusões Importantes:</h2>
          <div style="text-align: justify; line-height: 1.3; font-size: 16px; margin: 5px auto;">Observe no gráfico que para n<sub>0</sub> = 1, não são gerados retângulos e para n<sub>0</sub> = 2, é gerado apenas um único retângulo inscrito.
           Por isso, o caso base nessa exploração é n<sub>0</sub> = 2. Comparando o cálculo da área desse retângulo com o valor obtido substituindo n por 2 na fórmula, verificamos a ocorrência do mesmo valor como resultado e conseguimos validar o caso base. Logo, para n = 2, A(2) é verdadeira.</div>.`;
          alternativasDiv.innerHTML = "";
          proximaEtapaBtn.style.display = "block";
          parabola1.style.display = "none";
          parabola2.style.display = "block";
          progressBarDiv.style.display = "none";
          progressBar.style.display = "none";
          progressText.style.display = "none";
          proximaEtapaBtn.querySelector("button").onclick = () =>
            (window.location.href = "./Passo2.html");
        }, 8000);
      }
    }
    updateProgressBar();
  }

  function refazerQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    attempts = 0;
    shuffleArray(questions);
    proximaEtapaBtn.style.display = "none";
    refazerQuizzDiv.style.display = "none";
    progressBarDiv.style.display = "none";
    progressBar.style.display = "none";
    progressText.style.display = "none";
    parabola2.style.display = "none";
    parabola1.style.display = "block";
    mostrarPergunta();
  }

  // Nova função para lidar exclusivamente com a última pergunta
  function lidarComUltimaPergunta(isCorrect) {
    if (isCorrect) {
      correctAnswersCount++;
      justificativaDiv.innerHTML = `<h2 style="color: blue; margin-top: 1px;">Parabéns! Resposta Correta!</h2><div style="text-align: justify; line-height: 1.3; font-size: 16px; margin: 0 20px 0 20px;">${questions[currentQuestionIndex].justificativa}</div>`;
      justificativaDiv.style.display = "block";
      parabola1.style.display = "none";
      parabola2.style.display = "block";
    } else {
      justificativaDiv.innerHTML = `<h2 style="color: red;">Que Pena!</h2><div style="text-align: center; line-height: 1.3; font-size: 20px; margin: 0 20px 0 20px;">Você usou todas as suas tentativas.</div>`;
      justificativaDiv.style.display = "block";
      parabola1.style.display = "none";
      parabola2.style.display = "block";
    }

    document.querySelectorAll(".alternativa-btn").forEach((btn) => {
      btn.disabled = true;
    });

    // Aguarda um breve momento antes de ir para a tela final
    setTimeout(() => {
      currentQuestionIndex++;
      mostrarPergunta();
    }, 8000);
  }

  window.verificarResposta = function (index) {
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (index === currentQuestion.respostaCorretaIndex) {
      if (isLastQuestion) {
        lidarComUltimaPergunta(true);
        parabola1.style.display = "none";
        parabola2.style.display = "block";
      } else {
        correctAnswersCount++;
        justificativaDiv.innerHTML = `<h2 style="color: blue; margin-top: 1px;">Parabéns! Resposta Correta!</h2><div style="text-align: justify; line-height: 1.3; font-size: 16px; margin: 0 20px 0 20px;">${questions[currentQuestionIndex].justificativa}</div>`;
        justificativaDiv.style.display = "block";

        document.querySelectorAll(".alternativa-btn").forEach((btn) => {
          btn.disabled = true;
        });
        proximaPerguntaBtn.style.display = "block";
        parabola2.style.display = "block";
        parabola1.style.display = "none";
      }
    } else {
      attempts++;
      if (attempts < 3) {
        justificativaDiv.innerHTML = `<h2 style="color: red;">Resposta incorreta.</h2>
        <div style="text-align: center; line-height: 1.3; font-size: 22px; margin: 0 20px 0 20px;">Você tem ${
          3 - attempts
        } tentativa(s) restante(s).</div`;
        justificativaDiv.style.display = "block";
        setTimeout(() => {
          justificativaDiv.style.display = "none";
          justificativaDiv.innerHTML = "";
        }, 4000);
      } else {
        // Se esgotou as tentativas, verifica se é a última pergunta
        if (isLastQuestion) {
          lidarComUltimaPergunta(false);
        } else {
          justificativaDiv.innerHTML = `<h2 style="color: red;">Que Pena!</h2><div style="text-align: center; line-height: 1.3; font-size: 20px; margin: 0 20px 0 20px;">Você usou todas as suas tentativas. Responda a próxima questão.</div>`;
          justificativaDiv.style.display = "block";
          parabola1.style.display = "none";
          parabola2.style.display = "block";

          document.querySelectorAll(".alternativa-btn").forEach((btn) => {
            btn.disabled = true;
          });
          proximaPerguntaBtn.style.display = "block";
          parabola1.style.display = "none";
          parabola2.style.display = "block";
        }
      }
    }
  };

  if (proximaPerguntaBtn) {
    proximaPerguntaBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      mostrarPergunta();
    });
  }

  mostrarPergunta();
});
