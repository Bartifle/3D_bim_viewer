//* CONSTRUCTORS

// Main Constructors
import { viewerConstructor } from "./constructors/mainConstructors/viewerConstructor.js";
import { sceneModelConstructor } from "./constructors/mainConstructors/sceneModelConstructor.js";

// Tools Constructors
import { distanceMeasurementConstructor } from "./constructors/toolsConstructors/distanceMeasurementConstructor.js";
import { angleMeasurementConstructor } from "./constructors/toolsConstructors/angleMeasurementConstructor.js"

// ContextMenu Constructors
import { objectContextMenuConstructor } from "./constructors/contextMenuConstructors/objectContextMenuConstructor.js";
import { distanceMeasurementsContextMenuConstructor } from "./constructors/contextMenuConstructors/distanceMeasurementContextMenuConstructor.js"
import { angleMeasurementContextMenuConstructor} from "./constructors/contextMenuConstructors/angleMeasurementContextMenuConstructor.js"

// Other plugins Constructors
import { navCubeConstructor } from "./constructors/otherPluginsConstructors/navCubeConstructor.js";
import { treeViewConstructor } from "./constructors/otherPluginsConstructors/treeViewConstructor.js";

//* Controllers

import { mouseControls } from "./controllers/mouseControls.js"

//* Services
import { propertiesParser } from "./services/propertiesParser.js";
import { modelLoadingTime } from "./services/modelLoadingTime.js";

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