/**
 * INDUCTIO - FASE 3: Lógica de Embaralhamento e Validação (Mobile Friendly)
 */

const bank = document.getElementById('equationBank');
const slots = document.querySelectorAll('.slot');
const feedback = document.getElementById('feedback-area');
const btnFinalizar = document.getElementById('btnFinalizarProva');
const finalModal = document.getElementById('finalModal');

// Variáveis de Controle de Arraste Global
let activeDragElement = null;
let initialX = 0;
let initialY = 0;
let currentX = 0;
let currentY = 0;

// 1. Função de Embaralhamento (Shuffle)
function shuffleOptions() {
    const parts = Array.from(bank.children);
    for (let i = parts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        bank.appendChild(parts[j]);
    }
}

// 2. Inicialização do Pointer Drag and Drop (Funciona em Touch e Mouse)
function initDragAndDrop() {
    const draggableParts = document.querySelectorAll('.draggable-part');

    draggableParts.forEach(part => {
        // CSS essencial para evitar scroll enquanto arrasta
        part.style.touchAction = "none";
        part.style.cursor = "grab";
        part.style.position = "relative"; // Garante que o translate funcione

        part.addEventListener('pointerdown', (e) => {
            e.preventDefault();

            activeDragElement = part;
            activeDragElement.setPointerCapture(e.pointerId);
            activeDragElement.classList.add('dragging');
            activeDragElement.style.zIndex = "1000";
            activeDragElement.style.cursor = "grabbing";

            // Posição inicial do ponteiro
            initialX = e.clientX;
            initialY = e.clientY;
        });

        part.addEventListener('pointermove', (e) => {
            if (!activeDragElement) return;
            e.preventDefault();

            // Calcula o deslocamento
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Move visualmente o elemento
            activeDragElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
        });

        part.addEventListener('pointerup', (e) => {
            if (!activeDragElement) return;

            const element = activeDragElement;
            element.releasePointerCapture(e.pointerId);
            element.classList.remove('dragging');
            element.style.cursor = "grab";
            element.style.zIndex = "";

            // Lógica de "Drop": Descobre o que está embaixo do dedo
            // Esconde temporariamente o elemento arrastado para detectar o slot embaixo dele
            element.style.visibility = 'hidden';
            const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
            element.style.visibility = 'visible';

            // Verifica se soltou em um Slot
            const slot = elementBelow ? elementBelow.closest('.slot') : null;

            if (slot && !slot.classList.contains('filled')) {
                // Tenta encaixar
                const type = element.dataset.type;
                const expected = slot.dataset.expected;

                if (type === expected) {
                    // Acerto!
                    slot.innerHTML = element.innerHTML;
                    slot.classList.add('filled');
                    element.style.display = "none"; // Remove do banco
                    showFeedback("✅ Termo correto identificado!", "success");
                    checkWin();
                } else {
                    // Erro
                    showFeedback("❌ Termo incorreto. Analise os expoentes e a base.", "error");
                    slot.style.animation = "shake 0.4s";
                    setTimeout(() => slot.style.animation = "", 400);
                    // Retorna o elemento para a posição original
                    element.style.transform = "translate(0px, 0px)";
                }
            } else {
                // Soltou no vazio: Retorna para a posição original
                element.style.transform = "translate(0px, 0px)";
            }

            // Reseta variáveis
            activeDragElement = null;
            currentX = 0;
            currentY = 0;
        });
    });
}

function showFeedback(text, type) {
    feedback.innerText = text;
    feedback.style.color = type === "success" ? "#22c55e" : "#ef4444";
}

function checkWin() {
    if (document.querySelectorAll('.slot.filled').length === 2) {
        btnFinalizar.disabled = false;
        btnFinalizar.style.boxShadow = "0 0 20px #22d3ee";
    }
}

// 3. Desenho da Figura 15 no Canvas (Mantido igual)
function drawFig15() {
    const canvas = document.getElementById('miniCanvas');
    if (!canvas) return; // Segurança
    const ctx = canvas.getContext('2d');
    canvas.width = 250; canvas.height = 120;

    ctx.strokeStyle = "#475569";
    ctx.beginPath(); ctx.moveTo(10, 100); ctx.lineTo(240, 100); ctx.stroke();

    ctx.fillStyle = "rgba(34, 211, 238, 0.2)";
    for (let i = 0; i < 4; i++) ctx.fillRect(10 + i * 40, 100 - (i * 15), 40, i * 15);

    ctx.fillStyle = "#fb923c";
    ctx.fillRect(170, 45, 40, 55);
    ctx.strokeRect(170, 45, 40, 55);
}

btnFinalizar.onclick = () => finalModal.style.display = 'flex';

window.onload = () => {
    shuffleOptions();
    initDragAndDrop();
    drawFig15();
};