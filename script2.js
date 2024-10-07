const container = document.querySelector(".container");
const inputTask = document.querySelector(".input-group input");
const ul = document.querySelector(".list-group");


// Tangkap event pada inputan
// jika sudah ditangkap simpan ke local storage
// Jika sudah disimpan ambil dari local storage lalu tampilkan pada halaman


// Ketika suatu tombol di klik
container.addEventListener("click", function(event){
    const tasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    const marks = JSON.parse(localStorage.getItem("marks")) || [];
    const eventTarget = event.target;
    const inputValue = inputTask.value;

    if (eventTarget.classList.contains("addTask")) {
        addTask(inputValue, tasks);

    } else if(eventTarget.classList.contains("bi-check-circle-fill")) { 
       completedTask(eventTarget, marks);
        
    } else if (eventTarget.classList.contains("bi-trash-fill")) {
        removeTask(eventTarget, tasks, marks);
    }

    displayTask();

    event.preventDefault();
    event.stopPropagation();

});


// Menanpilkan daftar pekerjaan ke Halaman
function displayTask(){
    ul.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    const marks = JSON.parse(localStorage.getItem("marks")) || [];
    
    if (tasks.length === 0) {
        const createLi = document.createElement("li");
        createLi.classList.add("list-group-item", "d-flex", "justify-content-between");

        const teksLI = document.createTextNode("Belum ada tugas yang dikerjakan");
        createLi.appendChild(teksLI);
        ul.appendChild(createLi);
    } else {
        tasks.forEach(task => {
            const createLi = createDoList(task);
            
            // Penambahan mark ketika di load
            marks.forEach(mark => {
                if (mark == task) {
                    createLi.style.textDecoration = "line-through";
                }
            });
    
            ul.appendChild(createLi);
        });
    }

}


// Membuat data daftar pekerjaan
function addTask(inputValue, tasks) {
    if (tasks.includes(inputValue)) {
        alert("Data Sudah ditambahkan!");

        inputTask.value = "";

    } else if(inputValue !== "") {
        tasks.push(inputValue);
        localStorage.setItem("toDoList", JSON.stringify(tasks));

        inputTask.value = "";
    }
        
}


// Memberi tanda pekerjaan yang telah diselesaikan
function completedTask(eventTarget, marks) {
    marks.push(eventTarget.parentElement.parentElement.innerText);
    localStorage.setItem("marks", JSON.stringify(marks));

    eventTarget.parentElement.parentElement.style.textDecoration = "line-through";
}


// Menghapus pekerjaan yang telah atau tidak ingin dikerjakan
function removeTask(eventTarget, tasks, marks) {
    const removeList = eventTarget.parentElement.parentElement.innerText
    eventTarget.parentElement.parentElement.remove();

    // Hapus Kegiatan telah/ingin dikerjakan dari daftar
    let removeTask = tasks.filter(function(task) {
        return task !== removeList;
    });
        
    // Hapus kegiatan yang telah dikerjakan dari daftar
    let removeMark = marks.filter(function(mark) {
        return mark !== removeList;
    });

    localStorage.setItem("toDoList", JSON.stringify(removeTask));
    localStorage.setItem("marks", JSON.stringify(removeMark));
}


// Membuat list daftar pekerjaan
function createDoList(teksNode) {
    const createLi = document.createElement("li");
    createLi.classList.add("list-group-item", "d-flex", "justify-content-between");

    const teksLI = document.createTextNode(teksNode);
    createLi.appendChild(teksLI);

    const createSpan = document.createElement("span");
    const iconCheck = addClassIcon("bi bi-check-circle-fill", "btn btn-sm btn-primary")
    const iconTrash = addClassIcon("bi bi-trash-fill", "btn btn-sm btn-danger ms-2");

    createSpan.appendChild(iconCheck);
    createSpan.appendChild(iconTrash);
    createLi.appendChild(createSpan);

    return createLi;
}


// Menambah icon completed dan trash
function addClassIcon(iconClass,  btnClass) {
    const createElementIcon = document.createElement("i");
    createElementIcon.classList.add(...iconClass.split(" "), ...btnClass.split(" "));

    return createElementIcon;
}

displayTask();