
const add = document.getElementById("add");
const input = document.getElementById("taskinput");
const list = document.getElementById("list");
const li = document.getElementsByTagName("li");


loadTasks()
add.addEventListener("click", addTask);
//for click enter key too
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


function addTask(){

    const task = input.value.trim();   //trim delete white spaces 

    if (task){                         //if exists
        createTaskElement({ text: task, checked: false });
        input.value = "";
        saveTask()
    }

}



function createTaskElement(task) {
    const NewTask = document.createElement("li");
    const svg = task.checked
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#a1bbbe" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
            </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            </svg>`;
    const padding = `<i style="padding: 5px;"></i>`;
    NewTask.innerHTML = svg + padding + task.text;
    NewTask.style.transition = 'all 2s ease';
    list.appendChild(NewTask);
}

list.addEventListener("click", function(event) {
    if (event.target.tagName === "LI" || event.target.closest("li")) {
        const item = event.target.closest("li");
        checkedTask(item);
        saveTask();
    }
});

function checkedTask(item){
    
    const isChecked = item.querySelector(".bi-check-square-fill") === null; // Check if it's currently unchecked
    const svg = isChecked
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#a1bbbe" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
            </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            </svg>`;
    const padding = `<i style="padding: 2.8px;"></i>`;
    const task = item.textContent;
    item.innerHTML = svg + padding + task;
}

function saveTask(){
    let tasks = [];
    list.querySelectorAll('li').forEach(function(item){
        const isChecked = item.querySelector(".bi-check-square-fill") !== null;
        tasks.push({ text: item.textContent.trim(), checked: isChecked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}



//--------------------day func
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const dayName = days[today.getDay()];


const title = document.getElementById("h11");
title.textContent = ` ${dayName}, To-Do `;