"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useSearchParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale
);

interface TimeChartProps {
  data: { temp: number; light: number; humidity: number; createdAt: string }[];
}

const TimeChart = ({ data }: TimeChartProps) => {
  // read metric from query param
  const searchParams = useSearchParams();
  const metric = searchParams.get("metric") || "temp";

  const formattedData = data.map((item) => {
    const rawValue = Number(item[metric as keyof typeof item]);
    const yValue = metric === "light" ? rawValue * 0.0048828125 : rawValue;

    return {
      x: new Date(item.createdAt),
      y: Math.round(yValue),
    };
  });

  // Get color based on metric
  const getColor = (metric: string) => {
    switch (metric) {
      case "light":
        return "#f59e0b";
      case "humidity":
        return "#3b82f6";
      case "temp":
      default:
        return "#f97316";
    }
  };

  const color = getColor(metric);

  const chartData = {
    datasets: [
      {
        data: formattedData,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 1,
        pointHoverRadius: 6,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#6b7280",
        bodyColor: "#111827",
        borderWidth: 0,
        displayColors: false,
        titleFont: {
          size: 12,
          weight: "normal" as const,
        },
        bodyFont: {
          size: 16,
          weight: "bold" as const,
        },
        callbacks: {
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          title: function (context: any) {
            const date = new Date(context[0].parsed.x);
            return date.toLocaleString("es-ES", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          },
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          label: function (context: any) {
            const units = {
              temp: "°C",
              humidity: "%",
              light: " Lumens",
            };
            return `${context.parsed.y}${
              units[metric as keyof typeof units] || ""
            }`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        display: true,
        time: {
          unit: "hour" as const,
          stepSize: 6,
          displayFormats: {
            hour: "E", // L, M, M, J, V, S, D (shows day for each 6-hour interval)
          },
        },
        grid: {
          display: true,
          color: "#e5e7eb",
          borderWidth: 1,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 13,
            weight: "bold" as const,
          },
          maxTicksLimit: 7,
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          callback: function (value: any, index: any, ticks: any) {
            const date = new Date(value);
            const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]; // Domingo, Lunes, Martes, Miércoles, Jueves, Viernes, Sábado

            // Only show label if it's the first tick or if the day changed from previous tick
            if (index === 0) return dayNames[date.getDay()];

            const prevDate = new Date(ticks[index - 1].value);
            const currentDay = date.getDay();
            const prevDay = prevDate.getDay();

            return currentDay !== prevDay ? dayNames[currentDay] : "";
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: color,
      },
    },
  };

  return (
    <div className="h-40 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeChart;
