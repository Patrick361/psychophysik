import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXJncGpyc2dpbHl6b2J4cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTAyMjQsImV4cCI6MjA0NjQ4NjIyNH0.xL7o-2IqAbUUr7lpVOmNhUgXUMREtRa6q9gyWVb5i60";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let userName = '';
let currentImageIndex = 0;
let userResponses = [];
const images = [];
let startTime, endTime;
const IMAGE_DELAY_MS = 220;  // Delay duration

// Load images from the folder dynamically
function loadImages() {
    for (let i = 1; i <= 60; i++) {
        const paddedNumber = String(i).padStart(4, '0');  // Ensure filename format
        images.push(`final-pictures/LightAndSquare_${paddedNumber}.png`);
    }
}

// Load images on page load
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    } else {
        console.error('Start button not found!');
    }

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
    userResponses.push(response);
    currentImageIndex++;

    document.getElementById('yesButton').disabled = true;
    document.getElementById('noButton').disabled = true;

    const imageContainer = document.getElementById('image-container');
    imageContainer.style.backgroundColor = 'white';  // Flash white screen during delay

    setTimeout(() => {
        showImage();

        // Reset the background color after delay
        imageContainer.style.backgroundColor = 'transparent';

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

    document.getElementById('image').src = images[currentImageIndex];
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

    if (error) {
        console.error('Error submitting data:', error);
    }
}
