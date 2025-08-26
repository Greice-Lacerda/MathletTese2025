// Arquivo: graficoP1.js

// Função auxiliar para calcular y = x²
function parabola(x) {
  return x.map((xi) => xi ** 2);
}

// Função principal para gerar e exibir o gráfico
function generatePlot() {
  const n = 10;
  const a = 0;
  const b = 1;
  const bar_width = (b - a) / n;

  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  const x_rect = Array.from({ length: n + 1 }, (_, i) => a + (i * (b - a)) / n);
  const y_rect = parabola(x_rect);
  const area_values = x_rect.slice(0, -1).map((xi, i) => bar_width * y_rect[i]);

  annotations =
    n <= 10? x_rect.slice(0, -1).flatMap((xi, i) => {
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

  const layout = {
    title: "Área sob a parábola y = x²",
    showlegend: false,
    barmode: "overlay",
    autosize: true,
    width: document.getElementById("plot").offsetWidth * 0.95,
    height: document.getElementById("plot").offsetWidth,
    margin: {
      l: 50,
      r: 50,
      t: 60,
      b: 70,
    },
    xaxis: {
      title: "Valores de X",
    },
    yaxis: {
      title: "Valores de Y",
    },
  };

  Plotly.newPlot("plot", traces, layout);
}

// Exporta a função para ser usada em outros arquivos
export { generatePlot };
