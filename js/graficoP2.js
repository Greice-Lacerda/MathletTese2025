// graficoP2.js

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
  const plotContainer = document.getElementById("plot");

  // Define o intervalo de integração
  const a = 0;
  const b = 1;
  const bar_width = (b - a) / n;

  // --- 1. Dados para a Parábola (curva de fundo) ---
  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  // --- 2. Dados para os Retângulos (área de aproximação) ---
  const x_rect = [];
  const y_rect = [];
  const text_labels = [];
  let totalArea = 0;

  for (let i = 0; i < n; i++) {
    const xi = a + i * bar_width;
    const yi = xi * xi;
    const area = yi * bar_width;

    x_rect.push(xi);
    y_rect.push(yi);
    text_labels.push(`Área ${i + 1} = ${area.toFixed(4)}`);
    totalArea += area;
  }

  // --- 3. Configuração dos Traces do Plotly.js ---
  const traces = [
    {
      x: x_parabola,
      y: y_parabola,
      mode: "lines",
      name: "Parábola y = x²",
      line: {
        color: "#ff7f0e",
        width: 3,
      },
      showlegend: true,
    },
    {
      x: x_rect,
      y: y_rect,
      type: "bar",
      width: bar_width,
      name: `Aproximação com ${n} Retângulos`,
      marker: {
        color: "rgba(31, 119, 180, 0.5)",
        line: {
          color: "rgba(31, 119, 180, 1.0)",
          width: 1.5,
        },
      },
      text: text_labels,
      hoverinfo: "text",
      showlegend: true,
      base: 0,
    },
  ];

  // --- 4. Configuração do Layout do Plotly.js ---
  const layout = {
    title: {
      text: `Área sob a parábola y = x² (n=${n})<br>Área Total ≈ ${totalArea.toFixed(
        4
      )}`,
      font: {
        family: "Bree Serif",
        size: 20,
      },
    },
    xaxis: {
      title: "Valores de X",
      range: [a, b],
    },
    yaxis: {
      title: "Valores de Y",
      range: [0, 1.1],
    },
    showlegend: true,
    hovermode: "closest",
    autosize: true,
    margin: {
      l: 50,
      r: 50,
      t: 80,
      b: 70,
    },
  };

  // --- 5. Criação do Gráfico ---
  Plotly.newPlot(plotContainer, traces, layout, { responsive: true });
}
