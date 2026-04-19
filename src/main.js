import { appConfig } from "./config/app-config.js";
import { getAppDom } from "./core/dom.js";
import { createStatusPanel } from "./core/status-panel.js";
import { createDefaultPointCloudLoader } from "./pointclouds/default-pointcloud-loader.js";
import { createViewer } from "./viewer/viewer-factory.js";
import { setupDivider } from "./viewer/divider/setup-divider.js";
import { createCameraSyncService } from "./sync/camera-sync-service.js";
import { createSyncToggleController } from "./sync/sync-toggle-controller.js";
import { createPointCloudRenderModeService } from "./pointclouds/render-mode/pointcloud-render-mode-service.js";
import { compareElevationIntensityMode } from "./pointclouds/render-mode/contracts/pointcloud-render-mode-contracts.js";
import { createRenderModeToggleController } from "./ui/render-mode-toggle-controller.js";
import { debugDeclaredAttributes } from "./viewer/debug-intensity-values.js";

async function bootstrapApp() {
  const appDom = getAppDom();
  const statusPanel = createStatusPanel(appDom);
  const pointCloudLoader = createDefaultPointCloudLoader({ appConfig, statusPanel });

  const viewerLeft = createViewer(appConfig, appDom.left, { withGUI: true, background: "gradient"});
  const viewerRight = createViewer(appConfig, appDom.right, { withGUI: false, background: "black" });

  const leftPointCloud = await pointCloudLoader.load(viewerLeft);
  const rightPointCloud = await pointCloudLoader.load(viewerRight);

  debugDeclaredAttributes(rightPointCloud, "RIGHT");

  setupDivider({
    divider: appDom.divider,
    leftPane: appDom.left,
    rightPane: appDom.right,
    viewerShell: appDom.viewerShell,
  });
  
  const cameraSyncService = createCameraSyncService(viewerLeft, viewerRight, {
    enabled: true,
  });

  createSyncToggleController({
    button: appDom.syncToggle,
    stateLabel: appDom.syncState,
    syncService: cameraSyncService,
  });

  const renderModeService = createPointCloudRenderModeService({
    leftPointCloud,
    rightPointCloud,
    defaultAttributeName: appConfig.pointclouds.startup.activeAttributeName,
    compareMode: compareElevationIntensityMode,
  });

  createRenderModeToggleController({
    button: appDom.renderModeToggle,
    stateLabel: appDom.renderModeState,
    renderModeService,
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
