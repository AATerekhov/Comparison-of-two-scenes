export const DEFAULT_RENDER_MODE_ID = "default";
export const COMPARE_RENDER_MODE_ID = "compare-elevation-intensity";

export function createDefaultRenderMode(defaultAttributeName = "rgba") {
  return {
    id: DEFAULT_RENDER_MODE_ID,

    label: `both: ${defaultAttributeName}`,

    ui: {
      badgeType: "warn",
      nextButtonText: "Включить Height / Intensity",
    },

    panes: {
      left: {
        type: "attribute",
        attributeName: defaultAttributeName,
      },
      right: {
        type: "attribute",
        attributeName: defaultAttributeName,
      },
    },
  };
}

export const compareElevationIntensityMode = {
  id: COMPARE_RENDER_MODE_ID,

  label: "left: elevation / right: intensity",

  ui: {
    badgeType: "ok",
    nextButtonText: "Вернуть RGBA",
  },

  panes: {
    left: {
      type: "elevation",
    },
    right: {
      type: "intensity",
      intensityRange: [0, 65535],
    },
  },
};