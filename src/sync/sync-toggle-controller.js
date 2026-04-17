export function createSyncToggleController({ button, stateLabel, syncService }) {
  function render() {
    const enabled = syncService.isEnabled();

    stateLabel.textContent = enabled ? "enabled" : "disabled";

    stateLabel.classList.toggle("status-panel__badge--ok", enabled);
    stateLabel.classList.toggle("status-panel__badge--warn", !enabled);

    button.textContent = enabled ? "Разблокировать" : "Заблокировать";
    button.setAttribute("aria-pressed", String(enabled));

    button.classList.toggle("sync-toggle-button--active", enabled);
    button.classList.toggle("sync-toggle-button--inactive", !enabled);
  }

  function handleClick() {
    const enabled = syncService.toggle();

    if (enabled) {
      syncService.syncLeftToRightNow();
    }

    render();
  }

  button.addEventListener("click", handleClick);

  render();

  return {
    render,
    destroy() {
      button.removeEventListener("click", handleClick);
    },
  };
}