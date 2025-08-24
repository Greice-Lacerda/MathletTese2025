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
 * Adiciona listeners para os botões de fechar dos modais.
 */
export function setupModalCloseButtons() {
  // Botões do modal principal (modalP2)
  const mainModal = document.getElementById("modalP2");
  const closeTopRightMainBtn = mainModal.querySelector(".w3-display-topright");
  const closeMainBtn = document.getElementById("prompt-fechar-btn");

  if (closeTopRightMainBtn) {
    closeTopRightMainBtn.addEventListener("click", () => closeModal("modalP2"));
  }
  if (closeMainBtn) {
    closeMainBtn.addEventListener("click", () => closeModal("modalP2"));
  }

  // Botões do modal de Instruções
  const instrucoesModal = document.getElementById("modalInstrucoes");
  const closeTopRightInstrucoesBtn = instrucoesModal.querySelector(
    ".w3-display-topright"
  );
  const fecharInstrucoesBtn = document.getElementById("fecharInstrucoesBtn");

  if (closeTopRightInstrucoesBtn) {
    closeTopRightInstrucoesBtn.addEventListener("click", () =>
      closeModal("modalInstrucoes")
    );
  }
  if (fecharInstrucoesBtn) {
    fecharInstrucoesBtn.addEventListener("click", () =>
      closeModal("modalInstrucoes")
    );
  }

  // Botões do modal de Verificar
  const verificarModal = document.getElementById("modalVerificar");
  const closeTopRightVerificarBtn = verificarModal.querySelector(
    ".w3-display-topright"
  );
  const fecharVerificarBtn = document.getElementById("fecharVerificarBtn");

  if (closeTopRightVerificarBtn) {
    closeTopRightVerificarBtn.addEventListener("click", () =>
      closeModal("modalVerificar")
    );
  }
  if (fecharVerificarBtn) {
    fecharVerificarBtn.addEventListener("click", () =>
      closeModal("modalVerificar")
    );
  }

  // Botão de Cancelar do modal principal
  const modalInput = document.getElementById("prompt-input");
  const cancelBtn = document.getElementById("prompt-cancel-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      if (modalInput) {
        modalInput.value = "";
      }
    });
  }
}
