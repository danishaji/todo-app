// ------------------------
// State
// ------------------------

let todos = loadTodos();

// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// ------------------------
// Storage
// ------------------------

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
}

// ------------------------
// Todo Operations
// ------------------------

function addTodo(text) {
    todos.push({
        id: Date.now(),
        text,
        completed: false
    });

    saveTodos();
    render();
}

function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );

    saveTodos();
    render();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    saveTodos();
    render();
}

// ------------------------
// Render
// ------------------------

function render() {

    list.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", () => {
            toggleTodo(todo.id);
        });

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-btn";

        button.addEventListener("click", () => {
            deleteTodo(todo.id);
        });

        li.appendChild(span);
        li.appendChild(button);

        list.appendChild(li);

    });

}

// ------------------------
// Events
// ------------------------

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const text = input.value.trim();

    if (text === "") return;

    addTodo(text);

    input.value = "";
    input.focus();

});

// Initial render
render();
