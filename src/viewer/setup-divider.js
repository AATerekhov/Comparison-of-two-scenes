export function setupDivider() {
  const divider = document.getElementById("divider");
  const left = document.getElementById("viewer-left");
  const right = document.getElementById("viewer-right");

  let isDragging = false;

  divider.addEventListener("mousedown", () => {
    isDragging = true;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const percent = (e.clientX / window.innerWidth) * 100;

    left.style.flex = "none";
    left.style.width = percent + "%";

    right.style.flex = "none";
    right.style.width = (100 - percent) + "%";
  });
}