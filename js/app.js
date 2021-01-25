//call this function on load of page so as to show already added notes
showNotes();

let addBtn = document.getElementById('addBtn');
/***call a event when clicked on add button to add the
 notes to local storage and also display it in the UI**/
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let noteslocal = localStorage.getItem("notes");
    if (noteslocal == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(noteslocal);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
})

//Function to show the added notes which is stored in local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}"  onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>`;
        let notesElement = document.getElementById('notes');
        if (notesObj.length != 0)
            notesElement.innerHTML = html;
        else
            notesElement.innerHTML = `Nothing to show.Use Add note section to add notes`;
    })
};


//function to delete notes
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    console.log("deleted");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
};

/* Get the notes based on typed text in the search text  */
search = document.getElementById('searchTxt');
search.addEventListener("input", function (element) {
    let inputValue = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardValue = element.getElementsByTagName("p")[0].innerText;
        if (cardValue.toLowerCase().includes(inputValue))
            element.style.display = "block";
        else
            element.style.display = "none";
    })
})

btnSearch = document.getElementById('btnTxt');
btnSearch.addEventListener("click", function (element) {
    search = document.getElementById('searchTxt');
    let inputValue = search.value.toLowerCase();
console.log(inputValue);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardValue = element.getElementsByTagName("p")[0].innerText;
        if (cardValue.toLowerCase().includes(inputValue))
            element.style.display = "block";
        else
            element.style.display = "none";
    })
    element.preventDefault();
})

