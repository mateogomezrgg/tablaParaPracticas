function copyTable() {
  const table = document.getElementById("dataTable");
  const rows = table.rows;

  let tableText = "";
  const colWidths = [];

  // Determina el ancho máximo de cada columna
  for (let i = 0; i < rows[0].cells.length; i++) {
    colWidths[i] = 0;
  }

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    for (let j = 0; j < cells.length; j++) {
      colWidths[j] = Math.max(colWidths[j], cells[j].innerText.length);
    }
  }

  // Añade una fila de separadores
  tableText += "+";
  for (let i = 0; i < colWidths.length; i++) {
    tableText += "-".repeat(colWidths[i] + 2) + "+";
  }
  tableText += "\n";

  // Añade las filas de datos
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    tableText += "|";
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].innerText;
      tableText += " " + cellText.padEnd(colWidths[j], " ") + " |";
    }
    tableText += "\n";

    // Añade una fila de separadores después de cada fila
    tableText += "+";
    for (let j = 0; j < colWidths.length; j++) {
      tableText += "-".repeat(colWidths[j] + 2) + "+";
    }
    tableText += "\n";
  }

  // Crea un textarea temporal para copiar el contenido de la tabla
  const tempElement = document.createElement("textarea");
  tempElement.style.position = "fixed";
  tempElement.style.top = "0";
  tempElement.style.left = "0";
  tempElement.style.width = "2em";
  tempElement.style.height = "2em";
  tempElement.style.padding = "0";
  tempElement.style.border = "none";
  tempElement.style.outline = "none";
  tempElement.style.boxShadow = "none";
  tempElement.style.background = "transparent";
  tempElement.value = tableText;

  document.body.appendChild(tempElement);
  tempElement.select();

  try {
    document.execCommand("copy");
    alert("Tabla copiada al portapapeles");
  } catch (err) {
    alert("Error al copiar la tabla");
  }

  document.body.removeChild(tempElement);

  // Muestra el contenido copiado en el área de texto
  const tableTextArea = document.getElementById("tableText");
  tableTextArea.value = tableText;
}
