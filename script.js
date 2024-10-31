let addSingleTaskBtn = document.getElementById("add-task");
let addMultipleTasksBtn = document.getElementById("add-multiple-tasks");
let searchInput = document.getElementById("search");

let formPopup = document.getElementById("create-task-popup");

updateListsTasksCount();

addSingleTaskBtn.addEventListener("click", () => openAndClosePopup(false))
addMultipleTasksBtn.addEventListener("click", () => openAndClosePopup(true))

searchInput.onkeyup = function () {
    showOnlyfilteredTasks(); // Show only tasks that match the current filter search
    updateListsTasksCount(); // Update the lists tasks count based on the new filter
}


function openAndClosePopup (isMultiple) {
    formPopup.classList.remove("hidden");
    if (isMultiple) {
        formPopup.setAttribute("multiple", true);
    }

    formPopup.addEventListener("click", function(event) {
        let closeBtn = document.querySelector("#closeIcon span");

        if (event.target == formPopup || event.target == closeBtn) {
            formPopup.classList.add("hidden");
            document.getElementById("alert").classList.add("hidden");
            if (isMultiple) {
                formPopup.removeAttribute("multiple");
            }
        }
    }, { once: true });
}

function createTask(data) {
    let colors = {
        P1: "red-500",
        P2: "gray-500",
        P3: "blue-500",
    };
    
    let taskId = `task-${Date.now()}`
    let task = `<div
                    id="${taskId}"
                    data-start-date="${data.startDate}"
                    data-due-date="${data.dueDate}"
                    data-priority="${data.priority}"
                    data-state="${data.state}"
                    data-description="${data.description}"
                    class="task border-${colors[data.priority]}"
                >
                    <h6 class="font-light mb-3">${data.title}</h6>
                    <div class="labels">
                        <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                        <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">Edit</button>
                    </div>
                </div>`

    let listOfTasks = document.querySelectorAll(".list")[data.state].querySelector(".tasks");

    listOfTasks.insertAdjacentHTML("beforeend", task);
    showOnlyfilteredTasks();
    updateListsTasksCount();

    listOfTasks.querySelector(`#${taskId} .delete-btn`).addEventListener("click", () => deleteTask(taskId));
}

function deleteTask(taskId) {
    document.getElementById(taskId).remove();
    updateListsTasksCount(); // Update the task count after deltete
}

function showOnlyfilteredTasks() {
    document.querySelectorAll(".task").forEach(function(task) {
        let title = task.querySelector("h6").textContent;

        if (title.search(searchInput.value) == -1) {
            task.classList.add("hidden");
            return;
        }
        task.classList.remove("hidden");
    })
}

function updateListsTasksCount () {
    document.querySelectorAll(".list").forEach( function (list) {
        let spanCount = list.querySelector(".count");
        spanCount.textContent = Array.from(list.querySelectorAll(".tasks .task"))
                                    .filter(task => !task.classList.contains("hidden"))
                                    .length;
    })
}