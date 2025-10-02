/**
 * Função auxiliar para calcular y = x^2.
 */
const parabola = (x) => (Array.isArray(x) ? x.map((val) => val * val) : x * x);

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

  // 1. Cria um array com as cores de FUNDO para cada barra
  const barColors = Array.from(
    { length: numRectangles },
    (_, i) =>
      i === highlightIndex
        ? "rgba(253, 126, 20, 0.8)" // Laranja para destaque (k+1)
        : "rgba(0, 123, 255, 0.6)" // Azul padrão (hipótese)
  );

  // 2. Cria um array com os TEXTOS "A₁", "A₂", etc.
  // CORREÇÃO: A legenda agora começa em A₁ (i + 1) em vez de A₀.
  const barLabels = Array.from(
    { length: numRectangles },
    (_, i) => `A<sub>${i}</sub>`
  );

  // 3. Cria um array com as CORES para cada texto
  const barLabelColors = Array.from(
    { length: numRectangles },
    (_, i) =>
      i === highlightIndex
        ? "#fe0505ff" // Vermelho/Laranja para o texto do retângulo k+1
        : "#000407ff" // Preto/Azul escuro para o texto dos retângulos da hipótese
  );

  // Cria uma única trace otimizada para todas as barras
  const barTrace = {
    x: x_rect.slice(0, -1).map((xi) => xi + bar_width / 2),
    y: y_rect.slice(0, -1),
    type: "bar",
    width: bar_width,
    marker: {
      color: barColors,
      line: {
        width: 0.5, // AJUSTE: Definido como 0 para um melhor efeito de sombra.
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

  // CORREÇÃO: O título agora reflete o número real de retângulos.
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

  // A função applyShadows deve estar definida em algum lugar do seu código
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
  // --- Elementos do DOM ---
  const addRectangleBtn = document.getElementById("add-rectangle-btn");
  const setKBtn = document.getElementById("set-k-btn");
  const numRectanglesInput = document.getElementById("numRectanglesInput");
  const etapa1 = document.getElementById("etapa-1");
  const etapa2 = document.getElementById("etapa-2");
  const etapaFrom2Hab = document.getElementById("etapaFrom2");
  const btnFormalizar = document.getElementById("btn-formalizar");
  const btnConcluir = document.getElementById("btn-concluir");

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
      btnConcluir.classList.remove("hidden");
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

      // AJUSTE: Mantém o valor no input para consistência
      numRectanglesInput.value = k;

      // AJUSTE: Habilita/desabilita o botão "Adicionar" com base na regra
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

  // (O resto dos seus botões de navegação permanecem como estavam)

  if (btnFormalizar) {
    btnFormalizar.addEventListener("click", () => {
      const plotDiv = document.getElementById("plotGrfM32");
      if (plotDiv) Plotly.purge(plotDiv);
      const formulaContainer = document.getElementById("formula-dinamica");
      if (formulaContainer) formulaContainer.innerHTML = "";
      k = 1;
      if (numRectanglesInput) numRectanglesInput.value = "";
      etapa1.classList.add("hidden");
      etapa2.classList.remove("hidden");

      // AJUSTE: Garante que o botão volte a ser desabilitado
      addRectangleBtn.disabled = true;
    });
  }

  if (btnConcluir) {
    btnConcluir.addEventListener("click", () => {
      window.location.href = "./conclusao.html";
    });
  }

  // --- Estado Inicial da Página ---
  if (numRectanglesInput) {
    numRectanglesInput.value = "";
      btnConcluir.classList.add("hidden");
  }
  // AJUSTE: Garante que o botão comece desabilitado, conforme solicitado.
  // (Para maior robustez, adicione também 'disabled' no seu arquivo HTML)
  addRectangleBtn.disabled = true;
  btnConcluir.classList.add("hidden");
});
