window.DefaultPointCloudLoader = (function createDefaultPointCloudLoader() {
  function applyMaterial(pointcloud, pointcloudConfig) {
    pointcloud.material.size = pointcloudConfig.size;
    pointcloud.material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
    pointcloud.material.activeAttributeName = pointcloudConfig.activeAttributeName;
  }

  function load(viewer) {
    const pointcloudConfig = window.AppConfig.pointclouds.startup;

    window.StatusPanel.setDatasetPath(pointcloudConfig.path);
    window.StatusPanel.setStatus("warn", "Loading point cloud...");

    Potree.loadPointCloud(pointcloudConfig.path, pointcloudConfig.name, (event) => {
      const pointcloud = event.pointcloud;

      applyMaterial(pointcloud, pointcloudConfig);
      viewer.scene.addPointCloud(pointcloud);
      viewer.fitToScreen();

      window.StatusPanel.setStatus("ok", "Point cloud loaded successfully.");
    });
  }

  return {
    load,
  };
})();
