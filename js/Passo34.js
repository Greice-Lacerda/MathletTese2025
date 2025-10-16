/**
 * Função auxiliar para calcular y = x^2.
 */
const parabola = (x) => (Array.isArray(x) ? x.map((val) => val * val) : x * x);

/**
 * Função placeholder para applyShadows.
 * A função original deve ser implementada para que o efeito de sombra funcione.
 * Esta versão evita erros de "função não definida".
 */
function applyShadows(plotDiv, highlightIndex) {
  // console.log("Função applyShadows chamada para o índice:", highlightIndex);
  // Implemente sua lógica de sombra aqui.
}

// Variável de estado global para o número de retângulos.
let k = 1;

/**
 * Gera o gráfico da hipótese de indução (Área(k)) usando Plotly.
 * @param {number} numRectangles - O número de retângulos a ser exibido.
 * @param {number} highlightIndex - O índice do retângulo a ser destacado (opcional, -1 para nenhum).
 */
function generateInductionPlot(numRectangles, highlightIndex = -1) {
  const plotDiv = document.getElementById("plotGrfM32");
  if (!plotDiv) return;

  // Definições e dados para a parábola
  const a = 0;
  const b = 1;
  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  // Calcula as dimensões e posições dos retângulos
  const bar_width = (b - a) / numRectangles;
  const x_rect = Array.from(
    { length: numRectangles + 1 },
    (_, i) => a + (i * (b - a)) / numRectangles
  );
  const y_rect = parabola(x_rect);
  const barColors = Array.from(
    { length: numRectangles },
    (_, i) =>
      i === highlightIndex
        ? "rgba(253, 126, 20, 0.8)" // Laranja para destaque (k+1)
        : "rgba(0, 123, 255, 0.6)" // Azul padrão (hipótese)
  );

  const barLabels = Array.from(
    { length: numRectangles },
    (_, i) => `A<sub>${i}</sub>`
  );

  const barLabelColors = Array.from(
    { length: numRectangles },
    (_, i) =>
      i === highlightIndex
        ? "#fe0505ff" // Vermelho/Laranja para o texto do retângulo k+1
        : "#000407ff" // Preto/Azul escuro para o texto dos retângulos da hipótese
  );

  const barTrace = {
    x: x_rect.slice(0, -1).map((xi) => xi + bar_width / 2),
    y: y_rect.slice(0, -1),
    type: "bar",
    width: bar_width,
    marker: {
      color: barColors,
      line: {
        width: 0.5,
      },
    },
    hoverinfo: "none",
    text: barLabels,
    textposition: "inside",
    insidetextanchor: "middle",
    textfont: {
      family: "Arial, sans-serif",
      size: 14,
      color: barLabelColors,
    },
  };

  const traces = [
    {
      x: x_parabola,
      y: y_parabola,
      mode: "lines",
      name: "Parábola y = x²",
      line: { color: "black", width: 2 },
    },
    barTrace,
  ];

  const layout = {
    title: `Área com ${numRectangles - 1} retângulo(s)`,
    showlegend: false,
    barmode: "overlay",
    bargap: 0,
    xaxis: { range: [0, 1], title: "x" },
    yaxis: { range: [0, 1], title: "y" },
    margin: { l: 40, r: 20, t: 40, b: 40 },
    autosize: true,
  };

  Plotly.newPlot(plotDiv, traces, layout, { responsive: true }).then(() => {
    if (typeof applyShadows === "function") {
      applyShadows(plotDiv, highlightIndex);
    }
  });
}

