import { appConfig } from "./config/app-config.js";
import { getAppDom } from "./core/dom.js";
import { createStatusPanel } from "./core/status-panel.js";
import { createDefaultPointCloudLoader } from "./pointclouds/default-pointcloud-loader.js";
import { createViewer } from "./viewer/viewer-factory.js";
import { setupDivider } from "./viewer/setup-divider.js";
import { createCameraSyncService } from "./sync/camera-sync-service.js";
import { createSyncToggleController } from "./sync/sync-toggle-controller.js";

function bootstrapApp() {
  const appDom = getAppDom();
  const statusPanel = createStatusPanel(appDom);
  const pointCloudLoader = createDefaultPointCloudLoader({ appConfig, statusPanel });
  const viewerLeft = createViewer(appConfig, appDom.left, { withGUI: true });
  const viewerRight = createViewer(appConfig, appDom.right, { withGUI: false });

  pointCloudLoader.load(viewerLeft);
  pointCloudLoader.load(viewerRight);

  setupDivider({
    divider: appDom.divider,
    leftPane: appDom.left,
    rightPane: appDom.right,
  });
  
  const cameraSyncService = createCameraSyncService(viewerLeft, viewerRight, {
    enabled: true,
  });

  createSyncToggleController({
    button: appDom.syncToggle,
    stateLabel: appDom.syncState,
    syncService: cameraSyncService,
  });

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
