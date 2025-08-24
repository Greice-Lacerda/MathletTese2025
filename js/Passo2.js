// Passo2.js

// A importação de 'generatePlot' e 'generateTable' foi mantida caso você as use em outros lugares
import { generatePlot } from "./graficoP2.js";
import { generateTable } from "./TableP2.js";

// Importa as funções para gerenciar os modais
import {
  mostrarConteudoModal,
  setupModalControls,
  closeModal,
} from "./botoesModal.js";

const desafioData = {};

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
 * Função para processar a resposta do usuário para o desafio de n=2.
 * @param {Event} event - O evento de clique do botão.
 */
function handleConfirmN2() {
  const inputN = document.getElementById("prompt-input").value;
  const errorAudio = document.getElementById("error-audio");

  if (parseInt(inputN, 10) !== 2) {
    if (errorAudio) {
      errorAudio.play();
    }
    // Usando console.warn para evitar alertas no navegador.
    console.warn("Resposta incorreta. Por favor, tente novamente.");
    return;
  }

  desafioData.nValue = parseInt(inputN, 10) + 1;
  mostrarConteudoModal("conteudo-grafico-e-pergunta", "Área do Polígono (n = 3)");
}

/**
 * Função para validar o valor da área para n=3.
 */
function handleNextStepN3() {
  const areaInput = document.getElementById("area-input").value;
  const errorAudio = document.getElementById("error-audio");

  if (parseFloat(areaInput) !== 0.185) {
    if (errorAudio) {
      errorAudio.play();
    }
    console.warn("Valor incorreto. Por favor, tente novamente.");
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
 * Função para processar a resposta do usuário para o desafio de n = 4.
 */
function handleConfirmN4() {
  const inputN4 = document.getElementById("prompt-input-2").value;
  const errorAudio = document.getElementById("error-audio");

  if (parseInt(inputN4, 10) !== 3) {
    if (errorAudio) {
      errorAudio.play();
    }
    console.warn("Resposta incorreta. Por favor, tente novamente.");
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
  const areaInput2 = document.getElementById("area-input-2").value;
  const errorAudio = document.getElementById("error-audio");

  // Valor da área para n = 4
  if (parseFloat(areaInput2) !== 0.219) {
    if (errorAudio) {
      errorAudio.play();
    }
    console.warn("Valor incorreto. Por favor, tente novamente.");
    return;
  }
  mostrarConteudoModal(
    "conteudo-verificacao2",
    "Verificação do Cálculo da área (n = 4)"
  );
}

/**
 * Função para avançar do conteúdo de verificação para o desafio n=5.
 */
function handleNextStepFromVerification2() {
  mostrarConteudoModal("conteudo-desafio3", "Desafios - Para n = 5");
}

/**
 * Função para processar a resposta do usuário para o desafio de n = 5.
 */
function handleConfirmN5() {
  const inputN5 = document.getElementById("prompt-input-3").value;
  const errorAudio = document.getElementById("error-audio");

  if (parseInt(inputN5, 10) !== 4) {
    if (errorAudio) {
      errorAudio.play();
    }
    console.warn("Resposta incorreta. Por favor, tente novamente.");
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
  const areaInput3 = document.getElementById("area-input-3").value;
  const errorAudio = document.getElementById("error-audio");

  // Valor da área para n = 5
  if (parseFloat(areaInput3) !== 0.240) {
    if (errorAudio) {
      errorAudio.play();
    }
    console.warn("Valor incorreto. Por favor, tente novamente.");
    return;
  }
  mostrarConteudoModal(
    "conteudo-verificacao3",
    "Verificação do Cálculo da área (n = 5)"
  );
}

/**
 * Função para avançar do conteúdo de verificação para o desafio n=k.
 */
function handleNextStepFromVerification3() {
  mostrarConteudoModal("conteudo-desafio4", "Desafios - Para n = k");
}

/**
 * Inicializa a página.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Desabilita os botões principais até que os desafios do modal sejam concluídos.
  const gerarGraficoBtn = document.getElementById("gerar-grafico");
  const limparPaginaBtn = document.getElementById("limpar-pagina");

  if (gerarGraficoBtn) {
    gerarGraficoBtn.disabled = true;
  }
  if (limparPaginaBtn) {
    limparPaginaBtn.disabled = true;
  }

  // Abre o primeiro modal do desafio.
  mostrarConteudoModal(
    "conteudo-desafio",
    "Desafios - Explorando o Princípio da Indução Matemática"
  );

  // Configura os listeners dos botões do modal.
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
  });
});
