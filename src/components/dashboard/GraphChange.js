import React from "react";

function GraphChange({ chartType, setChartType }) {
  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <label style={{ marginRight: "10px" }}>Select Chart Type:</label>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
    </div>
  );
}

export default GraphChange;