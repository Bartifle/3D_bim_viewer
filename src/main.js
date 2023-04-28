import { propertiesParser } from "./services/propertiesParser.js";
import { modelLoadingTime } from "./services/modelLoadingTime.js"

import { distanceMeasurementConstructor } from "./constructors/distanceMeasurementConstructor.js";
import { distanceMeasurementsContextMenuConstructor } from "./constructors/distanceMeasurementContextMenuConstructor.js"
import { angleMeasurementConstructor } from "./constructors/angleMeasurementConstructor.js"
import { angleMeasurementContextMenuConstructor} from "./constructors/angleMeasurementContextMenuConstructor.js"

import { viewerConstructor } from "./constructors/viewerConstructor.js";
import { navCubeConstructor } from "./constructors/navCubeConstructor.js";
import { treeViewConstructor } from "./constructors/treeViewConstructor.js";
import { objectContextMenuConstructor } from "./constructors/objectContextMenuConstructor.js";
import { mouseControls } from "./controllers/mouseControls.js"
import { sceneModelConstructor } from "./constructors/sceneModelConstructor.js";

const viewer = viewerConstructor();
const treeView = treeViewConstructor(viewer);
const objectContextMenu = objectContextMenuConstructor(propertiesParser);
const distanceMeasurement = distanceMeasurementConstructor(viewer);
const distanceMeasurementContextMenu = distanceMeasurementsContextMenuConstructor();
const angleMeasurement = angleMeasurementConstructor(viewer);
const angleMeasurementContextMenu = angleMeasurementContextMenuConstructor()
const sceneModel = sceneModelConstructor(viewer);

navCubeConstructor(viewer);
mouseControls(viewer, objectContextMenu, distanceMeasurementContextMenu, angleMeasurementContextMenu, treeView, distanceMeasurement, angleMeasurement );

modelLoadingTime(viewer, sceneModel);

window.viewer = viewer;

//TODO : Make that you can't select more than one utility, css and js.
//TODO : Add plane utility