export function getAppDom() {
  return {
    cloudStatus: document.getElementById("cloud-status"),
    datasetPath: document.getElementById("dataset-path"),
    
    left: document.getElementById("viewer-left"),
    right: document.getElementById("viewer-right"),
    divider: document.getElementById("divider"),
    viewerShell: document.getElementById("viewer-shell"),

    syncToggle: document.getElementById("sync-toggle"),
    syncState: document.getElementById("sync-state"),

    renderModeToggle: document.getElementById("render-mode-toggle"),
    renderModeState: document.getElementById("render-mode-state"),
  };
}
