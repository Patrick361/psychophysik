const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let userName = ''; 
let currentImageIndex = 0; 
let userResponses = []; 

const images = [];
for (let i = 1; i <= 60; i++) {
    const fileName = `LightAndSquare_${String(i).padStart(4, '0')}.png`;
    images.push(fileName);
}

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
    document.getElementById('user-name').textContent = Ist ein Kontrastunterschied zu erkennen?!;

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
