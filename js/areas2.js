// area2.js

// Função auxiliar para formatar a fração usando as novas classes CSS
function formatFraction(numerator, denominator) {
  return `<span class="fraction-container">
            <span class="numerator">${numerator}</span>
            <span class="denominator">${denominator}</span>
          </span>`;
}

// Função auxiliar para formatar um termo da área (largura * altura)
function formatAreaTerm(i, n) {
  const widthFraction = formatFraction(1, n);
  const heightFraction = formatFraction(
    `${i}<sup><small>2</small></sup>`,
    `${n}<sup><small>2</small></sup>`
  );
  return `${widthFraction} x ${heightFraction}`;
}

// Função para recarregar a página de forma eficiente
export function resetPage() {
  document.getElementById("n-value").value = "2";
  document.getElementById("tabela-container").innerHTML = "";
  Plotly.newPlot("plot", [], { title: "Parábola y = x²" });
}

function parabola(x) {
  return x.map((xi) => xi ** 2);
}

/**
 * Função principal para gerar o gráfico no modal.
 * @param {number} n - O valor de n para a geração do gráfico.
 */
export function generateModalPlot(n) {
  const plotDiv = document.getElementById("grafico-modal-placeholder");

  const a = 0;
  const b = 1;
  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  let traces;
  let annotations;

  if (n >= 2) {
    const x_rect = Array.from(
      { length: n + 1 },
      (_, i) => a + (i * (b - a)) / n
    );
    const y_rect = parabola(x_rect);
    const bar_width = (b - a) / n;

    traces = [
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
        name: `Area_${i}`,
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

    annotations =
      n <= 30
        ? x_rect.slice(0, -1).map((xi, i) => ({
            x: xi + bar_width / 2,
            y: y_rect[i],
            text: `A<sub>${i}</sub>`,
            showarrow: false,
            xanchor: "center",
            yanchor: "top",
            font: { size: 18, color: "white" },
          }))
        : [];
  } else {
    traces = [
      {
        x: x_parabola,
        y: y_parabola,
        mode: "lines",
        name: "Parábola y = x²",
        showlegend: false,
      },
    ];
    annotations = [];
  }

  const layout = {
    title: `Gráfico com n = ${n} Retângulos`,
    annotations: annotations,
    showlegend: false,
    barmode: "overlay",
    autosize: true,
    width: plotDiv.offsetWidth,
    height: plotDiv.offsetHeight * 0.9,
    margin: {
      l: 20,
      r: 20,
      t: 30,
      b: 20,
    },
  };

  Plotly.newPlot("grafico-modal-placeholder", traces, layout);
}
