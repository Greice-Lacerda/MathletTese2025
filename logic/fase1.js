const canvas = document.getElementById('dominoCanvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('mathModal');
const feedback = document.getElementById('feedback');
const btnReset = document.getElementById('btnReset');

canvas.width = 800; canvas.height = 400;
const PADDING_X = 220, FLOOR_Y = 320, UNIT_WIDTH = 400, SCALE_Y = 250;

let isModalOpen = false;
let dragTarget = null;const canvas = document.getElementById('dominoCanvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('mathModal');
const feedback = document.getElementById('feedback');
const btnReset = document.getElementById('btnReset');

// Configuração do Canvas
canvas.width = 800; 
canvas.height = 400;

// Importante: CSS para impedir scroll no celular enquanto arrasta
canvas.style.touchAction = "none";

const PADDING_X = 220, FLOOR_Y = 320, UNIT_WIDTH = 400, SCALE_Y = 250;

let isModalOpen = false;
let dragTarget = null;
let offset = { x: 0, y: 0 };

// retangulos[0] é o degenerado (obrigatório arrastar)
let retangulos = [
    { id: 0, x: 40, y: 80, w: 200, h: 6, realH: 0, encaixado: false, x_alvo: 0, label: "Bloco A0" },
    { id: 1, x: 40, y: 180, w: 200, h: 0.25 * SCALE_Y, realH: 0.25, encaixado: false, x_alvo: 0.5, label: "Bloco A1" }
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parábola de referência
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    for (let i = 0; i <= UNIT_WIDTH; i++) {
        let x = i / UNIT_WIDTH;
        ctx.lineTo(PADDING_X + i, FLOOR_Y - (x * x * SCALE_Y));
    }
    ctx.stroke();

    // Eixo X
    ctx.strokeStyle = '#334155';
    ctx.beginPath(); ctx.moveTo(PADDING_X, FLOOR_Y); ctx.lineTo(PADDING_X + UNIT_WIDTH, FLOOR_Y); ctx.stroke();

    // Desenho dos Retângulos
    retangulos.forEach(r => {
        ctx.fillStyle = r.encaixado ? 'rgba(34, 211, 238, 0.5)' : 'rgba(148, 163, 184, 0.3)';
        ctx.strokeStyle = r.encaixado ? '#22d3ee' : '#64748b';
        ctx.lineWidth = 2;
        ctx.fillRect(r.x, r.y - r.h, r.w, r.h);
        ctx.strokeRect(r.x, r.y - r.h, r.w, r.h);

        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial"; // Garante fonte legível
        if (r.encaixado) {
            ctx.fillText(`h=${r.realH}`, r.x + 5, r.y - r.h - 10);
            ctx.fillText(`Δx=0.5`, r.x + r.w / 2 - 20, r.y + 20);
        } else {
            ctx.fillText(r.label, r.x + 10, r.y - r.h - 10);
        }
    });

    if (retangulos.every(r => r.encaixado) && !isModalOpen) {
        isModalOpen = true;
        setTimeout(() => { modal.style.display = 'flex'; }, 600);
    }
}

// === FUNÇÃO AUXILIAR PARA CORRIGIR COORDENADAS NO CELULAR ===
function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    // Fatores de escala (caso o canvas esteja responsivo no CSS)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// === EVENTOS DE PONTEIRO (MOUSE + TOQUE) ===

// 1. Início do Arraste (pointerdown)
canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault(); // Impede comportamentos padrão
    const pos = getPointerPos(e);
    
    // Procura se clicou em algum retângulo (do último para o primeiro para pegar o de cima)
    for (let i = retangulos.length - 1; i >= 0; i--) {
        let r = retangulos[i];
        // Área de clique um pouco maior para facilitar no celular
        if (pos.x > r.x && pos.x < r.x + r.w && pos.y > r.y - r.h - 20 && pos.y < r.y + 20) {
            dragTarget = r;
            offset.x = pos.x - r.x;
            offset.y = pos.y - r.y;
            
            // "Prende" o evento ao canvas para não perder se arrastar rápido demais
            canvas.setPointerCapture(e.pointerId);
            return;
        }
    }
});

