import {
  TreeViewPlugin,
} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function treeViewConstructor(viewer) {
  const treeView = new TreeViewPlugin(viewer, {
    containerElement: document.getElementById("tree-view"),
    autoExpandDepth: 3, // Initially expand the root tree node
    hierarchy: "containment",
  });
  
  // Left-clicking on a tree node isolates that object in the 3D view
  
  treeView.on("nodeTitleClicked", (e) => {
    const scene = viewer.scene;
    const objectIds = [];
    e.treeViewPlugin.withNodeTree(e.treeViewNode, (treeViewNode) => {
      if (treeViewNode.objectId) {
        objectIds.push(treeViewNode.objectId);
      }
    });
    e.treeViewPlugin.unShowNode();
    scene.setObjectsXRayed(scene.objectIds, true);
    scene.setObjectsVisible(scene.objectIds, true);
    scene.setObjectsXRayed(objectIds, false);
    viewer.cameraFlight.flyTo(
      {
        aabb: scene.getAABB(objectIds),
        duration: 0.5,
      },
      () => {
        setTimeout(function () {
          scene.setObjectsVisible(scene.xrayedObjectIds, false);
          scene.setObjectsXRayed(scene.xrayedObjectIds, false);
        }, 500);
      }
    );
  });
  return treeView
}