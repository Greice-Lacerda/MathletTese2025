// Passo2.js

// Importa funções dos módulos auxiliares
import { generatePlot } from "./graficoP2.js";
import { generateTable } from "./TableP2.js";

/**
 * Limpa o conteúdo da área do gráfico e reinicia a página.
 */
export function resetPage() {
  document.getElementById("plot").innerHTML = "";
  document.getElementById("tabela-container").innerHTML = "";
  document.getElementById("tabela-container").classList.add("hidden");
  document.getElementById("Explorar11").classList.add("hidden");
  document.getElementById("ProximaEtapa").classList.add("hidden");
  // Exibe o modal novamente para reiniciar a interação
  document.getElementById("prompt-modal").classList.remove("hidden");
}

/**
 * Lógica principal para o modal inicial e interação com o usuário.
 * Escuta o evento DOMContentLoaded para garantir que o DOM está pronto.
 */
document.addEventListener("DOMContentLoaded", function () {
  const promptModal = document.getElementById("prompt-modal");
  const promptInput = document.getElementById("prompt-input");
  const promptOkBtn = document.getElementById("prompt-ok-btn");
  const tabelaContainer = document.getElementById("tabela-container");
  const errorAudio = document.getElementById("error-audio");
  const proximaEtapaBtn = document.getElementById("ProximaEtapa");
  const explore11Fieldset = document.getElementById("Explorar11");
  const nValueInput = document.getElementById("n-value");
  const generatePlotBtn = explore11Fieldset.querySelector(
    "button:nth-of-type(1)"
  );
  const resetPageBtn = explore11Fieldset.querySelector("button:nth-of-type(2)");

  // Oculta a tabela e o fieldset de controle inicialmente
  tabelaContainer.classList.add("hidden");
  explore11Fieldset.classList.add("hidden");

  // Exibe o modal assim que a página carregar
  promptModal.classList.remove("hidden");

  // Lógica do botão "OK" do modal
  promptOkBtn.addEventListener("click", () => {
    const inputValue = parseInt(promptInput.value);

    // A lógica de uma parábola dividida em 3 partes forma 5 retângulos.
    // O usuário deve digitar 5, não 2.
    if (inputValue === 5) {
      promptModal.classList.add("hidden");
      tabelaContainer.classList.remove("hidden");
      explore11Fieldset.classList.remove("hidden");
      proximaEtapaBtn.classList.remove("hidden");

      // Habilita os botões de controle após o acerto
      generatePlotBtn.disabled = false;
      resetPageBtn.disabled = false;

      // Chama a função para gerar o gráfico e a tabela com n=3
      generatePlot(3);
      generateTable(3);
    } else {
      errorAudio.play(); // Toca o som de erro
      alert(
        "Valor incorreto. A resposta é 5, pois a fórmula para o número de retângulos é 2n-1."
      );
      promptInput.value = "";
    }
  });

  // Evento para o botão "Gerar Gráfico" do fieldset Explorar11
  generatePlotBtn.addEventListener("click", () => {
    const n = parseInt(nValueInput.value);
    // Assegura que o valor de 'n' está no intervalo correto, se necessário.
    if (n >= 2 && n <= 10) {
      generatePlot(n);
      generateTable(n);
    } else {
      alert("Por favor, digite um valor de 'n' entre 2 e 10.");
    }
  });

  // Evento para o botão "Limpar"
  resetPageBtn.addEventListener("click", () => {
    resetPage();
  });
});
