function requireGlobal(name) {
  const value = globalThis[name];

  if (!value) {
    throw new Error(`${name} is not available. Check the legacy script includes in index.html.`);
  }

  return value;
}

export const Potree = requireGlobal("Potree");
