

const form = document.querySelector("#todoAddForm")
const addInput = document.querySelector("#todoName")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const clearButton = document.querySelector("#clearButton")
const filterInput = document.querySelector("#todoSearch")
let todos = [];

runEvents()

function runEvents() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", pageLoaded)
    secondCardBody.addEventListener("click", removeTodoToUI)
    clearButton.addEventListener("click", clearAllTodos)
    filterInput.addEventListener("keyup", filter)
}

function removeTodoToStorage(removedTodo) {
    checktodos()
    todos.forEach(function (todo, index) {
        if (todo === removedTodo) {
            todos.splice(index, 1)
        }

    })
    localStorage.setItem("todos", JSON.stringify(todos))

}

function pageLoaded() {
    checktodos()
    todos.forEach(function (todo) {
        addTodoUI(todo)
    })
}

function addTodo(e) {

    const inputText = addInput.value.trim()
    if (inputText == "" || inputText == null) {
        showAlert("danger", "Lütfen boş geçmeyiniz")
    }
    else {
        addTodoUI(inputText)
        addTodotoStorage(inputText)
        showAlert("success", "Todo başarıyla eklendi")
    }
    // storagea ekleme
    e.preventDefault() // farklı sayfaya yönlendirmeyi engeller
}

function addTodoUI(newtodo) {
    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newtodo

    const a = document.createElement("a")
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i")
    i.className = "fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    todoList.appendChild(li)
    addInput.value = ""
}

function addTodotoStorage(newtodo) {
    checktodos()
    todos.push(newtodo)
    localStorage.setItem("todos", JSON.stringify(todos))

}
function checktodos() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}

function showAlert(type, message) {
    const div = document.createElement("div")
    div.className = `alert alert-${type}`
    // div.className="alert alert-"+type
    div.textContent = message
    firstCardBody.appendChild(div)
    setTimeout(() => {
        div.remove()
    }, 2500);


}

function removeTodoToUI(e) {

    // ekrandan silmek
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement
        todo.remove()



        removeTodoToStorage(todo.textContent)
        showAlert("success", "Silme işlemi başarılı")

    }
    // storagedan silmek

}

function clearAllTodos() {
    //ekrandan temizleme
    const todoListesi = document.querySelectorAll(".list-group-item")
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            todo.remove()
        })
    }

    //storagedan silme
    todos = []
    localStorage.setItem("todos", JSON.stringify(todos))

}

function filter(e) {
    const todolistesi = document.querySelectorAll(".list-group-item")
    const filterText = e.target.value.toLowerCase()

    if (todolistesi.length > 0) {
        todolistesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterText)) {
                todo.setAttribute("style", "display:block")
            }
            else {
                todo.setAttribute("style", "display:none !important")
            }
        })
    }
    else {
        showAlert("danger", "todo olmadan filtrelme yapılamaz")
    }
}



