import LightHoursGauge from "./components/LightHoursGauge";
import HumidityGauge from "./components/HumidityGauge";
import TemperatureGauge from "./components/TemperatureGauge";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen max-h-screen bg-gray-100 overflow-hidden flex justify-center">
      <div className="mx-auto h-full flex flex-col w-full">
        <div className="flex flex-col items-center justify-center bg-gray-50 w-full">
          <h1 className="text-xl font-bold text-gray-800 text-center  flex-shrink-0 pt-12">
            Maceta IOT
          </h1>
          <div className="flex justify-center relative top-12 flex-col items-center">
            <Image src="/plant.png" alt="logo" width={150} height={100} />
          </div>
        </div>

        <div className="flex gap-4 bg-gray-100 p-4 rounded-lg items-center justify-center mt-12 flex-col">
          <div className="flex flex-col items-center justify-center  w-full">
            <p className="text-gray-500 text-sm">Cuidando</p>
            <h2 className="text-gray-800 text-2xl font-bold">
              Planta Interior
            </h2>
          </div>
          <div className="flex gap-4">
            <LightHoursGauge value={7} />
            <HumidityGauge value={12} />
            <TemperatureGauge value={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
