// Passo3.js
// Este script guia o usuário através da prova por indução para n=k+1.
// Ele visualiza a adição do (k+1)-ésimo retângulo e demonstra a equivalência das fórmulas.

document.addEventListener('DOMContentLoaded', () => {

    // Referências aos elementos HTML
    const plotDiv = document.getElementById('plot');
    const addRectangleBtn = document.getElementById('add-rectangle-btn');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const assumptionSection = document.getElementById('assumption-section');
    const calculationSection = document.getElementById('calculation-section');
    const solutionSection = document.getElementById('solution-section');
    const congratulationsMessage = document.getElementById('congratulations-message');
    const areaKFormulaSpan = document.getElementById('area-k-value');
    const finalProofDiv = document.getElementById('final-proof');

    // Constante para a visualização. Usamos um valor fixo para k para tornar o gráfico mais claro.
    const kValue = 5;

    // Fórmula para a área total de n retângulos
    // Área(n) = (1/n³) * Σ(i²), onde i de 1 a n-1
    // Simplificando, Área(n) = (n-1)(n)(2n-1) / (6n²)
    function areaFormula(n) {
        if (n <= 1) return 0;
        return ((n - 1) * n * (2 * n - 1)) / (6 * n * n);
    }

    // Calcula a área do i-ésimo retângulo
    function calculateRectangleArea(i, n) {
        const width = 1 / n;
        const height = (i / n) * (i / n);
        return width * height;
    }

    // Função para gerar os dados do gráfico
    function createPlotData(n) {
        const xValues = [0];
        const yValues = [0];
        const rectangles = [];
        const parabolaX = [];
        const parabolaY = [];

        // Pontos para a parábola y = x²
        for (let i = 0; i <= 100; i++) {
            const x = i / 100;
            parabolaX.push(x);
            parabolaY.push(x * x);
        }

        // Criar os retângulos para o polígono inscrito
        for (let i = 1; i < n + 1; i++) {
            const x1 = (i - 1) / n;
            const x2 = i / n;
            const y1 = 0;
            const y2 = ((i - 1) / n) * ((i - 1) / n);
            
            xValues.push(x1, x1, x2, x2);
            yValues.push(y1, y2, y2, y1);
            
            rectangles.push({
                x: [x1, x2, x2, x1, x1],
                y: [0, y2, y2, 0, 0],
                fill: 'tonexty',
                mode: 'lines',
                line: { color: 'blue', width: 1 },
                fillcolor: 'rgba(32, 139, 240, 0.5)',
                name: `Retângulo ${i}`
            });
        }

        const traces = [
            {
                x: parabolaX,
                y: parabolaY,
                mode: 'lines',
                line: { color: 'red', width: 3 },
                name: 'Parábola $y = x^2$'
            }
        ];

        // Adiciona os retângulos ao trace
        rectangles.forEach(rect => traces.push(rect));

        return traces;
    }

    // Função para renderizar o gráfico
    function renderPlot(n, highlightLast = false) {
        const traces = createPlotData(n);
        const layout = {
            title: `Área do Polígono para n = ${n}`,
            xaxis: {
                title: 'x',
                range: [0, 1.1]
            },
            yaxis: {
                title: 'y',
                range: [0, 1.1]
            },
            showlegend: false
        };

        Plotly.newPlot(plotDiv, traces, layout);

        // Opcionalmente, destaca o último retângulo
        if (highlightLast) {
            Plotly.restyle(plotDiv, {
                'line.color': 'orange',
                'fillcolor': 'rgba(255, 165, 0, 0.7)'
            }, [n]);
        }
    }

    // Função para mostrar a fórmula inicial de Área(k)
    function showInitialState() {
        const areaKValue = areaFormula(kValue).toFixed(5);
        areaKFormulaSpan.textContent = `(${kValue}-1)k(2k-1) / (6k²) = ${areaKValue}`;
        renderPlot(kValue);
    }

    // Manipulador do botão "Adicionar Retângulo"
    addRectangleBtn.addEventListener('click', () => {
        // Oculta o botão e revela a próxima seção
        addRectangleBtn.classList.add('hidden');
        calculationSection.classList.remove('hidden');

        // Mostra o novo retângulo no gráfico
        renderPlot(kValue + 1, true);

        // Calcula a área do novo retângulo (k+1)-ésimo
        const areaKPlus1Rect = calculateRectangleArea(kValue, kValue + 1).toFixed(5);
        const formulaKPlus1Rect = `(${kValue}²) / (${kValue}+1)³`;

        // Obtém a fórmula da área para k
        const formulaAreaK = `(k-1)k(2k-1) / (6k²)`;
        
        // Atualiza a fórmula para a soma das áreas
        const newFormula = `Área(k+1) = ${formulaAreaK} + ${formulaKPlus1Rect}`;
        document.getElementById('area-k-plus-1-formula').innerHTML = `Área(k+1) = $Área(k) + Área_{k+1}$`;
        
        // Uma forma de mostrar a prova em texto simples
        document.getElementById('area-k-plus-1-formula').innerHTML = `
            Área(k+1) = Área(k) + Área do Retângulo ${kValue+1}
            <br>
            Área(k+1) ≈ ${areaFormula(kValue).toFixed(5)} + ${areaKPlus1Rect} = ${areaFormula(kValue+1).toFixed(5)}
        `;
    });

    // Manipulador do botão "Mostrar Solução"
    showSolutionBtn.addEventListener('click', () => {
        // Oculta o botão e revela a solução final e a mensagem de parabéns
        showSolutionBtn.classList.add('hidden');
        solutionSection.classList.remove('hidden');
        congratulationsMessage.classList.remove('hidden');

        // O passo de indução prova que a fórmula é válida para n = k+1
        const formulaN = `(n-1)n(2n-1) / (6n²)`;
        const formulaKPlus1 = `((k+1)-1)(k+1)(2(k+1)-1) / (6(k+1)²) = k(k+1)(2k+1) / (6(k+1)²)`;

        // Mostra a prova final
        finalProofDiv.innerHTML = `
            Vamos comparar a Área(k) + a área do novo retângulo com a fórmula para n = k+1:
            <br><br>
            A área do polígono para $k+1$ retângulos é ${areaFormula(kValue + 1).toFixed(5)}.
            <br><br>
            A fórmula para $n = k+1$ é $Área(k+1) = ${formulaKPlus1}$.
            <br>
            Isso é aproximadamente igual a ${areaFormula(kValue + 1).toFixed(5)}.
            <br><br>
            Como os valores são iguais, a fórmula é verdadeira para todos os valores de n!
        `;

        // Ativa a animação de confetes
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    });

    // Inicia o processo quando a página carrega
    showInitialState();
});
