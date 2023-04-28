import { WebIFCLoaderPlugin } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function sceneModelConstructor(viewer) {
  const ifcLoader = new WebIFCLoaderPlugin(viewer, {
    //wasmPath: "../dist/" // <<------- Path to web-ifc.wasm, which does the IFC parsing for us
    wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/",
  });

  const sceneModel = ifcLoader.load({
    id: "myModel",
    src: "test_models/Duplex.ifc",
    loadMetadata: true, // Default
  });

  return sceneModel;
}
