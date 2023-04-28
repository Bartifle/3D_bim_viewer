import { DistanceMeasurementsPlugin } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function distanceMeasurementConstructor(viewer) {
  const distanceMeasurement = new DistanceMeasurementsPlugin(viewer, {});

  return distanceMeasurement;
}
