import React from "react";

function GraphChange({ chartType, setChartType }) {
  return (
    <div style={{ marginBottom: "20px", display: 'flex', alignItems: 'center', gap:'10px'}}>
      <label style={{whiteSpace: 'nowrap', fontSize:'14px', float: 'left', }}><b>Select Chart Type:</b></label>
      <select className="form-select"  value={chartType} onChange={(e) => setChartType(e.target.value)}
         style={{ maxWidth: "200px" }}>
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
    </div>
  );
}

export default GraphChange;