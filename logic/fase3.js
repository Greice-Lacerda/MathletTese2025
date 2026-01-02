/**
 * INDUCTIO - FASE 3: Lógica de Embaralhamento e Validação
 */

const bank = document.getElementById('equationBank');
const slots = document.querySelectorAll('.slot');
const feedback = document.getElementById('feedback-area');
const btnFinalizar = document.getElementById('btnFinalizarProva');
const finalModal = document.getElementById('finalModal');

// 1. Função de Embaralhamento (Shuffle)
function shuffleOptions() {
    const parts = Array.from(bank.children);
    for (let i = parts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        bank.appendChild(parts[j]); // Move o elemento para o final, embaralhando
    }
}

// 2. Inicialização do Drag and Drop
function initDragAndDrop() {
    const draggableParts = document.querySelectorAll('.draggable-part');

    draggableParts.forEach(part => {
        part.addEventListener('dragstart', e => {
            e.dataTransfer.setData('id', e.target.id);
            e.dataTransfer.setData('type', e.target.dataset.type);
            e.target.classList.add('dragging');
        });

        part.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
        });
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', e => {
            e.preventDefault();
            slot.classList.add('over');
        });

        slot.addEventListener('dragleave', () => slot.classList.remove('over'));

        slot.addEventListener('drop', e => {
            e.preventDefault();
            slot.classList.remove('over');

            const id = e.dataTransfer.getData('id');
            const type = e.dataTransfer.getData('type');
            const expected = slot.dataset.expected;
            const element = document.getElementById(id);

            if (type === expected) {
                slot.innerHTML = element.innerHTML;
                slot.classList.add('filled');
                element.style.display = "none";
                showFeedback("✅ Termo correto identificado!", "success");
                checkWin();
            } else {
                showFeedback("❌ Termo incorreto. Analise os expoentes e a base.", "error");
                slot.style.animation = "shake 0.4s";
                setTimeout(() => slot.style.animation = "", 400);
            }
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

// 3. Desenho da Figura 15 no Canvas
function drawFig15() {
    const canvas = document.getElementById('miniCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 250; canvas.height = 120;

    ctx.strokeStyle = "#475569";
    ctx.beginPath(); ctx.moveTo(10, 100); ctx.lineTo(240, 100); ctx.stroke();

    // Blocos A(k)
    ctx.fillStyle = "rgba(34, 211, 238, 0.2)";
    for (let i = 0; i < 4; i++) ctx.fillRect(10 + i * 40, 100 - (i * 15), 40, i * 15);

    // Bloco Novo
    ctx.fillStyle = "#fb923c";
    ctx.fillRect(170, 45, 40, 55);
    ctx.strokeRect(170, 45, 40, 55);
}

btnFinalizar.onclick = () => finalModal.style.display = 'flex';

// Start
window.onload = () => {
    shuffleOptions();
    initDragAndDrop();
    drawFig15();
};