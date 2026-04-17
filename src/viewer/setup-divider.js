export function setupDivider({ divider, leftPane, viewerShell }) {
  let isDragging = false;

  function setDividerPosition(clientX) {
    const shellRect = viewerShell.getBoundingClientRect();
    const minOffset = 40;

    let x = clientX - shellRect.left;
    x = Math.max(minOffset, x);
    x = Math.min(shellRect.width - minOffset, x);

    const rightInset = shellRect.width - x;

    leftPane.style.clipPath = `inset(0 ${rightInset}px 0 0)`;
    divider.style.left = `${x}px`;
  }

  function setInitialPosition() {
    const shellRect = viewerShell.getBoundingClientRect();
    const x = shellRect.width / 2;

    leftPane.style.clipPath = `inset(0 ${shellRect.width - x}px 0 0)`;
    divider.style.left = `${x}px`;
  }

  function onMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();

    isDragging = true;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";

    setDividerPosition(event.clientX);
  }

  function onMouseMove(event) {
    if (!isDragging) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    setDividerPosition(event.clientX);
  }

  function onMouseUp(event) {
    if (!isDragging) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    isDragging = false;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }

  function onResize() {
    setInitialPosition();
  }

  divider.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove, true);
  window.addEventListener("mouseup", onMouseUp, true);
  window.addEventListener("resize", onResize);

  setInitialPosition();

  return {
    destroy() {
      divider.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove, true);
      window.removeEventListener("mouseup", onMouseUp, true);
      window.removeEventListener("resize", onResize);
    },
  };
}