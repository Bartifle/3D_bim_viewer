export function mouseControls(
  viewer,
  objectContextMenu,
  distanceMeasurementContextMenu,
  angleMeasurementContextMenu,
  treeView,
  distanceMeasurement,
  angleMeasurement
) {
  //* Viewer mouse control

  // Right clic control (context menu)
  viewer.cameraControl.on("rightClick", function (e) {
    var hit = viewer.scene.pick({
      canvasPos: e.canvasPos,
    });

    if (hit && hit.entity.isObject) {
      objectContextMenu.context = {
        // Must set context before showing menu
        viewer: viewer,
        treeViewPlugin: treeView,
        entity: hit.entity,
      };

      objectContextMenu.show(e.pagePos[0], e.pagePos[1]);
    }

    e.event.preventDefault();
  });

  // Hover control (highlight)
  let lastEntity = null;
  viewer.cameraControl.on("hover", function (pickResult) {
    if (pickResult) {
      if (!lastEntity || pickResult.entity.id !== lastEntity.id) {
        if (lastEntity) {
          lastEntity.highlighted = false;
        }

        lastEntity = pickResult.entity;
        pickResult.entity.highlighted = true;
      }
    } else {
      if (lastEntity) {
        lastEntity.highlighted = false;
        lastEntity = null;
      }
    }
  });

  //* Distance measurement button click control

  // Behaviour when ruller button is pressed
  const distanceMeasurementCheckbox =
    document.getElementById("ruler-check-button");
  distanceMeasurementCheckbox.addEventListener("change", function (e) {
    if (e.target.checked) {
      distanceMeasurement.control.activate();
    } else {
      distanceMeasurement.control.deactivate();
    }
  });

  //* Angle measurement button click control

  // Behaviour when angle button is pressed
  const angleMeasurementCheckbox =
    document.getElementById("angle-check-button");
    angleMeasurementCheckbox.addEventListener("change", function (e) {
    if (e.target.checked) {
      angleMeasurement.control.activate();
    } else {
      angleMeasurement.control.deactivate();
    }
  });

  //* Controls distance context menu 

  // Behaviour when Context menu is shown
  distanceMeasurement.on("contextMenu", (e) => {
    distanceMeasurementContextMenu.context = {
      // Must set context before showing menu
      viewer: viewer,
      distanceMeasurementsPlugin: distanceMeasurement,
      distanceMeasurement: e.distanceMeasurement,
    };
    distanceMeasurementContextMenu.show(e.event.clientX, e.event.clientY);
    e.event.preventDefault();
  });

  //* Controls the behaviour of the mouse when over or not over traced distances

  // Mouse over
  distanceMeasurement.on("mouseOver", (e) => {
    e.distanceMeasurement.setHighlighted(true);
  });

  // Mouse leave
  distanceMeasurement.on("mouseLeave", (e) => {
    if (
      distanceMeasurementContextMenu.shown &&
      distanceMeasurementContextMenu.context.distanceMeasurement.id ===
        e.distanceMeasurement.id
    ) {
      return;
    }
    e.distanceMeasurement.setHighlighted(false);
  });

  //* Controls angle context menu

  // Behaviour when Context menu is shown
  angleMeasurement.on("contextMenu", (e) => {
    angleMeasurementContextMenu.context = { // Must set context before showing menu
        viewer: viewer,
        angleMeasurementsPlugin: angleMeasurement,
        measurement: e.measurement
    };
    angleMeasurementContextMenu.show(e.event.clientX, e.event.clientY);
    e.event.preventDefault();

  //* Controls the behaviour of the mouse when over or not over traced angles

  // Mouse over
  angleMeasurement.on("mouseOver", (e) => {
    e.measurement.setHighlighted(true);
  });

  // Mouse leave
  angleMeasurement.on("mouseLeave", (e) => {
    e.measurement.setHighlighted(false);
  });

  
});
}
