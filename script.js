// Função para carregar as tarefas do localStorage ou inicializar uma lista vazia
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = 'Remover';
        button.onclick = () => removeTask(task.text);
        li.textContent = task.text;
        if (task.completed) {
             li.classList.add('completed');
        }
        li.appendChild(button);
        taskList.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa à lista
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        loadTasks();
    }
}

// Função para remover uma tarefa da lista
function removeTask(taskTextToRemove) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskTextToRemove);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks();
}

// Função para marcar uma tarefa como concluída
function toggleCompleted(task) {
    task.completed = !task.completed;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Carregar tarefas quando a página carregar
window.onload = loadTasks;