// Arquivo: Passo2.js
// NOTA: As importações de 'botoesModal.js' foram removidas e as funções 
// necessárias (mostrarConteudoModal, closeModal) foram recriadas abaixo,
// pois o arquivo original não foi fornecido.

let isChallengeCompleted = false; // Variável de estado para o progresso

// =======================================================================
// 1. FUNÇÕES DO MODAL (Recriadas do arquivo 'botoesModal.js' faltante)
// =======================================================================

/**
 * Exibe o modal e alterna para um conteúdo específico dentro dele.
 * @param {string} contentId - O ID do 'conteúdo' (ex: 'conteudo-desafio') para mostrar.
 * @param {string} newTitle - O novo texto para o título do modal.
 */
function mostrarConteudoModal(contentId, newTitle) {
  const modal = document.getElementById("modalP2");
  const modalTitle = document.querySelector(".desafio-titulo");

  if (!modal || !modalTitle) {
    console.error("Elementos do modal não encontrados.");
    return;
  }

  // Atualiza o título
  modalTitle.textContent = newTitle;

  // Esconde todos os containers de conteúdo dentro do corpo do modal
  const allContent = modal.querySelectorAll(".modal-columns-container");
  allContent.forEach(content => content.classList.add("hidden"));

  // Mostra o container de conteúdo específico
  const specificContent = document.getElementById(contentId);
  if (specificContent) {
    specificContent.classList.remove("hidden");
  } else {
    console.error(`Conteúdo do modal com ID '${contentId}' não encontrado.`);
  }

  // Exibe o modal
  modal.classList.remove("hidden");
}

/**
 * Fecha o modal principal.
 * @param {string} modalId - O ID do modal (ex: 'modalP2') para fechar.
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
  }
}

// =======================================================================
// 2. LÓGICA DO PASSO 2 (Refatorada)
// =======================================================================

/**
 * Habilita os botões principais da página e fecha o modal.
 */
function enableMainButtons() {
  document.getElementById("gerar-grafico").disabled = false;
  document.getElementById("limpar-pagina").disabled = false;
  closeModal("modalP2");
}

/**
 * Exibe uma mensagem de erro abaixo do elemento de entrada e reproduz o som.
 */
function displayError(message, inputElement) {
  const errorAudio = document.getElementById("error-audio");
  if (errorAudio) {
    errorAudio.play().catch(e => console.warn("Não foi possível tocar o som de erro.", e));
  }

  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }

  const errorMessageElement = document.createElement("div");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("error-message"); // (Requer CSS)

  inputElement.parentNode.insertBefore(
    errorMessageElement,
    inputElement.nextSibling
  );

  setTimeout(() => {
    if (errorMessageElement && errorMessageElement.parentNode) {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
    }
  }, 3000);
}

/**
 * REATORAÇÃO: Função genérica que substitui todas as funções 'handleConfirm' e 'handleValidate'.
 * @param {string} inputId - ID do input a ser verificado.
 * @param {number} expectedValue - Valor correto esperado.
 * @param {Function} comparisonFn - Função para comparar os valores (ex: parseInt, parseFloat).
 * @param {string} nextContentId - ID do próximo conteúdo do modal a ser exibido em caso de sucesso.
 * @param {string} nextTitle - Título do próximo conteúdo do modal.
 * @param {string} errorMsg - Mensagem de erro em caso de falha.
 */
function validateInput(inputId, expectedValue, comparisonFn, nextContentId, nextTitle, errorMsg) {
  const inputElement = document.getElementById(inputId);
  const inputValue = inputElement.value;

  if (comparisonFn(inputValue) !== expectedValue) {
    displayError(errorMsg, inputElement);
    return;
  }

  // Limpa o erro anterior, se houver
  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }

  mostrarConteudoModal(nextContentId, nextTitle);
}

/**
 * Função que fecha o modal de verificação e habilita o botão de "Próxima Etapa".
 */
function handleCloseVerificationAndEnableNext() {
  closeModal("modalP2");
  const proximaEtapaBtn = document.getElementById("ProximaEtapa");
  if (proximaEtapaBtn) {
    proximaEtapaBtn.classList.remove("hidden");
    proximaEtapaBtn.disabled = false;
  }
}

// ----------------------------------------------------------------------
// Lógica para os botões "Gerar Gráfico" e "Limpar" (com MathJax)
// ----------------------------------------------------------------------

