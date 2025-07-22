import HumidityGauge from "@/app/components/HumidityGauge";
import { LightHoursGauge, TemperatureGauge } from "@/app/components";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h3>Maceta IOT</h3>
      <Image
        src="/plant.png"
        width={350 / 2}
        height={612 / 2}
        alt="flower pot"
      />
      <HumidityGauge value={50} />
      <LightHoursGauge value={12} />
      <TemperatureGauge value={20} />
    </main>
  );
}
