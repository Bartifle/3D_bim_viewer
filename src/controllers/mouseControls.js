export function mouseControls(viewer, objectContextMenu, treeView) {
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
}