// 2. Durante o Movimento (pointermove)
canvas.addEventListener('pointermove', (e) => {
    if (!dragTarget) return;
    e.preventDefault(); // Impede scroll da tela

    const pos = getPointerPos(e);
    dragTarget.x = pos.x - offset.x;
    dragTarget.y = pos.y - offset.y;

    // Lógica de Encaixe (Snap)
    let x_alvo_px = PADDING_X + (dragTarget.x_alvo * UNIT_WIDTH);
    
    // Aumentei a tolerância de encaixe para 40px para facilitar no toque
    if (Math.abs(dragTarget.x - x_alvo_px) < 40 && Math.abs(dragTarget.y - FLOOR_Y) < 40) {
        dragTarget.x = x_alvo_px; 
        dragTarget.y = FLOOR_Y; 
        dragTarget.encaixado = true;
    } else { 
        dragTarget.encaixado = false; 
    }
    
    draw();
});

// 3. Fim do Arraste (pointerup)
canvas.addEventListener('pointerup', (e) => {
    dragTarget = null;
    canvas.releasePointerCapture(e.pointerId);
});

// Validação do Modal (Mantida igual)
document.getElementById('btnVerificarModal').onclick = () => {
    const a0 = parseFloat(document.getElementById('inputA0').value);
    const a1 = parseFloat(document.getElementById('inputA1').value);
    const total = parseFloat(document.getElementById('inputATotal').value);

    // Aceita virgula ou ponto trocando a virgula por ponto se necessário no input HTML, 
    // mas como é type="number", o value vem padrão.
    
    // Validação flexível para erros de arredondamento flutuante
    const isCorrect = (Math.abs(a0 - 0) < 0.001) && 
                      (Math.abs(a1 - 0.125) < 0.001) && 
                      (Math.abs(total - 0.125) < 0.001);

    if (isCorrect) {
        modal.innerHTML = `
            <div class="modal-content" style="width: 550px">
                <h2>✅ Caso Base A(2) Provado!</h2>
                <div class="formal-box">
                    Você dividiu o intervalo [0, 1] em n = 2 partes...
                    <p>Assim:
                    <code style="display: block; text-align: center; color: #22d3ee;">
                        A(2) = 0 + 0.125 = 0.125
                    </code></p>
                    
                    <p>Formalização:</p>
                    <div class="formula-preview" style="margin: 15px 0; background: #0f172a; padding: 10px; border-radius: 4px;">
                        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                            <mi>A</mi><mo>(</mo><mn>2</mn><mo>)</mo><mo>=</mo><mfrac><mn>1</mn><mn>8</mn></mfrac>
                        </math>
                    </div>
                </div>
                <p><br></p>
                <button class="btn btn-primary" onclick="window.location.href='fase2.html'">
                    Ir para Fase 2: O Passo Indutivo
                </button>
            </div>`;
            // Nota: abreviei o HTML do modal aqui para não ficar gigante, 
            // mas o comportamento é inserir o seu texto original.
            // Se quiser que eu cole o HTML COMPLETO do modal que você me mandou, avise!
            // Por enquanto, mantive a lógica de validação.
    } else {
        const f = document.getElementById('modalFeedback');
        f.innerText = "Valores incorretos. Dica: A1 = 0.5 * 0.25 = 0.125";
        f.style.color = "#f87171";
    }
};

