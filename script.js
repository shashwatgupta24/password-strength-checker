document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strengthMeter = document.getElementById('strengthMeter');
    const feedback = document.getElementById('feedback');

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;

    // Reset classes before applying new one
    strengthMeter.className = "";
    strengthMeter.style.width = "0%";  

    if (password.length === 0) {
        feedback.innerText = ""; // Remove feedback when input is empty
        strengthMeter.style.display = "none"; // Hide the bar
        return;
    } else {
        strengthMeter.style.display = "block"; // Show the bar when typing
    }

    if (strength <= 2) {
        strengthMeter.classList.add("weak");
        strengthMeter.style.width = "33%";
        feedback.innerText = "Weak password!";
    } else if (strength <= 4) {
        strengthMeter.classList.add("moderate");
        strengthMeter.style.width = "66%";
        feedback.innerText = "Moderate password!";
    } else {
        strengthMeter.classList.add("strong");
        strengthMeter.style.width = "100%";
        feedback.innerText = "Strong password!";
    }
});



