export function createRenderModeToggleController({
  button,
  stateLabel,
  renderModeService,
}) {
  function render() {
    const compareEnabled = renderModeService.isCompareModeEnabled();

    stateLabel.textContent = renderModeService.getCurrentModeLabel();

    stateLabel.classList.toggle("status-panel__badge--ok", compareEnabled);
    stateLabel.classList.toggle("status-panel__badge--warn", !compareEnabled);

    button.textContent = compareEnabled
      ? "Вернуть RGBA"
      : "Включить Height / Intensity";

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