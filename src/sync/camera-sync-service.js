import { createCameraSyncState } from "./camera-sync-state.js";

function copyViewState(sourceViewer, targetViewer) {
  const sourceView = sourceViewer.scene.view;
  const targetView = targetViewer.scene.view;

  targetView.position.copy(sourceView.position);
  targetView.yaw = sourceView.yaw;
  targetView.pitch = sourceView.pitch;
  targetView.radius = sourceView.radius;

  if (typeof sourceViewer.getMoveSpeed === "function" && typeof targetViewer.setMoveSpeed === "function") {
    targetViewer.setMoveSpeed(sourceViewer.getMoveSpeed());
  }
}

export function createCameraSyncService(viewerLeft, viewerRight, options = {}) {
  const state = createCameraSyncState(options.enabled ?? true);

  function syncFromLeftToRight() {
    if (!state.syncEnabled || state.isSyncing) {
      return;
    }

    state.isSyncing = true;
    try {
      copyViewState(viewerLeft, viewerRight);
    } finally {
      state.isSyncing = false;
    }
  }

  function syncFromRightToLeft() {
    if (!state.syncEnabled || state.isSyncing) {
      return;
    }

    state.isSyncing = true;
    try {
      copyViewState(viewerRight, viewerLeft);
    } finally {
      state.isSyncing = false;
    }
  }

  function enable() {
    state.syncEnabled = true;
  }

  function disable() {
    state.syncEnabled = false;
  }

  function toggle() {
    state.syncEnabled = !state.syncEnabled;
    return state.syncEnabled;
  }

  function isEnabled() {
    return state.syncEnabled;
  }

  function syncLeftToRightNow() {
    const previousSyncFlag = state.isSyncing;
    state.isSyncing = true;
    try {
      copyViewState(viewerLeft, viewerRight);
    } finally {
      state.isSyncing = previousSyncFlag;
    }
  }

  function syncRightToLeftNow() {
    const previousSyncFlag = state.isSyncing;
    state.isSyncing = true;
    try {
      copyViewState(viewerRight, viewerLeft);
    } finally {
      state.isSyncing = previousSyncFlag;
    }
  }

  function attachListeners() {
    viewerLeft.addEventListener("camera_changed", syncFromLeftToRight);
    viewerRight.addEventListener("camera_changed", syncFromRightToLeft);
  }

  function detachListeners() {
    viewerLeft.removeEventListener("camera_changed", syncFromLeftToRight);
    viewerRight.removeEventListener("camera_changed", syncFromRightToLeft);
  }

  attachListeners();

  if (state.syncEnabled) {
    syncLeftToRightNow();
  }

  return {
    enable,
    disable,
    toggle,
    isEnabled,
    syncLeftToRightNow,
    syncRightToLeftNow,
    destroy() {
      detachListeners();
    },
  };
}