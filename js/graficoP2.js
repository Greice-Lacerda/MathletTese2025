/*Gera grafico e tabela area2.js */

// ... (Resto das funções auxiliares e início da função generatePlot)

function generatePlot() {
  const n = parseInt(document.getElementById("n-value").value);
  const plotDiv = document.getElementById("plot");
  const tableContainer = document.getElementById("tabela-container");

  if (isNaN(n) || n < 2) {
    alert("Por favor, insira um número inteiro maior ou igual a 2.");
    return;
  }

  tableContainer.innerHTML = "";

  const a = 0;
  const b = 1;
  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  // ... (código que define x_rect, y_rect, bar_width, etc.)

  // Crie os traces, que são os elementos do gráfico (linha e barras)
  const traces = [
    {
      x: x_parabola,
      y: y_parabola,
      mode: "lines",
      name: "Parábola y = x²",
      showlegend: false,
    },
    ...x_rect.slice(0, -1).map((xi, i) => ({
      x: [xi],
      y: [y_rect[i]],
      type: "bar",
      width: [bar_width],
      name: `Area_${i} = ${area_values[i].toFixed(8)}`,
      marker: {
        color: "rgba(0, 0, 255, 0.3)",
        line: {
          color: "black",
          width: 0.5,
        },
      },
      offset: 0,
      showlegend: false,
    })),
  ];

  
  // E passe as anotações para o layout do gráfico
  const layout = {
    title: "Parábola y = x²",
    showlegend: false,
    widthText: ` `,
    heightText: ` `,
    areaText: ` `,
    barmode: "overlay",
    // ... (outras configurações de layout)
  };

  Plotly.newPlot("plot", traces, layout);
  // ... (Resto do código para criar a tabela)
}
