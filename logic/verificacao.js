/**
 * INDUCTIO - FASE 4: Lógica de Ordenação (Mobile Friendly)
 */

document.addEventListener('DOMContentLoaded', () => {

    const draggables = document.querySelectorAll('.draggable-item');
    const slots = document.querySelectorAll('.drop-slot');
    const sourceContainer = document.getElementById('source-container');
    const feedbackArea = document.getElementById('feedback-area');
    const btnFinalizar = document.getElementById('btnFinalizar');

    let activeDragItem = null;
    let initialX = 0, initialY = 0;

    // 1. Embaralhamento
    function shuffleItems() {
        const items = Array.from(sourceContainer.children);
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            sourceContainer.appendChild(items[j]);
        }
    }
    shuffleItems();

    // 2. Configuração de Pointer Events (Drag customizado)
    draggables.forEach(item => {
        item.style.touchAction = "none"; // Vital para celular
        item.style.cursor = "grab";
        item.style.position = "relative";

        item.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            activeDragItem = item;

            // Prepara visual
            item.setPointerCapture(e.pointerId);
            item.classList.add('dragging');
            item.style.zIndex = "9999";
            item.style.cursor = "grabbing";

            // Ponto inicial
            initialX = e.clientX;
            initialY = e.clientY;
        });

        item.addEventListener('pointermove', (e) => {
            if (!activeDragItem) return;
            e.preventDefault();

            const currentX = e.clientX - initialX;
            const currentY = e.clientY - initialY;

            // Move o elemento visualmente
            item.style.transform = `translate(${currentX}px, ${currentY}px)`;
        });

        item.addEventListener('pointerup', (e) => {
            if (!activeDragItem) return;

            const item = activeDragItem;
            item.releasePointerCapture(e.pointerId);
            item.classList.remove('dragging');
            item.style.zIndex = "";
            item.style.transform = ""; // Reseta a posição visual
            item.style.cursor = "grab";

            // Detecção do local de soltura
            item.style.visibility = 'hidden'; // Esconde para ver o que está embaixo
            const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
            item.style.visibility = 'visible';

            // Analisa onde soltou
            const dropZone = elementBelow ? elementBelow.closest('.drop-slot, #source-container') : null;

            if (dropZone) {
                handleDrop(item, dropZone);
            }

            activeDragItem = null;
            initialX = 0; initialY = 0;
        });
    });

    // 3. Lógica de Drop e Validação
    function handleDrop(item, targetZone) {
        // Se soltou no mesmo lugar que já estava, não faz nada
        if (item.parentNode === targetZone) return;

        // Limpeza do slot anterior (se veio de um slot)
        if (item.parentNode.classList.contains('drop-slot')) {
            resetSlotStyle(item.parentNode);
        }

        // Se soltou no Container de Origem
        if (targetZone.id === 'source-container') {
            targetZone.appendChild(item);
            return;
        }

        // Se soltou em um Slot de Resposta
        if (targetZone.classList.contains('drop-slot')) {
            // Se o slot já tem um item, mande o item antigo de volta pra origem
            const existingItem = targetZone.querySelector('.draggable-item');
            if (existingItem) {
                sourceContainer.appendChild(existingItem);
            }

            // Esconde o número do slot
            const label = targetZone.querySelector('.slot-number');
            if (label) label.style.display = 'none';

            // Move o item novo para o slot
            targetZone.appendChild(item);

            // Valida imediatamente
            validateSlot(targetZone);
            checkAllSlots();
        }
    }

    function resetSlotStyle(slot) {
        slot.classList.remove('correct', 'wrong');
        const label = slot.querySelector('.slot-number');
        if (label) label.style.display = 'block';
    }

    function validateSlot(slot) {
        const item = slot.querySelector('.draggable-item');
        if (!item) return;

        const expectedId = slot.dataset.expected;
        const actualId = item.dataset.id;

        if (expectedId === actualId) {
            slot.classList.add('correct');
            slot.classList.remove('wrong');
        } else {
            slot.classList.add('wrong');
            slot.classList.remove('correct');
        }
    }

    function checkAllSlots() {
        let correctCount = 0;
        slots.forEach(slot => {
            if (slot.classList.contains('correct')) {
                correctCount++;
            }
        });

        if (correctCount === 5) {
            feedbackArea.innerHTML = "<strong>👏 Parabéns!</strong><br>✔️ A lógica está impecável.";
            feedbackArea.style.color = "#22c55e";
            feedbackArea.style.borderLeft = "4px solid #22c55e";
            btnFinalizar.style.display = "block";

            // Bloqueia movimento após vencer
            draggables.forEach(d => d.style.pointerEvents = "none");
        } else {
            feedbackArea.innerText = `Passos Corretos: ${correctCount} / 5`;
            feedbackArea.style.color = "#94a3b8";
            feedbackArea.style.borderLeft = "none";
        }
    }
});