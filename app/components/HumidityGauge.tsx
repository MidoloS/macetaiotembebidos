"use client";

import React from "react";
import GaugeChart from "./GaugeChart";
import Link from "next/link";

interface HumidityGaugeProps {
  value: number;
}

const HumidityGauge: React.FC<HumidityGaugeProps> = ({ value }) => {
  const dropletIcon = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="currentColor" />
    </svg>
  );

  return (
    <Link
      href={{
        query: {
          metric: "humidity",
        },
      }}
    >
      <GaugeChart
        value={value}
        maxValue={100}
        label="Humedad"
        unit="%"
        color="#3b82f6"
        icon={dropletIcon}
      />
    </Link>
  );
};

export default HumidityGauge;
