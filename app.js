import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


// Array of images
const images = [
    'LightAndSquare0121.png',
    'LightAndSquare0114.png',
    'LightAndSquare0109.png',
    'LightAndSquare0105.png',
];

let currentImageIndex = 0;
let userName = '';  // Global variable for user name
let userResponses = [];  // This will store the user's boolean answers

// Initialize Supabase client
const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";  // Replace with your actual key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Start the quiz after entering the name
window.startQuiz = startQuiz;
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

// Handle user answer
document.getElementById('yesButton').addEventListener('click', () => {
    userResponses.push(true);  // 'Yes' is true
    currentImageIndex++;
    showImage();
});

document.getElementById('noButton').addEventListener('click', () => {
    userResponses.push(false); // 'No' is false
    currentImageIndex++;
    showImage();
});

// Function to submit the data when the user finishes
async function submitData() {
    const { data, error } = await supabase
        .from('userdata') 
        .insert([
            {
                name: userName,
                responses: userResponses,  
                time: new Date() 
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
