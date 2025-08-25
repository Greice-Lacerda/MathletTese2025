/*Gera grafico e tabela area2.js */

// ... (Funções auxiliares)

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

  let traces = [];
  let tableBodyData = [];
  let totalArea = 0;
  const realTotalArea = (1 / 3).toFixed(8);
  let error = (realTotalArea - 0).toFixed(8);

  // Mover a inicialização de annotations para fora do if/else, antes do if(n>=2)
  let annotations = []; // Garante que annotations é um array vazio por padrão

  // Agora, a lógica de anotações só é aplicada se n for válido (n >= 2)
  if (n >= 2) {
    const x_rect = Array.from(
      { length: n + 1 },
      (_, i) => a + (i * (b - a)) / n
    );
    const y_rect = parabola(x_rect);
    const bar_width = (b - a) / n;
    const area_values = x_rect
      .slice(0, -1)
      .map((xi, i) => bar_width * y_rect[i]);

    const cumulativeArea_values = [];
    let accumulated_numerator = 0;
    const formatted_area_terms = [];
    const cumulativeArea_string = [];

    x_rect.slice(0, -1).forEach((xi, i) => {
      const currentArea_numerator = i ** 2;
      const denominator = n ** 3;
      accumulated_numerator += currentArea_numerator;

      if (currentArea_numerator > 0) {
        formatted_area_terms.push(
          formatFraction(`${i}<sup>2</sup>`, `${n}<sup>3</sup>`)
        );
      }

      const current_cumulative_string = formatted_area_terms.join(" + ");

      cumulativeArea_string.push(current_cumulative_string);
      cumulativeArea_values.push(accumulated_numerator / denominator);
    });

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
    // Se a condição for verdadeira, o valor de annotations é alterado
    if (n < 10) {
      annotations = x_rect.slice(0, -1).flatMap((xi, i) => {
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
      });
    } else {
      const layout = {
        title: "Parábola y = x²",
        annotations: ` `,
        showlegend: false,
        widthText: ` `,
        heightText: ` `,
        areaText: ` `,
        barmode: "overlay",
        // ... (outras configurações de layout)
      };
    }

    tableBodyData = x_rect.slice(0, -1).map((xi, i) => {
      const xFraction = formatFraction(i, n);
      const yFractionSquared = formatFraction(
        `(${i})<sup>2</sup>`,
        `(${n})<sup>2</sup>`
      );
      const accumulatedString = cumulativeArea_string[i] || "0";
      const approxValue = cumulativeArea_values[i]
        ? cumulativeArea_values[i].toFixed(8)
        : "0";

      const contentString = `
        <div class="an-sum">
          A<span class="subscript">n</span> = ${accumulatedString}
        </div>
        <div class="an-approx">
          A<span class="subscript">n</span> &asymp; ${approxValue}
        </div>
      `;
      return [i + 1, i, xFraction, yFractionSquared, contentString];
    });

    totalArea = cumulativeArea_values.pop().toFixed(8);
    error = (realTotalArea - totalArea).toFixed(8);
  } else {
    // Se n < 2, annotations já é um array vazio.
    totalArea = 0;
    error = (realTotalArea - totalArea).toFixed(8);
  }

  const layout = {
    title: "Parábola y = x²",
    annotations: annotations,
    showlegend: false,
    barmode: "overlay",
    autosize: true,
    width: plotDiv.offsetWidth * 0.8,
    height: plotDiv.offsetHeight * 0.8,
    margin: {
      l: 20,
      r: 20,
      t: 30,
      b: 20,
    },
    dragmode: "zoom",
  };
  
  Plotly.newPlot("plot", traces, layout);

    // ... (Resto do código para criar o gráfico e a tabela)
  Plotly.newPlot("plot", traces, layout);
  // ... (Tabela)
}