// Reiniciar lógica do Modal original completo para o sucesso
// (Colei aqui o bloco HTML original do seu código para garantir que nada se perdeu)
document.getElementById('btnVerificarModal').onclick = () => {
    const a0 = parseFloat(document.getElementById('inputA0').value);
    const a1 = parseFloat(document.getElementById('inputA1').value);
    const total = parseFloat(document.getElementById('inputATotal').value);

    if (a0 === 0 && a1 === 0.125 && total === 0.125) {
        modal.innerHTML = `
            <div class="modal-content" style="width: 550px">
                <h2>✅ Caso Base A(2) Provado!</h2>
                <div class="formal-box">
    Você dividiu o intervalo [0, 1] em n = 2 partes,
    onde cada base mede
        <math>
            <mi mathvariant="normal">&#x0394;</mi> <mi>x</mi>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <mi>n</mi>
            </mfrac>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac>
        </math>. 
        
        <p>Logo, a área A(2) pode ser calculada somando as áreas dos dois retângulos A<sub>0</sub> e A<sub>1</sub>.</p>

                <p><br></p>
    <p>&bullet; <strong>A<sub>0</sub></strong>: A altura do retângulo em x = 0 é f(0) = 0² = 0. Portanto, A<sub>0</sub> = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . 0 = 0.</p>
    <p><br></p>
    <p>&bullet; <strong>A<sub>1</sub></strong>: A altura do retângulo em x =        <math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac>
        </math> é f(<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math>) = (<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math>)² = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>4</mn>
            </mfrac></math>. Portanto, A<sub>1</sub> = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . <math>
                  <mfrac>
                <mn>1</mn>
                <mn>4</mn>
            </mfrac></math> = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>8</mn>
            </mfrac></math> = <math><mfrac>
                <mn>1</mn>
                <msup>
                    <mn>2</mn>
                    <mn>3</mn>
                </msup>
            </mfrac></math>.</p>
    <p><br></p>
    <p>Assim:
    <code style="display: block; text-align: center; color: #22d3ee;">
        A(2) = (<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . 0²) + (<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . <math><mfrac>
                <msup>
                    <mn>1</mn>
                    <mn>2</mn>
                </msup>
                <msup>
                    <mn>2</mn>
                    <mn>2</mn>
                </msup>
            </mfrac></math> ) = 0 + <math><mfrac>
                <mn>1</mn>
                <msup>
                    <mn>2</mn>
                    <mn>3</mn>
                </msup>
            </mfrac></math> = 0.125
    </code></p>

                <p><br></p>
    <p>Agora, vamos formalizar este resultado usando a notação matemática:</p>

    <div class="formula-preview" style="margin: 15px 0; background: #0f172a; padding: 10px; border-radius: 4px;">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block" style="font-size: 1.2rem;">
            <mi>A</mi>
            <mo stretchy="false">(</mo>
            <mn>2</mn>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <msup>
                    <mn>2</mn>
                    <mn>3</mn>
                </msup>
            </mfrac>
            <munderover>
                <mo>&#x2211;</mo>
                <mrow>
                    <mi>i</mi>
                    <mo>=</mo>
                    <mn>0</mn>
                </mrow>
                <mrow>
                    <mn>1</mn>
                </mrow>
            </munderover>
            <msup>
                <mi>i</mi>
                <mn>2</mn>
            </msup>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <mn>8</mn>
            </mfrac>
            <mo stretchy="false">(</mo>
            <msup>
                <mn>0</mn>
                <mn>2</mn>
            </msup>
            <mo>+</mo>
            <msup>
                <mn>1</mn>
                <mn>2</mn>
            </msup>
            <mo stretchy="false">)</mo>
        </math>
    </div>

    
</div>
                <p>Este valor é a nossa <strong>âncora</strong>. Na Fase 2, veremos se a fórmula da soma dos quadrados prevê este mesmo resultado.</p>
                <p><br><br></p>
                <button class="btn btn-primary" onclick="window.location.href='fase2.html'">
    Ir para Fase 2: O Passo Indutivo
</button>
            </div>`;
    } else {
        const f = document.getElementById('modalFeedback');
        f.innerText = "Valores incorretos. Dica: A1 = 0.5 * 0.25 = 0.125";
        f.style.color = "#f87171";
    }
};

