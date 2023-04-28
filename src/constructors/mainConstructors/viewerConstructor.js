import {
  Viewer,
} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

export function viewerConstructor() {
  const viewer = new Viewer({
    canvasId: "myCanvas",
    transparent: true,
  });
  
  viewer.camera.eye = [-3.933, 2.855, 27.018];
  viewer.camera.look = [4.4, 3.724, 8.899];
  viewer.camera.up = [-0.018, 0.999, 0.039];

  return viewer
}