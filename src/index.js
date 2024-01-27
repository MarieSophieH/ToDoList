import "./style.css";

document.addEventListener("DOMContentLoaded", function() {

function createToDo(title, priority, duedate, description, status) {
  return {
    title,
    priority,
    duedate,
    description,
    status
  };
}

let myToDos = [];

function addToDo(title, priority, duedate, description, status) {
  let todo = createToDo(title, priority, duedate, description, status);
  myToDos.push(todo);
}

addToDo('go for a run', 'B', '2002', 'lorem ipsum lorem ipsum', false);
addToDo('walk the dog', 'A', '2004',  'lorem ipsum lorem ipsum', false);
addToDo('clean the bathroom', 'C', '2001', 'lorem ipsum lorem ipsum', false);

function displayToDos() {
  const table = document.getElementById('toDoTable');

  while (table.rows.length > 1) {
      table.deleteRow(1);
    }  

  for (let i=0; i < myToDos.length; i++) {
      let todo = myToDos[i];
      let row = document.createElement('tr');
      row.setAttribute('data-index', i);
      let titleCell = document.createElement('td');
      titleCell.textContent = todo.title;
      row.appendChild(titleCell);

      let prioCell = document.createElement('td');
      prioCell.textContent = todo.priority;
      row.appendChild(prioCell);

      let dueDateCell = document.createElement('td');
      dueDateCell.textContent = todo.duedate;
      row.appendChild(dueDateCell);

      let descriptionCell = document.createElement('td');
      descriptionCell.textContent = todo.description;
      row.appendChild(descriptionCell);

      let statusCell = document.createElement('td');
      let status = document.createElement('button');
      status.className = 'statusButton';
      if (todo.status == true) {
          status.textContent = 'done'
      } else {
          status.textContent = 'not done'
      }
      statusCell.appendChild(status);
      row.appendChild(statusCell);

      let deleteCell = document.createElement('td');
      let deletebutton = document.createElement('button');
      deletebutton.className = 'deleteButton';
      deletebutton.textContent = 'Delete';
      deleteCell.appendChild(deletebutton);
      row.appendChild(deleteCell)

      table.appendChild(row);
  }
}

displayToDos();

document.getElementById('addToDo').addEventListener('click', function() {
  let form = document.getElementById('AddNewToDo');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});

});