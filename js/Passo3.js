// Passo3.js

/**
 * Função auxiliar para calcular y = x^2.
 */
const parabola = (x) => (Array.isArray(x) ? x.map((val) => val * val) : x * x);

/**
 * Gera o gráfico da hipótese de indução (Área(k)) usando Plotly.
 * @param {number} k - O número de retângulos para a hipótese (padrão: 10).
 */
function generateInductionPlot(k = 35) {
  const plotDiv = document.getElementById("plot");
  const a = 0;
  const b = 1;

  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  const x_rect = Array.from({ length: k + 1 }, (_, i) => a + (i * (b - a)) / k);
  const y_rect = parabola(x_rect);
  const bar_width = (b - a) / k;

  const traces = [
    {
      x: x_parabola,
      y: y_parabola,
      mode: "lines",
      name: "Parábola y = x²",
      line: { color: "black", width: 2 },
    },
    ...x_rect.slice(0, -1).map((xi, i) => ({
      x: [xi],
      y: [y_rect[i]],
      type: "bar",
      width: [bar_width],
      name: `Retângulo ${i}`,
      marker: {
        color: "rgba(0, 123, 255, 0.6)",
        line: { color: "black", width: 0.5 },
      },
      offset: 0,
    })),
  ];

  const layout = {
    width: plotDiv.offsetWidth * 0.5,
    height: plotDiv.offsetHeight*0.8,
    title: `Hipótese de Indução: Área(k) para k=${k}`,
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
    particleCount: 150,
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
  const surveyBtn = document.getElementById("avaliaçãoP3"); // Referência para o botão de avaliação

  startBtn.addEventListener("click", () => {
    proofContainer.style.display = "block";
    startBtn.style.display = "none";
  });

  nextStepBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const currentStep = e.target.closest(".modal-panel, .modal-panel3");
      const nextStepId = `step-${e.target.dataset.step}`;
      const nextStep = document.getElementById(nextStepId);

      if (currentStep && nextStep) {
        currentStep.classList.add("hidden");
        nextStep.classList.remove("hidden");

        if (nextStepId === "step-2") {
          generateInductionPlot(35);
        }
        if (nextStepId === "step-5") {
          triggerConfetti();
        }
      }
    });
  });

  addRectangleBtn.addEventListener("click", () => {
    const k = 35;
    const n = k + 1;
    const a = 0;
    const b = 1;
    const plotDiv = document.getElementById("plot");

    const bar_width_n = (b - a) / n;

    const x_parabola = Array.from(
      { length: 400 },
      (_, i) => a + (i * (b - a)) / 399
    );
    const y_parabola = parabola(x_parabola);
    const parabolaTrace = {
      x: x_parabola,
      y: y_parabola,
      mode: "lines",
      name: "Parábola y = x²",
      line: { color: "black", width: 2 },
    };

    const x_rect_n = Array.from(
      { length: n + 1 },
      (_, i) => a + (i * (b - a)) / n
    );
    const y_rect_n = parabola(x_rect_n);

    const rectangleTraces_n = x_rect_n.slice(0, -1).map((xi, i) => {
      const barColor =
        i === k
          ? "rgba(253, 126, 20, 0.8)"
          : //highlight orange for new rectangle
            "rgba(0, 123, 255, 0.6)";

      return {
        x: [xi],
        y: [y_rect_n[i]],
        type: "bar",
        width: [bar_width_n],
        name: `Retângulo ${i + 1}`,
        marker: {
          color: barColor,
          line: { color: "black", width: 0.5 },
        },
        offset: 0,
      };
    });

    const allTraces_n = [parabolaTrace, ...rectangleTraces_n];

    const layout_n = {
      width: plotDiv.offsetWidth * 0.98,
      height: plotDiv.offsetHeight,
      title: `Passo Indutivo: Área(k+1) para k+1=${n}`,
      showlegend: false,
      barmode: "overlay",
      bargap: 0,
      xaxis: { range: [0, 1], title: "x" },
      yaxis: { range: [0, 1], title: "y" },
      margin: { l: 40, r: 20, t: 40, b: 40 },
    };

    Plotly.newPlot("plot", allTraces_n, layout_n);

    addRectangleBtn.classList.add("hidden");
    document.querySelector("#step-2 .next-step-btn").classList.remove("hidden");
  });

  // --- NOVA LÓGICA PARA O BOTÃO DO QUESTIONÁRIO ---
  surveyBtn.addEventListener("click", () => {
    // 1. Abre o questionário em uma nova aba
    const surveyUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScl3BiowD4RUjZAna2NEACEsEckfY8cYR11_8mJ1d0xfwjYew/viewform";
    window.open(surveyUrl, "_blank");

    // 2. Esconde o container da prova (o "modal")
    proofContainer.style.display = "none";

    // 3. Redireciona a página atual para a página de resumo
    // **ATENÇÃO:** Crie um arquivo chamado 'resumo.html' ou altere este nome!
    window.location.href = "../pages/resumo.html";
  });
});
