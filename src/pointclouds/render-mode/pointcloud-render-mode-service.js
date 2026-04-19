import {
  createDefaultRenderMode,
  compareElevationIntensityMode,
} from "./contracts/pointcloud-render-mode-contracts.js";

import { createPointCloudRenderModeApplier } from "./pointcloud-material-mode-applier.js";
import { getRenderModeLabel } from "./pointcloud-render-mode-labels.js";

export function createPointCloudRenderModeService({
  leftPointCloud,
  rightPointCloud,
  defaultAttributeName = "rgba",
  compareMode = compareElevationIntensityMode,
  modeApplier = createPointCloudRenderModeApplier(),
}) {
  const defaultMode = createDefaultRenderMode(defaultAttributeName);

  let currentMode = defaultMode;

  function getPanes() {
    return {
      left: leftPointCloud,
      right: rightPointCloud,
    };
  }

  function applyMode(mode) {
    modeApplier.applyRenderMode({
      mode,
      panes: getPanes(),
    });

    currentMode = mode;

    return currentMode;
  }

  function applyDefaultMode() {
    return applyMode(defaultMode);
  }

  function applyCompareMode() {
    return applyMode(compareMode);
  }

  function toggleCompareMode() {
    if (isCompareModeEnabled()) {
      applyDefaultMode();
    } else {
      applyCompareMode();
    }

    return isCompareModeEnabled();
  }

  function isCompareModeEnabled() {
    return currentMode.id === compareMode.id;
  }

  function getCurrentMode() {
    return currentMode;
  }

  function getCurrentModeLabel() {
    return getRenderModeLabel(currentMode);
  }

  return {
    applyMode,
    applyDefaultMode,
    applyCompareMode,
    toggleCompareMode,
    isCompareModeEnabled,
    getCurrentMode,
    getCurrentModeLabel,
  };
}