// ==========================================================================
// Lógica Principal da Página
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // --- Elementos do DOM (Centralizados para evitar erros de escopo) ---
  const addRectangleBtn = document.getElementById("add-rectangle-btn");
  const setKBtn = document.getElementById("set-k-btn");
  const numRectanglesInput = document.getElementById("numRectanglesInput");
  const etapa1 = document.getElementById("etapa-1");
  const etapa2 = document.getElementById("etapa-2");
  const etapaFrom2Hab = document.getElementById("etapaFrom2");
  const btnConcluir2 = document.getElementById("btn-concluir2");
  const plotDiv = document.getElementById("plotGrfM32"); // CORREÇÃO: Declarado aqui
  const formulaContainer = document.getElementById("formula-dinamica"); // CORREÇÃO: Declarado aqui


  // Função para renderizar a fórmula (seu código original, sem alterações)
  function renderizarFormulaDinamica(k_partitions) {
    const formulaContainer = document.getElementById("formula-dinamica");
    if (!formulaContainer) return;
    if (k_partitions === 1) {
      formulaContainer.innerHTML =
        'A(1) = <span style="color: blue;">0</span> (<span style="color: green;">retângulo degenerado</span>)';
      return;
    }
    if (k_partitions === 2) {
      formulaContainer.innerHTML =
        'A(2) = <span style="color: blue;">A<sub>1</sub></span> + <span style="color: orange;">0</span> = <span style="color: blue;">A<sub>1</sub></span>';
      return;
    }
    formulaContainer.innerHTML = "";
    const numTermos = k_partitions - 1;
    if (numTermos <= 0) return;
    const prefixoFormula = `A(${
      numTermos + 1
    }) = A(<span style="color:blue;">(${numTermos})</span> + 1) = `;
    let corpoFormula = "";
    if (k_partitions > 10) {
      const primeiroTermo = `<span class="termo-hipotese">A<sub>1</sub></span>`;
      const ultimoTermoHipotese = `<span class="termo-hipotese">A<sub>${
        numTermos - 1
      }</sub></span>`;
      const termosHipoteseHTML = `${primeiroTermo} + ... + ${ultimoTermoHipotese}`;
      const termoIndutivo = `<span class="termo-indutivo">A<sub>${numTermos}</sub></span>`;
      corpoFormula = `<span class="termo-hipotese">(${termosHipoteseHTML})</span> + ${termoIndutivo}`;
      etapaFrom2Hab.classList.remove("hidden");
      btnConcluir2.classList.remove("hidden");
    } else {
      const termosHipotese = [];
      for (let i = 1; i < numTermos; i++) {
        termosHipotese.push(
          `<span class="termo-hipotese">A<sub>${i}</sub></span>`
        );
      }
      const termoIndutivo = `<span class="termo-indutivo">A<sub>${numTermos}</sub></span>`;
      if (termosHipotese.length > 0) {
        corpoFormula = `<span class="termo-hipotese">(${termosHipotese.join(
          " + "
        )})</span> + ${termoIndutivo}`;
      }
    }
    formulaContainer.innerHTML = prefixoFormula + corpoFormula;
  }

  // --- Eventos de clique ---

  if (setKBtn) {
    setKBtn.addEventListener("click", () => {
      let newK = parseInt(numRectanglesInput.value);
      if (isNaN(newK) || newK < 1) {
        alert("Por favor, insira um número maior ou igual a 1.");
        return;
      }
      k = newK;
      generateInductionPlot(k);
      renderizarFormulaDinamica(k);
      numRectanglesInput.value = k;
      addRectangleBtn.disabled = k <= 1;
    });
  }

  if (addRectangleBtn) {
    addRectangleBtn.addEventListener("click", () => {
      k++;
      generateInductionPlot(k, k - 1); // k-1 é o índice do último retângulo
      renderizarFormulaDinamica(k);
      numRectanglesInput.value = k;
    });
  }

  if (btnConcluir2) {
    btnConcluir2.addEventListener("click", () => {
      window.location.href = "./Passo35.html";
    });
  }

  // --- Estado Inicial da Página ---
  function inicializarPagina() {
      if (numRectanglesInput) {
        numRectanglesInput.value === 3;
      }
      if (addRectangleBtn) {
        addRectangleBtn.disabled = true;
      }
      if (btnConcluir2) {
        btnConcluir2.classList.add("hidden");
      }
      // Garante que o gráfico comece vazio
      if (plotDiv && typeof Plotly !== "undefined") {
        Plotly.purge(plotDiv);
      }
  }

  inicializarPagina();
});