function parabola(x) {
  return x.map((xi) => xi ** 2);
}

function generatePlot() {
  const n = parseInt(document.getElementById("n-value").value);
  const plotDiv = document.getElementById("plot");
  const tableContainer = document.getElementById("tabela-container");
  const inputElement = document.getElementById("n-value");

  if (isNaN(n) || n < 2) {
    displayError(
      "Por favor, insira um número inteiro maior ou igual a 2.",
      inputElement
    );
    return;
  }

  tableContainer.innerHTML = ""; // Limpa a tabela

  const a = 0;
  const b = 1;
  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  let traces;
  let annotations;
  let tableBodyData = [];
  let totalArea = 0;
  const realTotalArea = (1 / 3).toFixed(8);
  let error = (realTotalArea - 0).toFixed(8);

  if (n >= 2) {
    const x_rect = Array.from(
      { length: n + 1 },
      (_, i) => a + (i * (b - a)) / n
    );
    const y_rect = parabola(x_rect);
    const bar_width = (b - a) / n;

    const cumulativeArea_values = [];
    let accumulated_numerator = 0;
    const formatted_area_terms = [];
    const cumulativeArea_string = [];

    x_rect.slice(0, -1).forEach((_, i) => {
      const currentArea_numerator = i ** 2;
      const denominator = n ** 3;
      accumulated_numerator += currentArea_numerator;

      if (currentArea_numerator > 0) {
        // CORREÇÃO: Usando LaTeX (MathJax) no lugar de HTML/CSS customizado
        const widthFraction = `\\(\\frac{1}{${n}}\\)`;
        const heightFraction = `\\(\\left(\\frac{${i}}{${n}}\\right)^2\\)`;
        formatted_area_terms.push(
          `(${widthFraction} &times; ${heightFraction})`
        );
      }

      const current_cumulative_string = formatted_area_terms.join(" + ");
      cumulativeArea_string.push(current_cumulative_string);
      cumulativeArea_values.push(accumulated_numerator / denominator);
    });

    traces = [
      {
        x: x_parabola,
        y: y_parabola,
        mode: "lines",
        name: "Parábola y = x²",
        showlegend: false,
      },
      ...x_rect.slice(0, -1).map((xi, i) => ({
        x: [xi],
        y: [y_rect[i]],
        type: "bar",
        width: [bar_width],
        name: `Area_${i}`,
        marker: {
          color: "rgba(0, 0, 255, 0.3)",
          line: { color: "black", width: 0.5 },
        },
        offset: 0,
        showlegend: false,
      })),
    ];

    annotations =
      n <= 10
        ? x_rect.slice(0, -1).flatMap((xi, i) => {
          // CORREÇÃO: Usando LaTeX para as anotações do gráfico
          const widthText = `\\(x_{${i}} = \\frac{${i}}{${n}}\\)`;
          const heightText = `\\(y_{${i}} = (\\frac{${i}}{${n}})^2\\)`;
          const areaText = `\\(A_{${i}}\\)`;

          return [
            {
              x: xi + bar_width,
              y: 0,
              text: widthText,
              showarrow: false,
              xanchor: "left",
              yanchor: "top",
              font: { size: 12 },
              textangle: -90,
            },
            {
              x: xi + bar_width - 0.01,
              y: y_rect[i] / 2,
              text: heightText,
              showarrow: false,
              xanchor: "right",
              yanchor: "middle",
              font: { size: 12 },
              textangle: -90,
            },
            {
              x: xi + bar_width / 2,
              y: y_rect[i],
              text: areaText,
              showarrow: false,
              xanchor: "center",
              yanchor: "top",
              font: { size: 18, color: "white" },
            },
          ];
        })
        : [];

    tableBodyData = x_rect.slice(0, -1).map((_, i) => {
      // CORREÇÃO: Usando LaTeX (MathJax)
      const xFraction = `\\(\\frac{${i}}{${n}}\\)`;
      const yFractionSquared = `\\(\\frac{${i ** 2}}{${n ** 2}}\\)`;
      const accumulatedString = cumulativeArea_string[i] || "0";
      const approxValue = cumulativeArea_values[i]
        ? cumulativeArea_values[i].toFixed(8)
        : "0";
      const contentString = `<div class="an-sum">A(${i + 1
        }) = ${accumulatedString}</div><div class="an-approx">A(${i + 1
        }) &asymp; ${approxValue}</div>`;
      return [i + 1, i, xFraction, yFractionSquared, contentString];
    });

    totalArea = cumulativeArea_values.pop().toFixed(8);
    error = (realTotalArea - totalArea).toFixed(8);
  } else {
    // ... (lógica para n < 2) ...
    traces = [
      {
        x: x_parabola,
        y: y_parabola,
        mode: "lines",
        name: "Parábola y = x²",
        showlegend: false,
      },
    ];
    annotations = [];
    totalArea = 0;
    error = (realTotalArea - totalArea).toFixed(8);
  }

  const layout = {
    title: "Parábola y = x²",
    annotations: annotations,
    showlegend: false,
    barmode: "overlay",
    autosize: true,
    margin: { l: 20, r: 20, t: 30, b: 20 },
  };

  Plotly.newPlot("plot", traces, layout);

  if (n >= 2) {
    const table = document.createElement("table");
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    ["Partes", "Retângulos", "\\(x_i\\)", "\\(y_i\\)", "A(n)"].forEach(
      (text, index) => {
        const cell = headerRow.insertCell(index);
        if (index === 4) cell.classList.add("an-column");
        cell.innerHTML = `<b>${text}</b>`;
      }
    );

    const body = table.createTBody();
    tableBodyData.forEach((rowInfo) => {
      const row = body.insertRow();
      rowInfo.forEach((value, j) => {
        const cell = row.insertCell(j);
        cell.innerHTML = value;
        if (j === 2 || j === 3) {
          cell.style.textAlign = "center"; // Centralizado para MathJax
        } else if (j === 4) {
          cell.classList.add("an-cell");
        }
      });
    });

    const summaryData = [
      ["<u>COMPARAÇÃO DAS ÁREAS", "<u>VALORES"],
      ["Área Real sob a Curva", realTotalArea],
      ["Área por Retângulos", totalArea],
      ["Erro", error],
    ];

    summaryData.forEach((rowInfo) => {
      const row = body.insertRow();
      const descriptionCell = row.insertCell();
      descriptionCell.innerHTML = `<strong>${rowInfo[0]}</strong>`;
      descriptionCell.colSpan = 4;
      descriptionCell.classList.add("summary-description");
      const valueCell = row.insertCell();
      valueCell.innerHTML = `<strong>${rowInfo[1]}</strong>`;
      valueCell.classList.add("summary-value", "an-cell");
    });

    tableContainer.appendChild(table);

    // CORREÇÃO CRÍTICA: Renderiza o MathJax na tabela recém-criada
    if (window.MathJax && typeof window.MathJax.typeset === 'function') {
      window.MathJax.typeset([tableContainer]);
    }
  }
}

