import {
  WebIFCLoaderPlugin,
  TreeViewPlugin,
  ContextMenu,
} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

import { propertiesParser } from "./services/properties_parser.js";
import { distanceMeasurementConstructor } from "./constructors/distanceMeasurementConstructor.js";
import { viewerConstructor } from "./constructors/viewerConstructor.js";
import { navCubeConstructor } from "./constructors/navCubeConstructor.js";

const viewer = viewerConstructor();
const distanceMeasurements = distanceMeasurementConstructor(viewer);
navCubeConstructor(viewer);

const rulerCheckbox = document.getElementById("ruler-check-button")
rulerCheckbox.addEventListener("change", function(e) {
  if(e.target.checked){
    distanceMeasurements.control.activate();
  } else {
    distanceMeasurements.control.deactivate();
  }
})

//------------------------------------------------------------------------------------------------------------------
// Create an DistanceMeasurementsPlugin, activate its DistanceMeasuremntsControl
//------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------
// Create two ContextMenus - one for right-click on empty space, the other for right-click on an Entity
//------------------------------------------------------------------------------------------------------------------

//context, viewer, metaScene, metaObjects, ID,
// type
//

const objectContextMenu = new ContextMenu({
  items: [
    [
      {
        title: "Properties",
        doAction: function (context) {
          console.log(context.viewer.metaScene.metaObjects[context.entity.id].propertySets)
          propertiesParser(
            context.viewer.metaScene.metaObjects[context.entity.id].propertySets
          );
        },
      },
    ],
  ],
  enabled: true,
});

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

const ifcLoader = new WebIFCLoaderPlugin(viewer, {
  //wasmPath: "../dist/" // <<------- Path to web-ifc.wasm, which does the IFC parsing for us
  wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/",
});

const sceneModel = ifcLoader.load({
  id: "myModel",
  src: "test_models/Duplex.ifc",
  loadMetadata: true, // Default
});

const t0 = performance.now();
document.getElementById("time").innerHTML = "Loading model...";
sceneModel.on("loaded", function () {
  const t1 = performance.now();
  console.log(viewer.metaScene)
  document.getElementById("time").innerHTML =
    "Model loaded in " +
    Math.floor(t1 - t0) / 1000.0 +
    " seconds<br>Objects: " +
    sceneModel.numEntities;
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

window.viewer = viewer;
