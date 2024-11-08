# Monitor Display

A web-based project to display classroom names, lessons schedules, and news updates. This project is intended for use in educational environments to provide real-time information on a monitor.

## Project Structure

- `index.html`: The main HTML file containing the structure of the display.
- `style/`: Directory containing CSS files for styling the display.
  - `style.css`: General styles for the display.
  - `news_div.css`: Specific styles for the news section.
- `news.js`: JavaScript file responsible for fetching and displaying news.
- `schedual.js`: JavaScript file responsible for managing and displaying the lesson schedule.

## Features

- **Classroom Name Block**: Displays the name of the classroom.
- **Lesson Schedule Block**: Lists the ongoing and upcoming lessons.
- **Telegram News Block**: Shows news updates fetched from Telegram.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```bash
    cd monitor-display
    ```

## Usage

1. Open `index.html` in your preferred web browser to view the display.
2. Ensure that `news.js` and `schedual.js` are correctly fetching and updating the news and schedule data respectively.

## Dockerization

To run this project using Docker, follow these steps:
1. Ensure that you have the api's images in docker running.
2. Ensure you have Docker installed on your machine.
3. build an image for the nginx in docker using the 'dockerfile' in the project. 
4. adjust the dockercompose file based on your api's images names and nginx image name.
5. run the dockercompose using the following command  
 ```bash
docker-compose up
```
6. then open the url  (http://localhost/index.html?aula=class_id&edificio=building_id)!

## Contribution

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

