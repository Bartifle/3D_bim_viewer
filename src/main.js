import { propertiesParser } from "./services/propertiesParser.js";
import { modelLoadingTime } from "./services/modelLoadingTime.js"
import { distanceMeasurementConstructor } from "./constructors/distanceMeasurementConstructor.js";
import { viewerConstructor } from "./constructors/viewerConstructor.js";
import { navCubeConstructor } from "./constructors/navCubeConstructor.js";
import { treeViewConstructor } from "./constructors/treeViewConstructor.js";
import { objectContextMenuConstructor } from "./constructors/objectContextMenuConstructor.js";
import { mouseControls } from "./controllers/mouseControls.js"
import { sceneModelConstructor } from "./constructors/sceneModelConstructor.js";

const viewer = viewerConstructor();
const treeView = treeViewConstructor(viewer);
const objectContextMenu = objectContextMenuConstructor(propertiesParser);
const sceneModel = sceneModelConstructor(viewer);

distanceMeasurementConstructor(viewer);
navCubeConstructor(viewer);
mouseControls(viewer, objectContextMenu, treeView);

modelLoadingTime(viewer, sceneModel);

window.viewer = viewer;
