"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  color: string;
  icon: React.ReactNode;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue,
  label,
  unit,
  color,
  icon,
}) => {
  const percentage = (value / maxValue) * 100;

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#e5e7eb"],
        borderWidth: 0,
        cutout: "80%",
        borderRadius: 100,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: 0,
    circumference: 360,
    elements: {
      arc: {
        borderWidth: 0,
        borderRadius: 100,
      },
    },
    animation: {
      duration: 400,
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative max-w-40 max-h-40">
        <Doughnut data={data} options={options} width={80} height={80} />
        <div className=" flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="absolute top-[18%] left-[32%]" style={{ color }}>
              {icon}
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{label}</h3>
            <div className="text-2xl font-bold text-gray-800">
              {value}
              <span className="text-xs font-normal">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
