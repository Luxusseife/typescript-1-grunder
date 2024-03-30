// Deklarerar variabler.
const saveCourseEl: HTMLButtonElement = document.getElementById("saveCourse") as HTMLButtonElement;
const resetFormEl: HTMLButtonElement = document.getElementById("resetForm") as HTMLButtonElement;
const listContainerEl: HTMLDivElement = document.getElementById("list-container") as HTMLDivElement;
const clearCoursesEl: HTMLButtonElement = document.getElementById("clear") as HTMLButtonElement;

// Definierar egenskaper hos ett objekt.
interface CourseInfo {
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
    const savedCourses: string | null = localStorage.getItem('courses');

    // Kontrollerar om det finns sparade kurser.
    if (savedCourses) { 
        const courses: CourseInfo[] = JSON.parse(savedCourses);
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
    const progressionInput: string = (document.querySelector('input[name="progression"]:checked') as HTMLInputElement)?.value;
    const syllabusInput: string = (document.getElementById("courseSyllabus") as HTMLInputElement).value;

    // Lagrar kurs i interfacen.
    const newCourse: CourseInfo = {
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
    const doesCourseCodeExist = document.querySelector(`[data-code="${codeInput}"]`);
    if (doesCourseCodeExist) {
        // Skickar ett meddelande till användaren. 
        if (confirm("Denna kurs redan lagts till. Vill du uppdatera kursinformationen?")) {
            // Skriver över tidigare information med ny.
            doesCourseCodeExist.innerHTML = `
                <ul>
                    <li>Kursnamn: ${newCourse.name}</li>
                    <li>Kurskod: ${newCourse.code}</li>
                    <li>Progression: ${newCourse.progression}</li>
                    <li>Kursplan: <a href=${newCourse.syllabus}>Länk!</a></li>
                </ul>
            `;

            // Rensar formuläret.
            (document.getElementById("coursesForm") as HTMLFormElement).reset();

            // Sparar den uppdaterade kurslistan till localStorage.
            updateListToStorage(newCourse);
        }
    
    // Om kursen inte är tillagd, kör en utskrifts-funktion, sparar till localStorage och rensar formulär.
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
function addCourse(newCourse: CourseInfo) : void {
    // Skapar ett nytt div-element.
    const newListItemEl: HTMLDivElement = document.createElement("div");
    // Sätter ett ID på elementet.
    newListItemEl.setAttribute("id", `list`);
    // Sätter ett anpassat attribut på elementet.
    newListItemEl.setAttribute("data-code", newCourse.code);
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
function updateListToStorage(newCourse: CourseInfo): void {
    // Läser in sparade kurser från localStorage om sådana finns, annars skapas en tom array.
    let courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");

    // Lokaliserar index för den kurs som ska uppdateras.
    const index: number = courses.findIndex(course => course.code === newCourse.code);

    // Villkorssats; om kursen finns i listan - uppdatera informationen, annars - lägg till ny kurs.
    if (index !== -1) { 
        courses[index] = newCourse;
    } else {
        courses.push(newCourse);
    }

    // Sparar den uppdaterade kurslistan till localStorage.
    localStorage.setItem("courses", JSON.stringify(courses));
}


// Funktion som uppdaterar en kurs utifrån angiven kurskod.
function updateCourse(updatedCourse: CourseInfo): void {
    // Hämtar array med sparade kurser.
    const jsonCourses: string | null = localStorage.getItem('items');
    if (jsonCourses) {
        // Konverterar strängen till en array.
        let courses: CourseInfo[] = JSON.parse(jsonCourses);

        // Hittar den tidigare sparade kursen och uppdatera informationen.
        courses = courses.map(course => {
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
function clearCourses(): void {
    // Rensar kurslistan.
    listContainerEl.innerHTML = "";
    // Raderar sparade poster i localStorage.
    localStorage.removeItem('courses');
}