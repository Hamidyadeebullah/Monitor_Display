// Function to extract query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        aula: params.get('aula'),
        edificio: params.get('edificio'),
        classroom: params.get('classroom')  // New parameter for the classroom name
    };
}

// List of valid classrooms
const validClassrooms = [
    'A1-1', 'A1-2', 'A1-3', 'A1-4', 'A1-5', 'A1-6', 'A1-7', 'A1-8',
    'AS-1', 'AS-2', 'AS-3', 'AS-4', 'AS-5', 'AS-6',
    'AT-1', 'AT-2', 'AT-3', 'AT-4', 'AT-5', 'AT-6', 'AT-7', 'AT-9', 'AT-10', 'AT-11'
];

// Function to validate the classroom name
function isValidClassroom(classroom) {
    return validClassrooms.includes(classroom);
}

// Function to fetch and display the classroom name and lesson schedule
function fetchLessonSchedule() {
    const { aula, edificio, classroom } = getQueryParams();  // Get parameters from the URL

    // Validate classroom parameter
    if (!classroom || !isValidClassroom(classroom)) {
        console.error("Invalid or missing 'classroom' parameter in the URL");
        document.getElementById("lesson-list").innerHTML = "<li>Invalid or missing 'classroom' parameter</li>";
        return;
    }

    // Ensure the aula and edificio parameters are provided
    if (!aula || !edificio) {
        console.error("Missing 'aula' or 'edificio' parameters in the URL");
        document.getElementById("lesson-list").innerHTML = "<li>Missing 'aula' or 'edificio' parameters</li>";
        return;
    }

    // Construct the API URL with the aula and edificio query parameters (through Nginx)
    const apiUrl = `http://127.0.0.1:5000/lessons?aula=${encodeURIComponent(aula)}&edificio=${encodeURIComponent(edificio)}`;

    // Update classroom name in the DOM
    document.getElementById("classroom-name").textContent = classroom;

    // Fetch the lesson schedule data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update lesson schedule
            const lessonList = document.getElementById("lesson-list");
            lessonList.innerHTML = ""; // Clear previous lessons

            data.forEach(lesson => {
                const listItem = document.createElement("li");

                listItem.innerHTML = `
                    <div class="lesson-time">ore ${lesson.start_time.slice(11, 16)}-${lesson.end_time.slice(11, 16)}</div>
                    <div class="lesson-name">${lesson.lesson_name}</div>
                    <div class="instructor-name">${lesson.instructor}</div>
                `;

                lessonList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Unable to fetch the data:", error);
            const lessonList = document.getElementById("lesson-list");
            lessonList.innerHTML = '<li class="no-classes">No classes available</li>';
        });
}
// Function to start periodic refresh every 15 seconds
function startAutoRefresh() {
    // Initial fetch when the page loads
    fetchLessonSchedule();
    // Set an interval to refresh every 15 seconds (15000 milliseconds)
    setInterval(() => {
        fetchLessonSchedule();
    }, 15000);
}

// Fetch data on page load
document.addEventListener("DOMContentLoaded", () => {
    startAutoRefresh();
});
