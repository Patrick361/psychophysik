import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://rzmrgpjrsgilyzobxqgq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXJncGpyc2dpbHl6b2J4cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTAyMjQsImV4cCI6MjA0NjQ4NjIyNH0.xL7o-2IqAbUUr7lpVOmNhUgXUMREtRa6q9gyWVb5i60";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let userName = ''; 
let currentImageIndex = 0; 
let userResponses = []; 

const images = [
    'final-pictures/LightAndSquare_0001.png', 'final-pictures/LightAndSquare_0002.png', 'final-pictures/LightAndSquare_0003.png', 'final-pictures/LightAndSquare_0004.png', 'final-pictures/LightAndSquare_0005.png', 
    'final-pictures/LightAndSquare_0006.png', 'final-pictures/LightAndSquare_0007.png', 'final-pictures/LightAndSquare_0008.png', 'final-pictures/LightAndSquare_0009.png', 'final-pictures/LightAndSquare_0010.png', 
    'final-pictures/LightAndSquare_0011.png', 'final-pictures/LightAndSquare_0012.png', 'final-pictures/LightAndSquare_0013.png', 'final-pictures/LightAndSquare_0014.png', 'final-pictures/LightAndSquare_0015.png', 
    'final-pictures/LightAndSquare_0016.png', 'final-pictures/LightAndSquare_0017.png', 'final-pictures/LightAndSquare_0018.png', 'final-pictures/LightAndSquare_0019.png', 'final-pictures/LightAndSquare_0020.png', 
    'final-pictures/LightAndSquare_0021.png', 'final-pictures/LightAndSquare_0022.png', 'final-pictures/LightAndSquare_0023.png', 'final-pictures/LightAndSquare_0024.png', 'final-pictures/LightAndSquare_0025.png', 
    'final-pictures/LightAndSquare_0026.png', 'final-pictures/LightAndSquare_0027.png', 'final-pictures/LightAndSquare_0028.png', 'final-pictures/LightAndSquare_0029.png', 'final-pictures/LightAndSquare_0030.png', 
    'final-pictures/LightAndSquare_0031.png', 'final-pictures/LightAndSquare_0032.png', 'final-pictures/LightAndSquare_0033.png', 'final-pictures/LightAndSquare_0034.png', 'final-pictures/LightAndSquare_0035.png', 
    'final-pictures/LightAndSquare_0036.png', 'final-pictures/LightAndSquare_0037.png', 'final-pictures/LightAndSquare_0038.png', 'final-pictures/LightAndSquare_0039.png', 'final-pictures/LightAndSquare_0040.png', 
    'final-pictures/LightAndSquare_0041.png', 'final-pictures/LightAndSquare_0042.png', 'final-pictures/LightAndSquare_0043.png', 'final-pictures/LightAndSquare_0044.png', 'final-pictures/LightAndSquare_0045.png', 
    'final-pictures/LightAndSquare_0046.png', 'final-pictures/LightAndSquare_0047.png', 'final-pictures/LightAndSquare_0048.png', 'final-pictures/LightAndSquare_0049.png', 'final-pictures/LightAndSquare_0050.png', 
    'final-pictures/LightAndSquare_0051.png', 'final-pictures/LightAndSquare_0052.png', 'final-pictures/LightAndSquare_0053.png', 'final-pictures/LightAndSquare_0054.png', 'final-pictures/LightAndSquare_0055.png', 
    'final-pictures/LightAndSquare_0056.png', 'final-pictures/LightAndSquare_0057.png', 'final-pictures/LightAndSquare_0058.png', 'final-pictures/LightAndSquare_0059.png', 'final-pictures/LightAndSquare_0060.png'
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
    userResponses.push(response); 
    currentImageIndex++;

    //White screen
    document.getElementById('image').style.display = 'none';
    document.getElementById('yesButton').style.display = 'none';
    document.getElementById('noButton').style.display = 'none';
    document.getElementById('user-name').style.display = 'none';

    // Delay before showing the next image
    setTimeout(() => {
        // Show the next image after the delay
        showImage();

        // Re-enable and display buttons, image, and text after the delay
        document.getElementById('image').style.display = 'block';
        document.getElementById('yesButton').style.display = 'inline-block';
        document.getElementById('noButton').style.display = 'inline-block';
        document.getElementById('user-name').style.display = 'block';
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
    document.getElementById('user-name').textContent = 'Ist ein Kontrastunterschied zu erkennen?!';

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
