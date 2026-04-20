import { createDividerLayoutController } from "./controllers/create-divider-layout-controller.js";
import { createDragController } from "./controllers/create-drag-controller.js";
import { createSceneInteractionController } from "./controllers/create-scene-interaction-controller.js";
import { createEventSubscriptions } from "./base/create-event-subscriptions.js";
import { createSceneDragBridge } from "./create-scene-drag-bridge.js";

export function setupDivider({
  divider,
  leftPane,
  rightPane,
  viewerShell,
  minOffset = 40,
}) {
  const layout = createDividerLayoutController({
    divider,
    leftPane,
    viewerShell,
    minOffset,
  });

  const drag = createDragController({
    onDrag: layout.setPositionFromClientX,
  });

  const sceneInteraction = createSceneInteractionController({
    divider,
    leftPane,
    rightPane,
  });

  const sceneDragBridge = createSceneDragBridge({
    divider,
    leftPane,
    rightPane,
  });

  const subscriptions = createEventSubscriptions();

  function onViewerMouseDown(event) {
    if (event.target === divider) {
      return;
    }

    sceneInteraction.startFromEvent(event);
    sceneDragBridge.startFromEvent(event);
  }

  function onMouseUp(event) {
    sceneDragBridge.stop(event);
    sceneInteraction.stop();
    drag.stop(event);
  }

  function onResize() {
    layout.refreshPosition();
  }

  subscriptions.add(divider, "mousedown", drag.start);
  subscriptions.add(viewerShell, "mousedown", onViewerMouseDown, true);
  subscriptions.add(window, "mousemove", drag.move, true);
  subscriptions.add(window, "mousemove", sceneDragBridge.move, true);
  subscriptions.add(window, "mouseup", onMouseUp, true);
  subscriptions.add(window, "resize", onResize);

  layout.setInitialPosition();

  return {
    destroy() {
      subscriptions.removeAll();
      sceneDragBridge.reset();
      sceneInteraction.stop();
      drag.reset();
    },
  };
}