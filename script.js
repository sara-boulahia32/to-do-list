// manage form bar 
const createTaskPopup=document.getElementById("createTaskPopup");
const form=document.querySelector("form");
const alert=document.getElementById("alert");

const todoTasks=document.getElementById('todoTasks');
const inprogressTasks=document.getElementById('inprogress-tasks');
const doneTasks=document.getElementById('done-tasks');

    // ouvrir
    const openAjoute=document.getElementById("openAjoute").addEventListener('click', ()=>{
        createTaskPopup.classList.remove('hidden');
    })

    // fermer
    const closebutton=document.getElementById("closeIcon").addEventListener('click', ()=>{
        createTaskPopup.classList.add('hidden');
        form.reset();
        alert.classList.add('hidden');
    })

// selection de statut et priorité 
const dropdowns=[priority-menu, state-menu];
    dropdowns.forEach(id=>{
        const menu=document.getElementById('id');
        const options=menu.querySelector('div');
        const button=menu.querySelector('button');
        button.addEventListener('click', (e)=>{
            e.preventDefault();
            options.classList.toggle('hidden');
        });
        options.querySelectorAll('button').forEach(option=>{
            option.addEventListener('click', (e)=>{
                e.preventDefault();
                button.textContent=option.textContent;
                options.classList.add('hidden');
            });
        });
    });

// form submission 
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const title=document.getElementById('title').value;
        const description=document.getElementById('description').value;
        const date=document.getElementById('date').value;// check this!
        const priority=document.querySelector(#priority-menu button);
        const state=document.querySelector(#state-menu button);
        if(!title || !description || priority==='Priority' || state==='State'){
            alert.classList.remove('hidden');
            return;
        }
        createTaskPopup(title, date, description, priority, state);
        form.reset();
        alert.classList.add('hidden');
    });

// createTask 
function createTask(title, description, date, state, priority){
    const task=document.createElement('div');
        task.className='task';
        const borderColor={
            'P1': 'border-red',
            'P2': 'border-orange',
            'P3': 'border-green',
        }[priority];
    task.classList.add(borderColor);
        task.innerHTML=`
        <h3 class="font-bold mb-2">${title}</h3>
        <h6 class="text-8xl mb-3">${description}</h6>
        <div class="flex justidy-between items-center">
            <span class="font-bold mb-2">${priority}</span>
            <select class="text-xs border-rounded px-1">
                <option ${state==='To Do'? 'selected' : ''}>To Do</option>
                <option ${state==='Doing'? 'selected' : ''}>Doing</option>
                <option ${state==='Completed'? 'selected' : ''}>Completed</option>
            </select>
        </div>
        `;
    const container={
        'To Do':todoTasks,
        'Doing':inprogressTasks,
        'Completed':doneTasks
    }[state];
    const select=task.querySelector('select').addEventListener('change', ()=>{
        const newContainer={
            'To Do':todoTasks,
            'Doing':inprogressTasks,
            'Completed':doneTasks
        }[state.value];
        newContainer.appendChild(task);
        updateCounts();
    });
}
function updateCounts(){
    todoCount.textContent=todoTasks.children.length;
    inprogressCount.textContent=inprogressTasks.children.length;
    doneCount.textContent=doneTasks.children.length;
}