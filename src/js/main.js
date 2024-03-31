// Deklarerar variabler.
var saveCourseEl = document.getElementById("saveCourse");
var resetFormEl = document.getElementById("resetForm");
var listContainerEl = document.getElementById("list-container");
var clearCoursesEl = document.getElementById("clear");
// Händelselyssnare för knappar.
saveCourseEl.addEventListener("click", saveCourse, false);
resetFormEl.addEventListener("click", function () { return document.getElementById("coursesForm").reset(); });
clearCoursesEl.addEventListener("click", clearCourses, false);
// Funktion som hämtar sparade kurser i localStorage vid sidladdning.
window.onload = function () {
    // Hämtar information från localStorage.
    var savedCourses = localStorage.getItem('courses');
    // Kontrollerar om det finns sparade kurser.
    if (savedCourses) {
        var courses = JSON.parse(savedCourses);
        courses.forEach(function (course) {
            addCourse(course);
        });
    }
};
// Funktion för att lägga till/spara en kurs. 
function saveCourse() {
    var _a;
    // Lagrar input från fälten för namn, kod, progression och url.
    var nameInput = document.getElementById("courseName").value;
    var codeInput = document.getElementById("courseCode").value;
    var progressionInput = (_a = document.querySelector('input[name="progression"]:checked')) === null || _a === void 0 ? void 0 : _a.value;
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
        // Skickar ett meddelande till användaren.
        alert("Alla fält behöver fyllas i!");
        return;
    }
    // Kontrollerar om kurskoden redan är tillagd.
    var doesCourseCodeExist = document.querySelector("[data-code=\"".concat(codeInput, "\"]"));
    if (doesCourseCodeExist) {
        // Skickar ett meddelande till användaren. 
        if (confirm("Denna kurs redan lagts till. Vill du uppdatera kursinformationen?")) {
            // Skriver över tidigare information med ny.
            doesCourseCodeExist.innerHTML = "\n                <ul>\n                    <li>Kursnamn: ".concat(newCourse.name, "</li>\n                    <li>Kurskod: ").concat(newCourse.code, "</li>\n                    <li>Progression: ").concat(newCourse.progression, "</li>\n                    <li>Kursplan: <a href=").concat(newCourse.syllabus, ">L\u00E4nk!</a></li>\n                </ul>\n            ");
            // Rensar formuläret.
            document.getElementById("coursesForm").reset();
            // Sparar den uppdaterade kurslistan till localStorage.
            updateListToStorage(newCourse);
        }
        // Om kursen inte är tillagd, kör en utskrifts-funktion, sparar till localStorage och rensar formulär.
    }
    else {
        // Utskriftsfunktion.
        addCourse(newCourse);
        // Rensar formuläret.
        document.getElementById("coursesForm").reset();
        // Sparar till localStorage.
        updateListToStorage(newCourse);
    }
}
// Funktion som skriver ut kurs i DOM.
function addCourse(newCourse) {
    // Skapar ett nytt div-element.
    var newListItemEl = document.createElement("div");
    // Sätter ett ID på elementet.
    newListItemEl.setAttribute("id", "list");
    // Sätter ett anpassat attribut på elementet.
    newListItemEl.setAttribute("data-code", newCourse.code);
    // Skriver ut till DOM.
    newListItemEl.innerHTML += "\n        <ul>\n            <li>Kursnamn: ".concat(newCourse.name, "</li>\n            <li>Kurskod: ").concat(newCourse.code, "</li>\n            <li>Progression: ").concat(newCourse.progression, "</li>\n            <li>Kursplan: <a href=").concat(newCourse.syllabus, ">L\u00E4nk!</a></li>\n        </ul>\n    ");
    // Lägger till kursen i listan.
    listContainerEl.appendChild(newListItemEl);
}
// Funktion som sparar/uppdaterar kurslistan i localStorage.
function updateListToStorage(newCourse) {
    // Läser in sparade kurser från localStorage om sådana finns, annars skapas en tom array.
    var courses = JSON.parse(localStorage.getItem("courses") || "[]");
    // Lokaliserar index för den kurs som ska uppdateras.
    var index = courses.findIndex(function (course) { return course.code === newCourse.code; });
    // Villkorssats; om kursen finns i listan - uppdatera informationen, annars - lägg till ny kurs.
    if (index !== -1) {
        courses[index] = newCourse;
    }
    else {
        courses.push(newCourse);
    }
    // Sparar den uppdaterade kurslistan till localStorage.
    localStorage.setItem("courses", JSON.stringify(courses));
}
// Funktion som uppdaterar en kurs utifrån angiven kurskod.
function updateCourse(updatedCourse) {
    // Hämtar array med sparade kurser.
    var jsonCourses = localStorage.getItem('items');
    if (jsonCourses) {
        // Konverterar strängen till en array.
        var courses = JSON.parse(jsonCourses);
        // Hittar den tidigare sparade kursen och uppdatera informationen.
        courses = courses.map(function (course) {
            if (course.code === updatedCourse.code) {
                // Returnerar den uppdaterade kursen.
                return updatedCourse;
            }
            // Returnerar kursen utan uppdatering.
            return course;
        });
        // Sparar och skickar den uppdaterade arrayen till localStorage.
        localStorage.setItem('items', JSON.stringify(courses));
    }
}
// Funktion som rensar kurslistan och sparade kurser i localStorage.
function clearCourses() {
    // Rensar kurslistan.
    listContainerEl.innerHTML = "";
    // Raderar sparade poster i localStorage.
    localStorage.removeItem('courses');
}
