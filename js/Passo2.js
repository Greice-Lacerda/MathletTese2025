// Passo2.js

// Importa as funções para gerenciar os modais
import {
  mostrarConteudoModal,
  setupModalControls,
  closeModal,
} from "./botoesModal.js";
import { generateTable } from "./TableP2.js";

const desafioData = {};
let isChallengeCompleted = false; // NOVA VARIÁVEL: Variável de estado para o progresso

/**
 * Habilita os botões principais da página após a conclusão dos desafios.
 */
function enableMainButtons() {
  const gerarGraficoBtn = document.getElementById("gerar-grafico");
  const limparPaginaBtn = document.getElementById("limpar-pagina");

  if (gerarGraficoBtn) {
    gerarGraficoBtn.disabled = false;
  }
  if (limparPaginaBtn) {
    limparPaginaBtn.disabled = false;
  }

  closeModal("modalP2");
}

/**
 * Exibe uma mensagem de erro abaixo do elemento de entrada e reproduz o som.
 * @param {string} message - A mensagem de erro a ser exibida.
 * @param {HTMLElement} inputElement - O elemento de entrada que causou o erro.
 */
function displayError(message, inputElement) {
  const errorAudio = document.getElementById("error-audio");
  if (errorAudio) {
    errorAudio.play();
  }

  // Remove qualquer mensagem de erro anterior para evitar duplicatas
  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }

  // Cria um novo elemento para a mensagem de erro
  const errorMessageElement = document.createElement("p");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("error-message");
  errorMessageElement.style.color = "red";
  errorMessageElement.style.marginTop = "15px";

  // Insere o elemento logo após o input
  inputElement.parentNode.insertBefore(
    errorMessageElement,
    inputElement.nextSibling
  );

  // Remove a mensagem após 3 segundos
  setTimeout(() => {
    if (errorMessageElement && errorMessageElement.parentNode) {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
    }
  }, 2500);
}

/**
 * Função para processar a resposta do usuário para o desafio de n = 2.
 */
function handleConfirmN2() {
  const inputElement = document.getElementById("prompt-input");
  const inputN = inputElement.value;

  if (parseInt(inputN, 10) !== 2) {
    displayError(
      "Resposta incorreta. Por favor, tente novamente.",
      inputElement
    );
    return;
  }
  mostrarConteudoModal(
    "conteudo-grafico-e-pergunta",
    "Área do Polígono (n = 3)"
  );
}

/**
 * Função para validar o valor da área para n=3.
 */
function handleNextStepN3() {
  const inputElement = document.getElementById("area-input");
  const areaInput = inputElement.value;

  if (parseFloat(areaInput) !== 0.125) {
    displayError("Valor incorreto. Por favor, tente novamente.", inputElement);
    return;
  }
  mostrarConteudoModal(
    "conteudo-verificacao",
    "Verificação do Cálculo da área (n = 3)"
  );
}

/**
 * Função para avançar do conteúdo de verificação para o desafio n=4.
 */
function handleNextStepFromVerification() {
  mostrarConteudoModal("conteudo-desafio2", "Desafios - Para n = 4");
}

/**
 * Função para processar a resposta do usuário para o desafio de n=4.
 */
function handleConfirmN4() {
  const inputElement = document.getElementById("prompt-input-2");
  const inputN4 = inputElement.value;

  if (parseInt(inputN4, 10) !== 3) {
    displayError(
      "Resposta incorreta. Por favor, tente novamente.",
      inputElement
    );
    return;
  }
  mostrarConteudoModal(
    "conteudo-grafico-e-pergunta2",
    "Área do Polígono (n = 4)"
  );
}

/**
 * Função para validar o valor da área para n = 4.
 */
function handleNextStepN4() {
  const inputElement = document.getElementById("area-input-2");
  const areaInput2 = inputElement.value;

  if (parseFloat(areaInput2) !== 0.219) {
    displayError("Valor incorreto. Por favor, tente novamente.", inputElement);
    return;
  }
  mostrarConteudoModal(
    "conteudo-verificacao2",
    "Verificação do Cálculo da área (n = 4)"
  );
}

/**
 * Função para avançar do conteúdo de verificação para o desafio n = 5.
 */
function handleNextStepFromVerification2() {
  mostrarConteudoModal("conteudo-desafio3", "Desafios - Para n = 5");
}

/**
 * Função para processar a resposta do usuário para o desafio de n = 5.
 */
