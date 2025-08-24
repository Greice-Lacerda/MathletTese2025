// botoesModal.js

/**
 * Função genérica para fechar qualquer modal.
 * @param {string} modalId - O ID do modal a ser fechado.
 */
export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("visible");
    modal.classList.add("hidden");
  }
}

/**
 * Função para mostrar um conteúdo específico no modal.
 * @param {string} conteudoId - O ID do conteúdo a ser exibido.
 * @param {string} titulo - O novo título do modal.
 */
export function mostrarConteudoModal(conteudoId, titulo) {
  const modalPrincipal = document.getElementById("modalP2");
  const tituloModal = modalPrincipal.querySelector(".desafio-titulo");

  // Oculta todos os conteúdos
  document
    .querySelectorAll("#modalP2 .modal-columns-container")
    .forEach((conteudo) => {
      conteudo.classList.add("hidden");
    });

  // Mostra o conteúdo selecionado
  const conteudoAlvo = document.getElementById(conteudoId);
  if (conteudoAlvo) {
    conteudoAlvo.classList.remove("hidden");
    tituloModal.textContent = titulo;
    modalPrincipal.classList.remove("hidden");
  }
}

/**
 * Adiciona listeners para os botões de controle dos modais.
 * @param {object} handlers - Um objeto com as funções de callback para cada botão.
 * @param {Function} handlers.handleConfirmN2 - Lógica para o primeiro desafio (n=2).
 * @param {Function} handlers.handleNextStepN3 - Lógica para a área do polígono (n=3).
 * @param {Function} handlers.handleNextStepFromVerification - Lógica para o botão do Desafio 2.
 * @param {Function} handlers.handleConfirmN4 - Lógica para o desafio n=4.
 * @param {Function} handlers.handleNextStepN4 - Lógica para a área do polígono (n=4).
 * @param {Function} handlers.handleNextStepFromVerification2 - Lógica para o botão do Desafio 3.
 * @param {Function} handlers.handleConfirmN5 - Lógica para o desafio n=5.
 * @param {Function} handlers.handleNextStepN5 - Lógica para a área do polígono (n=5).
 * @param {Function} handlers.handleNextStepFromVerification3 - Lógica para o botão do Desafio 4.
 * @param {Function} handlers.handleNextStepNK - Lógica para o desafio n=k.
 * @param {Function} handlers.enableMainButtons - Lógica para habilitar botões da página principal.
 */
export function setupModalControls(handlers) {
  const modalPrincipal = document.getElementById("modalP2");

  // Seleciona todos os botões de fechar e adicionar o listener
  document
    .querySelectorAll(
      ".fechar-modal, #fecharInstrucoesBtn, #fecharVerificarBtn, #prompt-fechar-btn, #prompt-fechar-btn-2, #prompt-fechar-btn-3, #prompt-fechar-btn-4, #prompt-fechar-btn-5, #prompt-fechar-btn-6, #prompt-fechar-btn-7, #prompt-fechar-btn-8, #prompt-fechar-btn-9, #prompt-fechar-btn-10, #prompt-fechar-btn-11"
    )
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        modalPrincipal.classList.add("hidden");
      });
    });

  // Seleciona todos os botões de cancelar e adicionar o listener
  document
    .querySelectorAll(
      "#prompt-cancel-btn, #prompt-cancel-btn-2, #prompt-cancel-btn-4, #prompt-cancel-btn-5, #prompt-cancel-btn-6, #prompt-cancel-btn-7, #prompt-cancel-btn-8"
    )
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalInput = btn
          .closest(".modal-columns-container")
          .querySelector("input");
        if (modalInput) {
          modalInput.value = "";
        }
      });
    });

  // Adiciona listeners para os botões de navegação e validação, usando os handlers passados
  const botaoInstrucao = document.getElementById("Instrucao");
  if (botaoInstrucao) {
    botaoInstrucao.addEventListener("click", () => {
      mostrarConteudoModal("conteudo-instrucoes", "Instruções");
    });
  }

  const botaoVerificar = document.getElementById("Verificar");
  if (botaoVerificar) {
    botaoVerificar.addEventListener("click", () => {
      mostrarConteudoModal("conteudo-verificar", "Verificar Resposta");
    });
  }

  const botaoConfirmarN2 = document.getElementById("prompt-ok-btn");
  if (botaoConfirmarN2 && handlers.handleConfirmN2) {
    botaoConfirmarN2.addEventListener("click", handlers.handleConfirmN2);
  }

  const botaoProximoPassoN3 = document.getElementById("proximo-passo-btn");
  if (botaoProximoPassoN3 && handlers.handleNextStepN3) {
    botaoProximoPassoN3.addEventListener("click", handlers.handleNextStepN3);
  }

  const botaoProximoPassoN3Verificacao =
    document.getElementById("proximo-passo-btn3");
  if (
    botaoProximoPassoN3Verificacao &&
    handlers.handleNextStepFromVerification
  ) {
    botaoProximoPassoN3Verificacao.addEventListener(
      "click",
      handlers.handleNextStepFromVerification
    );
  }

  const botaoConfirmarN4 = document.getElementById("prompt-ok-btn-2");
  if (botaoConfirmarN4 && handlers.handleConfirmN4) {
    botaoConfirmarN4.addEventListener("click", handlers.handleConfirmN4);
  }

  const botaoProximoPassoN4 = document.getElementById("proximo-passo-btn-4");
  if (botaoProximoPassoN4 && handlers.handleNextStepN4) {
    botaoProximoPassoN4.addEventListener("click", handlers.handleNextStepN4);
  }

  const botaoProximoPassoN4Verificacao = document.getElementById(
    "proximo-passo-btn-5"
  );
  if (
    botaoProximoPassoN4Verificacao &&
    handlers.handleNextStepFromVerification2
  ) {
    botaoProximoPassoN4Verificacao.addEventListener(
      "click",
      handlers.handleNextStepFromVerification2
    );
  }

  const botaoConfirmarN5 = document.getElementById("prompt-ok-btn-3");
  if (botaoConfirmarN5 && handlers.handleConfirmN5) {
    botaoConfirmarN5.addEventListener("click", handlers.handleConfirmN5);
  }

  const botaoProximoPassoN5 = document.getElementById("proximo-passo-btn-6");
  if (botaoProximoPassoN5 && handlers.handleNextStepN5) {
    botaoProximoPassoN5.addEventListener("click", handlers.handleNextStepN5);
  }

  const botaoProximoPassoN5Verificacao = document.getElementById(
    "proximo-passo-btn-7"
  );
  if (
    botaoProximoPassoN5Verificacao &&
    handlers.handleNextStepFromVerification3
  ) {
    botaoProximoPassoN5Verificacao.addEventListener(
      "click",
      handlers.handleNextStepFromVerification3
    );
  }

  const botaoProximoPassoNK = document.getElementById("proximo-passo-btn5");
  if (botaoProximoPassoNK && handlers.enableMainButtons) {
    botaoProximoPassoNK.addEventListener("click", handlers.enableMainButtons);
  }
}
