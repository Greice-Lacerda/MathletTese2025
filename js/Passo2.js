// Passo2.js

// Importa as funções de geração de conteúdo
import { generatePlot } from "./graficoP2.js";
import { generateTable } from "./TableP2.js";

// Importa as funções para gerenciar os modais
import { setupModalCloseButtons, closeModal } from "./botoesModal.js";

// Variáveis para armazenar os valores do modal principal.
const desafioData = {};

/**
 * Função para fechar o modal e processar os dados inseridos pelo usuário.
 */
function handleModalSubmit() {
  const inputN = document.getElementById("prompt-input").value;
  // Busca o elemento de áudio usando o ID correto: "error-audio"
  const errorAudio = document.getElementById("error-audio");

  // Valida o valor digitado. Se for diferente de 2, exibe o erro.
  if (parseInt(inputN, 10) !== 2) {
    if (errorAudio) {
      errorAudio.play();
    }
    alert("Por favor, tente novamente.");
  } else {
    // Se o valor for 2, prossegue com a lógica normal.
    desafioData.nValue = parseInt(inputN, 10) + 1;
    closeModal("modalP2");

  desafioData.nValue = parseInt(inputN, 10) + 1;
  closeModal("modalP2");

  if (desafioData.nValue) {
    // Torna os contêineres do gráfico e da tabela visíveis
    const graficoFieldset = document.getElementById("Explorar12");
    const tabelaFieldset = document.getElementById("Explorar13");

    if (graficoFieldset) {
      graficoFieldset.classList.remove("hidden");
      graficoFieldset.classList.add("visible");
    }
    if (tabelaFieldset) {
      tabelaFieldset.classList.remove("hidden");
      tabelaFieldset.classList.add("visible");
    }

    // Gera o gráfico e a tabela com o valor fornecido
    generatePlot(desafioData.nValue);
    //generateTable(desafioData.nValue);
  }
}
}
/**
 * Função para abrir um modal específico.
 * @param {string} modalId - O ID do modal a ser aberto.
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("visible");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  openModal("modalP2");

  const confirmBtn = document.getElementById("prompt-ok-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", handleModalSubmit);
  }

  const instrucaoBtn = document.getElementById("Instrucao");
  const verificarBtn = document.getElementById("Verificar");

  if (instrucaoBtn) {
    instrucaoBtn.addEventListener("click", () => openModal("modalInstrucoes"));
  }

  if (verificarBtn) {
    verificarBtn.addEventListener("click", () => openModal("modalVerificar"));
  }

  setupModalCloseButtons();
});

window.openModal = openModal;
