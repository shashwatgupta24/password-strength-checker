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







