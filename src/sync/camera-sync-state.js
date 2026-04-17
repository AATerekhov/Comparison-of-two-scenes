export function createCameraSyncState(initialEnabled = true) {
  return {
    syncEnabled: initialEnabled,
    isSyncing: false,
  };
}