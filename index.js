"use strict";

// Document objects from index.html file
let todoInput = document.getElementById("todoInput");
let addTodo = document.getElementById("addTodo");
let todoList = document.getElementById("todoList");
let saveTodo = document.getElementById("saveTodo");

// Initialize todosArray
let todosArray = [];

// Example todosArray
// let todosArray = [
//   {
//     todo: "HTML5",
//     todoId: 1,
//     checked: true,
//   },
//   {
//     todo: "CSS3",
//     todoId: 2,
//     checked: false,
//   },
//   {
//     todo: "Modern JS",
//     todoId: 3,
//     checked: false,
//   },
// ];

// Getting from localStorage value
let getStorage = JSON.parse(localStorage.getItem("todos"));

// If have localStorage value then concatatenate to todosArray
if (getStorage) todosArray = todosArray.concat(getStorage);

// Total todos
let todoLength = todosArray.length;

// Add "li" element in todoList object ("ul") element
function createTodoList(todo) {
  // li element
  let liElement = document.createElement("li");
  todoList.appendChild(liElement);

  // input element
  let inputElement = document.createElement("input");
  liElement.appendChild(inputElement);
  inputElement.type = "checkbox";
  inputElement.id = `todo${todo.todoId}`;
  inputElement.checked = todo.checked;

  // div element
  let divElement = document.createElement("div");
  liElement.appendChild(divElement);
  divElement.classList.add("label-container");

  // label element
  let labelElement = document.createElement("label");
  divElement.appendChild(labelElement);
  labelElement.setAttribute("for", `todo${todo.todoId}`);
  labelElement.textContent = todo.todo;
  todo.checked
    ? labelElement.classList.add("completed")
    : labelElement.classList.remove("completed");

  // span element for icon
  let spanElement = document.createElement("span");
  divElement.appendChild(spanElement);
  spanElement.classList.add("material-symbols-outlined");
  spanElement.textContent = "delete";

  // Checkbox event listener for click to checkbox
  inputElement.addEventListener("click", function () {
    todo.checked = inputElement.checked;
    todo.checked
      ? labelElement.classList.add("completed")
      : labelElement.classList.remove("completed");
  });

  // Delete event listener for remove to list item
  spanElement.addEventListener("click", function () {
    todoList.removeChild(liElement);
    todosArray = todosArray.filter((todoItem) => todoItem !== todo);
  });
}

// Adding each list item in todosArray and reusable code | function name is "createTodoList()" with parameter is "(todo)";
todosArray.map((todo) => createTodoList(todo));

// Add event listener for add todo list using "createTodoList()" function with "(todo)" parameter
addTodo.addEventListener("click", function () {
  let input = todoInput.value;
  if (input === "") {
    alert("Valid input text");
  } else {
    let todo = {
      todo: input,
      todoId: ++todoLength,
      checked: false,
    };
    todosArray.push(todo);
    createTodoList(todo);
    todoInput.value = "";
  }
  console.log(todosArray);
});

// Save event listener for store in localStorage with unique key name is "todos"
saveTodo.addEventListener("click", function () {
  let count = 0;
  todosArray.map((todo) => (todo.todoId = ++count));
  localStorage.setItem("todos", JSON.stringify(todosArray));
});
