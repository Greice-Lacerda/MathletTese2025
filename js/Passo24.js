// ==========================================================
// PASSO 2.4 (n=k) - LÓGICA DA PÁGINA (CORRETO)
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Seleção dos Elementos ---
    const nValueInput = document.getElementById("n-value");
    const generateBtn = document.getElementById("gerar-grafico");
    const clearBtn = document.getElementById("limpar-pagina");
    const plotDiv = document.getElementById("plot");
    const tableContainer = document.getElementById("tabela-container");

    const choiceContainer = document.getElementById("choice-container");
    const feedbackContainer = document.getElementById("feedback-container");
    const nextStepBtn = document.getElementById("ProximaEtapa");

    const errorAudio = document.getElementById("error-audio");
    const successAudio = document.getElementById("success-audio");

    // --- 2. Lógica de Exploração (Gráfico e Tabela) ---

    function parabola(x) {
        return x * x;
    }

    function generatePlot() {
        const n = parseInt(nValueInput.value);

        if (isNaN(n) || n < 5 || n > 50) {
            alert("Por favor, insira um número inteiro entre 5 e 50.");
            return;
        }

        plotDiv.innerHTML = "";
        tableContainer.innerHTML = "";

        const a = 0, b = 1;
        const bar_width = (b - a) / n;

        const x_parabola = Array.from({ length: 100 }, (_, i) => a + (i * (b - a)) / 99);
        const y_parabola = x_parabola.map(parabola);

        const x_rect = Array.from({ length: n }, (_, i) => a + (i * bar_width));
        const y_rect = x_rect.map(parabola);

        const traces = [
            { // Curva
                x: x_parabola, y: y_parabola,
                mode: 'lines', name: 'y = x²',
                line: { color: 'black', width: 2 }
            },
            { // Retângulos
                x: x_rect.map(x => x + bar_width / 2),
                y: y_rect,
                type: 'bar', width: bar_width, name: `A(${n})`,
                marker: { color: 'rgba(0, 123, 255, 0.6)' }
            }
        ];

        const layout = {
            title: `Área A(${n}) com ${n - 1} Retângulos Visíveis`,
            xaxis: { range: [0, 1], title: 'x' },
            yaxis: { range: [0, 1], title: 'y' },
            margin: { l: 40, r: 20, t: 40, b: 40 },
            autosize: true
        };

        Plotly.newPlot(plotDiv, traces, layout, { responsive: true });
        generateTable(n);
    }

    function generateTable(n) {
        let tableHTML = '<table>';
        tableHTML += '<tr><th>Retângulo (i)</th><th>Base (1/n)</th><th>Altura (i/n)²</th><th>Área (Base × Altura)</th></tr>';

        let totalArea = 0;

        for (let i = 1; i < n; i++) {
            const altura = Math.pow(i, 2) / Math.pow(n, 2);
            const area = (1 / n) * altura;
            totalArea += area;

            if (i < 5 || i === (n - 1)) {
                tableHTML += `<tr>
          <td>${i}</td>
          <td>1/${n}</td>
          <td>(${i}/${n})² = ${altura.toFixed(4)}</td>
          <td>1/${n} * (${i}/${n})² = ${area.toFixed(4)}</td>
        </tr>`;
            } else if (i === 5) {
                tableHTML += '<tr><td colspan="4">...</td></tr>';
            }
        }

        tableHTML += `<tr style="background-color: #fdfde2; font-weight: bold;">
      <td colspan="3">Área Total A(${n}) (Soma de i=1 até n-1)</td>
      <td>${totalArea.toFixed(8)}</td>
    </tr>`;

        tableHTML += '</table>';
        tableContainer.innerHTML = tableHTML;
    }

    function clearPage() {
        nValueInput.value = "5";
        plotDiv.innerHTML = "<p>Gere um gráfico para ver a tabela de cálculo.</p>";
        tableContainer.innerHTML = "<p>Gere um gráfico para ver a tabela de cálculo.</p>";
    }

    // --- 3. Lógica do Desafio (Múltipla Escolha) ---

    function handleChoiceClick(event) {
        const clickedButton = event.target.closest('.choice-btn');
        if (!clickedButton) return;

        const isCorrect = clickedButton.dataset.correct === "true";

        if (isCorrect) {
            feedbackContainer.innerHTML = "Correto! Esta é a fórmula que usamos como Hipótese de Indução.";
            feedbackContainer.className = "content-container feedback-box feedback-success";
            nextStepBtn.classList.remove("hidden");
            if (successAudio) successAudio.play();
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

            choiceContainer.querySelectorAll('.choice-btn').forEach(btn => {
                btn.disabled = true;
            });

        } else {
            feedbackContainer.innerHTML = "Incorreto. Tente lembrar a fórmula da área que exploramos nos passos anteriores.";
            feedbackContainer.className = "content-container feedback-box feedback-error";
            if (errorAudio) errorAudio.play();
        }
    }

    // --- 4. Adiciona os Event Listeners ---
    generateBtn.addEventListener("click", generatePlot);
    clearBtn.addEventListener("click", clearPage);
    choiceContainer.addEventListener("click", handleChoiceClick);

    // Renderiza o MathJax nos botões de múltipla escolha
    if (window.MathJax && typeof window.MathJax.typeset === 'function') {
        window.MathJax.typeset([choiceContainer]);
    }

    clearPage();
});