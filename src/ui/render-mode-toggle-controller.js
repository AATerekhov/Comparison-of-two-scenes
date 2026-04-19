export function createRenderModeToggleController({
  button,
  stateLabel,
  renderModeService,
}) {
  function setBadgeType(badgeType) {
    stateLabel.classList.toggle(
      "status-panel__badge--ok",
      badgeType === "ok"
    );

    stateLabel.classList.toggle(
      "status-panel__badge--warn",
      badgeType === "warn"
    );
  }

  function render() {
    const currentMode = renderModeService.getCurrentMode();
    const compareEnabled = renderModeService.isCompareModeEnabled();

    stateLabel.textContent = currentMode.label;

    setBadgeType(currentMode.ui?.badgeType ?? "warn");

    button.textContent = currentMode.ui?.nextButtonText ?? "Переключить режим";

    button.classList.toggle("render-mode-button--active", compareEnabled);
    button.classList.toggle("render-mode-button--inactive", !compareEnabled);
  }

  function handleClick() {
    renderModeService.toggleCompareMode();
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