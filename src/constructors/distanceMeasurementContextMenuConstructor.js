import { ContextMenu } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function distanceMeasurementsContextMenuConstructor() {
  const distanceMeasurementContextMenu = new ContextMenu({
    items: [
      [
        {
          title: "Clear",
          doAction: function (context) {
            context.distanceMeasurement.destroy();
          },
        },
        {
          getTitle: (context) => {
            return context.distanceMeasurement.axisVisible
              ? "Hide Axis"
              : "Show Axis";
          },
          doAction: function (context) {
            context.distanceMeasurement.axisVisible =
              !context.distanceMeasurement.axisVisible;
          },
        },
        {
          getTitle: (context) => {
            return context.distanceMeasurement.labelsVisible
              ? "Hide Labels"
              : "Show Labels";
          },
          doAction: function (context) {
            context.distanceMeasurement.labelsVisible =
              !context.distanceMeasurement.labelsVisible;
          },
        },
      ],
      [
        {
          title: "Clear All",
          getEnabled: function (context) {
            return (
              Object.keys(context.distanceMeasurementsPlugin.measurements)
                .length > 0
            );
          },
          doAction: function (context) {
            context.distanceMeasurementsPlugin.clear();
          },
        },
      ],
    ],
  });

  distanceMeasurementContextMenu.on("hidden", () => {
    if (distanceMeasurementContextMenu.context.distanceMeasurement) {
      distanceMeasurementContextMenu.context.distanceMeasurement.setHighlighted(
        false
      );
    }
  });

  return distanceMeasurementContextMenu;
}
