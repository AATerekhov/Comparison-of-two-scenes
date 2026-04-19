function markNeedsUpdate(pointcloud) {
  if (!pointcloud?.material) {
    return;
  }

  pointcloud.material.needsUpdate = true;
}

function applyAttributeMode(pointcloud, modeConfig) {
  if (!pointcloud?.material) {
    return;
  }

  pointcloud.material.activeAttributeName = modeConfig.attributeName;
  markNeedsUpdate(pointcloud);
}

function applyElevationMode(pointcloud) {
  if (!pointcloud?.material) {
    return;
  }

  pointcloud.material.activeAttributeName = "elevation";

  const box = pointcloud.tightBoundingBox;

  if (box) {
    pointcloud.material.heightMin = box.min.z;
    pointcloud.material.heightMax = box.max.z;
  }

  markNeedsUpdate(pointcloud);
}

function applyIntensityMode(pointcloud, modeConfig = {}) {
  if (!pointcloud?.material) {
    return;
  }

  pointcloud.material.activeAttributeName = "intensity gradient";

  const intensityRange = modeConfig.intensityRange ?? [0, 65535];

  if ("intensityRange" in pointcloud.material) {
    pointcloud.material.intensityRange = intensityRange;
  }

  markNeedsUpdate(pointcloud);
}

export function createPointCloudRenderModeStrategies() {
  return {
    attribute: applyAttributeMode,
    elevation: applyElevationMode,
    intensity: applyIntensityMode,
  };
}