const input = document.querySelector("#todo");
const btn = document.querySelector("#submitTask");
const todoList = document.querySelector("#todoList");
const form = document.querySelector("#todoForm");

// Focus input when page loads for convenience
window.addEventListener("DOMContentLoaded", () => input.focus());

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (!taskText) return;

  // Create a new list item
  const newTask = document.createElement("li");

  // Create task description
  const taskDescription = document.createElement("p");
  taskDescription.textContent = taskText;
  taskDescription.setAttribute("tabindex", "0"); // Keyboard focusable
  taskDescription.setAttribute("role", "button");
  taskDescription.setAttribute("aria-pressed", "false");
  taskDescription.setAttribute("aria-label", `Mark ${taskText} as done`);

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.setAttribute("aria-label", `Delete task ${taskText}`);

  // Add event: toggle strikethrough
  taskDescription.addEventListener("click", function () {
    const done = taskDescription.classList.toggle("strike");
    taskDescription.setAttribute("aria-pressed", String(done));
    taskDescription.setAttribute(
      "aria-label",
      done ? `Mark ${taskText} as not done` : `Mark ${taskText} as done`
    );
  });

  // Allow toggling task done with Enter or Space
  taskDescription.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      taskDescription.click();
    }
  });

  // Add event: remove task
  deleteBtn.addEventListener("click", function () {
    newTask.remove();
  });

  // Append to DOM
  newTask.append(taskDescription, deleteBtn);
  todoList.appendChild(newTask);

  // Clear input and return focus
  input.value = "";
  input.focus();
});
