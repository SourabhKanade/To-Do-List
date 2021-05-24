console.log(`lets do this`);
showNotes();

//If user adds a note add it to a Local Storage 
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
})

// Function to show elements from localStorage
//document.onload = showNotes();        (THIS MEANS WHEN WE RELOAD PAGE OUR NOTES WILL NOT ERASE)
function showNotes() {
    notes = JSON.parse(localStorage.getItem("notes"));
    let notesObj;

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = notes;
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
    <div class="notecard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h1 class="card-title">Notes ${index + 1}</h1>
          <p class="cardtext"> ${element}</p>
          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
        </div>
      </div>`;
    });
    notesElm = document.getElementById(`notes`);
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Please Add Note!`;
    }
}

// Function to delete a note
function deleteNote(index) {
    console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
};

//SEARCH FOR THE NOTES USER ADDED //
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {
        let notecard = element.getElementsByTagName("p")[0].innerText;
        if (notecard.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        console.log(notecard);
    })
});