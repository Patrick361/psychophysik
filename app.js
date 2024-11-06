// Array of images
const images = [
    'LightAndSquare0121.png',
    'LightAndSquare0114.png',
    'LightAndSquare0109.png',
    'LightAndSquare0105.png',
    // Add more images as needed
];

let currentImageIndex = 0;
let userName = '';  // Global variable for user name

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

// Handle user answer
let userResponses = [];  // This will store the user's boolean answers

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

// Function to submit the data when the user finishes
async function submitData() {
    const { data, error } = await supabase
        .from('responses')  // Ensure 'responses' is your table name in Supabase
        .insert([
            {
                name: userName,
                responses: userResponses,  // The responses as an array of booleans
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

// Supabase initialization
const SUPABASE_URL = "https://jwzireinruhcwgrtbaob.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3emlyZWlucnVoY3dncnRiYW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4OTMxODUsImV4cCI6MjA0NjQ2OTE4NX0.U8bWL8LEA38Nxr1D50d84F0gZ2_rT9fdlHPBGFXd7O0";

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
