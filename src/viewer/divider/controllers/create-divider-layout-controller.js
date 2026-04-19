export function createDividerLayoutController({
  divider,
  leftPane,
  viewerShell,
  minOffset = 40,
}) {
  let dividerRatio = 0.5;

  function getShellRect() {
    return viewerShell.getBoundingClientRect();
  }

  function clampX(x, shellWidth) {
    const minX = minOffset;
    const maxX = shellWidth - minOffset;

    return Math.max(minX, Math.min(maxX, x));
  }

  function applyPosition(x, shellWidth) {
    const rightInset = shellWidth - x;

    leftPane.style.clipPath = `inset(0 ${rightInset}px 0 0)`;
    divider.style.left = `${x}px`;
  }

  function setPositionByX(x) {
    const shellRect = getShellRect();

    const clampedX = clampX(x, shellRect.width);
    dividerRatio = clampedX / shellRect.width;

    applyPosition(clampedX, shellRect.width);
  }

  function setPositionFromClientX(clientX) {
    const shellRect = getShellRect();
    const x = clientX - shellRect.left;

    setPositionByX(x);
  }

  function setInitialPosition() {
    const shellRect = getShellRect();
    const x = shellRect.width * dividerRatio;

    setPositionByX(x);
  }

  function refreshPosition() {
    const shellRect = getShellRect();
    const x = shellRect.width * dividerRatio;

    setPositionByX(x);
  }

  return {
    setPositionFromClientX,
    setInitialPosition,
    refreshPosition,
  };
}