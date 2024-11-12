// Function to extract query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        aula: params.get('aula'),
        edificio: params.get('edificio')
    };
}

// Function to fetch and display the classroom name and lesson schedule
function fetchLessonSchedule() {
    const { aula, edificio } = getQueryParams();  // Get aula and edificio from the URL

    // Ensure the parameters are provided
    if (!aula || !edificio) {
        console.error("Missing aula or edificio parameters in the URL");
        document.getElementById("lesson-list").innerHTML = "<li>Missing aula or edificio parameters in the URL</li>";
        return;
    }

    // Construct the API URL with the query parameters (through Nginx)
    const apiUrl = `http://127.0.0.1:5000/lessons?aula=${encodeURIComponent(aula)}&edificio=${encodeURIComponent(edificio)}`;

    // Fetch the lesson schedule data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update classroom name
            if (data[0] && data[0].classroom_name) {
                document.getElementById("classroom-name").textContent = data[0].classroom_name;
            } else {
                document.getElementById("classroom-name").textContent = "Classroom info not available";
            }

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
<<<<<<< HEAD
            lessonList.innerHTML = '<li class="no-classes">No classes available</li>';
=======
            lessonList.innerHTML = "<li>No classes available</li>";
>>>>>>> a5a21e6337f8d469b49b5007d0771ed99d4f6cf1
        });
}

// Optional function for fetching Telegram news (can be enabled later if needed)
// function fetchTelegramNews() { /* Telegram news fetch logic here */ }

// Function to start periodic refresh every 15 seconds
function startAutoRefresh() {
    // Initial fetch when the page loads
    fetchLessonSchedule();
    // fetchTelegramNews(); // Uncomment if you want to fetch Telegram news as well

    // Set an interval to refresh every 15 seconds (15000 milliseconds)
    setInterval(() => {
        fetchLessonSchedule();
        // fetchTelegramNews(); // Uncomment if you want to fetch Telegram news as well
    }, 15000);
}

// Fetch data on page load
document.addEventListener("DOMContentLoaded", () => {
    startAutoRefresh();
});