function handleConfirmN5() {
  const inputElement = document.getElementById("prompt-input-3");
  const inputN5 = inputElement.value;

  if (parseInt(inputN5, 10) !== 4) {
    displayError(
      "Resposta incorreta. Por favor, tente novamente.",
      inputElement
    );
    return;
  }
  mostrarConteudoModal(
    "conteudo-grafico-e-pergunta3",
    "Área do Polígono (n = 5)"
  );
}

/**
 * Função para validar o valor da área para n = 5.
 */
function handleNextStepN5() {
  const inputElement = document.getElementById("area-input-3");
  const areaInput3 = inputElement.value;

  if (parseFloat(areaInput3) !== 0.24) {
    displayError("Valor incorreto. Por favor, tente novamente.", inputElement);
    return;
  }
  mostrarConteudoModal(
    "conteudo-verificacao3",
    "Verificação do Cálculo da área (n = 5)"
  );
  isChallengeCompleted = true; // ADIÇÃO: Define o estado como concluído
}

/**
 * Função para avançar do conteúdo de verificação para o desafio n = k.
 */
function handleNextStepFromVerification3() {
  mostrarConteudoModal("conteudo-desafio4", "Desafios - Para n = k");
}

/**
 * Função que fecha o modal de verificação e habilita o botão de "Próxima Etapa" na página principal.
 */
function handleCloseVerificationAndEnableNext() {
  closeModal("modalP2");
  const proximaEtapaBtn = document.getElementById("ProximaEtapa");
  if (proximaEtapaBtn) {
    proximaEtapaBtn.classList.remove("hidden");
    proximaEtapaBtn.disabled = false;
  }
}

/**
 * NOVA FUNÇÃO: Lógica para o modal de erro quando o usuário tenta fechar.
 */
function handleCloseModal() {
  if (isChallengeCompleted) {
    closeModal("modalP2");
  } else {
    // Exibe o modal de erro
    const errorModal = document.getElementById("error-modal");
    if (errorModal) {
      errorModal.classList.remove("hidden");
    }
  }
}

/**
 * NOVA FUNÇÃO: Recarrega a página.
 */
function reloadPage() {
  window.location.reload();
}

// ----------------------------------------------------------------------
// Lógica para os botões "Gerar Gráfico" e "Limpar"
// ----------------------------------------------------------------------

/**
 * Função auxiliar para formatar a fração usando as classes CSS.
 */
function formatFraction(numerator, denominator) {
  return `<span class="fraction-container">
            <span class="numerator">${numerator}</span>
            <span class="denominator">${denominator}</span>
            </span>`;
}

/**
 * Função auxiliar para formatar um termo da área (largura * altura).
 */
function formatAreaTerm(i, n) {
  const widthFraction = formatFraction(1, n);
  const heightFraction = formatFraction(
    `${i}<sup><small>2</small></sup>`,
    `${n}<sup><small>2</small></sup>`
  );
  return `${widthFraction} x ${heightFraction}`;
}

/**
 * Função para a parábola.
 */
function parabola(x) {
  return x.map((xi) => xi ** 2);
}