/**
 * Limpa o valor de um campo de input específico.
 */
function clearInput(inputId) {
  const inputElement = document.getElementById(inputId);
  if (inputElement) {
    inputElement.value = ""; // Define o valor do input como vazio
  }
}

/**
 * Função para limpar o gráfico e a tabela, resetando o input.
 */
function resetPage() {
  document.getElementById("n-value").value = "2";
  document.getElementById("tabela-container").innerHTML = "";
  Plotly.newPlot("plot", [], { title: "Parábola y = x²" });
}

// =======================================================================
// 3. INICIALIZAÇÃO E EVENT LISTENERS (Corrigidos)
// =======================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Desabilita os botões principais até o desafio ser completo
  document.getElementById("gerar-grafico").disabled = true;
  document.getElementById("limpar-pagina").disabled = true;

  // ---- BOTÕES DA PÁGINA PRINCIPAL ----
  document.getElementById("gerar-grafico").addEventListener("click", generatePlot);
  document.getElementById("limpar-pagina").addEventListener("click", resetPage);
  document.getElementById("Verificar").addEventListener("click", () => {
    mostrarConteudoModal("conteudo-verificar", "Verificação para n = k");
  });

  // ---- BOTÕES DO MODAL (CORRIGIDOS) ----

  // Funções de comparação para a validação
  const parseIntCompare = (val) => parseInt(val, 10);
  const parseFloatCompare = (val) => parseFloat(val);

  // Desafio 1 (n = 3)
  document.getElementById("prompt-ok-btn").addEventListener("click", () =>
    validateInput("prompt-input", 2, parseIntCompare, "conteudo-grafico-e-pergunta", "Área do Polígono (n = 3)", "Resposta incorreta. Dica: n-1 retângulos.")
  );
  document.getElementById("prompt-cancel-btn").addEventListener("click", () => clearInput("prompt-input"));
  document.getElementById("proximo-passo-btn").addEventListener("click", () =>
    validateInput("area-input", 0.185, parseFloatCompare, "conteudo-verificacao", "Verificação do Cálculo (n = 3)", "Valor incorreto. Tente novamente.")
  );
  document.getElementById("prompt-cancel-btn-2").addEventListener("click", () => clearInput("area-input"));
  document.getElementById("proximo-passo-btn3").addEventListener("click", () =>
    mostrarConteudoModal("conteudo-desafio2", "Desafios 2: n = 4")
  );

  // Desafio 2 (n = 4)
  document.getElementById("prompt-ok-btn-2").addEventListener("click", () =>
    validateInput("prompt-input-2", 3, parseIntCompare, "conteudo-grafico-e-pergunta2", "Área do Polígono (n = 4)", "Resposta incorreta. Dica: n-1 retângulos.")
  );
  document.getElementById("prompt-cancel-btn-4").addEventListener("click", () => clearInput("prompt-input-2"));
  document.getElementById("proximo-passo-btn-4").addEventListener("click", () =>
    validateInput("area-input-2", 0.219, parseFloatCompare, "conteudo-verificacao2", "Verificação do Cálculo (n = 4)", "Valor incorreto. Tente novamente.")
  );
  document.getElementById("prompt-cancel-btn-5").addEventListener("click", () => clearInput("area-input-2"));
  document.getElementById("proximo-passo-btn-5").addEventListener("click", () =>
    mostrarConteudoModal("conteudo-desafio3", "Desafio 3: n = 5")
  );

  // Desafio 3 (n = 5)
  document.getElementById("prompt-ok-btn-3").addEventListener("click", () =>
    validateInput("prompt-input-3", 4, parseIntCompare, "conteudo-grafico-e-pergunta3", "Área do Polígono (n = 5)", "Resposta incorreta. Dica: n-1 retângulos.")
  );
  document.getElementById("prompt-cancel-btn-6").addEventListener("click", () => clearInput("prompt-input-3"));
  document.getElementById("proximo-passo-btn-6").addEventListener("click", () =>
    validateInput("area-input-3", 0.24, parseFloatCompare, "conteudo-verificacao3", "Verificação do Cálculo (n = 5)", "Valor incorreto. Tente novamente.")
  );
  document.getElementById("prompt-cancel-btn-7").addEventListener("click", () => clearInput("area-input-3"));
  document.getElementById("proximo-passo-btn-7").addEventListener("click", () => {
    isChallengeCompleted = true; // Marca que os desafios principais foram concluídos
    mostrarConteudoModal("conteudo-desafio4", "Desafio 4: n = k");
  });

  // Desafio 4 (n = k) e Verificação Final
  document.getElementById("proximo-passo-btn5").addEventListener("click", enableMainButtons);
  document.getElementById("fecharVerificarBtn").addEventListener("click", handleCloseVerificationAndEnableNext);

  // Botão 'x' para fechar o modal
  const closeButton = document.querySelector(".fechar-modal");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      // Só permite fechar o modal pelo 'x' após os desafios obrigatórios
      if (isChallengeCompleted) {
        closeModal("modalP2");
      } else {
        alert("Por favor, complete os desafios iniciais antes de fechar.");
      }
    });
  }

  // Botões de "Fechar" genéricos que não foram mapeados (opcional, mas boa prática)
  document.getElementById("prompt-fechar-btn").addEventListener("click", () => closeModal("modalP2"));
  document.getElementById("prompt-fechar-btn-2").addEventListener("click", () => closeModal("modalP2"));
  // ... (adicionar para todos os outros botões "fechar" se necessário) ...
  document.getElementById("prompt-fechar-btn-9").addEventListener("click", () => closeModal("modalP2"));
  document.getElementById("prompt-fechar-btn-11").addEventListener("click", () => closeModal("modalP2"));

  // Inicia a página mostrando o primeiro desafio
  mostrarConteudoModal(
    "conteudo-desafio",
    "Desafios - Explorando o Princípio da Indução Matemática"
  );
});