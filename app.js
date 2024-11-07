import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXJncGpyc2dpbHl6b2J4cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTAyMjQsImV4cCI6MjA0NjQ4NjIyNH0.xL7o-2IqAbUUr7lpVOmNhUgXUMREtRa6q9gyWVb5i60"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let userName = ''; 
let currentImageIndex = 0; 
let userResponses = []; 
const images = [
    'LightAndSquare0097.png', 'LightAndSquare0151.png', 'LightAndSquare0055.png', 'LightAndSquare0064.png', 
    'LightAndSquare0036.png', 'LightAndSquare0109.png', 'LightAndSquare0101.png', 'LightAndSquare0114.png', 
    'LightAndSquare0077.png', 'LightAndSquare0018.png', 'LightAndSquare0052.png', 'LightAndSquare0115.png', 
    'LightAndSquare0121.png', 'LightAndSquare0039.png', 'LightAndSquare0074.png', 'LightAndSquare0180.png', 
    'LightAndSquare0161.png', 'LightAndSquare0188.png', 'LightAndSquare0020.png', 'LightAndSquare0083.png', 
    'LightAndSquare0122.png', 'LightAndSquare0044.png', 'LightAndSquare0120.png', 'LightAndSquare0105.png', 
    'LightAndSquare0090.png', 'LightAndSquare0106.png', 'LightAndSquare0127.png', 'LightAndSquare0167.png', 
    'LightAndSquare0086.png', 'LightAndSquare0025.png', 'LightAndSquare0137.png'
];
let startTime, endTime;
const IMAGE_DELAY_MS = 220;  // Delay siehe Buch seite 54

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('button');
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    } else {
        console.error('Start button not found!');
    }

    // Attach event listeners to the buttons that handle the user responses
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    if (yesButton) {
        yesButton.addEventListener('click', () => handleResponse(true));
    } else {
        console.error('Yes button not found!');
    }

    if (noButton) {
        noButton.addEventListener('click', () => handleResponse(false));
    } else {
        console.error('No button not found!');
    }
});

function handleResponse(response) {
    userResponses.push(response);  // Add the response
    currentImageIndex++;  // Increment image index

    // Disable buttons to prevent multiple clicks during delay
    document.getElementById('yesButton').disabled = true;
    document.getElementById('noButton').disabled = true;

    // Delay before showing the next image
    setTimeout(() => {
        showImage();  // Show next image after delay

        // Re-enable buttons after the delay
        document.getElementById('yesButton').disabled = false;
        document.getElementById('noButton').disabled = false;
    }, IMAGE_DELAY_MS);
}

function startQuiz() {
    userName = document.getElementById('name-input').value;
    if (!userName) {
        alert('Please enter your name');
        return;
    }
    startTime = new Date();

    // Hide start screen, show quiz screen
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    // Display the user's name on quiz screen
    document.getElementById('user-name').textContent = `Ist ein Kontrastunterschied zu erkennen?!`;

    // Show the first image
    showImage();
}

function showImage() {
    if (currentImageIndex >= images.length) {
        // If all images are shown, show finished screen
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('finished-screen').style.display = 'block';
        submitData();  // Submit data once quiz is finished
        return;
    }

    // Set the current image source
    document.getElementById('image').src = images[currentImageIndex];
}

// Function to submit the data when the user finishes
async function submitData() {
    endTime = new Date();
    const timeDifference = endTime - startTime;

    const { data, error } = await supabase
        .from('userdata')  // Ensure 'userdata' is your table name in Supabase
        .insert([
            {
                name: userName,
                responses: userResponses,
                time: timeDifference,
            },
        ]);

}
