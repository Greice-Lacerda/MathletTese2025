/**
 * INDUCTIO - FASE 4: Lógica de Ordenação
 * Adaptação do antigo 'verificacao.js' para o novo sistema visual
 */

document.addEventListener('DOMContentLoaded', () => {

    // Elementos DOM
    const draggables = document.querySelectorAll('.draggable-item');
    const slots = document.querySelectorAll('.drop-slot');
    const sourceContainer = document.getElementById('source-container');
    const feedbackArea = document.getElementById('feedback-area');
    const btnFinalizar = document.getElementById('btnFinalizar');

    let draggedItem = null;

    // 1. Função de Embaralhamento (Fisher-Yates)
    // Garante que o usuário sempre tenha que pensar para ordenar
    function shuffleItems() {
        const items = Array.from(sourceContainer.children);
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            sourceContainer.appendChild(items[j]);
        }
    }

    // Executa embaralhamento inicial
    shuffleItems();

    // 2. Event Listeners para os Itens (Arrastar)
    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
            // Hack para esconder o elemento original enquanto arrasta, mantendo a "imagem fantasma"
            setTimeout(() => item.style.display = 'none', 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            item.style.display = 'flex'; // Volta a aparecer ao soltar
            draggedItem = null;
            checkAllSlots(); // Verifica se completou o jogo
        });
    });

    // 3. Event Listeners para os Slots (Soltar)
    slots.forEach(slot => {

        slot.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessário para permitir o drop
            // Apenas adiciona efeito visual se o slot estiver vazio (ou tiver apenas o label)
            if (!hasItem(slot)) {
                slot.classList.add('over');
            }
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('over');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('over');

            if (draggedItem && !hasItem(slot)) {
                // Remove o item de onde estava (source ou outro slot)
                if (draggedItem.parentNode.classList.contains('drop-slot')) {
                    // Se veio de outro slot, limpa o estilo daquele slot
                    resetSlotStyle(draggedItem.parentNode);
                }

                // Esconde o label "Passo X"
                const label = slot.querySelector('.slot-number');
                if (label) label.style.display = 'none';

                // Adiciona o item ao slot
                slot.appendChild(draggedItem);

                // Validação Imediata (Feedback Visual)
                validateSlot(slot);
            }
        });
    });

    // Permite arrastar de volta para a origem (Source) caso o usuário erre
    sourceContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        sourceContainer.style.background = "rgba(255,255,255,0.05)";
    });

    sourceContainer.addEventListener('dragleave', () => {
        sourceContainer.style.background = "transparent";
    });

    sourceContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        sourceContainer.style.background = "transparent";
        if (draggedItem) {
            // Se veio de um slot, restaura o label do slot anterior
            if (draggedItem.parentNode.classList.contains('drop-slot')) {
                resetSlotStyle(draggedItem.parentNode);
            }
            sourceContainer.appendChild(draggedItem);
        }
    });

    // --- Funções Auxiliares ---

    // Verifica se o slot já tem um item (ignorando o span .slot-number)
    function hasItem(slot) {
        return slot.querySelectorAll('.draggable-item').length > 0;
    }

    // Restaura aparência original do slot quando o item sai
    function resetSlotStyle(slot) {
        slot.classList.remove('correct', 'wrong');
        const label = slot.querySelector('.slot-number');
        if (label) label.style.display = 'block';
    }

    // Valida um slot individualmente
    function validateSlot(slot) {
        const item = slot.querySelector('.draggable-item');
        if (!item) return;

        const expectedId = slot.dataset.expected;
        const actualId = item.dataset.id;

        if (expectedId === actualId) {
            slot.classList.add('correct');
            slot.classList.remove('wrong');
            // Toca som sutil se quiser (opcional)
        } else {
            slot.classList.add('wrong');
            slot.classList.remove('correct');
        }
    }

    // Verifica Vitória
    function checkAllSlots() {
        let correctCount = 0;
        slots.forEach(slot => {
            if (slot.classList.contains('correct')) {
                correctCount++;
            }
        });

        if (correctCount === 5) {
            // Vitória!
            feedbackArea.innerHTML = "<strong>👏 Parabéns!</strong><br>✔️ A lógica está impecável.";
            feedbackArea.style.color = "#22c55e"; // Verde
            feedbackArea.style.borderLeft = "4px solid #22c55e";
            btnFinalizar.style.display = "block";

            // Trava os itens para não mexer mais
            draggables.forEach(d => d.setAttribute('draggable', 'false'));
        } else {
            // Reset feedback se ainda não acabou
            feedbackArea.innerText = `Passos Corretos: ${correctCount} / 5`;
            feedbackArea.style.color = "#94a3b8"; // Cinza
            feedbackArea.style.borderLeft = "none";
        }
    }
});