export function getAppDom() {
  return {
    cloudStatus: document.getElementById("cloud-status"),
    datasetPath: document.getElementById("dataset-path"),
    left: document.getElementById("viewer-left"),
    right: document.getElementById("viewer-right"),
    divider: document.getElementById("divider"),
    syncToggle: document.getElementById("..."),
    syncState: document.getElementById("___")
  };
}
