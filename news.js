function fetchLatestNews() {
    fetch('/feed.json')
        .then(response => response.json())
        .then(data => {
            const messages = data.messaggi;

            // Sort messages by date in descending order and get the 5 latest
            const latestMessages = messages
                .sort((a, b) => new Date(b.data) - new Date(a.data));

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
        // Clear previous content
        newsContent.innerHTML = "";

        // Get the current message
        const message = messages[currentIndex];

        // Create the HTML structure for the current message
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

        newsContent.appendChild(messageElement);

        // Apply scrolling effect if content is long
        const newsMessageElement = messageElement.querySelector(".news-message");
        if (message.contenuto.length > 50) {
            newsMessageElement.classList.add("scrolling");
        }

        // Move to the next message or loop back to the first one
        currentIndex = (currentIndex + 1) % messages.length;
    }

    // Show the first message initially
    showNextMessage();

    // Loop through messages every 5 seconds
    setInterval(showNextMessage, 5000);
}


// Fetch news when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchLatestNews();

});
