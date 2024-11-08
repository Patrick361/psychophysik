import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXJncGpyc2dpbHl6b2J4cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTAyMjQsImV4cCI6MjA0NjQ4NjIyNH0.xL7o-2IqAbUUr7lpVOmNhUgXUMREtRa6q9gyWVb5i60"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let userName = ''; 
let currentImageIndex = 0; 
let userResponses = []; 
const images = [];  // Empty array to add images dynamically
let startTime, endTime;
const IMAGE_DELAY_MS = 220;  // Delay time in milliseconds

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    loadImages();  // Dynamically load images based on naming pattern

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

function loadImages() {
    // Generate file names LightAndSquare_0001 to LightAndSquare_0060
    for (let i = 1; i <= 60; i++) {
        const imageNumber = String(i).padStart(4, '0');  // Pads with leading zeros
        images.push(`LightAndSquare_${imageNumber}.png`);
    }
}

function handleResponse(response) {
    userResponses.push(response);  // Add the response
    currentImageIndex++;  // Increment image index

    // Ensure the image index is within range
    if (currentImageIndex >= images.length) {
        finishQuiz();
        return;
    }

    // Disable buttons to prevent multiple clicks during delay
    document.getElementById('yesButton').disabled = true;
    document.getElementById('noButton').disabled = true;

    // Display white screen during delay
    const imageContainer = document.getElementById('image-container');
    imageContainer.style.backgroundColor = 'white';

    // Delay before showing the next image
    setTimeout(() => {
        // Reset background color to transparent
        imageContainer.style.backgroundColor = 'transparent';
        
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
    // Ensure image index is within range before showing
    if (currentImageIndex < images.length) {
        // Set the current image source
        document.getElementById('image').src = `final-pictures/${images[currentImageIndex]}`;
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    // Show finished screen and hide quiz screen
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('finished-screen').style.display = 'block';
    submitData();  // Submit data once quiz is finished
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

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Data successfully submitted:', data);
    }
}