btnReset.onclick = () => location.reload();
draw();
let offset = { x: 0, y: 0 };

// retangulos[0] é o degenerado (obrigatório arrastar)
let retangulos = [
    { id: 0, x: 40, y: 80, w: 200, h: 6, realH: 0, encaixado: false, x_alvo: 0, label: "Bloco A0" },
    { id: 1, x: 40, y: 180, w: 200, h: 0.25 * SCALE_Y, realH: 0.25, encaixado: false, x_alvo: 0.5, label: "Bloco A1" }
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parábola de referência
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    for (let i = 0; i <= UNIT_WIDTH; i++) {
        let x = i / UNIT_WIDTH;
        ctx.lineTo(PADDING_X + i, FLOOR_Y - (x * x * SCALE_Y));
    }
    ctx.stroke();

    // Eixo X
    ctx.strokeStyle = '#334155';
    ctx.beginPath(); ctx.moveTo(PADDING_X, FLOOR_Y); ctx.lineTo(PADDING_X + UNIT_WIDTH, FLOOR_Y); ctx.stroke();

    // Desenho dos Retângulos
    retangulos.forEach(r => {
        ctx.fillStyle = r.encaixado ? 'rgba(34, 211, 238, 0.5)' : 'rgba(148, 163, 184, 0.3)';
        ctx.strokeStyle = r.encaixado ? '#22d3ee' : '#64748b';
        ctx.lineWidth = 2;
        ctx.fillRect(r.x, r.y - r.h, r.w, r.h);
        ctx.strokeRect(r.x, r.y - r.h, r.w, r.h);

        ctx.fillStyle = "#fff";
        if (r.encaixado) {
            ctx.fillText(`h=${r.realH}`, r.x + 5, r.y - r.h - 10);
            ctx.fillText(`Δx=0.5`, r.x + r.w / 2 - 20, r.y + 20);
        } else {
            ctx.fillText(r.label, r.x + 10, r.y - r.h - 10);
        }
    });

    if (retangulos.every(r => r.encaixado) && !isModalOpen) {
        isModalOpen = true;
        setTimeout(() => { modal.style.display = 'flex'; }, 600);
    }
}

canvas.onmousedown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    retangulos.forEach(r => {
        if (mx > r.x && mx < r.x + r.w && my > r.y - r.h - 10 && my < r.y + 10) {
            dragTarget = r;
            offset.x = mx - r.x; offset.y = my - r.y;
        }
    });
};

window.onmousemove = (e) => {
    if (!dragTarget) return;
    const rect = canvas.getBoundingClientRect();
    dragTarget.x = e.clientX - rect.left - offset.x;
    dragTarget.y = e.clientY - rect.top - offset.y;

    let x_alvo_px = PADDING_X + (dragTarget.x_alvo * UNIT_WIDTH);
    if (Math.abs(dragTarget.x - x_alvo_px) < 30 && Math.abs(dragTarget.y - FLOOR_Y) < 30) {
        dragTarget.x = x_alvo_px; dragTarget.y = FLOOR_Y; dragTarget.encaixado = true;
    } else { dragTarget.encaixado = false; }
    draw();
};

window.onmouseup = () => dragTarget = null;

