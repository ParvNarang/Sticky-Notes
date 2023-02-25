const notesContainer = document.getElementById("app");
const addNoteButton = document.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const div1 = document.createElement("div");
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    const closebtn = document.createElement("button")
    closebtn.classList.add("closeBtn");
    closebtn.innerHTML = "X";
    div1.appendChild(element);
    div1.appendChild(closebtn);

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    closebtn.addEventListener("click", () => {
        //     const doDelete = confirm("Do you wish to delete this note?");
        //     if (doDelete) {
        //         deleteNote(id, div1);
        //     }
        deleteNote(id, div1);
    });
    return div1;
}

function addNote() {
    const notes = getNotes();
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = weekday[new Date().getDay()];
    let date = new Date().toLocaleDateString();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: day + " " + date + "\n\n"
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
    console.log("updated");
}

function deleteNote(id, div1) {
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    notesContainer.removeChild(div1);
}