export function createSceneInteractionController({
  divider,
  leftPane,
  rightPane,
}) {
  let isInteracting = false;
  let activeScenePane = null;

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

  function lockActiveScenePane(scenePane) {
    activeScenePane = scenePane;

    divider.classList.add("divider--passthrough");

    if (scenePane === leftPane) {
      rightPane.classList.add("viewer-pane--passthrough");
      return;
    }

    if (scenePane === rightPane) {
      leftPane.classList.add("viewer-pane--passthrough");
    }
  }

  function unlockActiveScenePane() {
    activeScenePane = null;

    divider.classList.remove("divider--passthrough");
    leftPane.classList.remove("viewer-pane--passthrough");
    rightPane.classList.remove("viewer-pane--passthrough");
  }

  function startFromEvent(event) {
    const scenePane = getScenePaneFromEvent(event);

    if (!scenePane) {
      return;
    }

    isInteracting = true;
    lockActiveScenePane(scenePane);
  }

  function stop() {
    if (!isInteracting) {
      return;
    }

    isInteracting = false;
    unlockActiveScenePane();
  }

  return {
    startFromEvent,
    stop,

    get isInteracting() {
      return isInteracting;
    },

    get activeScenePane() {
      return activeScenePane;
    },
  };
}