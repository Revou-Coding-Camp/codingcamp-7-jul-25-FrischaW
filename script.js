const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function renderTasks(filtered = tasks) {
  taskList.innerHTML = "";

  if (filtered.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="4">Tidak ada tugas</td>`;
    taskList.appendChild(row);
    return;
  }

  filtered.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date}</td>
      <td>${task.completed ? "Selesai" : "Belum"}</td>
      <td>
        <button onclick="toggleStatus(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

addBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  const date = dateInput.value;

  if (!name || !date) {
    alert("Isi tugas dan tanggal!");
    return;
  }

  tasks.push({ name, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
});

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Yakin hapus semua?")) {
    tasks = [];
    renderTasks();
  }
});

filterBtn.addEventListener("click", () => {
  const filterDate = dateInput.value;
  if (!filterDate) {
    renderTasks();
    return;
  }

  const filtered = tasks.filter(task => task.date === filterDate);
  renderTasks(filtered);
});

function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}