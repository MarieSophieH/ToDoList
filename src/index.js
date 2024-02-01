import "./style.css";

document.addEventListener("DOMContentLoaded", function() {

  function createToDo(title, priority, duedate, description, done, id) {
    const todoId = id || generateUniqueId();
    
    return {
      title,
      priority,
      duedate,
      description,
      done,
      id: todoId
    };
  }

let myToDos = [];
let doneList = [];

function addToDo(title, priority, duedate, description, done) {
  let todo = createToDo(title, priority, duedate, description, done, false);
  myToDos.push(todo);
}

addToDo('go for a run', 'B', '2002', 'lorem ipsum lorem ipsum', false);
addToDo('walk the dog', 'A', '2004',  'lorem ipsum lorem ipsum', false);
addToDo('clean the bathroom', 'C', '2001', 'lorem ipsum lorem ipsum', false);

function displayToDos() {
  const table = document.getElementById('toDoTable');

  //delete existing rows 
  while (table.rows.length > 1) {
      table.deleteRow(1);
    }  
  //create a table with the content of myToDos array
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

      let doneCell = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'doneCheckbox_' + myToDos.indexOf(todo);
      checkbox.checked = todo.done;

      checkbox.addEventListener('change', function() {
        handleCheckboxChange(todo);
      });

      doneCell.appendChild(checkbox);
      row.appendChild(doneCell);

      let deleteCell = document.createElement('td');
      let deleteIcon = document.createElement('img');
      deleteIcon.src = 'trash-can.png'; 
      deleteIcon.alt = 'Dynamic Image';
      deleteIcon.className = 'deleteIcon';
      deleteIcon.width = 25;
      deleteIcon.id = 'deleteIconClicked_' + myToDos.indexOf(todo);
      deleteCell.appendChild(deleteIcon); 

      deleteIcon.addEventListener('click', function() {
        handleDeleteIconClicked(todo);
      });

      row.appendChild(deleteCell)
      table.appendChild(row);
  }
  function handleCheckboxChange(todo) {
    todo.done != todo.done;
    if (todo.done) {
      myToDos.push(todo);
      let index = doneList.findIndex(obj => obj.id === todo.id);
      doneList.splice(index, 1);
    } else {
      doneList.push(todo);
      let index = myToDos.findIndex(obj => obj.id === todo.id);
      myToDos.splice(index, 1);
    }
    setTimeout(() => {
      displayToDos();
    }, 500);
  }

  function handleDeleteIconClicked(todo) {
    let index = myToDos.findIndex(obj => obj.id === todo.id);
    if (index !== -1) {
      myToDos.splice(index, 1);
      console.log(`Object with id ${todo.id} deleted successfully.`);
    }
      displayToDos();

  }
  
}

displayToDos();

function addSubmitEventListener() {
  document.getElementById('AddNewToDo').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = document.getElementById('title').value;
    var priority = document.getElementById('prio').value;
    var dueDate = document.getElementById('year').value;
    var description = document.getElementById('description').value;

    addToDo(title, priority, dueDate, description);
    displayToDos();
  })

}


//show form to create a new to do 
document.getElementById('addToDo').addEventListener('click', function() {
  let form = document.getElementById('AddNewToDo');
  if (form.style.display === 'none') {
    form.style.display = 'block';
    addSubmitEventListener();
  } else {
    form.style.display = 'none';
  }
});

//checkbox event listener
document.getElementById('')


//create unique id
function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

});