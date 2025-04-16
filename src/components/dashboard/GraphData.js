import React from "react";
import {ResponsiveContainer, PieChart, Tooltip, Pie, Cell, BarChart, XAxis, YAxis, CartesianGrid, Bar, Legend} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FF8042"]; // You can add more if needed

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function GraphData({
  studentCount,
  facultyCount,
  adminCount,
  professionals,
  entrepreneurs,
  studenTitle,
  facultyTitle,
  adminTitle,
  chartType
}) {

 
  const data = [
    { name: studenTitle || "Students", value: studentCount },
    { name: facultyTitle || "Professionals", value: facultyCount || professionals },
    { name: adminTitle || "Entrepreneurs", value: adminCount || entrepreneurs },
  ];

  if(chartType == "pie")
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  ); else {
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
        {/* Bar Chart */}
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
