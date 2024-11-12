function fetchLatestNews() {
    fetch('/feed.json')
        .then(response => response.json())
        .then(data => {
            const messages = data.messaggi;

<<<<<<< HEAD
            // Sort messages by date in descending order
            const latestMessages = messages.sort((a, b) => new Date(b.data) - new Date(a.data));
=======
            // Sort messages by date in descending order and get the 5 latest
            const latestMessages = messages
                .sort((a, b) => new Date(b.data) - new Date(a.data));
>>>>>>> a5a21e6337f8d469b49b5007d0771ed99d4f6cf1

            displayNews(latestMessages);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            document.getElementById("news-content").innerHTML = "<p>Error loading news</p>";
        });
}

function displayNews(messages) {
    const newsContent = document.getElementById("news-content");
    let currentIndex = 0;

    function showNextMessage() {
<<<<<<< HEAD
        newsContent.innerHTML = ""; // Clear previous content
        const message = messages[currentIndex];

        // Create HTML structure for the current message
=======
        // Clear previous content
        newsContent.innerHTML = "";

        // Get the current message
        const message = messages[currentIndex];

        // Create the HTML structure for the current message
>>>>>>> a5a21e6337f8d469b49b5007d0771ed99d4f6cf1
        const messageElement = document.createElement("div");
        messageElement.classList.add("news-item");

        messageElement.innerHTML = `
            <div class="news-author">${message.autore}</div>
            <div class="news-meta">
                <span class="news-date">${new Date(message.data).toLocaleDateString()}</span>
                <span class="news-time">${new Date(message.data).toLocaleTimeString()}</span>
            </div>
            <div class="news-message">${message.contenuto}</div>
        `;
<<<<<<< HEAD
        newsContent.appendChild(messageElement);

        const newsMessageElement = messageElement.querySelector(".news-message");

        // Scroll effect for long messages
        let scrollPosition = 0;
        const scrollInterval = setInterval(() => {
            scrollPosition += 1;
            newsMessageElement.scrollTop = scrollPosition;

            // Stop scrolling when reaching the bottom
            if (newsMessageElement.scrollTop + newsMessageElement.clientHeight >= newsMessageElement.scrollHeight) {
                clearInterval(scrollInterval);
            }
        }, 50); // Adjust speed by changing this interval (50ms for smoother scroll)

        // Move to the next message after a delay
=======

        newsContent.appendChild(messageElement);

        // Apply scrolling effect if content is long
        const newsMessageElement = messageElement.querySelector(".news-message");
        if (message.contenuto.length > 50) {
            newsMessageElement.classList.add("scrolling");
        }

        // Move to the next message or loop back to the first one
>>>>>>> a5a21e6337f8d469b49b5007d0771ed99d4f6cf1
        currentIndex = (currentIndex + 1) % messages.length;
    }

    // Show the first message initially
    showNextMessage();

    // Loop through messages every 5 seconds
    setInterval(showNextMessage, 5000);
}

<<<<<<< HEAD
// Fetch news when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchLatestNews();
=======

// Fetch news when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchLatestNews();

>>>>>>> a5a21e6337f8d469b49b5007d0771ed99d4f6cf1
});
