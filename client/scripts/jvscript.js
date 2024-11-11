let originalValues = [];

function toggleEditMode() {
  const inputs = document.querySelectorAll(".rule-form input");
  const editButton = document.querySelector(".edit-btn");
  const cancelButton = document.querySelector(".cancel-btn");
  const modeRule = document.querySelector(".view_rules h2");

  if (editButton.textContent === "EDIT") {
    originalValues = Array.from(inputs).map((input) => input.value);
    inputs.forEach((input) => {
      input.removeAttribute("readonly");
      input.classList.add("editable");
    });
    editButton.textContent = "SAVE";
    cancelButton.style.display = "inline";
    modeRule.textContent = "EDIT RULE";
  } else {
    inputs.forEach((input) => {
      input.setAttribute("readonly", true);
      input.classList.remove("editable");
    });
    editButton.textContent = "EDIT";
    cancelButton.style.display = "none";
    modeRule.textContent = "VIEW RULE";
  }
}

function cancelEdit() {
  const inputs = document.querySelectorAll(".rule-form input");
  inputs.forEach((input, index) => {
    input.value = originalValues[index];
  });
  toggleEditMode();
}
