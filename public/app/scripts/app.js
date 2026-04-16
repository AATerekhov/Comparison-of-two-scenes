(function bootstrapApp() {
  const viewer = window.ViewerFactory.createViewer();
  window.viewer = viewer;

  window.DefaultPointCloudLoader.load(viewer);

  window.addEventListener("error", (errorEvent) => {
    if (String(errorEvent.message || "").includes("point")) {
      window.StatusPanel.setStatus(
        "error",
        "Point cloud failed to load. Check the dataset path and browser console."
      );
    }
  });
})();
