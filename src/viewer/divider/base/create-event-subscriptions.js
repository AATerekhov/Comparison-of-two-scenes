export function createEventSubscriptions() {
  const subscriptions = [];

  function add(target, eventName, handler, options) {
    target.addEventListener(eventName, handler, options);

    subscriptions.push(() => {
      target.removeEventListener(eventName, handler, options);
    });
  }

  function removeAll() {
    subscriptions.forEach((unsubscribe) => unsubscribe());
    subscriptions.length = 0;
  }

  return {
    add,
    removeAll,
  };
}