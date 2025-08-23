/**
 * Calcula y = x^2 para cada valor em um array de x.
 * @param {number[]} x - Um array de valores de x.
 * @returns {number[]} Um array dos valores de y correspondentes.
 */
export function parabola(x) {
  return x.map((xi) => xi ** 2);
}

/**
 * Gera e exibe o gráfico da área sob a parábola y = x^2.
 * A parábola é dividida em 'n' retângulos.
 * @param {number} n - O número de retângulos para dividir o gráfico.
 */
export function generatePlot(n) {
  const a = 0;
  const b = 1;
  const bar_width = (b - a) / n;

  // Dados para a parábola
  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  // Dados para os retângulos
  const x_rect = [];
  const y_rect = [];
  const text_labels = [];
  let totalArea = 0;

  for (let i = 0; i < n; i++) {
    const xi = a + i * bar_width;
    const yi = parabola([xi])[0];
    const area = yi * bar_width;

    x_rect.push(xi);
    y_rect.push(yi);
    text_labels.push(`Área ${i + 1} = ${area.toFixed(4)}`);
    totalArea += area;
  }

  // Configuração dos traces do Plotly.js
  const traces = [
    {
      x: x_parabola,
      y: y_parabola,
      mode: "lines",
      name: "Parábola y = x²",
      line: {
        color: "rgb(255, 127, 14)", // Cor da parábola
        width: 3,
      },
      showlegend: true,
    },
    {
      x: x_rect,
      y: y_rect,
      type: "bar",
      width: bar_width,
      name: "Retângulos (Aproximação)",
      marker: {
        color: "rgba(31, 119, 180, 0.5)", // Cor dos retângulos com transparência
        line: {
          color: "rgba(31, 119, 180, 1.0)",
          width: 1.5,
        },
      },
      text: text_labels,
      hoverinfo: "text",
      showlegend: true,
      base: 0, // Garante que a base do retângulo seja o eixo X
    },
  ];

  // Configuração do layout do Plotly.js
  const plotContainer = document.getElementById("plot");
  const layout = {
    title: `Área sob a parábola y = x² (n=${n})<br>Área Total ≈ ${totalArea.toFixed(
      4
    )}`,
    annotations: [],
    showlegend: true,
    barmode: "overlay",
    autosize: true,
    width: plotContainer.clientWidth,
    height: plotContainer.clientHeight,
    margin: {
      l: 50,
      r: 50,
      t: 80,
      b: 70,
    },
    xaxis: {
      title: "Valores de X",
      range: [a, b],
    },
    yaxis: {
      title: "Valores de Y",
      range: [0, 1.1],
    },
  };

  Plotly.newPlot("plot", traces, layout, { responsive: true });
}
