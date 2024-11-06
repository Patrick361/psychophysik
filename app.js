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



const SUPABASE_URL = "https://jwzireinruhcwgrtbaob.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3emlyZWlucnVoY3dncnRiYW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4OTMxODUsImV4cCI6MjA0NjQ2OTE4NX0.U8bWL8LEA38Nxr1D50d84F0gZ2_rT9fdlHPBGFXd7O0";

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function storeUserData(name, answerData) {
    // Store data in the Supabase database
    const { data, error } = await supabase
        .from('user_data')
        .insert([
            {
                name: name,
                answer: JSON.stringify(answerData),  // You can store the answers as JSON if needed
                timestamp: new Date()
            }
        ]);

    if (error) {
        console.error("Error storing data:", error);
    } else {
        console.log("User data stored:", data);
    }
}

// Call this when quiz is finished
function finishQuiz() {
    const userData = {
        name: userName,
        answers: userAnswers // Store user answers (e.g., array or object of answers)
    };
    storeUserData(userData.name, userData.answers);
}

