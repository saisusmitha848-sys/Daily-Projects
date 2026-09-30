const clock = document.getElementById("clock");
const ampm = document.getElementById("ampm");
const date = document.getElementById("date");
const toggleButton = document.getElementById("toggleFormat");

let is24Hour = false;


// Add leading zero
function formatTime(number) {
    return number < 10 ? "0" + number : number;
}


// Update clock
function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let period = "";

    // 12-hour format
    if (!is24Hour) {

        period = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;

        if (hours === 0) {
            hours = 12;
        }

    }

    // Format numbers
    hours = formatTime(hours);
    const mins = formatTime(minutes);
    const secs = formatTime(seconds);

    // Display time
    clock.textContent = `${hours}:${mins}:${secs}`;

    // Display AM/PM
    if (is24Hour) {
        ampm.textContent = "";
    } else {
        ampm.textContent = period;
    }

    // Display date
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    date.textContent = now.toLocaleDateString("en-US", options);
}


// Toggle 12/24 hour format
toggleButton.addEventListener("click", function () {

    is24Hour = !is24Hour;

    if (is24Hour) {
        toggleButton.textContent = "Switch to 12-Hour";
    } else {
        toggleButton.textContent = "Switch to 24-Hour";
    }

    updateClock();
});


// Update immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);