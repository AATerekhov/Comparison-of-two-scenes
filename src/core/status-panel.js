export function createStatusPanel(appDom) {
  function setStatus(type, message) {
    const badgeClass = `status-panel__badge status-panel__badge--${type}`;
    appDom.cloudStatus.innerHTML = `<span class="${badgeClass}">${message}</span>`;
  }

  function setDatasetPath(path) {
    appDom.datasetPath.textContent = path;
  }

  return {
    setStatus,
    setDatasetPath,
  };
}
