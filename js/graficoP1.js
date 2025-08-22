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
      name: `Área_${i} = ${area_values[i].toFixed(10)}`,
      marker: {
        color: "rgba(0, 0, 255, 0.3)",
        line: {
          color: "black",
          width: 1,
        },
      },
      offset: 0,
      showlegend: false,
    })),
  ];

  const layout = {
    title: "Área sob a parábola y = x²",
    annotations: [],
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
