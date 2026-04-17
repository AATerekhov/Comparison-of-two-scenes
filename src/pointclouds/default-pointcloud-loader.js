import { Potree } from "../vendor/potree-runtime.js";

function applyMaterial(pointcloud, pointcloudConfig) {
  pointcloud.material.size = pointcloudConfig.size ?? 1;
  pointcloud.material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
  pointcloud.material.activeAttributeName = pointcloudConfig.activeAttributeName;
}

export function createDefaultPointCloudLoader({ appConfig, statusPanel }) {
  async function load(viewer) {
    const pointcloudConfig = appConfig.pointclouds.startup;    
    statusPanel.setDatasetPath(pointcloudConfig.path);

    return new Promise((resolve, reject) => {     
      Potree.loadPointCloud(pointcloudConfig.path, pointcloudConfig.name, (event) => {
        const pointcloud = event.pointcloud;

        if (!pointcloud) {
          statusPanel.setStatus("error", "Point cloud instance was not created.");
          reject(new Error("Point cloude instance was not created."));
          return;
        }

        viewer.scene.addPointCloud(pointcloud);
        applyMaterial(pointcloud, pointcloudConfig);
        viewer.fitToScreen();

        statusPanel.setStatus("ok", `Loaded dataset: ${pointcloudConfig.name}`);
        resolve(pointcloud);
      });
    });    
  }

  return {
    load,
  };
}
