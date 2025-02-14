document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strengthMeter = document.getElementById('strengthMeter');
    const feedback = document.getElementById('feedback');

    let strength = 0;

    // Reset styles
    strengthMeter.style.width = "10%"; // Keeps the bar visible at all times
    strengthMeter.style.backgroundColor = "red"; // Default to weak
    feedback.innerText = "";

    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;

    if (password.length === 0) {
        strengthMeter.style.width = "10%"; // Keeps it from disappearing
        strengthMeter.style.backgroundColor = "transparent";
        feedback.innerText = "";
    } else if (strength <= 2) {
        strengthMeter.style.width = "30%";
        strengthMeter.style.backgroundColor = "red";
        feedback.innerText = "Weak password! Try adding numbers & symbols.";
    } else if (strength <= 4) {
        strengthMeter.style.width = "70%";
        strengthMeter.style.backgroundColor = "yellow";
        feedback.innerText = "Moderate password! Add uppercase & symbols.";
    } else {
        strengthMeter.style.width = "100%";
        strengthMeter.style.backgroundColor = "green";
        feedback.innerText = "Strong password! ✅";
    }
});

document.getElementById('generateBtn').addEventListener('click', function () {
    const length = 12; // Default password length
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('password').value = password;
});

document.getElementById('copyBtn').addEventListener('click', function () {
    const passwordField = document.getElementById('password');

    if (passwordField.value.length > 0) {
        passwordField.select();
        navigator.clipboard.writeText(passwordField.value);
        alert("Password copied to clipboard!");
    } else {
        alert("Generate a password first!");
    }
});

async function checkPasswordLeak(password) {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-1", encoder.encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    const prefix = hashHex.slice(0, 5);
    const suffix = hashHex.slice(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await response.text();

    if (data.includes(suffix)) {
        alert("⚠️ This password has been leaked before! Choose a stronger one.");
    } else {
        alert("✅ This password is safe and has not been found in leaks.");
    }
}

// Attach event listener to a new button
document.getElementById("checkLeakBtn").addEventListener("click", function () {
    const password = document.getElementById("password").value;
    if (password.length > 0) {
        checkPasswordLeak(password);
    } else {
        alert("Enter a password first!");
    }
});







