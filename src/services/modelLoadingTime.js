export function modelLoadingTime(viewer, sceneModel) {
  const t0 = performance.now();
  document.getElementById("time").innerHTML = "Loading model...";
  sceneModel.on("loaded", function () {
    const t1 = performance.now();
    console.log(viewer.metaScene);
    document.getElementById("time").innerHTML =
      "Model loaded in " +
      Math.floor(t1 - t0) / 1000.0 +
      " seconds<br>Objects: " +
      sceneModel.numEntities;
  });
}
