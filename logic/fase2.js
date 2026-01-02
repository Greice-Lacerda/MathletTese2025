/**
 * INDUCTIO - FASE 2: O Passo Indutivo e a Hipótese
 */

const canvas = document.getElementById('dominoCanvas');
const ctx = canvas.getContext('2d');
const nDisplay = document.getElementById('n-display');
const areaDisplay = document.getElementById('area-display');
const formulaBuild = document.getElementById('formula-build');
const modal = document.getElementById('discoveryModal');
const btnVoltar = document.getElementById('btnVoltar');
const btnConcluir = document.getElementById('btnConcluirFase2');
const quizFeedback = document.getElementById('quiz-feedback');
const quizOptions = document.querySelectorAll('input[name="hyp-quiz"]');

// Configurações do Gráfico
canvas.width = 650;
canvas.height = 400;
const PADDING_X = 60, FLOOR_Y = 350, UNIT_WIDTH = 500, SCALE_Y = 300;

let n = 2; // Começa de onde parou na Fase 1
let isDragging = false;
let isModalOpen = false;
const sourceBox = { x: 20, y: 20, size: 60 };

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Desenho da Parábola y = x²
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= UNIT_WIDTH; i++) {
        let x_rel = i / UNIT_WIDTH;
        ctx.lineTo(PADDING_X + i, FLOOR_Y - (Math.pow(x_rel, 2) * SCALE_Y));
    }
    ctx.stroke();

    // 2. Eixo X
    ctx.strokeStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(PADDING_X, FLOOR_Y);
    ctx.lineTo(PADDING_X + UNIT_WIDTH, FLOOR_Y);
    ctx.stroke();

    // 3. Renderização dos Retângulos Inscritos
    const dx = 1 / n;
    const pw = UNIT_WIDTH / n;
    let somaTotal = 0;
    let areaLabels = [];

    for (let i = 0; i < n; i++) {
        let x_i = i * dx;
        let h_px = Math.pow(x_i, 2) * SCALE_Y;

        const isLast = (i === n - 1);

        // Estética: Laranja para o novo degrau (n-1), Ciano para os anteriores
        ctx.fillStyle = isLast ? 'rgba(251, 146, 60, 0.7)' : 'rgba(34, 211, 238, 0.4)';
        ctx.strokeStyle = isLast ? '#fb923c' : '#22d3ee';
        ctx.lineWidth = isLast ? 3 : 1;

        ctx.fillRect(PADDING_X + (i * pw), FLOOR_Y - h_px, pw, h_px);
        ctx.strokeRect(PADDING_X + (i * pw), FLOOR_Y - h_px, pw, h_px);

        somaTotal += (Math.pow(x_i, 2) * dx);

        // Cores para o texto do painel
        let color = isLast ? "#fb923c" : "#22d3ee";
        areaLabels.push(`<span style="color:${color}">A<sub>${i}</sub></span>`);
    }

    // 4. Caixa de Estoque (Bloco de Indução)
    ctx.fillStyle = '#fb923c';
    ctx.shadowBlur = isDragging ? 15 : 0;
    ctx.shadowColor = "#fb923c";
    ctx.fillRect(sourceBox.x, sourceBox.y, sourceBox.size, sourceBox.size);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.fillText("n + 1", sourceBox.x + 10, sourceBox.y + 35);

    // Atualização da Interface
    nDisplay.innerText = n;
    areaDisplay.innerText = somaTotal.toFixed(4);
    updateAlgebraPanel(areaLabels, n);

    // Gatilho para o Quiz (abre em n=10)
    if (n >= 10 && !isModalOpen) {
        isModalOpen = true;
        setTimeout(() => { modal.style.display = 'flex'; }, 500);
    }
}

function updateAlgebraPanel(labels, currentN) {
    formulaBuild.innerHTML = `
        <p style="font-size: 0.95rem; margin-bottom: 10px;">
            <strong>Área Total A(${currentN}) = ${labels.join(' + ')}</strong>
        </p>
        <div style="background: #020617; padding: 12px; border-radius: 6px; border: 1px solid #334155;">
            <p style="margin: 0; color: #94a3b8; font-size: 0.8rem;">Estrutura da Hipótese:</p>
            <p><br></p>
            <math display="block" style="font-size: 1.1rem; margin-top: 5px;">
                <mi>A</mi><mo>(</mo><mi>${currentN}</mi><mo>)</mo><mo>=</mo>
                <mfrac><mn>1</mn><msup><mi>${currentN}</mi><mn>3</mn></msup></mfrac>
                <mo> (</mo>
                <msup><mn>0</mn><mn>2</mn></msup><mo>+</mo><msup><mn>1</mn><mn>2</mn></msup><mo>+</mo><mo>...</mo><mo>+</mo>
                <msup style="color:orange;"><mn style="color:orange;">${currentN - 1}</mn><mn>2</mn></msup>
                <mo>)</mo>
            </math>
        </div>
    `;
}

// --- Lógica de Interação (Mouse) ---

canvas.onmousedown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (mx > sourceBox.x && mx < sourceBox.x + sourceBox.size &&
        my > sourceBox.y && my < sourceBox.y + sourceBox.size) {
        isDragging = true;
    }
};

window.onmousemove = (e) => {
    if (isDragging) {
        draw();
        const rect = canvas.getBoundingClientRect();
        ctx.fillStyle = 'rgba(251, 146, 60, 0.5)';
        ctx.fillRect(e.clientX - rect.left - 20, e.clientY - rect.top - 20, 40, 40);
    }
};

window.onmouseup = (e) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Se soltar o bloco dentro da zona do gráfico (Eixo X)
        if (mx > PADDING_X && mx < PADDING_X + UNIT_WIDTH && my > 100) {
            n++;
        }
        isDragging = false;
        draw();
    }
};

// --- Lógica do Quiz ---

quizOptions.forEach(opt => {
    opt.addEventListener('change', (e) => {
        // Limpar estilos anteriores
        document.querySelectorAll('.option').forEach(el => el.classList.remove('selected-correct', 'selected-wrong'));

        const parentLabel = e.target.parentElement;

        if (e.target.value === "2") { // Opção correta (Hipótese de Indução Inscrita)
            parentLabel.classList.add('selected-correct');
            quizFeedback.innerText = "✅ Perfeito! Esta é a hipótese que provaremos por PIM.";
            quizFeedback.style.color = "#22c55e";
            btnConcluir.disabled = false;
            btnVoltar.disabled = false;
        } else {
            parentLabel.classList.add('selected-wrong');
            quizFeedback.innerText = "❌ Analise a relação entre Δx = (1/n) e as alturas y = (i/n)².";
            quizFeedback.style.color = "#ef4444";
            btnConcluir.disabled = true;
            btnVoltar.disabled = true;
        }
    });
});

// Botão de Reset
document.getElementById('btnReset').onclick = () => {
    n = 2;
    isModalOpen = false;
    modal.style.display = 'none';
    btnConcluir.disabled = true;
    draw();
};

// Botão Final -> Fase 3
btnConcluir.onclick = () => {
    window.location.href = "fase3.html";
};

// Botão Voltar para Exploração
btnVoltar.onclick = () => {
    window.location.href = "fase2.html";
};

// Inicialização
draw();