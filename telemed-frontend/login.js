document.addEventListener('DOMContentLoaded', function () {
    const roleSelect = document.getElementById('role');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('button[type="submit"]');
    const loginForm = document.getElementById('loginForm');

    // Disable email, password, and button initially
    emailInput.disabled = true;
    passwordInput.disabled = true;
    loginButton.disabled = true;

    // Listen for changes in the role selection
    roleSelect.addEventListener('change', function () {
        // If a role is selected, enable the email and password fields
        if (roleSelect.value !== "") {
            emailInput.disabled = false;
            passwordInput.disabled = false;
            loginButton.disabled = false;
        } else {
            // Disable inputs and button if no role is selected
            emailInput.disabled = true;
            passwordInput.disabled = true;
            loginButton.disabled = true;
        }
    });

    // Handle form submission
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form from submitting right away

        const role = roleSelect.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validation: Ensure role, email, and password are filled
        if (role === "") {
            alert("Please select a role.");
            return;
        }
        if (email === "") {
            alert("Please enter your email.");
            return;
        }
        if (password === "") {
            alert("Please enter your password.");
            return;
        }

        // Perform actual login logic (e.g., send data to the server)
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    role: role // Send the role if necessary
                })
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Handle successful login (e.g., redirect to dashboard)
                alert("Login successful!");
                window.location.href = 'dashboard.html'; // Redirect to your dashboard or home page
            } else {
                // Handle error messages
                alert(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert("An error occurred. Please try again later.");
        }
    });
});
