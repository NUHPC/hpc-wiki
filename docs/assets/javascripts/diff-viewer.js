(function () {
  function classify(line) {
    if (line.startsWith("@@")) return "hunk";
    if (line.startsWith("+++ ") || line.startsWith("--- ") || line.startsWith("diff ")) return "meta";
    if (line.startsWith("+")) return "add";
    if (line.startsWith("-")) return "del";
    return "context";
  }

  function checkbox(label, className, viewer) {
    const wrapper = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.addEventListener("change", () => viewer.classList.toggle(className, !input.checked));
    wrapper.append(input, ` ${label}`);
    return wrapper;
  }

  async function installDiffs() {
    for (const viewer of document.querySelectorAll(".diff-viewer[data-diff]")) {
      if (viewer.dataset.loaded) continue;
      viewer.dataset.loaded = "true";
      const toolbar = document.createElement("div");
      toolbar.className = "diff-toolbar";
      toolbar.append(
        checkbox("additions", "hide-add", viewer),
        checkbox("deletions", "hide-del", viewer),
        checkbox("context", "hide-context", viewer)
      );
      viewer.before(toolbar);

      try {
        const response = await fetch(new URL(viewer.dataset.diff, window.location.href));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const lines = (await response.text()).replace(/\n$/, "").split("\n");
        const pre = document.createElement("pre");
        lines.forEach((line) => {
          const row = document.createElement("span");
          row.className = `diff-line ${classify(line)}`;
          row.textContent = line || " ";
          pre.appendChild(row);
        });
        viewer.replaceChildren(pre);
      } catch (error) {
        viewer.textContent = `Unable to load diff: ${error.message}`;
      }
    }
  }

  if (window.document$) window.document$.subscribe(installDiffs);
  else document.addEventListener("DOMContentLoaded", installDiffs);
})();
