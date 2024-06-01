import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ExpensesChart({ data }) {
  const pieColors = [
    "#A91D3A",
    "#151515",
    "#C73659",
    "#EEEEEE",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  // Extracting only the description field from data
  const expensesData = data.map((expense) => ({
    name: expense.description,
    percent: expense.amount,
  }));

  return (
    <ResponsiveContainer width="90%" height={1000}>
      <PieChart width={1000} height={1000}>
        <Pie
          data={expensesData}
          dataKey="percent"
          nameKey="name"
          isAnimationActive={true}
          cx="50%"
          cy="50%"
          outerRadius={300}
          fill="#8884d8"
          label
        >
          {expensesData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pieColors[index % pieColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
}
