export function setupDivider({ divider, leftPane, rightPane }) {
  let isDragging = false;

  function onMouseDown() {
    isDragging = true;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  }

  function onMouseUp() {
    isDragging = false;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }

  function onMouseMove(event) {
    if (!isDragging) {
      return;
    }

    const shell = divider.parentElement;
    const shellRect = shell.getBoundingClientRect();
    const dividerWidth = divider.offsetWidth;

    const minPaneWidth = 240;
    let leftWidth = event.clientX - shellRect.left;

    leftWidth = Math.max(minPaneWidth, leftWidth);
    leftWidth = Math.min(shellRect.width - minPaneWidth - dividerWidth, leftWidth);

    const rightWidth = shellRect.width - leftWidth - dividerWidth;

    leftPane.style.flex = "0 0 auto";
    rightPane.style.flex = "0 0 auto";

    leftPane.style.width = `${leftWidth}px`;
    rightPane.style.width = `${rightWidth}px`;
  }

  divider.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("mousemove", onMouseMove);
}