// Deklarerar variabler.
const saveCourseEl = document.getElementById("saveCourse") as HTMLButtonElement;
const resetFormEl = document.getElementById("resetForm") as HTMLButtonElement;
const listContainerEl = document.getElementById("list-container") as HTMLDivElement;

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

    // Hämtar input och skriv ut en div med tillagd kurs i en lista.
    } else {
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

        // Rensa formuläret.
        (document.getElementById("coursesForm") as HTMLFormElement).reset();
    }
}