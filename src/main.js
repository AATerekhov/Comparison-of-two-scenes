import { appConfig } from "./config/app-config.js";
import { getAppDom } from "./core/dom.js";
import { createStatusPanel } from "./core/status-panel.js";
import { createDefaultPointCloudLoader } from "./pointclouds/default-pointcloud-loader.js";
import { createViewer } from "./viewer/viewer-factory.js";
import { setupDivider } from "./viewer/setup-divider.js";

function bootstrapApp() {
  const appDom = getAppDom();
  const statusPanel = createStatusPanel(appDom);
  const pointCloudLoader = createDefaultPointCloudLoader({ appConfig, statusPanel });
  const viewerLeft = createViewer(appConfig, appDom.left);
  const viewerRight = createViewer(appConfig, appDom.right);

  pointCloudLoader.load(viewerLeft);
  pointCloudLoader.load(viewerRight);

  setupDivider();
  
  //const syncService = createCameraSyncService(viewerLeft, viewerRight);
  //createSyncToggleController(dom.syncToggleButton, syncService);

  globalThis.addEventListener("error", (errorEvent) => {
    if (String(errorEvent.message || "").includes("point")) {
      statusPanel.setStatus(
        "error",
        "Point cloud failed to load. Check the dataset path and browser console."
      );
    }
  });
}

bootstrapApp();
