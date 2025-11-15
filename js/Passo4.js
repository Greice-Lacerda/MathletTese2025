// ==========================================================
// PASSO 2.5 (n=k+1) - LÓGICA DA PÁGINA (ADAPTADO)
// ==========================================================

/**
 * Função auxiliar para calcular y = x^2.
 */
const parabola = (x) => (Array.isArray(x) ? x.map((val) => val * val) : x * x);

/**
 * Função placeholder para applyShadows (mantida do seu código).
 */
function applyShadows(plotDiv, highlightIndex) {
  // console.log("Função applyShadows chamada para o índice:", highlightIndex);
  // Implemente sua lógica de sombra aqui.
}

// Variável de estado global para o número de PARTIÇÕES (n).
// Começa com n=2 (que tem k=1 retângulo não degenerado).
let n = 2;

/**
 * Gera o gráfico da hipótese de indução (Área(k)) usando Plotly.
 * @param {number} numPartitions - O número de partições (n).
 * @param {number} highlightIndex - O índice do retângulo a ser destacado.
 */
function generateInductionPlot(numPartitions, highlightIndex = -1) {

  // CORREÇÃO CRÍTICA: O ID do gráfico foi corrigido.
  const plotDiv = document.getElementById("plotGrfM32");
  if (!plotDiv) {
    console.error("Elemento '#plotGrfM32' não encontrado.");
    return;
  }

  // O número de retângulos é 'numPartitions'.
  // O número de retângulos visíveis (não degenerados) é 'numPartitions - 1'.
  const numRectangles = numPartitions;

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

  // x_rect e y_rect terão (n+1) pontos
  const x_rect = Array.from(
    { length: numRectangles + 1 },
    (_, i) => a + (i * (b - a)) / numRectangles
  );
  const y_rect = parabola(x_rect);

  // barColors e barLabels terão 'n' itens (para os retângulos de i=0 até n-1)
  const barColors = Array.from(
    { length: numRectangles },
    (_, i) =>
      i === highlightIndex
        ? "rgba(253, 126, 20, 0.8)" // Laranja para destaque (k+1)
        : "rgba(0, 123, 255, 0.6)" // Azul padrão (hipótese)
  );

  // O rótulo i=0 é A₀ (degenerado), i=k-1 é o último da hipótese, i=k é o novo
  const barLabels = Array.from(
    { length: numRectangles },
    (_, i) => `A<sub>${i}</sub>`
  );

  const barLabelColors = Array.from(
    { length: numRectangles },
    (_, i) =>
      i === highlightIndex
        ? "#fe0505ff" // Vermelho/Laranja
        : "#000407ff" // Preto/Azul
  );

  // O barTrace terá 'n' barras
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
      size: 12,
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
    title: `Área A(${numPartitions}) com ${numPartitions - 1} retângulo(s)`,
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
  // --- Elementos do DOM ---
  const addRectangleBtn = document.getElementById("add-rectangle-btn");
  const setKBtn = document.getElementById("set-k-btn");
  const numRectanglesInput = document.getElementById("numRectanglesInput");

  // IDs do HTML que este JS controla
  const etapaFrom2Hab = document.getElementById("etapaFrom2");
  const btnConcluir2 = document.getElementById("btn-concluir2");
  const plotDiv = document.getElementById("plotGrfM32");
  const formulaContainer = document.getElementById("formula-dinamica");

  // Função para renderizar a fórmula
  function renderizarFormulaDinamica(k_partitions) {
    if (!formulaContainer) return;

    // k_partitions é o 'n' (número de divisões)
    // numTermos é o número de retângulos visíveis (n-1 ou k)
    const numTermos = k_partitions - 1;

    if (k_partitions < 2) {
      formulaContainer.innerHTML =
        'A(1) = <span style="color: blue;">0</span> (<span style="color: green;">retângulo degenerado</span>)';
      return;
    }
    if (k_partitions === 2) {
      formulaContainer.innerHTML =
        'A(2) = <span class="termo-indutivo">A<sub>1</sub></span>';
      return;
    }

    formulaContainer.innerHTML = "";

    // Para n=k+1, numTermos = k.
    // O prefixo é A(k+1)
    const prefixoFormula = `A(${k_partitions}) = A(${numTermos} + 1) = `;
    let corpoFormula = "";

    if (k_partitions > 10) {
      // Caso com "..."
      const primeiroTermo = `<span class="termo-hipotese">A<sub>1</sub></span>`;
      // O último termo da hipótese é A(k-1)
      const ultimoTermoHipotese = `<span class="termo-hipotese">A<sub>${numTermos - 1}</sub></span>`;
      const termosHipoteseHTML = `${primeiroTermo} + ... + ${ultimoTermoHipotese}`;
      // O termo indutivo (o novo) é A(k)
      const termoIndutivo = `<span class="termo-indutivo">A<sub>${numTermos}</sub></span>`;
      corpoFormula = `<span class="termo-hipotese">(${termosHipoteseHTML})</span> + ${termoIndutivo}`;

      // Mostra os botões/texto de conclusão
      if (etapaFrom2Hab) etapaFrom2Hab.classList.remove("hidden");
      if (btnConcluir2) btnConcluir2.classList.remove("hidden");

    } else {
      // Caso sem "..."
      const termosHipotese = [];
      // Loop vai de 1 até (k-1)
      for (let i = 1; i < numTermos; i++) {
        termosHipotese.push(
          `<span class="termo-hipotese">A<sub>${i}</sub></span>`
        );
      }
      // O novo termo é A(k)
      const termoIndutivo = `<span class="termo-indutivo">A<sub>${numTermos}</sub></span>`;

      if (termosHipotese.length > 0) {
        corpoFormula = `<span class="termo-hipotese">(${termosHipotese.join(
          " + "
        )})</span> + ${termoIndutivo}`;
      } else {
        corpoFormula = termoIndutivo; // Caso k_partitions = 2
      }
    }
    formulaContainer.innerHTML = prefixoFormula + corpoFormula;
  }

  // --- Eventos de clique ---

  if (setKBtn) {
    setKBtn.addEventListener("click", () => {
      let newK = parseInt(numRectanglesInput.value);
      if (isNaN(newK) || newK < 2) { // O mínimo deve ser n=2
        alert("Por favor, insira um número maior ou igual a 2.");
        newK = 2;
      }
      n = newK; // Atualiza a variável 'n' global
      generateInductionPlot(n);
      renderizarFormulaDinamica(n);
      numRectanglesInput.value = n;
      addRectangleBtn.disabled = false; // Habilita o botão de adicionar
    });
  }

  if (addRectangleBtn) {
    addRectangleBtn.addEventListener("click", () => {
      n++; // Incrementa o 'n' global
      // Destaca o último retângulo (índice n-1)
      generateInductionPlot(n, n - 1);
      renderizarFormulaDinamica(n);
      numRectanglesInput.value = n;
    });
  }

  if (btnConcluir2) {
    btnConcluir2.addEventListener("click", () => {
      // TODO: Atualizar este link para o próximo passo real
      window.location.href = "./conclusao.html";
    });
  }

  // --- Estado Inicial da Página ---
  function inicializarPagina() {
    if (numRectanglesInput) {
      // CORREÇÃO: Corrigido erro de sintaxe (=== -> =)
      numRectanglesInput.value = 2;
    }
    if (addRectangleBtn) {
      addRectangleBtn.disabled = false; // Começa habilitado
    }
    if (btnConcluir2) {
      btnConcluir2.classList.add("hidden");
    }

    // Gera o gráfico inicial para n=2
    n = 2;
    generateInductionPlot(n);
    renderizarFormulaDinamica(n);
  }

  inicializarPagina();
});