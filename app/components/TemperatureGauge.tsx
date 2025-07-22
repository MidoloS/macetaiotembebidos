"use client";

import React from "react";
import GaugeChart from "./GaugeChart";
import Link from "next/link";

interface TemperatureGaugeProps {
  value: number;
}

const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({ value }) => {
  const thermometerIcon = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" />
    </svg>
  );

  return (
    <Link
      href={{
        query: {
          metric: "temp",
        },
      }}
    >
      <GaugeChart
        value={value}
        maxValue={50}
        label="Temperatura"
        unit="°C"
        color="#f97316"
        icon={thermometerIcon}
      />
    </Link>
  );
};

export default TemperatureGauge;
