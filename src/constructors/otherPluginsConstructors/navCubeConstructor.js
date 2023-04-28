import {
  NavCubePlugin,
} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function navCubeConstructor(viewer) {
  return new NavCubePlugin(viewer, {
    canvasId: "myNavCubeCanvas",
    visible: true,
    shadowVisible: false
  });
}