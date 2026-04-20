export function createDragController({ onDrag }) {
  let isDragging = false;

  function start(event) {
    event.preventDefault();
    event.stopPropagation();

    isDragging = true;

    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  }

  function move(event) {
    if (!isDragging) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    onDrag(event.clientX);
  }

  function stop(event) {
    if (!isDragging) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    isDragging = false;

    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }

  function reset() {
    isDragging = false;

    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }

  return {
    start,
    move,
    stop,
    reset,

    get isDragging() {
      return isDragging;
    },
  };
}