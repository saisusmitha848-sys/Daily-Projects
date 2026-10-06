const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const message = document.getElementById("message");

// Character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Update password length display
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// Generate password
function generatePassword() {
    const length = Number(lengthSlider.value);

    let characters = "";
    let password = "";

    if (uppercase.checked) {
        characters += uppercaseChars;
    }

    if (lowercase.checked) {
        characters += lowercaseChars;
    }

    if (numbers.checked) {
        characters += numberChars;
    }

    if (symbols.checked) {
        characters += symbolChars;
    }

    if (characters.length === 0) {
        message.textContent = "Please select at least one option.";
        message.style.color = "#dc3545";
        passwordInput.value = "";
        return;
    }

    // Make sure selected character types are represented
    const selectedSets = [];

    if (uppercase.checked) selectedSets.push(uppercaseChars);
    if (lowercase.checked) selectedSets.push(lowercaseChars);
    if (numbers.checked) selectedSets.push(numberChars);
    if (symbols.checked) selectedSets.push(symbolChars);

    // Add one character from each selected category
    selectedSets.forEach(set => {
        password += set[Math.floor(Math.random() * set.length)];
    });

    // Fill remaining characters
    while (password.length < length) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    // Shuffle password
    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    passwordInput.value = password;

    message.textContent = "Password generated successfully!";
    message.style.color = "#28a745";
}

// Copy password
copyBtn.addEventListener("click", async () => {
    if (passwordInput.value === "") {
        message.textContent = "Generate a password first.";
        message.style.color = "#dc3545";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);

        message.textContent = "Password copied to clipboard!";
        message.style.color = "#28a745";

        copyBtn.textContent = "Copied!";

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);

    } catch (error) {
        message.textContent = "Unable to copy password.";
        message.style.color = "#dc3545";
    }
});

// Generate button
generateBtn.addEventListener("click", generatePassword);

// Generate a password when page loads
generatePassword();