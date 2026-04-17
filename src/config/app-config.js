const baseUrl = import.meta.env.BASE_URL;

function resolvePublicPath(relativePath) {
  return new URL(relativePath, `http://local${baseUrl}`).pathname;
}

export const appConfig = {
  ui: {
    language: "en",
    description: "Potree.js development build for scene comparison.",
  },
  viewer: {
    fov: 60,
    pointBudget: 1000000,
    minNodeSize: 0,
    enableEDL: true,
    background: "gradient",
  },
  pointclouds: {
    startup: {
      name: "vol_total",
      path: resolvePublicPath("pointclouds/vol_total/cloud.js"),
      activeAttributeName: "rgba",
      size: 1,
    },
  },
};
