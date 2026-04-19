import { Potree } from "../vendor/potree-runtime.js";

export function createViewer(appConfig, container, options = {}) {
  const viewer = new Potree.Viewer(container);

  viewer.setEDLEnabled(appConfig.viewer.enableEDL);
  viewer.setFOV(appConfig.viewer.fov);
  viewer.setPointBudget(appConfig.viewer.pointBudget);
  viewer.setMinNodeSize(appConfig.viewer.minNodeSize);

  viewer.setBackground(options.background ?? appConfig.viewer.background);

  viewer.loadSettingsFromURL();
  viewer.setDescription(appConfig.ui.description);

  if (options.withGUI) {
    viewer.loadGUI(() => {
      viewer.setLanguage(appConfig.ui.language);
      viewer.toggleSidebar();
    });
  }
  
  return viewer;
}
