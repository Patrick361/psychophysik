import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXJncGpyc2dpbHl6b2J4cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTAyMjQsImV4cCI6MjA0NjQ4NjIyNH0.xL7o-2IqAbUUr7lpVOmNhUgXUMREtRa6q9gyWVb5i60"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let userName = ''; 
let currentImageIndex = 0; 
let userResponses = []; 
const images = [];  // Clear the array to add images dynamically
let startTime, endTime;
const IMAGE_DELAY_MS = 220;  // Delay time in milliseconds

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', async () => {
    await loadImages();  // Load images from the /pictures folder

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

async function loadImages() {
    // Fetch all images from /pictures directory using a server-side endpoint
    try {
        const response = await fetch('/get-images');  // Replace with actual server endpoint
        const imagePaths = await response.json();
        imagePaths.forEach(path => images.push(path));
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

function handleResponse(response) {
    userResponses.push(response);  // Add the response
    currentImageIndex++;  // Increment image index

    // Disable buttons to prevent multiple clicks during delay
    document.getElementById('yesButton').disabled = true;
    document.getElementById('noButton').disabled = true;

    // Display white screen during delay
    const imageContainer = document.getElementById('image-container');
    imageContainer.style.backgroundColor = 'white';

    // Delay before showing the next image
    setTimeout(() => {
        imageContainer.style.backgroundColor = 'transparent';
        
        showImage();  

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

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    document.getElementById('user-name').textContent = `Ist ein Kontrastunterschied zu erkennen?!`;
    showImage();
}

function showImage() {
    if (currentImageIndex >= images.length) {
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('finished-screen').style.display = 'block';
        submitData();  
        return;
    }

    document.getElementById('image').src = `/pictures/${images[currentImageIndex]}`;
}

async function submitData() {
    endTime = new Date();
    const timeDifference = endTime - startTime;

    const { data, error } = await supabase
        .from('userdata')
        .insert([
            {
                name: userName,
                responses: userResponses,
                time: timeDifference,
            },
        ]);

}
