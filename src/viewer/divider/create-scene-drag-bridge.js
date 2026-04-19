export function createSceneDragBridge({
  divider,
  leftPane,
  rightPane,
}) {
  let isDraggingScene = false;
  let activeScenePane = null;
  let activeEventTarget = null;
  let lastClientX = 0;
  let lastClientY = 0;

  function getScenePaneFromEvent(event) {
    if (event.target === divider) {
      return null;
    }

    if (leftPane.contains(event.target)) {
      return leftPane;
    }

    if (rightPane.contains(event.target)) {
      return rightPane;
    }

    return null;
  }

  function cloneMouseEvent(event, eventName) {
    return new MouseEvent(eventName, {
      bubbles: true,
      cancelable: true,
      view: window,

      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,

      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey,

      button: event.button,
      buttons: event.buttons,
      relatedTarget: event.relatedTarget,
    });
  }

  function shouldBridgeEvent(event) {
    if (!isDraggingScene) {
      return false;
    }

    if (!activeScenePane || !activeEventTarget) {
      return false;
    }

    /**
     * Правый viewer уже чинится через pointer-events,
     * а мост нужен именно для левого clipped overlay.
     */
    if (activeScenePane !== leftPane) {
      return false;
    }

    /**
     * Если координаты не изменились, не плодим лишние события.
     */
    if (event.clientX === lastClientX && event.clientY === lastClientY) {
      return false;
    }

    return true;
  }

  function startFromEvent(event) {
    const scenePane = getScenePaneFromEvent(event);

    if (!scenePane) {
      return;
    }

    isDraggingScene = true;
    activeScenePane = scenePane;
    activeEventTarget = event.target;

    lastClientX = event.clientX;
    lastClientY = event.clientY;
  }

  function move(event) {
    if (!shouldBridgeEvent(event)) {
      return;
    }

    lastClientX = event.clientX;
    lastClientY = event.clientY;

    const bridgedEvent = cloneMouseEvent(event, "mousemove");
    activeEventTarget.dispatchEvent(bridgedEvent);
  }

  function stop(event) {
    if (!isDraggingScene) {
      return;
    }

    if (activeEventTarget && activeScenePane === leftPane) {
      const bridgedEvent = cloneMouseEvent(event, "mouseup");
      activeEventTarget.dispatchEvent(bridgedEvent);
    }

    reset();
  }

  function reset() {
    isDraggingScene = false;
    activeScenePane = null;
    activeEventTarget = null;
    lastClientX = 0;
    lastClientY = 0;
  }

  return {
    startFromEvent,
    move,
    stop,
    reset,

    get isDraggingScene() {
      return isDraggingScene;
    },

    get activeScenePane() {
      return activeScenePane;
    },
  };
}