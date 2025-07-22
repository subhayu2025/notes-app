// Load notes when page loads
window.onload = function () {
    showNotes();
};

// Add or update a note
function addnote() {
    const noteInput = document.getElementById("noteinput");
    const notes = getNotes();
    const editIndex = noteInput.dataset.editing;

    if (noteInput.value.trim() === "") {
        alert("Please write something.");
        return;
    }

    if (editIndex !== undefined && editIndex !== "") {
        // Update note
        notes[editIndex] = noteInput.value;
        noteInput.removeAttribute("data-editing");
    } else {
        // Add new note
        notes.push(noteInput.value);
    }

    saveNotes(notes);
    noteInput.value = "";
    showNotes();
}

// Get notes from localStorage
function getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

// Save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Show all notes
function showNotes() {
    const notes = getNotes();
    const notesList = document.getElementById("Noteslist");
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const noteCard = document.createElement("div");
        noteCard.className = "note-card";
        noteCard.innerHTML = `
            <p>${note}</p>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesList.appendChild(noteCard);
    });
}

// Delete a note
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    showNotes();
}

// Edit a note
function editNote(index) {
    const notes = getNotes();
    const noteInput = document.getElementById("noteinput");
    noteInput.value = notes[index];
    noteInput.dataset.editing = index;
}

// Search functionality
document.querySelector(".search-div + button").addEventListener("click", function () {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const noteCards = document.querySelectorAll(".note-card");

    noteCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(searchValue) ? "block" : "none";
    });
});


noteCard.innerHTML = `
    <p>${note}</p>
    <div class="btn-group">
        <button class="edit-btn" onclick="editNote(${index})"> Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})"> Delete</button>
    </div>`;
