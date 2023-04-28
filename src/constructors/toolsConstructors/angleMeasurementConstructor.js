import { AngleMeasurementsPlugin } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function angleMeasurementConstructor(viewer) {
  const angleMeasurement  = new AngleMeasurementsPlugin(viewer, {});

  return angleMeasurement ;
}