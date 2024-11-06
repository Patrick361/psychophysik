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
    // Start quiz function
    const startButton = document.querySelector('button'); // Get the button that starts the quiz
    startButton.addEventListener('click', startQuiz); // Attach event listener here

    // Attach event listeners to the buttons that handle the user responses
    document.getElementById('yesButton').addEventListener('click', () => {
        userResponses.push(true);  // 'Yes' is true
        currentImageIndex++;  // Move to next image
        showImage();
    });

    document.getElementById('noButton').addEventListener('click', () => {
        userResponses.push(false); // 'No' is false
        currentImageIndex++;  // Move to next image
        showImage();
    });
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

