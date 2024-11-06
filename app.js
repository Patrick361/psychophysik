import createClient from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Initialize Supabase client
const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXJncGpyc2dpbHl6b2J4cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTAyMjQsImV4cCI6MjA0NjQ4NjIyNH0.xL7o-2IqAbUUr7lpVOmNhUgXUMREtRa6q9gyWVb5i60"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let userName = '';  // Global variable for user name
let currentImageIndex = 0; // Image index tracker
let userResponses = [];  // Store the user's boolean answers

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the start button element and log it
    const startButton = document.querySelector('button');
    console.log('Start button:', startButton); // Log to check if the button is selected

    if (startButton) {
        startButton.addEventListener('click', startQuiz); // Attach event listener here
    } else {
        console.error('Start button not found!');
    }

    // Attach event listeners to the buttons that handle the user responses
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    console.log('Yes button:', yesButton); // Log to check if the button is selected
    console.log('No button:', noButton); // Log to check if the button is selected

    if (yesButton) {
        yesButton.addEventListener('click', () => {
            userResponses.push(true);  // 'Yes' is true
            currentImageIndex++;  // Move to next image
            showImage();
        });
    } else {
        console.error('Yes button not found!');
    }

    if (noButton) {
        noButton.addEventListener('click', () => {
            userResponses.push(false); // 'No' is false
            currentImageIndex++;  // Move to next image
            showImage();
        });
    } else {
        console.error('No button not found!');
    }
});

// Start the quiz after entering the name
function startQuiz() {
    userName = document.getElementById('name-input').value;
    if (!userName) {
        alert('Please enter your name');
        return;
    }

    // Hide start screen, show quiz screen
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    // Display the user's name on quiz screen
    document.getElementById('user-name').textContent = `Ist ein Kontrastunterschied zu erkennen?!`;

    // Show the first image
    showImage();
}

// Show current image
function showImage() {
    if (currentImageIndex >= images.length) {
        // If all images are shown, show finished screen
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('finished-screen').style.display = 'block';
        submitData();  // Submit data once quiz is finished
        return;
    }

    document.getElementById('image').src = images[currentImageIndex];
}

// Function to submit the data when the user finishes
async function submitData() {
    const { data, error } = await supabase
        .from('userdata')  // Ensure 'userdata' is your table name in Supabase
        .insert([
            {
                name: userName,
                responses: userResponses,  // The responses as an array of booleans
                time: new Date()  // Add timestamp
            },
        ]);

    if (error) {
        console.error('Error inserting data:', error);
        alert('There was an error submitting your data.');
    } else {
        console.log('Data submitted successfully:', data);
        alert('Your responses have been submitted successfully!');
    }
}

