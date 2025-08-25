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

  // Agora, crie as anotações separadamente
  const annotations =
    n < 10
      ? x_rect.slice(0, -1).flatMap((xi, i) => {
          const widthText = `x<sub>${i}</sub> = ${i}/${n}`;
          const heightText = `y<sub>${i}</sub> = (${i}/${n})<sup>2</sup>`;
          const areaText = `A<sub>${i}</sub>`;

          return [
            {
              x: xi + bar_width - 1 / n,
              y: 0,
              text: widthText,
              showarrow: false,
              xanchor: "left",
              yanchor: "top",
              font: { size: 10 },
              textangle: -90,
            },
            {
              x: xi + bar_width - 0.01,
              y: y_rect[i] / 2,
              text: heightText,
              showarrow: false,
              xanchor: "right",
              yanchor: "middle",
              font: { size: 10 },
              textangle: -90,
            },
            {
              x: xi + bar_width / 2,
              y: y_rect[i],
              text: areaText,
              showarrow: false,
              xanchor: "center",
              yanchor: "top",
              font: { size: 12, color: "white" },
            },
          ];
        })
      : [];

  // E passe as anotações para o layout do gráfico
  const layout = {
    title: "Parábola y = x²",
    annotations: annotations,
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
