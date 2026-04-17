export function createPointCloudRenderModeService({
  leftPointCloud,
  rightPointCloud,
  defaultAttributeName = "rgba",
}) {
  let compareModeEnabled = false;

  function setAttribute(pointcloud, attributeName) {
    if (!pointcloud?.material) {
      return;
    }

    pointcloud.material.activeAttributeName = attributeName;
    pointcloud.material.needsUpdate = true;
  }
  
   function hasAttribute(pointcloud, attributeName) {
    return getDeclaredAttributeNames(pointcloud).includes(attributeName.toLowerCase());
  }

  function applyHeight(pointcloud) {
    if (!pointcloud?.material) {
      return;
    }

    pointcloud.material.activeAttributeName = "elevation";

    const box = pointcloud.tightBoundingBox;

    if (box) {
      pointcloud.material.heightMin = box.min.z;
      pointcloud.material.heightMax = box.max.z;
    }

    pointcloud.material.needsUpdate = true;
  }

  function applyIntensity(pointcloud) {
    if (!pointcloud?.material) {
      return;
    }

    pointcloud.material.activeAttributeName = "intensity gradient";

    if ("intensityRange" in pointcloud.material) {
      pointcloud.material.intensityRange = [0, 65535];
    }

    pointcloud.material.needsUpdate = true;
  }

  function applyDefaultMode() {
    setAttribute(leftPointCloud, defaultAttributeName);
    setAttribute(rightPointCloud, defaultAttributeName);
    compareModeEnabled = false;
  }

  function applyCompareMode() {
    applyHeight(leftPointCloud);

    applyIntensity(rightPointCloud);
    compareModeEnabled = true;
  }

  function toggleCompareMode() {
    if (compareModeEnabled) {
      applyDefaultMode();
    } else {
      applyCompareMode();
    }

    return compareModeEnabled;
  }

  function isCompareModeEnabled() {
    return compareModeEnabled;
  }

  function getCurrentModeLabel() {
    return compareModeEnabled
      ? "left: elevation / right: intensity"
      : `both: ${defaultAttributeName}`;
  }

  return {
    applyDefaultMode,
    applyCompareMode,
    toggleCompareMode,
    isCompareModeEnabled,
    getCurrentModeLabel,
  };
}