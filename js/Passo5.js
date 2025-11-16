/* ========================================================== */
/* PASSO 5 - LÓGICA (EMBARALHAR NO RETORNO + RESUMO)          */
/* ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Seleção dos Elementos ---
    const dragArea = document.getElementById("drag-area");
    const dropArea = document.getElementById("drop-area");
    const resetBtn = document.getElementById("resetar-desafio");
    const conclusionBtn = document.getElementById("conclusao-btn");
    const feedback = document.getElementById("feedback-container");
    const summaryArea = document.getElementById("summary-area");

    const draggableItems = Array.from(dragArea.querySelectorAll(".draggable-item"));

    const errorAudio = document.getElementById("error-audio");
    const successAudio = document.getElementById("success-audio");
    let selectedItem = null;

    // --- 2. Funções de Inicialização ---

    function clearPlaceholders() {
        dropArea.querySelectorAll("td.placeholder").forEach(cell => {
            cell.innerHTML = `Solte o Passo ${cell.dataset.slot} Aqui`;
            cell.classList.remove("slot-complete");
        });
    }

    /**
     * Embaralha e recoloca os itens na dragArea.
     */
    function shuffleAndResetItems() {
        dragArea.innerHTML = ""; // Limpa a área

        // Embaralha o array 'draggableItems' (Fisher-Yates)
        for (let i = draggableItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [draggableItems[i], draggableItems[j]] = [draggableItems[j], draggableItems[i]];
        }

        // Readiciona apenas os itens que NÃO estão corretos
        draggableItems.forEach(item => {
            if (!item.classList.contains("item-correct")) {
                item.classList.remove("item-wrong", "selected");
                item.draggable = true;
                dragArea.appendChild(item);
            }
        });

        // Renderiza o MathJax na área de etiquetas
        if (window.MathJax && typeof window.MathJax.typeset === 'function') {
            window.MathJax.typeset([dragArea]);
        }
    }

    function resetChallenge() {
        if (summaryArea) summaryArea.classList.add("hidden");
        if (dragArea) dragArea.classList.remove("hidden");

        // Devolve todos os itens (mesmo os corretos) para o array master
        draggableItems.forEach(item => {
            item.classList.remove("item-correct", "item-wrong", "selected");
            item.draggable = true;
        });

        clearPlaceholders();
        shuffleAndResetItems();

        feedback.innerHTML = "<p>Aguardando...</p>";
        feedback.className = "feedback-box";
        conclusionBtn.classList.add("hidden");

        if (selectedItem) {
            selectedItem.classList.remove("selected");
            selectedItem = null;
        }
    }

    // --- 3. Lógica de Interação (Clique-Clique e Toque) ---

    function handleItemClick(item) {
        if (item.classList.contains("item-correct")) return;
        if (selectedItem === item) {
            selectedItem.classList.remove("selected");
            selectedItem = null;
        } else {
            if (selectedItem) selectedItem.classList.remove("selected");
            selectedItem = item;
            selectedItem.classList.add("selected");
        }
    }

    function handlePlaceholderClick(placeholder) {
        if (selectedItem && !placeholder.firstElementChild) {
            checkItemPlacement(selectedItem, placeholder);
            selectedItem.classList.remove("selected");
            selectedItem = null;
        }
    }

    /**
     * ATUALIZADO: Devolve o item e reembaralha
     */
    function handleSourceClick() {
        if (selectedItem) {
            selectedItem.classList.remove("selected");
            dragArea.appendChild(selectedItem); // Devolve o item
            selectedItem = null;
            shuffleAndResetItems(); // <-- ALTERAÇÃO: Reembaralha
        }
    }

    document.addEventListener("click", (e) => {
        // ... (código do listener de clique permanece o mesmo) ...
        const target = e.target;
        const item = target.closest(".draggable-item");
        const placeholder = target.closest("td.placeholder");

        if (item) {
            handleItemClick(item);
            return;
        }
        if (placeholder && !placeholder.firstElementChild) {
            handlePlaceholderClick(placeholder);
            return;
        }
        if (target.id === "drag-area") {
            handleSourceClick();
            return;
        }
    });

    // --- 4. Lógica de Interação (Arrastar e Soltar com Mouse) ---

    draggableItems.forEach((item, i) => {
        item.id = `item-${i}`;
    });

    dragArea.addEventListener("dragstart", handleDragStart);
    dropArea.addEventListener("dragstart", handleDragStart);

    function handleDragStart(e) {
        if (e.target.classList.contains("draggable-item") && !e.target.classList.contains("item-correct")) {
            e.dataTransfer.setData("text/plain", e.target.id);
            e.target.classList.add("dragging");
        } else {
            e.preventDefault();
        }
    }

    document.addEventListener("dragend", (e) => {
        if (e.target.classList.contains("draggable-item")) {
            e.target.classList.remove("dragging");
        }
    });

    // Eventos na Tabela (DropZone)
    dropArea.addEventListener("dragover", e => {
        e.preventDefault();
        const placeholder = getTargetPlaceholder(e.target);
        if (placeholder && !placeholder.firstElementChild) {
            placeholder.classList.add("over");
        }
    });

    dropArea.addEventListener("dragleave", e => {
        const placeholder = getTargetPlaceholder(e.target);
        if (placeholder) {
            placeholder.classList.remove("over");
        }
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        const placeholder = getTargetPlaceholder(e.target);
        if (!placeholder || placeholder.firstElementChild) return;

        placeholder.classList.remove("over");
        const id = e.dataTransfer.getData("text/plain");
        const draggedItem = document.getElementById(id);

        checkItemPlacement(draggedItem, placeholder);
    });

    // <-- ALTERAÇÃO: Adicionados eventos para "arrastar de volta"
    dragArea.addEventListener("dragover", e => {
        e.preventDefault();
        dragArea.classList.add("over"); // Feedback visual
    });

    dragArea.addEventListener("dragleave", e => {
        dragArea.classList.remove("over");
    });

    dragArea.addEventListener("drop", e => {
        e.preventDefault();
        dragArea.classList.remove("over");
        const id = e.dataTransfer.getData("text/plain");
        const draggedItem = document.getElementById(id);

        if (draggedItem) {
            draggedItem.classList.remove("selected");
            dragArea.appendChild(draggedItem);
            shuffleAndResetItems(); // Reembaralha ao soltar
        }
    });

    function getTargetPlaceholder(target) {
        return target.closest("td.placeholder");
    }

    // --- 5. Lógica de Verificação e Conclusão ---

    /**
     * ATUALIZADO: Devolve o item e reembaralha no erro
     */
    function checkItemPlacement(item, placeholder) {
        const expectedOrder = parseInt(placeholder.dataset.slot, 10);
        const actualOrder = parseInt(item.dataset.order, 10);

        if (expectedOrder === actualOrder) {
            // --- Correto ---
            placeholder.innerHTML = "";
            placeholder.appendChild(item);
            item.classList.remove("selected", "item-wrong");
            item.classList.add("item-correct");
            item.draggable = false;

            checkCompletion();

        } else {
            // --- Incorreto ---
            item.classList.remove("selected");
            dragArea.appendChild(item); // Devolve o item

            shuffleAndResetItems(); // <-- ALTERAÇÃO: Reembaralha no erro

            if (errorAudio) errorAudio.play();

            feedback.innerHTML = `<p><strong>Passo Incorreto!</strong> A Etapa ${actualOrder} não vai na posição ${expectedOrder}.</p>`;
            feedback.className = "feedback-box feedback-error";

            setTimeout(() => {
                if (feedback.classList.contains("feedback-error")) {
                    feedback.innerHTML = "<p>Aguardando...</p>";
                    feedback.className = "feedback-box";
                }
            }, 2000);
        }
    }

    function checkCompletion() {
        // ... (código do checkCompletion permanece o mesmo) ...
        let correctCount = 0;
        dropArea.querySelectorAll("td.placeholder").forEach(p => {
            if (p.firstElementChild && p.firstElementChild.classList.contains("item-correct")) {
                correctCount++;
            }
        });

        if (correctCount === draggableItems.length) {
            feedback.innerHTML = '<p>Ordem correta! Parabéns!</p>';
            feedback.className = 'feedback-box feedback-success';
            conclusionBtn.classList.remove("hidden");
            if (successAudio) successAudio.play();

            if (typeof confetti === 'function') {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }

            if (dragArea) dragArea.classList.add("hidden");
            if (summaryArea) summaryArea.classList.remove("hidden");

            dropArea.querySelectorAll("td.placeholder").forEach(placeholder => {
                placeholder.innerText = `Etapa ${placeholder.dataset.slot} Concluída`;
                placeholder.classList.add("slot-complete");
            });
        }
    }

    resetBtn.addEventListener("click", resetChallenge);

    // --- 6. Inicialização da Página ---
    resetChallenge();
    
});