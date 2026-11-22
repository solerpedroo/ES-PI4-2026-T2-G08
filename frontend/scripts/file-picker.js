(() => {
  "use strict";

  function enhance(input) {
    const picker = document.createElement("div");
    picker.className = "file-picker";

    const button = document.createElement("button");
    button.type = "button";
    button.id = `${input.id}-button`;
    button.className = "btn btn-outline";
    button.textContent = "Escolher arquivo";
    button.addEventListener("click", () => input.click());

    const status = document.createElement("span");
    status.id = `${input.id}-name`;
    status.className = "file-picker-name";
    status.setAttribute("role", "status");
    button.setAttribute("aria-describedby", status.id);

    function updateName() {
      status.textContent = input.files[0]?.name || "Nenhum arquivo selecionado";
    }

    for (const label of input.labels) label.htmlFor = button.id;
    input.before(picker);
    picker.append(button, status, input);
    input.hidden = true;

    input.addEventListener("input", updateName);
    input.form?.addEventListener("reset", () => setTimeout(updateName, 0));
    updateName();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input[type='file'][data-file-picker]").forEach(enhance);
  });
})();
