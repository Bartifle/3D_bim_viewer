import { ContextMenu } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";
export function angleMeasurementContextMenuConstructor() {
  const angleMeasurementContextMenu = new ContextMenu({
    items: [
      [
        {
          title: "Clear",
          doAction: function (context) {
            console.log(context)
            context.measurement.destroy();
          },
        },
      ],
      [
        {
          getTitle: (context) => {
            return context.measurement.labelsVisible
              ? "Hide Labels"
              : "Show Labels";
          },
          doAction: function (context) {
            context.measurement.labelsVisible =
              !context.measurement.labelsVisible;
          },
        },
      ],
      [
        {
          title: "Clear All",
          getEnabled: function (context) {
            return (
              Object.keys(context.angleMeasurementsPlugin.measurements)
                .length > 0
            );
          },
          doAction: function (context) {
            context.angleMeasurementsPlugin.clear();
          },
        },
      ],
    ],
  });

  angleMeasurementContextMenu.on("hidden", () => {
    if (angleMeasurementContextMenu.context.measurement) {
      angleMeasurementContextMenu.context.measurement.setHighlighted(false);
    }
  });

  return angleMeasurementContextMenu;
}
