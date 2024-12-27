let startTime = 0;         // Time when the stopwatch started
let elapsedTime = 0;       // Total elapsed time in milliseconds
let timerInterval;         // Interval ID for the timer

const display = document.getElementById('display');
const laps = document.getElementById('laps');

// Function to format time into mm:ss.mmm
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Start the stopwatch
function start() {
    if (!timerInterval) {  // Prevent multiple intervals
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
    }
}

// Pause the stopwatch
function pause() {
    clearInterval(timerInterval);
    timerInterval = null;  // Reset the interval ID
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    timerInterval = null;  // Reset the interval ID
    elapsedTime = 0;
    startTime = 0;
    display.textContent = "00:00:00.000";
    laps.innerHTML = '';   // Clear all laps
}

// Record a lap
function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    laps.appendChild(lapItem);
}

// Event listeners for buttons
document.getElementById('start-btn').addEventListener('click', start);
document.getElementById('pause-btn').addEventListener('click', pause);
document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById('lap-btn').addEventListener('click', recordLap);
