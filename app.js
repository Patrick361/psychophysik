document.addEventListener('DOMContentLoaded', () => {
    loadImages();  // Load images into array

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

    // Ensure the image index is within range
    if (currentImageIndex >= images.length) {
        finishQuiz();
        return;
    }

    // Disable buttons to prevent multiple clicks during delay
    document.getElementById('yesButton').disabled = true;
    document.getElementById('noButton').disabled = true;

    const imageContainer = document.getElementById('image-container');

    if (imageContainer) {
        // Display white screen during delay
        imageContainer.style.backgroundColor = 'white';
    } else {
        console.error('Image container not found!');
    }

    // Delay before showing the next image
    setTimeout(() => {
        if (imageContainer) {
            // Reset background color to transparent
            imageContainer.style.backgroundColor = 'transparent';
        }
        
        showImage();  // Show next image after delay

        // Re-enable buttons after the delay
        document.getElementById('yesButton').disabled = false;
        document.getElementById('noButton').disabled = false;
    }, IMAGE_DELAY_MS);
}
