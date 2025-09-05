// Passo3.js

/**
 * Função auxiliar para calcular y = x^2.
 */
const parabola = (x) => (Array.isArray(x) ? x.map((val) => val * val) : x * x);

// ==========================================================================
// Variável de estado para o número de retângulos
// ==========================================================================
let k = 2;

/**
 * Gera o gráfico da hipótese de indução (Área(k)) usando Plotly.
 * @param {number} numRectangles - O número de retângulos a ser exibido.
 * @param {number} highlightIndex - O índice do retângulo a ser destacado (opcional, -1 para nenhum).
 */
function generateInductionPlot(numRectangles, highlightIndex = -1) {
  const plotDiv = document.getElementById("plotGrfM32");
  const a = 0;
  const b = 1;

  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  const bar_width = (b - a) / numRectangles;
  const x_rect = Array.from(
    { length: numRectangles + 1 },
    (_, i) => a + (i * (b - a)) / numRectangles
  );
  const y_rect = parabola(x_rect);

  const rectangleTraces = x_rect.slice(0, -1).map((xi, i) => {
    const barColor =
      i === highlightIndex
        ? "rgba(253, 126, 20, 0.8)"
        : "rgba(0, 123, 255, 0.6)";

    return {
      x: [xi],
      y: [y_rect[i]],
      type: "bar",
      width: [bar_width],
      name: `Retângulo ${i + 1}`,
      marker: {
        color: barColor,
        line: { color: "black", width: 0.5 },
      },
      offset: 0,
    };
  });

  const traces = [
    {
      x: x_parabola,
      y: y_parabola,
      mode: "lines",
      name: "Parábola y = x²",
      line: { color: "black", width: 2 },
    },
    ...rectangleTraces,
  ];

  const layout = {
    width: plotDiv.offsetWidth * 0.89,
    height: plotDiv.offsetHeight * 0.8,
    title: `Área(k) com k=${numRectangles}`,
    showlegend: false,
    barmode: "overlay",
    bargap: 0,
    xaxis: { range: [0, 1], title: "x" },
    yaxis: { range: [0, 1], title: "y" },
    margin: { l: 40, r: 20, t: 40, b: 40 },
  };

  Plotly.newPlot(plotDiv, traces, layout);
}

/**
 * Aciona o efeito de confete.
 */
function triggerConfetti() {
  confetti({
    particleCount: 500,
    spread: 90,
    origin: { y: 0.6 },
  });
}

// ==========================================================================
// Lógica Principal da Página
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const proofContainer = document.getElementById("ProvaP3");
  const startBtn = document.getElementById("start-proof-btn");
  const nextStepBtns = document.querySelectorAll(".next-step-btn");
  const addRectangleBtn = document.getElementById("add-rectangle-btn");
  const surveyBtn = document.getElementById("avaliaçãoP3");
  const setKBtn = document.getElementById("set-k-btn");
  const numRectanglesInput = document.getElementById("numRectanglesInput");
  const step2Panel = document.getElementById("step-2");

  // Esconde o container da prova no início, a menos que o HTML já tenha o estilo
  // Se o seu HTML já esconde, pode remover esta linha.
  proofContainer.classList.add("hidden");

  // Evento de clique para o botão "Iniciar Prova" (agora ele mostra o primeiro passo)
  startBtn.addEventListener("click", () => {
    proofContainer.classList.remove("hidden");
    startBtn.classList.add("hidden");
  });

  // Evento de clique para o novo botão "Definir e Iniciar"
  if (setKBtn) {
    setKBtn.addEventListener("click", () => {
      let newK = parseInt(numRectanglesInput.value);

      if (isNaN(newK) || newK <= 0) {
        alert(
          "Por favor, insira um número de retângulos maior que 0."
        );
        return;
      }
      k = newK;
      generateInductionPlot(k);
      addRectangleBtn.classList.remove("hidden"); // Mostra o botão "Adicionar k+1"
    });
  }

  nextStepBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const currentStep = e.target.closest(".modal-panel, .modal-panel3");
      const nextStepId = `step-${e.target.dataset.step}`;
      const nextStep = document.getElementById(nextStepId);

      if (currentStep && nextStep) {
        currentStep.classList.add("hidden");
        nextStep.classList.remove("hidden");
      }

      if (nextStepId === "step-2") {
        // Exibe o campo de input e o botão para o usuário
        const inputControls = step2Panel.querySelector(".input-controls");
        if (inputControls) {
          inputControls.classList.remove("hidden");
        }
        // A geração do gráfico acontece no clique do setKBtn, não mais aqui
      }

      if (nextStepId === "step-5") {
        triggerConfetti();
      }
    });
  });

  // Lógica para o botão "Adicionar Retângulo" (k + 1)
  addRectangleBtn.addEventListener("click", () => {
    k++; // Incrementa o valor de k
    generateInductionPlot(k, k - 1); // Gera o gráfico com o novo k e destaca o último retângulo

    // O próximo botão só aparece após o primeiro clique para adicionar um retângulo
    const nextStepBtn = step2Panel.querySelector(".next-step-btn");
    if (nextStepBtn) {
      nextStepBtn.classList.remove("hidden");
    }
  });

  // Lógica para o botão do questionário
  surveyBtn.addEventListener("click", () => {
    const surveyUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScl3BiowD4RUjZAna2NEACEsEckfY8cYR11_8mJ1d0xfwjYew/viewform";
    window.open(surveyUrl, "_blank");

    proofContainer.style.display = "none";
    window.location.href = "../pages/resumo.html";
  });
});
