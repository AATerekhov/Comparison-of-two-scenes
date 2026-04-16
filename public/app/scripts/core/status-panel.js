window.StatusPanel = (function createStatusPanel() {
  function setStatus(type, message) {
    const badgeClass = `status-panel__badge status-panel__badge--${type}`;
    window.AppDom.cloudStatus.innerHTML = `<span class="${badgeClass}">${message}</span>`;
  }

  function setDatasetPath(path) {
    window.AppDom.datasetPath.textContent = path;
  }

  return {
    setStatus,
    setDatasetPath,
  };
})();
