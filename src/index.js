import "./style.css";

document.addEventListener("DOMContentLoaded", function() {

  function createToDo(title, priority, duedate, description, project, done, id) {
    const todoId = id || generateUniqueId();
    
    return {
      title,
      priority,
      duedate,
      description,
      project,
      done,
      id: todoId
    };
  }

  function createProject(title, id) {
    const projectId = id || generateUniqueId();
    
    return {
      title,
      id: projectId
    };
  }

let myToDos = [];
let doneList = [];
let myProjects = [];

function addToDo(title, priority, duedate, description, project, done) {
  let todo = createToDo(title, priority, duedate, description, project, done, false);
  console.log(`I created the todo associated with project ${project.title}`);
  myToDos.push(todo);
  saveData( "todos", myToDos);
}

function addProject(title) {
  let project = createProject(title);
  myProjects.push(project);
  saveData( "projects", myProjects);
}

function checkLocalStorage(key, examples) {
  function examples(examples){
    if (examples == 'defaultToDos'){
    const defaultToDos = [addToDo('go for a run', 'B', '2002', 'lorem ipsum lorem ipsum', myProjects[0] , false), addToDo('walk the dog', 'A', '2004',  'lorem ipsum lorem ipsum', myProjects[1], false), addToDo('clean the bathroom', 'C', '2001', 'lorem ipsum lorem ipsum', myProjects[2], false)];
    }
    else {
      const defaultProjects = [addProject('no project'), addProject('Renovate House'), addProject('Redesign Backyard'), addProject('Odin Project')];
    }
  }
  var data = localStorage.getItem(key);
  console.log(`get Item ${data}`);
  data = data ? JSON.parse(data) : examples();

  return data;
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


myProjects = checkLocalStorage("projects", 'defaultProjects');
myToDos = checkLocalStorage("todos", 'defaultToDos');

function displayToDos(todo_array) {
  const table = document.getElementById('toDoTable');

  //delete existing rows 
  while (table.rows.length > 1) {
      table.deleteRow(1);
    }  
  //create a table with the content of todo_array
  for (let i=0; i < todo_array.length; i++) {
      let todo = todo_array[i];
      let row = document.createElement('tr');

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

      let projectCell = document.createElement('td');
      projectCell.textContent = todo.project ? todo.project.title : "No Project"; // Check if todo.project is defined
      row.appendChild(projectCell);

      let doneCell = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.id = 'doneCheckbox_' + todo_array.indexOf(todo);
      checkbox.checked = todo.done;

      checkbox.addEventListener('change', function() {
        handleCheckboxChange(todo, todo_array);
      });

      doneCell.appendChild(checkbox);
      row.appendChild(doneCell);

      let deleteCell = document.createElement('td');
      let deleteIcon = document.createElement('img');
      deleteIcon.src = 'trash-can.png'; 
      deleteIcon.alt = 'Dynamic Image';
      deleteIcon.className = 'deleteIcon';
      deleteIcon.width = 25;
      deleteIcon.id = 'deleteIconClicked_' + todo_array.indexOf(todo);
      deleteCell.appendChild(deleteIcon); 

      deleteIcon.addEventListener('click', function() {
        handleDeleteIconClicked(todo, todo_array);
      });

      row.appendChild(deleteCell)
      table.appendChild(row);
  }
  function handleCheckboxChange(todo, my_todo_array) {
    todo.done = !todo.done;
    if (todo.done) {
      doneList.push(todo);
      let index = myToDos.findIndex(obj => obj.id === todo.id);
      myToDos.splice(index, 1);

      if (my_todo_array != myToDos) {
        let index = my_todo_array.findIndex(obj => obj.id === todo.id);
        my_todo_array.splice(index, 1);
      }

    } else {

      myToDos.push(todo);
      let index = doneList.findIndex(obj => obj.id === todo.id);
      doneList.splice(index, 1);
    }
    setTimeout(() => {
      displayToDos(my_todo_array);
    }, 500);
    saveData("todos", myToDos);
  }

  function handleDeleteIconClicked(todo, todo_array) {
    let index = todo_array.findIndex(obj => obj.id === todo.id);
    if (index !== -1) {
      todo_array.splice(index, 1);
      console.log(`Object with id ${todo.id} deleted successfully.`);
    }
      displayToDos(todo_array);
      saveData("todos", myToDos);
  }

  
}
displayToDos(myToDos);

function displayProjects() {
  const table = document.getElementById('projectTable');

  //delete existing rows 
  while (table.rows.length > 1) {
      table.deleteRow(1);
    }  
  //create a table with the content of myToDos array
  for (let i=1; i < myProjects.length; i++) {
      let project = myProjects[i];
      let row = document.createElement('tr');
      let titleCell = document.createElement('td');
      titleCell.textContent = project.title;
      titleCell.addEventListener('click', function(){
        displayTodosForProject(project.id);
      });
      row.appendChild(titleCell);

      let deleteCell = document.createElement('td');
      let deleteIcon = document.createElement('img');
      deleteIcon.src = 'trash-can.png'; 
      deleteIcon.alt = 'Dynamic Image';
      deleteIcon.className = 'deleteIcon';
      deleteIcon.width = 25;
      deleteIcon.id = 'deleteIconClicked_' + myProjects.indexOf(project);
      deleteCell.appendChild(deleteIcon); 

      deleteIcon.addEventListener('click', function() {
        handleDeleteIconClicked(project, myProjects);
      });

      row.appendChild(deleteCell)
      table.appendChild(row);
  }

  function handleDeleteIconClicked(project, myProjects) {
    let index = myProjects.findIndex(obj => obj.id === project.id);
    if (index !== -1) {
      myProjects.splice(index, 1);
      console.log(`Object with id ${project.id} deleted successfully.`);
      checkForToDos(project);
    }
      displayProjects();
      upDateProjectOptions();
      saveData("projects", myProjects);
  }  

  function checkForToDos(project){
    for(let i=0; i<myToDos.length; i++){
      if(myToDos[i].project == project){
        myToDos[i].project = myToDos[0].project;
        displayToDos(myToDos);
      }
    }
  }

  function displayTodosForProject(projectId) {
    const todosForProject = myToDos.filter(todo => todo.project.id === projectId); 
    displayToDos(todosForProject);
  }
}
displayProjects();

function add_Inbox_EventListener() {
  let inbox_button = document.getElementById('inbox_button');
  inbox_button.addEventListener('click', function(){
    displayToDos(myToDos);
  });
}
add_Inbox_EventListener();

function add_Done_EventListener() {
  let done_button = document.getElementById('done_list');
  console.log('done clicked 1');
  done_button.addEventListener('click', function(){
    displayToDos(doneList);
    console.log('done clicked 2');
  });
}
add_Done_EventListener();

function addSubmitEventListener_ToDo() {
  document.getElementById('AddNewToDo').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = document.getElementById('todo_title').value;
    var priority = document.getElementById('prio').value;
    var dueDate = document.getElementById('year').value;
    var description = document.getElementById('description').value;

    document.getElementById('todo_title').value = "";
    document.getElementById('prio').value = "";
    document.getElementById('year').value = "";
    document.getElementById('description').value = "";
    var selectedProjectId = document.getElementById('associated_project').value; // Get the project ID
    console.log(`project id is ${selectedProjectId}`);
    var project = null;
    // Find the project object corresponding to the selected project ID
    for (let i=0; i<myProjects.length; i++) {
      console.log(`checking project ${i}`);
      console.log(`checking project ${i}: ${myProjects[i].title}`);
      console.log(`checking project ${i}: ${myProjects[i].id}`);
      console.log(`selected project id is ${selectedProjectId}`);
      if (myProjects[i].id == selectedProjectId){
        project = myProjects[i];
        break;
      } else {
        project = myProjects[1];
      }
    }
    console.log(`project title is ${myProjects[1].title}`);
    


    //console.log('something wrong');

    addToDo(title, priority, dueDate, description, project, false);
    displayToDos(myToDos);
  })

}

function addSubmitEventListener_Project() {
  document.getElementById('AddNewProject').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = document.getElementById('project_title').value;
    document.getElementById('project_title').value = "";
    addProject(title);
    displayProjects();
    upDateProjectOptions();
  });

}


//show form to create a new to do 
document.getElementById('addToDo').addEventListener('click', function() {
  let form = document.getElementById('AddNewToDo');
  if (form.style.display === 'none') {
    form.style.display = 'block';
    upDateProjectOptions();
    addSubmitEventListener_ToDo();
  } else {
    form.style.display = 'none';
  }
});


//show form to create a new project
document.getElementById('addProject').addEventListener('click', function() {
  let form = document.getElementById('AddNewProject');
  if (form.style.display === 'none') {
    form.style.display = 'block';
    addSubmitEventListener_Project();
  } else {
    form.style.display = 'none';
  }
});

//create unique id
function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}


function upDateProjectOptions(){
  let selectElement = document.getElementById('associated_project');
  selectElement.innerHTML = '';
  myProjects.forEach(projectObject => {
    let option = document.createElement('option');
    option.value = projectObject.id;
    option.textContent = projectObject.title;
    selectElement.appendChild(option);
  });
}
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
if (storageAvailable("localStorage")) {
  console.log('Yippee! We can use localStorage awesomeness');
} else {
  console.log('no local storage');
  // Too bad, no localStorage for us
}
storageAvailable('sessionStorage')

});