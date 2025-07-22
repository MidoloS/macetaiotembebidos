"use client";

import React from "react";
import GaugeChart from "./GaugeChart";

interface LightHoursGaugeProps {
  value: number;
}

const LightHoursGauge: React.FC<LightHoursGaugeProps> = ({ value }) => {
  const sunIcon = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <GaugeChart
      value={value}
      maxValue={24}
      label="Horas de Luz"
      unit=" h"
      color="#f59e0b"
      icon={sunIcon}
    />
  );
};

export default LightHoursGauge;
