import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ScatterPlotProps {
  data: { x: number; y: number }[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: "Scatter Data",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions: ChartOptions<"scatter"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "X Axis",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y Axis",
        },
      },
    },
  };

  return (
    <div style={{ width: "500px", margin: "20px auto" }}>
      <Scatter data={chartData} options={chartOptions} />
    </div>
  );
};

export default ScatterPlot;
