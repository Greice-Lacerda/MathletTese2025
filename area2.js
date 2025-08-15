// Função auxiliar para formatar a fração em HTML com CSS
function formatFraction(numerator, denominator) {
  // Usa flexbox para empilhar o numerador e o denominador
  return `<span style="display:inline-flex; flex-direction:column; vertical-align:middle; font-size:1em; margin:0 5px;">
              <span style="text-align:center; line-height:1;">${numerator}</span>
              <span style="border-top:1px solid black; text-align:center; line-height:1;">${denominator}</span>
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

function resetPage() {
  location.reload();
}

function parabola(x) {
  return x.map((xi) => xi ** 2);
}

function generatePlot() {
  const n = parseInt(document.getElementById("n-value").value);
  const a = 0;
  const b = 1;
  const tableContainer = document.getElementById("tabela-container");
  tableContainer.innerHTML = ""; // Limpa a tabela no início

  const x_parabola = Array.from(
    { length: 400 },
    (_, i) => a + (i * (b - a)) / 399
  );
  const y_parabola = parabola(x_parabola);

  let traces;
  let annotations;
  let tableBodyData = []; // Inicializa com array vazio
  let totalArea = 0;
  let realTotalArea = (1 / 3).toFixed(10);
  let error = realTotalArea;

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
        formatted_area_terms.push(`(${formatAreaTerm(i, n)})`);
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
        name: `Area_${i} = ${area_values[i].toFixed(10)}`,
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

    // Configuração das anotações do gráfico (retornando à versão anterior)
    annotations =
      n <= 30
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
                font: { size: 14 },
                textangle: -90,
              },
              {
                x: xi + bar_width - 0.01,
                y: y_rect[i] / 2,
                text: heightText,
                showarrow: false,
                xanchor: "right",
                yanchor: "middle",
                font: { size: 14 },
                textangle: -90,
              },
              {
                x: xi + bar_width / 2,
                y: y_rect[i],
                text: areaText,
                showarrow: false,
                xanchor: "center",
                yanchor: "top",
                font: { size: 22, color: "white" },
              },
            ];
          })
        : [];

    tableBodyData = x_rect.slice(0, -1).map((xi, i) => {
      const xFraction = formatFraction(i, n);
      const yFractionSquared = formatFraction(
        `${i}<sup><small>2</small></sup>`,
        `${n}<sup><small>2</small></sup>`
      );
      const accumulatedString = cumulativeArea_string[i] || "0";
      const approxValue = cumulativeArea_values[i]
        ? cumulativeArea_values[i].toFixed(10)
        : "0";

      const contentString = `<div style="white-space:nowrap;">A(${
        i + 1
      }) = ${accumulatedString}</div><div>A(${
        i + 1
      }) &asymp; ${approxValue}</div>`;

      return [i + 1, i, xFraction, yFractionSquared, contentString];
    });

    totalArea = cumulativeArea_values.pop().toFixed(10);
    error = (realTotalArea - totalArea).toFixed(10);
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
    totalArea = 0;
    error = (realTotalArea - totalArea).toFixed(10);
  }

  const layout = {
    title: "Parábola y = x²",
    annotations: annotations,
    showlegend: false,
    barmode: "overlay",
    autosize: true,
    width: document.getElementById("plot").offsetWidth * 0.95,
    height: document.getElementById("plot").offsetWidth * 0.95,
    margin: {
      l: 50,
      r: 50,
      t: 60,
      b: 70,
    },
  };

  Plotly.newPlot("plot", traces, layout);

  if (n >= 2) {
    const table = document.createElement("table");
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    ["Partes", "Retângulos", "x<sub>i</sub>", "y<sub>i</sub>", "A(n)"].forEach(
      (text, index) => {
        const cell = headerRow.insertCell(index);
        // Alinha a coluna "A(n)" (índice 4) à esquerda e adiciona padding
        if (index === 4) {
          cell.style.textAlign = "left";
          cell.style.paddingLeft = "25px";
        }
        cell.innerHTML = `<b>${text}</b>`;
      }
    );

    const caption = document.createElement("caption");
    caption.innerHTML = "<h3>Tabela de Valores</h3>";
    table.appendChild(caption);

    const body = table.createTBody();
    tableBodyData.forEach((rowInfo) => {
      const row = body.insertRow();
      rowInfo.forEach((value, j) => {
        const cell = row.insertCell(j);
        cell.innerHTML = value;

        // Aplica estilos com base no índice da coluna (j)
        if (j === 2) {
          // Coluna x_i
          cell.style.textAlign = "left";
          cell.style.paddingLeft = "20px";
          cell.style.paddingRight = "20px";
        } else if (j === 3) {
          // Coluna y_i
          cell.style.textAlign = "left";
          cell.style.paddingLeft = "20px";
          cell.style.paddingRight = "20px";
        } else if (j === 4) {
          // Coluna A(n)
          cell.style.textAlign = "left";
          cell.style.paddingLeft = "30px";
        }
      });
    });

    const summaryData = [
      ["<u>COMPARAÇAO DAS ÁREAS ", "<u>VALORES"],
      ["Área Real sob a Curva", realTotalArea],
      ["Área por Retângulos", totalArea],
      ["Erro", error],
    ];

    summaryData.forEach((rowInfo) => {
      const row = body.insertRow();

      // Cria a primeira célula com o texto de descrição e define o colspan para 4
      const descriptionCell = row.insertCell();
      descriptionCell.innerHTML = `<strong>${rowInfo[0]}</strong>`;
      descriptionCell.colSpan = 4;
      descriptionCell.style.fontSize = "18px";
      descriptionCell.style.textAlign = "left";
      descriptionCell.style.paddingLeft = "30px";
      descriptionCell.style.fontWeight = "bold";
      descriptionCell.style.paddingTop = "10px";

      // Cria a segunda célula com o valor e aplica os mesmos estilos da coluna A(n)
      const valueCell = row.insertCell();
      valueCell.innerHTML = `<strong>${rowInfo[1]}<\strong>`;
      valueCell.style.textAlign = "left";
      valueCell.style.fontSize = "18px";
      valueCell.style.paddingLeft = "30px";
      valueCell.style.fontWeight = "bold";
      valueCell.style.paddingTop = "10px";
    });

    tableContainer.appendChild(table);
  }
}
