import LightHoursGauge from "./components/LightHoursGauge";
import HumidityGauge from "./components/HumidityGauge";
import TemperatureGauge from "./components/TemperatureGauge";
import Image from "next/image";
import { calculateLowLightHours } from "./lib/helpers";
import { TimeChart } from "./components";
import { Suspense } from "react";

// Force dynamic rendering to avoid build-time fetch errors
export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(process.env.URL + "/plant/1/api");
  const data = await res.json();

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const points = Object.values(data || {}) as any[];

  console.log({ points });

  const last = points[points.length - 1];

  const { humidity = 0, temp = 0 } = last || {};

  const lowLightHours = calculateLowLightHours(points, 2000, 5);

  console.log({ lowLightHours });

  return (
    <div className="min-h-screen  bg-gray-100  flex justify-center">
      <div className="mx-auto h-full flex flex-col w-full">
        <div className="flex flex-col items-center justify-center bg-gray-50 w-full">
          <h1
            className="text-xl font-bold text-gray-800 text-center  flex-shrink-0 pt-12"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Maceta IOT
          </h1>
          <div className="flex justify-center relative top-12 flex-col items-center">
            <Image src="/plant.png" alt="logo" width={150} height={100} />
          </div>
        </div>

        <div className="flex gap-4 bg-gray-100 p-4 rounded-lg items-center justify-center mt-12 flex-col">
          <div className="flex flex-col items-center justify-center  w-full">
            <p className="text-gray-500 text-sm">Cuidando</p>
            <h2
              className="text-gray-800 text-xl font-bold"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Planta Interior
            </h2>
          </div>
          <div className="flex gap-4">
            <LightHoursGauge value={lowLightHours} />
            <HumidityGauge value={humidity} />
            <TemperatureGauge value={temp} />
          </div>
        </div>
        <div className="mt-12 mb-32">
          <Suspense
            fallback={
              <div className="h-40 w-full bg-gray-200 animate-pulse rounded"></div>
            }
          >
            <TimeChart data={points} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
