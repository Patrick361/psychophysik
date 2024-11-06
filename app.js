import createClient from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Initialize Supabase client
const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXJncGpyc2dpbHl6b2J4cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTAyMjQsImV4cCI6MjA0NjQ4NjIyNH0.xL7o-2IqAbUUr7lpVOmNhUgXUMREtRa6q9gyWVb5i60"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global variables
let userName = '';  
let currentImageIndex = 0;
let userResponses = [];

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    const startButton = document.getElementById('start-button');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    // Check if buttons exist
    if (!startButton || !yesButton || !noButton) {
        console.error('Button elements are missing');
        return;
    }

    // Start quiz event listener
    startButton.addEventListener('click', startQuiz);

    // Answer event listeners
    yesButton.addEventListener('click', () => {
        userResponses.push(true);
        currentImageIndex++;
        showImage();
    });

    noButton.addEventListener('click', () => {
        userResponses.push(false);
        currentImageIndex++;
        showImage();
    });

    // Hide quiz screens initially
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('finished-screen').style.display = 'none';
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
    // Placeholder for the images array
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Define the actual image URLs here

    if (currentImageIndex >= images.length) {
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
        .from('userdata')
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
