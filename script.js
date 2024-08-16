document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const tasksList = document.getElementById('tasks');
    const pointsDisplay = document.getElementById('points');
    const fireCountDisplay = document.getElementById('fire-count');
    const themeToggle = document.getElementById('theme-toggle');
    
    let points = 0;
    let fireCount = parseInt(localStorage.getItem('fireCount')) || 0;

    const updatePoints = () => {
        pointsDisplay.textContent = points;
    };

    const updateFireCount = () => {
        fireCountDisplay.textContent = fireCount;
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${taskText} <button class="complete-task">Concluir</button>
        `;
        tasksList.appendChild(taskItem);

        taskInput.value = '';
    };

    const handleTaskCompletion = (e) => {
        if (e.target.classList.contains('complete-task')) {
            points += 10;
            fireCount++;
            updatePoints();
            updateFireCount();
            localStorage.setItem('fireCount', fireCount);
            e.target.parentElement.remove();
        }
    };

    const toggleTheme = () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode', !isDarkMode);
        themeToggle.textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
    };

    addTaskButton.addEventListener('click', addTask);
    tasksList.addEventListener('click', handleTaskCompletion);
    themeToggle.addEventListener('click', toggleTheme);

    updatePoints();
    updateFireCount();
});
