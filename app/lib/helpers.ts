export function calculateLowLightHours(
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  readings: any[],
  lightThreshold: number,
  minutesPerReading: number
) {
  // Get the current date and set the time to the beginning of the day (00:00:00)
  // for accurate day-to-day comparison.
  // For demonstration purposes, we will use the date from the sample data (July 22, 2025).
  // In a real application, you would use 'now'.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  console.log(
    `Filtering for date range: ${startOfDay.toISOString()} to ${endOfDay.toISOString()}`
  );

  // 1. Filter readings to get only those from the current day.
  const readingsToday = readings.filter((reading) => {
    const readingDate = new Date(reading.createdAt);
    return readingDate >= startOfDay && readingDate < endOfDay;
  });

  console.log("Readings from today:", readingsToday);

  // 2. From today's readings, filter for those with light < threshold.
  const lowLightReadings = readingsToday.filter(
    (reading) => reading.light < lightThreshold
  );

  console.log(`Found ${lowLightReadings.length} low-light readings.`);

  // 3. Calculate the total duration in hours.
  const lowLightMinutes = lowLightReadings.length * minutesPerReading;
  const lowLightHours = lowLightMinutes / 60;

  // take 2 decimals
  return Math.round(lowLightHours * 100) / 100;
}
