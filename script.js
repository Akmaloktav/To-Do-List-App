const container = document.querySelector(".container");
const taskValue = document.querySelector(".input-group input");
const ul = document.querySelector(".list-group");


// Tangkap event pada inputan
// jika sudah ditangkap simpan ke local storage
// Jika sudah disimpan ambil dari local storage lalu tampilkan pada halaman

// Ketika suatu tombol di klik
container.addEventListener("click", function(event){
    const tasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    const marks = JSON.parse(localStorage.getItem("marks")) || [];

    // Memasukkan data daftar pekerjaan
    if (event.target.classList.contains("addTask") && taskValue.value !== "") {

        tasks.push(taskValue.value);
        localStorage.setItem("toDoList", JSON.stringify(tasks));
        
        displayTask();
        taskValue.value = "";

        event.preventDefault();
        event.stopPropagation();

        
    // Memberi tanda pekerjaan yang telah diselesaikan 
    } else if(event.target.classList.contains("bi-check-circle-fill")) {
        marks.push(event.target.parentElement.parentElement.innerText);
        localStorage.setItem("marks", JSON.stringify(marks));

        event.target.parentElement.parentElement.style.textDecoration = "line-through";
        
    // Menghapus pekerjaan yang telah atau tidak ingin dikerjakan
    } else if (event.target.classList.contains("bi-trash-fill")) {
        const removeList = event.target.parentElement.parentElement.innerText
        event.target.parentElement.parentElement.remove();

        // Hapus Kegiatan telah/ingin dikerjakan
        let removeTask = tasks.filter(function(task) {
            return task !== removeList;
        });
        
        // Hapus kegiatan yang telah dikerjakan
        let removeMark = marks.filter(function(mark) {
            return mark !== removeList;
        });

        localStorage.setItem("toDoList", JSON.stringify(removeTask));
        localStorage.setItem("marks", JSON.stringify(removeMark));

        displayTask();
    }

});


// Menanpilkan daftar pekerjaan ke Halaman
function displayTask(){
    ul.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    const marks = JSON.parse(localStorage.getItem("marks")) || [];
    

    if (tasks.length === 0) {
        const createLi = document.createElement("li");
        createLi.classList.add("list-group-item", "d-flex", "justify-content-between");

        const teksLI = document.createTextNode("Belum ada tugas yang dimasukkan");
        createLi.appendChild(teksLI);
        ul.appendChild(createLi);

    } else {
        tasks.forEach(task => {
            const createLi = document.createElement("li");
            createLi.classList.add("list-group-item", "d-flex", "justify-content-between");
    
            const teksLI = document.createTextNode(task);
    
            createLi.appendChild(teksLI);
    
            const createSpan = document.createElement("span");
            const iconCheck = document.createElement("i");
            iconCheck.classList.add("bi", "bi-check-circle-fill", "btn", "btn-sm", "btn-primary");

            const iconTrash = document.createElement("i");
            iconTrash.classList.add("bi", "bi-trash-fill", "btn", "btn-sm", "btn-danger", "ms-2");
    
            createSpan.appendChild(iconCheck);
            createSpan.appendChild(iconTrash);
    
            createLi.appendChild(createSpan);

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

displayTask();