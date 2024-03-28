// Deklarerar variabler.
const saveCourseEl = document.getElementById("saveCourse") as HTMLButtonElement;
const resetFormEl = document.getElementById("resetForm") as HTMLButtonElement;
const listContainerEl = document.getElementById("list-container") as HTMLDivElement;
const clearCoursesEl = document.getElementById("clear") as HTMLButtonElement;

// Definierar egenskaper hos ett objekt.
interface courseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

// Händelselyssnare för knappar.
saveCourseEl.addEventListener("click", saveCourse, false);
resetFormEl.addEventListener("click", () => (document.getElementById("coursesForm") as HTMLFormElement).reset());
clearCoursesEl.addEventListener("click", clearCourses, false);

// Funktion som hämtar sparade kurser i localStorage vid sidladdning.
window.onload = () => {
    // Hämtar information från localStorage.
    const savedCourses = localStorage.getItem('courses');

    // Kontrollerar om det finns sparade kurser.
    if (savedCourses) { 
        const courses: courseInfo[] = JSON.parse(savedCourses);
        courses.forEach(course => {
            addCourse(course);
        });
    }
}

// Funktion för att lägga till/spara en kurs. 
function saveCourse(): void {
    // Lagrar input från fälten för namn, kod, progression och url.
    const nameInput: string = (document.getElementById("courseName") as HTMLInputElement).value;
    const codeInput: string = (document.getElementById("courseCode") as HTMLInputElement).value;
    const progressionInput: string = (document.querySelector('input[name="progression"]:checked') as HTMLInputElement).value;
    const syllabusInput: string = (document.getElementById("courseSyllabus") as HTMLInputElement).value;

    // Lagrar kurs i interfacen.
    const newCourse: courseInfo = {
        name: nameInput,
        code: codeInput,
        progression: progressionInput,
        syllabus: syllabusInput
    };

    // Kontrollerar att alla kursfält är ifyllda.
    if (codeInput.length === 0 || nameInput.length === 0 || syllabusInput.length === 0) {
        alert("Alla fält behöver fyllas i!");

    // Kör en utskrifts-funktion, rensar formulär och sparar till localStorage.
    } else {
        // Utskriftsfunktion.
        addCourse(newCourse);

        // Rensar formuläret.
        (document.getElementById("coursesForm") as HTMLFormElement).reset();

        // Sparar till localStorage.
        updateListToStorage(newCourse);
    }
}

// Funktion som skriver ut kurs i DOM.
function addCourse(newCourse: courseInfo) : void {
    // Skapar ett nytt div-element.
    const newListItemEl = document.createElement("div") as HTMLDivElement;
    // Sätter ett ID på elementet.
    newListItemEl.setAttribute("id", `list`);
    // Skriver ut till DOM.
    newListItemEl.innerHTML += `
        <ul>
            <li>Kursnamn: ${newCourse.name}</li>
            <li>Kurskod: ${newCourse.code}</li>
            <li>Progression: ${newCourse.progression}</li>
            <li>Kursplan: <a href=${newCourse.syllabus}>Länk!</a></li>
        </ul>
    `;

    // Lägger till kursen i listan.
    listContainerEl.appendChild(newListItemEl);
}

// Funktion som sparar/uppdaterar kurslistan i localStorage.
function updateListToStorage(newCourse: courseInfo): void {
    // Läser in sparade kurser från localStorage om sådana finns, annars skapas en tom array.
    let courses: courseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");

    // Lägger till ny kurs i listan.
    courses.push(newCourse);

    // Sparar den uppdaterade kurslistan till localStorage.
    localStorage.setItem("courses", JSON.stringify(courses));
}

// Funktion som rensar kurslistan och sparade kurser i localStorage.
function clearCourses() {
    // Rensar kurslistan.
    listContainerEl.innerHTML = "";
    // Raderar sparade poster i localStorage.
    localStorage.removeItem('courses');
}