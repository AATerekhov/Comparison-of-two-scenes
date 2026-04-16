window.ViewerFactory = (function createViewerFactory() {
  function createViewer() {
    const container = document.getElementById(window.AppConfig.viewer.containerId);
    const viewer = new Potree.Viewer(container);

    viewer.setEDLEnabled(window.AppConfig.viewer.enableEDL);
    viewer.setFOV(window.AppConfig.viewer.fov);
    viewer.setPointBudget(window.AppConfig.viewer.pointBudget);
    viewer.setMinNodeSize(window.AppConfig.viewer.minNodeSize);
    viewer.setBackground(window.AppConfig.viewer.background);
    viewer.loadSettingsFromURL();
    viewer.setDescription(window.AppConfig.ui.description);

    viewer.loadGUI(() => {
      viewer.setLanguage(window.AppConfig.ui.language);
      viewer.toggleSidebar();
    });

    return viewer;
  }

  return {
    createViewer,
  };
})();
