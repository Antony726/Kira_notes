var cn = document.querySelector(".cnt");

// Load notes from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    loadNotes();
});

function poppp() {
    var popup = document.querySelector(".popup");
    popup.style.display = "flex";
    var ove = document.querySelector(".overlay");
    ove.style.display = "block";
}

function okk() {
    var he = document.getElementById("Head");
    var notee = document.getElementById("note");

    var noteObject = {
        topic: he.value,
        content: notee.value
    };

    var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
    existingNotes.push(noteObject);
    localStorage.setItem('notes', JSON.stringify(existingNotes));

    var div = createNoteElement(noteObject);
    cn.append(div);

    var popup = document.querySelector(".popup");
    popup.style.display = "none";
    var ove = document.querySelector(".overlay");
    ove.style.display = "none";

    alert("Note Added!!!");
}

function cancell() {
    var popup = document.querySelector(".popup");
    popup.style.display = "none";
    var ove = document.querySelector(".overlay");
    ove.style.display = "none";
}

function loadNotes() {
    var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Clear the existing content in the .cnt container
    cn.innerHTML = "";

    // Loop through existing notes and add them to the UI
    for (var i = 0; i < existingNotes.length; i++) {
        var div = createNoteElement(existingNotes[i]);
        cn.append(div);
    }
}

function createNoteElement(noteObject) {
    var div = document.createElement("div");
    div.setAttribute("class", "inner");
    div.innerHTML = `<h2>${noteObject.topic}</h2>
                    <p>${noteObject.content}</p>
                    <button onclick="del(event)">Delete</button>`;
    return div;
}

function del(event) {
    var deletedElement = event.target.parentElement;

    // Remove the corresponding note from local storage
    removeFromLocalStorage(deletedElement);

    // Remove the note from the UI
    deletedElement.remove();
}

function removeFromLocalStorage(deletedElement) {
    var topic = deletedElement.querySelector("h2").innerText;
    var content = deletedElement.querySelector("p").innerText;

    var deletedNotes = JSON.parse(localStorage.getItem('deletedNotes')) || [];
    deletedNotes.push({ topic: topic, content: content });
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));

    var existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Find the index of the note to be deleted
    var noteIndex = existingNotes.findIndex(function(note) {
        return note.topic === topic && note.content === content;
    });

    // Remove the note from the array
    if (noteIndex !== -1) {
        existingNotes.splice(noteIndex, 1);

        // Save the updated array back to local storage
        localStorage.setItem('notes', JSON.stringify(existingNotes));
    }
}
