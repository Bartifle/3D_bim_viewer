import {
  ContextMenu,
  DistanceMeasurementsPlugin,
} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function distanceMeasurementConstructor(viewer) {
  const distanceMeasurementsContextMenu = new ContextMenu({
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

  distanceMeasurementsContextMenu.on("hidden", () => {
    if (distanceMeasurementsContextMenu.context.distanceMeasurement) {
      distanceMeasurementsContextMenu.context.distanceMeasurement.setHighlighted(
        false
      );
    }
  });

  const distanceMeasurements = new DistanceMeasurementsPlugin(viewer, {});

  distanceMeasurements.on("mouseOver", (e) => {
    e.distanceMeasurement.setHighlighted(true);
  });

  distanceMeasurements.on("mouseLeave", (e) => {
    if (
      distanceMeasurementsContextMenu.shown &&
      distanceMeasurementsContextMenu.context.distanceMeasurement.id ===
        e.distanceMeasurement.id
    ) {
      return;
    }
    e.distanceMeasurement.setHighlighted(false);
  });

  distanceMeasurements.on("contextMenu", (e) => {
    distanceMeasurementsContextMenu.context = {
      // Must set context before showing menu
      viewer: viewer,
      distanceMeasurementsPlugin: distanceMeasurements,
      distanceMeasurement: e.distanceMeasurement,
    };
    distanceMeasurementsContextMenu.show(e.event.clientX, e.event.clientY);
    e.event.preventDefault();
  });

  return distanceMeasurements;
}