// Validação do Modal
document.getElementById('btnVerificarModal').onclick = () => {
    const a0 = parseFloat(document.getElementById('inputA0').value);
    const a1 = parseFloat(document.getElementById('inputA1').value);
    const total = parseFloat(document.getElementById('inputATotal').value);

    if (a0 === 0 && a1 === 0.125 && total === 0.125) {
        modal.innerHTML = `
            <div class="modal-content" style="width: 550px">
                <h2>✅ Caso Base A(2) Provado!</h2>
                <div class="formal-box">
    Você dividiu o intervalo [0, 1] em n = 2 partes,
    onde cada base mede
        <math>
            <mi mathvariant="normal">&#x0394;</mi> <mi>x</mi>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <mi>n</mi>
            </mfrac>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac>
        </math>. 
        
        <p>Logo, a área A(2) pode ser calculada somando as áreas dos dois retângulos A<sub>0</sub> e A<sub>1</sub>.</p>

                <p><br></p>
    <p>&bullet; <strong>A<sub>0</sub></strong>: A altura do retângulo em x = 0 é f(0) = 0² = 0. Portanto, A<sub>0</sub> = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . 0 = 0.</p>
    <p><br></p>
    <p>&bullet; <strong>A<sub>1</sub></strong>: A altura do retângulo em x =        <math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac>
        </math> é f(<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math>) = (<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math>)² = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>4</mn>
            </mfrac></math>. Portanto, A<sub>1</sub> = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . <math>
                  <mfrac>
                <mn>1</mn>
                <mn>4</mn>
            </mfrac></math> = <math>
                  <mfrac>
                <mn>1</mn>
                <mn>8</mn>
            </mfrac></math> = <math><mfrac>
                <mn>1</mn>
                <msup>
                    <mn>2</mn>
                    <mn>3</mn>
                </msup>
            </mfrac></math>.</p>
    <p><br></p>
    <p>Assim:
    <code style="display: block; text-align: center; color: #22d3ee;">
        A(2) = (<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . 0²) + (<math>
                  <mfrac>
                <mn>1</mn>
                <mn>2</mn>
            </mfrac></math> . <math><mfrac>
                <msup>
                    <mn>1</mn>
                    <mn>2</mn>
                </msup>
                <msup>
                    <mn>2</mn>
                    <mn>2</mn>
                </msup>
            </mfrac></math> ) = 0 + <math><mfrac>
                <mn>1</mn>
                <msup>
                    <mn>2</mn>
                    <mn>3</mn>
                </msup>
            </mfrac></math> = 0.125
    </code></p>

                <p><br></p>
    <p>Agora, vamos formalizar este resultado usando a notação matemática:</p>

    <div class="formula-preview" style="margin: 15px 0; background: #0f172a; padding: 10px; border-radius: 4px;">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block" style="font-size: 1.2rem;">
            <mi>A</mi>
            <mo stretchy="false">(</mo>
            <mn>2</mn>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <msup>
                    <mn>2</mn>
                    <mn>3</mn>
                </msup>
            </mfrac>
            <munderover>
                <mo>&#x2211;</mo>
                <mrow>
                    <mi>i</mi>
                    <mo>=</mo>
                    <mn>0</mn>
                </mrow>
                <mrow>
                    <mn>1</mn>
                </mrow>
            </munderover>
            <msup>
                <mi>i</mi>
                <mn>2</mn>
            </msup>
            <mo>=</mo>
            <mfrac>
                <mn>1</mn>
                <mn>8</mn>
            </mfrac>
            <mo stretchy="false">(</mo>
            <msup>
                <mn>0</mn>
                <mn>2</mn>
            </msup>
            <mo>+</mo>
            <msup>
                <mn>1</mn>
                <mn>2</mn>
            </msup>
            <mo stretchy="false">)</mo>
        </math>
    </div>

    
</div>
                <p>Este valor é a nossa <strong>âncora</strong>. Na Fase 2, veremos se a fórmula da soma dos quadrados prevê este mesmo resultado.</p>
                <p><br><br></p>
                <button class="btn btn-primary" onclick="window.location.href='fase2.html'">
    Ir para Fase 2: O Passo Indutivo
</button>
            </div>`;
    } else {
        const f = document.getElementById('modalFeedback');
        f.innerText = "Valores incorretos. Dica: A1 = 0.5 * 0.25";
        f.style.color = "#f87171";
    }
};

btnReset.onclick = () => location.reload();
draw();