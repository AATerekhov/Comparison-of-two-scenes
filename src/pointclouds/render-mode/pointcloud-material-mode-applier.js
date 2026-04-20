import { createPointCloudRenderModeStrategies } from "./pointcloud-render-mode-strategies.js";

export function createPointCloudRenderModeApplier({
  strategies = createPointCloudRenderModeStrategies(),
} = {}) {
  function getStrategy(type) {
    const strategy = strategies[type];

    if (!strategy) {
      throw new Error(`Unknown point cloud render mode type: "${type}"`);
    }

    return strategy;
  }

  function applyPaneMode(pointcloud, paneModeConfig) {
    if (!paneModeConfig?.type) {
      throw new Error("Point cloud render mode config must have a type.");
    }

    const strategy = getStrategy(paneModeConfig.type);

    strategy(pointcloud, paneModeConfig);
  }

  function applyRenderMode({ mode, panes }) {
    applyPaneMode(panes.left, mode.panes.left);
    applyPaneMode(panes.right, mode.panes.right);
  }

  return {
    applyPaneMode,
    applyRenderMode,
  };
}