// Passo22.js (Anteriormente Passo3.js)

// ==========================================================================
// FUNÇÕES DO GRÁFICO (PLOTLY)
// ==========================================================================

const parabola = (x) => (Array.isArray(x) ? x.map((val) => val * val) : x * x);

// Variável de estado global para o número de partições.
let k = 2; // Inicia com o caso base

/**
 * Gera o gráfico da hipótese de indução (Área(k)) usando Plotly.
 * @param {number} numPartitions - O número de partições (n).
 * @param {number} highlightIndex - O índice do retângulo a ser destacado.
 */
function generateInductionPlot(numPartitions, highlightIndex = -1) {
    const plotDiv = document.getElementById("plotGrfM32");
    if (!plotDiv) return;

    const numRectangles = numPartitions - 1; // n=2 tem 1 retângulo, n=k tem k-1 retângulos
    if (numRectangles < 0) numRectangles = 0;

    const a = 0;
    const b = 1;
    const x_parabola = Array.from(
        { length: 400 },
        (_, i) => a + (i * (b - a)) / 399
    );
    const y_parabola = parabola(x_parabola);

    const bar_width = (b - a) / numPartitions;
    const x_rect = Array.from(
        { length: numPartitions + 1 },
        (_, i) => a + (i * (b - a)) / numPartitions
    );
    const y_rect = parabola(x_rect);

    // 1. Cores de FUNDO
    const barColors = Array.from(
        { length: numRectangles },
        (_, i) =>
            i === highlightIndex
                ? "rgba(253, 126, 20, 0.8)" // Laranja para destaque (k+1)
                : "rgba(0, 123, 255, 0.6)" // Azul padrão (hipótese)
    );

    // 2. TEXTOS "A₁", "A₂", etc.
    // CORREÇÃO: A legenda agora começa em A₁ (i + 1)
    const barLabels = Array.from(
        { length: numRectangles },
        (_, i) => `A<sub>${i + 1}</sub>`
    );

    // 3. CORES para cada texto
    const barLabelColors = Array.from(
        { length: numRectangles },
        (_, i) =>
            i === highlightIndex
                ? "#fe0505ff" // Vermelho/Laranja
                : "#000407ff" // Preto/Azul
    );

    // Cria uma única trace otimizada para todas as barras
    const barTrace = {
        x: x_rect.slice(1, -1).map((xi) => xi - bar_width / 2), // Ajuste para n=k
        y: y_rect.slice(1, -1),
        type: "bar",
        width: bar_width,
        marker: {
            color: barColors,
            line: { width: 0.5 },
        },
        hoverinfo: "none",
        text: barLabels,
        textposition: "inside",
        insidetextanchor: "middle",
        textfont: {
            family: "Arial, sans-serif",
            size: 14,
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
        title: `Área com ${numRectangles} retângulo(s) para n=${numPartitions}`,
        showlegend: false,
        barmode: "overlay",
        bargap: 0,
        xaxis: { range: [0, 1], title: "x" },
        yaxis: { range: [0, 1], title: "y" },
        margin: { l: 40, r: 20, t: 40, b: 40 },
        autosize: true,
    };

    Plotly.newPlot(plotDiv, traces, layout, { responsive: true });
}

/**
 * Renderiza a fórmula dinâmica abaixo do gráfico.
 * @param {number} k_partitions - O número de partições (n).
 */
function renderizarFormulaDinamica(k_partitions) {
    // NOTA: Esta função não foi refatorada para MathJax, pois usa HTML customizado (<span>).
    // Ela foi movida para fora do DOMContentLoaded para melhor organização.
    const formulaContainer = document.getElementById("formula-dinamica"); // Este ID não existe no HTML.
    if (!formulaContainer) {
        // console.warn("Elemento #formula-dinamica não encontrado.");
        return;
    }
    if (k_partitions === 1) {
        formulaContainer.innerHTML =
            'A(1) = <span style="color: blue;">0</span> (<span style="color: green;">retângulo degenerado</span>)';
        return;
    }
    if (k_partitions === 2) {
        formulaContainer.innerHTML =
            'A(2) = <span style="color: blue;">A<sub>1</sub></span>';
        return;
    }

    formulaContainer.innerHTML = "";
    const numTermos = k_partitions - 1; // n=k tem k-1 retângulos
    if (numTermos <= 0) return;

    const prefixoFormula = `A(${k_partitions}) = A(${numTermos}+1) = `;
    let corpoFormula = "";

    if (k_partitions > 10) {
        // ... (Lógica para muitos termos)
        const primeiroTermo = `<span class="termo-hipotese">A<sub>1</sub></span>`;
        const ultimoTermoHipotese = `<span class="termo-hipotese">A<sub>${numTermos - 1
            }</sub></span>`;
        const termosHipoteseHTML = `${primeiroTermo} + ... + ${ultimoTermoHipotese}`;
        const termoIndutivo = `<span class="termo-indutivo">A<sub>${numTermos}</sub></span>`;
        corpoFormula = `<span class="termo-hipotese">(${termosHipoteseHTML})</span> + ${termoIndutivo}`;
    } else {
        // ... (Lógica para poucos termos)
        const termosHipotese = [];
        for (let i = 1; i < numTermos; i++) {
            termosHipotese.push(
                `<span class="termo-hipotese">A<sub>${i}</sub></span>`
            );
        }
        const termoIndutivo = `<span class="termo-indutivo">A<sub>${numTermos}</sub></span>`;
        if (termosHipotese.length > 0) {
            corpoFormula = `<span class="termo-hipotese">(${termosHipotese.join(
                " + "
            )})</span> + ${termoIndutivo}`;
        } else {
            corpoFormula = termoIndutivo; // Caso n=2 (k=2)
        }
    }
    formulaContainer.innerHTML = prefixoFormula + corpoFormula;
}


// ==========================================================================
// LÓGICA PRINCIPAL (EVENT LISTENERS)
// ==========================================================================

// CORREÇÃO CRÍTICA: Todo o código foi movido para UM ÚNICO listener.
document.addEventListener("DOMContentLoaded", () => {

    // --- Elementos do DOM ---
    const addRectangleBtn = document.getElementById("add-rectangle-btn");
    const setKBtn = document.getElementById("set-k-btn");
    const numRectanglesInput = document.getElementById("numRectanglesInput");
    const nextStepBtn = document.getElementById("next-step-btn2");

    // CORREÇÃO: Removidas referências a IDs que não existem neste HTML
    // (etapa1, etapa2, etapaFrom2Hab, btnFormalizar, btnConcluir)

    // --- Verificação de Elementos ---
    if (!addRectangleBtn || !setKBtn || !numRectanglesInput || !nextStepBtn) {
        console.error("ERRO: Elementos essenciais do DOM não foram encontrados. Verifique os IDs no HTML.");
        return;
    }

    // --- Eventos de clique ---

    setKBtn.addEventListener("click", () => {
        let newK = parseInt(numRectanglesInput.value);
        if (isNaN(newK) || newK < 2) { // O caso base é n=2 (1 retângulo)
            alert("Por favor, insira um número maior ou igual a 2.");
            newK = 2;
            numRectanglesInput.value = 2;
        }
        k = newK;
        generateInductionPlot(k);
        // renderizarFormulaDinamica(k); // Descomente se #formula-dinamica existir

        // Habilita/desabilita o botão "Adicionar"
        addRectangleBtn.disabled = k < 2;

        // Esconde o botão "Próximo Passo" ao gerar um novo gráfico (Reset)
        nextStepBtn.classList.add("hidden");
    });

    addRectangleBtn.addEventListener("click", () => {
        k++;
        generateInductionPlot(k, k - 2); // k-2 é o índice do último retângulo (n=k tem k-1 retângulos)
        // renderizarFormulaDinamica(k); // Descomente se #formula-dinamica existir
        numRectanglesInput.value = k;

        // Revela o botão "Próximo Passo"
        nextStepBtn.classList.remove("hidden");
    });

    nextStepBtn.addEventListener("click", () => {
        // CORREÇÃO: Atualizado de Passo33.html para Passo23.html
        window.location.href = "../pages/Passo23.html";
    });

    // --- Estado Inicial da Página ---
    numRectanglesInput.value = k; // Define o input para o valor inicial (2)
    generateInductionPlot(k); // Gera o gráfico inicial (n=2)
    // renderizarFormulaDinamica(k); // Renderiza a fórmula inicial
    addRectangleBtn.disabled = false; // Começa habilitado (pois k=2)
});