/**
 * Função para gerar o gráfico na página principal.
 */
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

  tableContainer.innerHTML = ""; // Limpa a tabela no início

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
    const area_values = x_rect
      .slice(0, -1)
      .map((xi, i) => bar_width * y_rect[i]);

    const cumulativeArea_values = [];
    let accumulated_numerator = 0;
    const formatted_area_terms = [];
    const cumulativeArea_string = [];

    x_rect.slice(0, -1).forEach((xi, i) => {
      const currentArea_numerator = i ** 2;
      const denominator = n ** 3;
      accumulated_numerator += currentArea_numerator;

      if (currentArea_numerator > 0) {
        formatted_area_terms.push(`(${formatAreaTerm(i, n)})`);
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
        name: `Area_${i} = ${area_values[i].toFixed(8)}`,
        marker: {
          color: "rgba(0, 0, 255, 0.3)",
          line: {
            color: "black",
            width: 0.5,
          },
        },
        offset: 0,
        showlegend: false,
      })),
    ];

    annotations =
      n <= 10
        ? x_rect.slice(0, -1).flatMap((xi, i) => {
            const widthText = `x<sub>${i}</sub> = ${i}/${n}`;
            const heightText = `y<sub>${i}</sub> = (${i}/${n})<sup>2</sup>`;
            const areaText = `A<sub>${i}</sub>`;

            return [
              {
                x: xi + bar_width - 1 / n,
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

    tableBodyData = x_rect.slice(0, -1).map((xi, i) => {
      const xFraction = formatFraction(i, n);
      const yFractionSquared = formatFraction(
        `${i}<sup><small>2</small></sup>`,
        `${n}<sup><small>2</small></sup>`
      );
      const accumulatedString = cumulativeArea_string[i] || "0";
      const approxValue = cumulativeArea_values[i]
        ? cumulativeArea_values[i].toFixed(8)
        : "0";

      const contentString = `<div class="an-sum">A(${
        i + 1
      }) = ${accumulatedString}</div><div class="an-approx">A(${
        i + 1
      }) &asymp; ${approxValue}</div>`;

      return [i + 1, i, xFraction, yFractionSquared, contentString];
    });

    totalArea = cumulativeArea_values.pop().toFixed(8);
    error = (realTotalArea - totalArea).toFixed(8);
  } else {
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
    width: plotDiv.offsetWidth * 0.89,
    height: plotDiv.offsetHeight * 0.85,
    margin: {
      l: 20,
      r: 20,
      t: 30,
      b: 20,
    },
  };

  Plotly.newPlot("plot", traces, layout);

  if (n >= 2) {
    const table = document.createElement("table");
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    ["Partes", "Retângulos", "x<sub>i</sub>", "y<sub>i</sub>", "A(n)"].forEach(
      (text, index) => {
        const cell = headerRow.insertCell(index);
        if (index === 4) {
          cell.classList.add("an-column");
        }
        cell.innerHTML = `<b>${text}</b>`;
      }
    );

    const body = table.createTBody();
    tableBodyData.forEach((rowInfo) => {
      const row = body.insertRow();
      rowInfo.forEach((value, j) => {
        const cell = row.insertCell(j);
        cell.innerHTML = value;

        if (j === 2) {
          cell.style.textAlign = "left";
          cell.style.paddingLeft = "15px";
          cell.style.paddingRight = "15px";
        } else if (j === 3) {
          cell.style.textAlign = "left";
          cell.style.paddingLeft = "15px";
          cell.style.paddingRight = "15px";
        } else if (j === 4) {
          cell.classList.add("an-cell");
        }
      });
    });

    const summaryData = [
      ["<u>COMPARAÇAO DAS ÁREAS", "<u>VALORES"],
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
  }
}

/**
 * Função para recarregar a página de forma eficiente.
 */
function resetPage() {
  document.getElementById("n-value").value = "2";
  document.getElementById("tabela-container").innerHTML = "";
  Plotly.newPlot("plot", [], { title: "Parábola y = x²" });
}

/**
 * Inicializa a página.
 */
document.addEventListener("DOMContentLoaded", () => {
  const gerarGraficoBtn = document.getElementById("gerar-grafico");
  const limparPaginaBtn = document.getElementById("limpar-pagina");
  const errorModal = document.getElementById("error-modal"); // ADIÇÃO: Referência ao novo modal de erro
  const confirmReloadBtn = document.getElementById("confirm-reload-btn"); // ADIÇÃO: Referência ao botão de confirmação

  if (gerarGraficoBtn) {
    gerarGraficoBtn.disabled = false;
  }
  if (limparPaginaBtn) {
    limparPaginaBtn.disabled = false;
  }

  if (confirmReloadBtn) {
    confirmReloadBtn.addEventListener("click", reloadPage); // ADIÇÃO: Listener para recarregar a página
  }

  mostrarConteudoModal(
    "conteudo-desafio",
    "Desafios - Explorando o Princípio da Indução Matemática"
  );

  setupModalControls({
    handleConfirmN2: handleConfirmN2,
    handleNextStepN3: handleNextStepN3,
    handleNextStepFromVerification: handleNextStepFromVerification,
    handleConfirmN4: handleConfirmN4,
    handleNextStepN4: handleNextStepN4,
    handleNextStepFromVerification2: handleNextStepFromVerification2,
    handleConfirmN5: handleConfirmN5,
    handleNextStepN5: handleNextStepN5,
    handleNextStepFromVerification3: handleNextStepFromVerification3,
    enableMainButtons: enableMainButtons,
    handleCloseVerificationAndEnableNext: handleCloseVerificationAndEnableNext,
    handleCloseModal: handleCloseModal, // ADIÇÃO: Novo manipulador de fechamento
  });

  // Adiciona os event listeners para os botões "Gerar Gráfico" e "Limpar"
  if (gerarGraficoBtn) {
    gerarGraficoBtn.addEventListener("click", generatePlot);
  }
  if (limparPaginaBtn) {
    limparPaginaBtn.addEventListener("click", resetPage);
  }
});
