// Deklarerar variabler.
var saveCourseEl = document.getElementById("saveCourse");
var resetFormEl = document.getElementById("resetForm");
var listEl = document.getElementById("list");
var listContainerEl = document.getElementById("list-container");
// Händelselyssnare för knappar.
saveCourseEl.addEventListener("click", saveCourse, false);
resetFormEl.addEventListener("click", function () { return document.getElementById("coursesForm").reset(); });
// Funktion för att lägga till/spara en kurs. 
function saveCourse() {
    // Lagrar input från fälten för namn, kod, progression och url.
    var nameInput = document.getElementById("courseName").value;
    var codeInput = document.getElementById("courseCode").value;
    var progressionInput = document.querySelector('input[name="progression"]:checked').value;
    var syllabusInput = document.getElementById("courseSyllabus").value;
    // Lagrar kurs i interfacen.
    var newCourse = {
        name: nameInput,
        code: codeInput,
        progression: progressionInput,
        syllabus: syllabusInput
    };
    // Kontrollerar att alla kursfält är ifyllda.
    if (codeInput.length === 0 || nameInput.length === 0 || syllabusInput.length === 0) {
        alert("Alla fält behöver fyllas i!");
    }
    else {
        addToDOM(newCourse);
    }
}
// Funktion för att skriva ut till DOM.
function addToDOM(newCourse) {
    // Hämta input och skriv ut en div med tillagd kurs som en lista.
    listEl.innerHTML = "\n        <div id=\"".concat(newCourse.code, "\">\n            <ul>\n                <li>Kursnamn: ").concat(newCourse.name, "</li>\n                <li>Kurskod: ").concat(newCourse.code, "</li>\n                <li>Progression: ").concat(newCourse.progression, "</li>\n                <li><a href=").concat(newCourse.syllabus, ">L\u00E4s kursplanen h\u00E4r!</a></li>\n            </ul>\n        </div>\n    ");
    // Lägger till kursen i listan.
    listContainerEl.appendChild(listEl);
    // Rensa formuläret.
    document.getElementById("coursesForm").reset();
}
function resetForm() {
}
