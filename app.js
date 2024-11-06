const images = [
    'LightAndSquare0121.png', // Replace with your image file paths
    'LightAndSquare0114.png',
    'LightAndSquare0109.png ',
    'LightAndSquare0105.png',
    // Add more images as needed
];

let currentImageIndex = 0;
let userName = '';

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
        return;
    }

    document.getElementById('image').src = images[currentImageIndex];
}

// Handle user answer
function answer(answer) {
    console.log(`User answered: ${answer}`);
    currentImageIndex++;
    showImage();
}
