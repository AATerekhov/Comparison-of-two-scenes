window.AppConfig = {
  ui: {
    language: "en",
    description: "Potree.js development build for scene comparison.",
  },
  viewer: {
    containerId: "potree_render_area",
    fov: 60,
    pointBudget: 1000000,
    minNodeSize: 0,
    enableEDL: true,
    background: "gradient",
  },
  pointclouds: {
    startup: {
      name: "vol_total",
      path: "./pointclouds/vol_total/cloud.js",
      activeAttributeName: "rgba",
      size: 1,
    },
  },
};
