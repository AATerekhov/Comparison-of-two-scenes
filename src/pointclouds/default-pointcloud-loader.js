import { Potree } from "../vendor/potree-runtime.js";

function applyMaterial(pointcloud, pointcloudConfig) {
  pointcloud.material.size = pointcloudConfig.size;
  pointcloud.material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
  pointcloud.material.activeAttributeName = pointcloudConfig.activeAttributeName;
}

export function createDefaultPointCloudLoader({ appConfig, statusPanel }) {
  function load(viewer) {
    const pointcloudConfig = appConfig.pointclouds.startup;

    statusPanel.setDatasetPath(pointcloudConfig.path);
    statusPanel.setStatus("warn", "Loading point cloud...");

    Potree.loadPointCloud(pointcloudConfig.path, pointcloudConfig.name, (event) => {
      const pointcloud = event.pointcloud;

      applyMaterial(pointcloud, pointcloudConfig);
      viewer.scene.addPointCloud(pointcloud);
      viewer.fitToScreen();

      statusPanel.setStatus("ok", "Point cloud loaded successfully.");
    });
  }

  return {
    load,
  };
}
