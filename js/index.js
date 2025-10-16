//Logica da página index

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-workshop-btn");

    if (startButton) {
        startButton.addEventListener("click", () => {
            const docElement = document.documentElement;

            // 1. Tenta colocar a página em modo de tela cheia
            if (docElement.requestFullscreen) {
                docElement.requestFullscreen();
            } else if (docElement.mozRequestFullScreen) { // Firefox
                docElement.mozRequestFullScreen();
            } else if (docElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
                docElement.webkitRequestFullscreen();
            } else if (docElement.msRequestFullscreen) { // IE/Edge
                docElement.msRequestFullscreen();
            }

            // 2. Navega para a próxima página
            window.location.href = './pages/descricao.html';
        });
    }
});