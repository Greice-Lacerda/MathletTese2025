// Passo2.js

// Importa as funções para gerenciar os modais
import { mostrarConteudoModal, closeModal } from "./botoesModal.js";
// A importação da tabela foi removida pois a função generatePlot já cuida disso.
// import { generateTable } from "./TableP2.js";

let isChallengeCompleted = false; // Variável de estado para o progresso

/**
 * Habilita os botões principais da página e fecha o modal.
 * Esta função é chamada ao final do desafio n=k.
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

  // Fecha o modal ao concluir o último desafio interativo
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
  const errorMessageElement = document.createElement("div");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("error-message");

  // Insere o elemento logo após o input
  inputElement.parentNode.insertBefore(
    errorMessageElement,
    inputElement.nextSibling
  );

  // Remove a mensagem após 2.5 segundos
  setTimeout(() => {
    if (errorMessageElement && errorMessageElement.parentNode) {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
    }
  }, 3000);
}

/**
 * Função para processar a resposta do Desafio 1 (n = 3).
 * A lógica verifica se o número de retângulos é 2 (n - 1).
 */
function handleConfirmN3() {
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
 * Função para validar o valor da área para n = 3.
 */
function handleValidateAreaN3() {
  const inputElement = document.getElementById("area-input");
  const areaInput = inputElement.value;

  if (parseFloat(areaInput) !== 0.185) {
    displayError("Valor incorreto. Por favor, tente novamente.", inputElement);
    return;
  }
  mostrarConteudoModal(
    "conteudo-verificacao",
    "Verificação do Cálculo da área (n = 3)"
  );
}

/**
 * Função para avançar da verificação de n = 3 para o desafio de n = 4.
 */
function handleNextStepFromVerification1() {
  mostrarConteudoModal("conteudo-desafio2", "Desafios 2: n = 4");
}

/**
 * Função para processar a resposta do Desafio 2 (n = 4).
 * A lógica verifica se o número de retângulos é 3 (n-1).
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
function handleValidateAreaN4() {
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
 * Função para avançar da verificação de n=4 para o desafio n = 5.
 */
function handleNextStepFromVerification2() {
  mostrarConteudoModal("conteudo-desafio3", "Desafio 3: n = 5");
}

/**
 * Função para processar a resposta do Desafio 3 (n = 5).
 * A lógica verifica se o número de retângulos é 4 (n-1).
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
function handleValidateAreaN5() {
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
}

/**
 * Função para avançar da verificação de n=5 para o desafio n = k.
 */
function handleNextStepFromVerification3() {
  isChallengeCompleted = true; // Marca que os desafios principais foram concluídos
  mostrarConteudoModal("conteudo-desafio4", "Desafio 4: n = k");
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

    const cumulativeArea_values = [];
    let accumulated_numerator = 0;
    const formatted_area_terms = [];
    const cumulativeArea_string = [];

    x_rect.slice(0, -1).forEach((_, i) => {
      const currentArea_numerator = i ** 2;
      const denominator = n ** 3;
      accumulated_numerator += currentArea_numerator;

      if (currentArea_numerator > 0) {
        const widthFraction = formatFraction(1, n);
        const heightFraction = formatFraction(
          `${i}<sup>2</sup>`,
          `${n}<sup>2</sup>`
        );
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
            const widthText = `x<sub>${i}</sub> = ${i}/${n}`;
            const heightText = `y<sub>${i}</sub> = (${i}/${n})<sup>2</sup>`;
            const areaText = `A<sub>${i}</sub>`;

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
      const xFraction = formatFraction(i, n);
      const yFractionSquared = formatFraction(
        `${i}<sup>2</sup>`,
        `${n}<sup>2`
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
    margin: { l: 20, r: 20, t: 30, b: 20 },
  };

  Plotly.newPlot("plot", traces, layout);

  if (n >= 2) {
    const table = document.createElement("table");
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    ["Partes", "Retângulos", "x<sub>i</sub>", "y<sub>i</sub>", "A(n)"].forEach(
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
          cell.style.textAlign = "left";
          cell.style.paddingLeft = "15px";
          cell.style.paddingRight = "15px";
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
  }
}

/**
 * Limpa o valor de um campo de input específico.
 * @param {string} inputId - O ID do elemento de input a ser limpo.
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

/**
 * Adiciona todos os listeners de eventos quando o DOM estiver carregado.
 */
document.addEventListener("DOMContentLoaded", () => {
  // ---- BOTÕES DA PÁGINA PRINCIPAL ----
  document
    .getElementById("gerar-grafico")
    .addEventListener("click", generatePlot);
  document.getElementById("limpar-pagina").addEventListener("click", resetPage);
  document.getElementById("Verificar").addEventListener("click", () => {
    // O botão "Verificar Resposta" da página principal mostra a verificação final para n=k
    mostrarConteudoModal("conteudo-verificar", "Verificação para n = k");
  });

  // ---- BOTÕES DO MODAL ----

  // Desafio 1 (n = 3)
  document
    .getElementById("prompt-ok-btn3")
    .addEventListener("click", handleConfirmN3);
  document
    .getElementById("prompt-cancel-btn3")
  document
  .getElementById("prompt-cancel-btn3")
  .addEventListener("click", () => clearInput("prompt-input"));
  document
    .getElementById("prompt-ok-btn33")
    .addEventListener("click", handleValidateAreaN3);
  document
    .getElementById("prompt-cancel-btn33")
    .addEventListener("click", () => clearInput("area-input"));
  document
    .getElementById("proximo-passo-btn3")
    .addEventListener("click", handleNextStepFromVerification1);

  // Desafio 2 (n = 4)
  document
    .getElementById("prompt-ok-btn4")
    .addEventListener("click", handleConfirmN4);
  document
    .getElementById("prompt-cancel-btn4")
    .addEventListener("click", () => clearInput("prompt-input-2"));
  document
    .getElementById("prompt-ok-btn44")
    .addEventListener("click", handleValidateAreaN4);
  document
    .getElementById("prompt-cancel-btn44")
    .addEventListener("click", () => clearInput("area-input-2"));
  document
    .getElementById("proximo-passo-btn-5")
    .addEventListener("click", handleNextStepFromVerification2);

  // Desafio 3 (n = 5)
  document
    .getElementById("prompt-ok-btn5")
    .addEventListener("click", handleConfirmN5);
  document
    .getElementById("prompt-cancel-btn5")
    .addEventListener("click", () => clearInput("prompt-input-3"));
  document
    .getElementById("prompt-ok-btn6")
    .addEventListener("click", handleValidateAreaN5);
  document
    .getElementById("prompt-cancel-btn6")
    .addEventListener("click", () => clearInput("area-input-3"));
  document
    .getElementById("proximo-passo-btn-7")
    .addEventListener("click", handleNextStepFromVerification3);

  // Desafio 4 (n = k) e Verificação Final
  document
    .getElementById("proximo-passo-btn5")
    .addEventListener("click", enableMainButtons);
  document
    .getElementById("fecharVerificarBtn")
    .addEventListener("click", handleCloseVerificationAndEnableNext);

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

  // Inicia a página mostrando o primeiro desafio
  mostrarConteudoModal(
    "conteudo-desafio",
    "Desafios - Explorando o Princípio da Indução Matemática"
  );
});
