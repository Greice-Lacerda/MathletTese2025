import { parabola } from "./graficoP2.js";

/**
 * Gera a tabela de áreas e o valor total.
 * A tabela exibe a área de cada retângulo sob a parábola y = x^2,
 * dividido em 'n' partes.
 * @param {number} n - O número de retângulos.
 */
export function generateTable(n) {
  const tabelaContainer = document.getElementById("tabela-container");
  tabelaContainer.innerHTML = ""; // Limpa o conteúdo anterior

  const a = 0;
  const b = 1;
  const bar_width = (b - a) / n;

  let tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Índice (k)</th>
          <th>Área (A_k)</th>
        </tr>
      </thead>
      <tbody>
  `;
  let totalArea = 0;

  for (let i = 0; i < n; i++) {
    const xi = a + i * bar_width;
    const yi = parabola([xi])[0];
    const area = yi * bar_width;

    tableHtml += `<tr><td>${i + 1}</td><td>${area.toFixed(10)}</td></tr>`;
    totalArea += area;
  }

  tableHtml += `
      </tbody>
      <tfoot>
        <tr>
          <td><b>Total</b></td>
          <td><b>${totalArea.toFixed(10)}</b></td>
        </tr>
      </tfoot>
    </table>
  `;

  tabelaContainer.innerHTML = tableHtml;
}
