function resetPage() {
  location.reload();
}

function parabola(x) {
  return x.map((xi) => xi ** 2);
}

function generatePlot() {
  const n = parseInt(document.getElementById("n-value").value);

  if (n >= 2) {
    const a = 0;
    const b = 1;
    const x_values = Array.from({ length: n }, (_, i) => i);
    const bar_width = (b - a) / n;

    const x_parabola = Array.from(
      { length: 400 },
      (_, i) => a + (i * (b - a)) / 399
    );
    const y_parabola = parabola(x_parabola);

    const x_rect = Array.from(
      { length: n + 1 },
      (_, i) => a + (i * (b - a)) / n
    );
    const y_rect = parabola(x_rect);
    const area_values = x_rect
      .slice(0, -1)
      .map((xi, i) => bar_width * y_rect[i]);

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

        const layout = {
      title: "Parábola y = x²",
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
    };

    Plotly.newPlot("plot", traces, layout);

    // Limpar a tabela anterior e criar a nova
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    ["n", "Área de cada retângulo"].forEach((text, index) => {
      const cell = headerRow.insertCell(index);
      cell.innerHTML = `<b>${text}</b>`;
    });

    const caption = document.createElement("caption");
    caption.innerHTML = "<h4>Tabela de Valores</h4>";
    table.appendChild(caption);

    const body = table.createTBody();
    x_values.forEach((_, i) => {
      const row = body.insertRow(i);
      [i + 1, area_values[i].toFixed(10)].forEach((value, j) => {
        const cell = row.insertCell(j);
        cell.innerText = value;
      });
    });

    const totalArea = area_values.reduce((a, b) => a + b, 0).toFixed(10);
    const realTotalArea = (1 / 3).toFixed(10);
    const error = (realTotalArea - totalArea).toFixed(10);

    const summaryData = [
      ["Área Real sob a Curva", realTotalArea],
      ["Área por Retângulos", totalArea],
      ["Erro", error],
    ];

    summaryData.forEach((rowInfo) => {
      const row = body.insertRow();
      rowInfo.forEach((value) => {
        const cell = row.insertCell();
        cell.innerHTML = `<strong>${value}</strong>`;
      });
    });

    tableContainer.appendChild(table);
  } else {
    alert("n = 1 não gera retângulo. A área é igual a zero.");

    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    ["n", "Área de cada retângulo"].forEach((text, index) => {
      const cell = headerRow.insertCell(index);
      cell.innerHTML = `<b>${text}</b>`;
    });

    const body = table.createTBody();
    const row = body.insertRow(0);
    [1, 0].forEach((value, j) => {
      const cell = row.insertCell(j);
      cell.innerText = value;
    });

    tableContainer.appendChild(table);
  }
}
